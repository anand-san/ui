import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '@/design-system/lib/cn';

/**
 * Badge: a short label in a capsule, like a status or a count. `soft` is the
 * default and reads on any surface; `solid` is for the rare badge that has
 * to stand out. `highlight` is the highlighter, for "New".
 */

export type BadgeTone =
  | 'neutral'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'highlight';
export type BadgeVariant = 'soft' | 'solid';
export type BadgeSize = 'sm' | 'md';

const soft: Record<BadgeTone, string> = {
  neutral: 'bg-fill text-ink',
  accent: 'bg-accent-soft text-accent',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  danger: 'bg-danger-soft text-danger',
  info: 'bg-info-soft text-info',
  highlight: 'bg-highlight text-highlight-foreground',
};

const solid: Record<BadgeTone, string> = {
  neutral: 'bg-ink text-surface',
  accent: 'bg-accent text-accent-foreground',
  success: 'bg-success text-success-foreground',
  warning: 'bg-warning text-warning-foreground',
  danger: 'bg-danger text-danger-foreground',
  info: 'bg-info text-info-foreground',
  highlight: 'bg-highlight text-highlight-foreground',
};

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center gap-1 whitespace-nowrap rounded-full font-medium tabular-nums [&_svg]:shrink-0',
  {
    variants: {
      size: {
        sm: 'h-5 px-2 text-caption [&_svg]:size-3',
        md: 'h-6 px-2.5 text-subhead [&_svg]:size-3.5',
      },
    },
  },
);

export interface BadgeProps extends ComponentProps<'span'> {
  /** Defaults to `neutral` */
  tone?: BadgeTone;
  /** Defaults to `soft` */
  variant?: BadgeVariant;
  /** Defaults to `sm` */
  size?: BadgeSize;
  /** A leading dot in the badge color. With `asChild`, put a `<BadgeDot />` in the child. */
  dot?: boolean;
  /** Merge onto the only child, like a `<button>` that opens a menu */
  asChild?: boolean;
}

export function Badge({
  tone = 'neutral',
  variant = 'soft',
  size = 'sm',
  dot = false,
  asChild = false,
  className,
  children,
  ...props
}: BadgeProps) {
  const Component = asChild ? Slot : 'span';
  return (
    <Component
      data-slot="badge"
      className={cn(
        badgeVariants({ size }),
        (variant === 'solid' ? solid : soft)[tone],
        className,
      )}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {dot && <BadgeDot />}
          {children}
        </>
      )}
    </Component>
  );
}

/** A dot in the current text color; place it first inside a badge */
export function BadgeDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn('size-1.5 shrink-0 rounded-full bg-current', className)}
    />
  );
}
