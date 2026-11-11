import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { LoaderCircle } from 'lucide-react';
import type { ComponentProps } from 'react';

import {
  focusRing,
  pressable,
  touchTarget,
} from '@/design-system/foundations/controls';
import { cn } from '@/design-system/lib/cn';

/**
 * Button. Prominence comes from the variant: `filled` for the one main
 * action in a view, `tinted` for the actions beside it, `plain` for quiet
 * ones like a toolbar icon, `link` for a button inside a sentence. The tone
 * says what it does: `accent` by default, `neutral` for secondary actions,
 * `danger` for destructive ones.
 */

export type ButtonVariant = 'filled' | 'tinted' | 'plain' | 'link';
export type ButtonTone = 'accent' | 'neutral' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const tones: Record<ButtonVariant, Record<ButtonTone, string>> = {
  filled: {
    accent:
      'bg-accent text-accent-foreground hover:bg-accent-pressed active:bg-accent-pressed',
    neutral: 'bg-ink text-surface hover:bg-ink/85 active:bg-ink/80',
    danger:
      'bg-danger text-danger-foreground hover:bg-[color-mix(in_oklch,var(--danger),black_8%)] active:bg-[color-mix(in_oklch,var(--danger),black_12%)]',
  },
  tinted: {
    accent:
      'bg-accent-soft text-accent hover:bg-accent-soft-hover active:bg-accent-soft-hover',
    neutral: 'bg-fill text-ink hover:bg-fill-hover active:bg-fill-strong',
    danger:
      'bg-danger-soft text-danger hover:bg-[color-mix(in_oklch,var(--danger-soft),var(--danger)_6%)] active:bg-[color-mix(in_oklch,var(--danger-soft),var(--danger)_10%)]',
  },
  plain: {
    accent: 'text-accent hover:bg-fill active:bg-fill-hover',
    neutral:
      'text-ink-secondary hover:bg-fill hover:text-ink active:bg-fill-hover',
    danger: 'text-danger hover:bg-fill active:bg-fill-hover',
  },
  link: {
    accent: 'text-accent',
    neutral: 'text-ink',
    danger: 'text-danger',
  },
};

const buttonVariants = cva(
  [
    'inline-flex shrink-0 select-none items-center justify-center gap-1.5 whitespace-nowrap font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
    focusRing,
  ],
  {
    variants: {
      size: {
        sm: 'h-control-sm px-3 text-subhead [&_svg]:size-3.5',
        md: 'h-control-md px-4 text-body [&_svg]:size-4',
        lg: 'h-control-lg px-5 text-body [&_svg]:size-[1.125rem]',
      },
      icon: { true: 'px-0', false: '' },
      shape: {
        capsule: 'rounded-full',
        rounded: 'rounded-control',
      },
    },
    compoundVariants: [
      { icon: true, size: 'sm', className: 'w-control-sm' },
      { icon: true, size: 'md', className: 'w-control-md' },
      { icon: true, size: 'lg', className: 'w-control-lg' },
    ],
  },
);

/** A link sizes to its text and underlines on hover, like text */
const linkClass =
  'inline-flex items-center gap-1 rounded-xs font-medium underline-offset-[0.2em] hover:underline disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1em]';

export interface ButtonProps extends ComponentProps<'button'> {
  /** Defaults to `filled` */
  variant?: ButtonVariant;
  /** Defaults to `accent` */
  tone?: ButtonTone;
  /** sm, md and lg follow the density. Defaults to `md`. */
  size?: ButtonSize;
  /** A square button for a lone icon. Give it an `aria-label`. */
  icon?: boolean;
  /** `capsule` by default; `rounded` sits flush in a toolbar or a group */
  shape?: 'capsule' | 'rounded';
  /** Shows a spinner before the label and disables the button */
  loading?: boolean;
  /** Merge the button styles onto its only child, like a router `<Link>` */
  asChild?: boolean;
}

export function Button({
  variant = 'filled',
  tone = 'accent',
  size = 'md',
  icon = false,
  shape = 'capsule',
  loading = false,
  asChild = false,
  type,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : 'button';
  return (
    <Component
      data-slot="button"
      // A plain <button> defaults to submit inside forms; make that explicit
      type={asChild ? type : (type ?? 'button')}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        variant === 'link'
          ? [linkClass, focusRing]
          : [
              buttonVariants({ size, icon, shape }),
              pressable,
              size === 'sm' || icon ? touchTarget : '',
            ],
        tones[variant][tone],
        className,
      )}
      {...props}
    >
      {loading && <LoaderCircle aria-hidden className="animate-spin" />}
      <Slottable>{children}</Slottable>
    </Component>
  );
}
