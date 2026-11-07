import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/design-system/lib/cn';

/**
 * Badge: a short label in a pill. `soft` (a 10% tint behind colored text) is
 * the default and reads well on any surface; `solid` is for the rare badge
 * that must stand out; `outline` is the quietest. `highlight` is the
 * highlighter, for "New" and suggestions.
 */

export type BadgeTone =
  | 'neutral'
  | 'brand'
  | 'highlight'
  | 'success'
  | 'warning'
  | 'info'
  | 'destructive';
export type BadgeVariant = 'soft' | 'solid' | 'outline';
export type BadgeSize = 'sm' | 'md';

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full font-medium tabular-nums transition-colors [&_svg]:size-3 [&_svg]:shrink-0',
  {
    variants: {
      tone: {
        neutral: '',
        brand: '',
        highlight: '',
        success: '',
        warning: '',
        info: '',
        destructive: '',
      },
      variant: {
        soft: '',
        solid: '',
        outline: 'border bg-transparent',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-sm',
      },
    },
    compoundVariants: [
      {
        variant: 'soft',
        tone: 'neutral',
        className: 'bg-muted text-foreground',
      },
      { variant: 'soft', tone: 'brand', className: 'bg-brand/10 text-brand' },
      {
        variant: 'soft',
        tone: 'highlight',
        className:
          'bg-highlight/45 text-highlight-foreground dark:bg-highlight',
      },
      {
        variant: 'soft',
        tone: 'success',
        className: 'bg-success/10 text-success',
      },
      {
        variant: 'soft',
        tone: 'warning',
        className: 'bg-warning/10 text-warning',
      },
      { variant: 'soft', tone: 'info', className: 'bg-info/10 text-info' },
      {
        variant: 'soft',
        tone: 'destructive',
        className: 'bg-destructive/10 text-destructive',
      },
      {
        variant: 'solid',
        tone: 'neutral',
        className: 'bg-foreground text-background',
      },
      {
        variant: 'solid',
        tone: 'brand',
        className: 'bg-brand text-brand-foreground',
      },
      {
        variant: 'solid',
        tone: 'highlight',
        className: 'bg-highlight text-highlight-foreground',
      },
      {
        variant: 'solid',
        tone: 'success',
        className: 'bg-success text-success-foreground',
      },
      {
        variant: 'solid',
        tone: 'warning',
        className: 'bg-warning text-warning-foreground',
      },
      {
        variant: 'solid',
        tone: 'info',
        className: 'bg-info text-info-foreground',
      },
      {
        variant: 'solid',
        tone: 'destructive',
        className: 'bg-destructive text-destructive-foreground',
      },
      { variant: 'outline', tone: 'neutral', className: 'text-foreground' },
      {
        variant: 'outline',
        tone: 'brand',
        className: 'border-brand/40 text-brand',
      },
      {
        variant: 'outline',
        tone: 'highlight',
        className: 'border-highlight text-foreground',
      },
      {
        variant: 'outline',
        tone: 'success',
        className: 'border-success/40 text-success',
      },
      {
        variant: 'outline',
        tone: 'warning',
        className: 'border-warning/40 text-warning',
      },
      {
        variant: 'outline',
        tone: 'info',
        className: 'border-info/40 text-info',
      },
      {
        variant: 'outline',
        tone: 'destructive',
        className: 'border-destructive/40 text-destructive',
      },
    ],
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Defaults to `neutral` */
  tone?: BadgeTone;
  /** Defaults to `soft` */
  variant?: BadgeVariant;
  /** Defaults to `sm` */
  size?: BadgeSize;
  /** Leading dot in the badge color. With `asChild`, put a `<BadgeDot />` in the child instead. */
  dot?: boolean;
  /** Merge onto the only child, e.g. a `<button>` that opens a menu */
  asChild?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      tone = 'neutral',
      variant = 'soft',
      size = 'sm',
      dot = false,
      asChild = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot : 'span';
    return (
      <Component
        ref={ref}
        data-slot="badge"
        className={cn(badgeVariants({ tone, variant, size }), className)}
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
  },
);
Badge.displayName = 'Badge';

/** A dot in the current text color; place it first inside a badge */
export function BadgeDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn('size-1.5 shrink-0 rounded-full bg-current', className)}
    />
  );
}
