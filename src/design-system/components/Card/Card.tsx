import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import type { ComponentProps, ElementType } from 'react';

import { focusRing, pressable } from '@/design-system/foundations/controls';
import { textVariants } from '@/design-system/foundations/typography';
import { cn } from '@/design-system/lib/cn';

/**
 * Card: a group of related content on the canvas. `surface` is the default,
 * a white card on the tinted canvas. `inset` is a well inside another card;
 * `outline` sits where a fill would disappear; `accent` is a promo in the
 * accent color, where every role turns white.
 *
 * Cards don't nest: inside a card, use `inset`, a List or a Separator.
 * Padding and corners follow the density.
 */

export type CardVariant = 'surface' | 'inset' | 'outline' | 'accent';

const cardVariants = cva('flex min-w-0 flex-col gap-4 text-ink', {
  variants: {
    variant: {
      surface: 'rounded-card bg-surface p-inset',
      inset: 'rounded-control bg-surface-inset p-3',
      outline: 'rounded-card border border-separator p-inset',
      accent: 'surface-accent rounded-card p-inset',
    },
    interactive: {
      true: cn('cursor-pointer transition-colors', focusRing, pressable),
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: ['surface', 'accent'],
      interactive: true,
      className: 'hover:bg-[color-mix(in_oklch,var(--surface),var(--ink)_4%)]',
    },
    {
      variant: 'inset',
      interactive: true,
      className:
        'hover:bg-[color-mix(in_oklch,var(--surface-inset),var(--ink)_5%)]',
    },
    { variant: 'outline', interactive: true, className: 'hover:bg-fill' },
  ],
});

export interface CardProps extends ComponentProps<'div'> {
  /** Defaults to `surface` */
  variant?: CardVariant;
  /** Hover, press and focus states. Pair with `asChild` to render a link. */
  interactive?: boolean;
  /** Merge the card onto its only child, like a router `<Link>` */
  asChild?: boolean;
}

export function Card({
  variant = 'surface',
  interactive = false,
  asChild = false,
  className,
  ...props
}: CardProps) {
  const Component = asChild ? Slot : 'div';
  return (
    <Component
      data-slot="card"
      data-variant={variant}
      className={cn(cardVariants({ variant, interactive }), className)}
      {...props}
    />
  );
}

/** Title and description on the left, an optional `CardAction` on the right */
export function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'grid auto-rows-min items-start gap-1 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-action]:gap-x-3',
        className,
      )}
      {...props}
    />
  );
}

export interface CardTitleProps extends ComponentProps<'h3'> {
  /** Defaults to h3 */
  as?: ElementType;
}

export function CardTitle({
  as: Heading = 'h3',
  className,
  ...props
}: CardTitleProps) {
  return (
    <Heading
      data-slot="card-title"
      className={cn(textVariants({ variant: 'title-3' }), 'min-w-0', className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="card-description"
      className={cn(
        textVariants({ variant: 'subhead', tone: 'secondary' }),
        className,
      )}
      {...props}
    />
  );
}

/** Sits at the right of `CardHeader`, centred on the title */
export function CardAction({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 flex items-center gap-2 self-center justify-self-end',
        className,
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('min-w-0', className)}
      {...props}
    />
  );
}

export function CardFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex flex-wrap items-center gap-2', className)}
      {...props}
    />
  );
}
