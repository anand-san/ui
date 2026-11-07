import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/design-system/lib/cn';

/**
 * Button. `primary` is the one main action in a view; `secondary` uses the
 * same tint as child cards; `ghost` is for quiet actions inside cards, like
 * a view switcher in a card header. `inverse` and `inverse-soft` sit on a
 * brand colored banner, where the theme colors would vanish.
 */

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive'
  | 'link'
  | 'inverse'
  | 'inverse-soft';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon';

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 active:bg-primary/85',
        secondary: 'bg-primary/5 text-foreground hover:bg-primary/10',
        outline:
          'border border-input bg-card text-foreground hover:border-ring/40 hover:bg-primary/5',
        ghost: 'text-muted-foreground hover:bg-primary/5 hover:text-foreground',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        link: 'text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary',
        inverse:
          'bg-white text-neutral-900 hover:bg-white/90 focus-visible:ring-white focus-visible:ring-offset-0',
        'inverse-soft':
          'bg-white/15 text-white hover:bg-white/25 focus-visible:ring-white focus-visible:ring-offset-0',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-9 px-4 text-sm',
        lg: 'h-10 px-6 text-sm',
        'icon-sm': 'size-8',
        icon: 'size-9',
      },
      shape: {
        rounded: 'rounded-md',
        pill: 'rounded-full',
      },
    },
    compoundVariants: [
      // Links size to their text, not to a button box
      { variant: 'link', className: 'h-auto px-0' },
    ],
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Defaults to `primary` */
  variant?: ButtonVariant;
  /** Defaults to `md`. Icon sizes are square, for a lone icon with an aria-label. */
  size?: ButtonSize;
  /** Buttons are pills. `rounded` squares them off to sit flush in a toolbar or segmented group. Defaults to `pill`. */
  shape?: 'rounded' | 'pill';
  /** Shows a spinner in place of the leading icon and disables the button */
  loading?: boolean;
  /** Merge the button styles onto its only child, e.g. a router `<Link>` */
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      shape = 'pill',
      loading = false,
      asChild = false,
      type,
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot : 'button';
    return (
      <Component
        ref={ref}
        // A plain <button> defaults to submit inside forms; make that explicit
        type={asChild ? type : (type ?? 'button')}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={cn(buttonVariants({ variant, size, shape }), className)}
        {...props}
      >
        {loading && <Loader2 aria-hidden className="animate-spin" />}
        <Slottable>{children}</Slottable>
      </Component>
    );
  },
);
Button.displayName = 'Button';
