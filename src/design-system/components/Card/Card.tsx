import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { Badge } from '@/design-system/components/Badge/Badge';
import { spacing } from '@/design-system/foundations/spacing';
import {
  type TextVariant,
  textVariants,
} from '@/design-system/foundations/typography';
import { cn } from '@/design-system/lib/cn';

/**
 * Card: the building block of a dashboard page.
 *
 * A `soft` card is a section of a page (Recent, Your projects). A `tinted`
 * card is an item inside a section (one project). `outline` is for cards
 * that sit directly on the page canvas where a soft fill would disappear.
 * `brand` is a promo banner in the brand color, with white text in both
 * themes; pair it with `inverse` buttons.
 *
 * Padding lives on the card and the parts are spaced by a gap, so a card
 * with no header, or with only content, still lines up.
 */

export type CardVariant = 'soft' | 'tinted' | 'outline' | 'brand';
export type CardSize = 'lg' | 'md' | 'sm';

const CardSizeContext = React.createContext<CardSize>('lg');

const cardVariants = cva('flex flex-col rounded-xl text-card-foreground', {
  variants: {
    variant: {
      soft: 'bg-surface',
      tinted: 'bg-primary/5',
      outline: 'border bg-card',
      brand: 'bg-brand-600 text-white dark:bg-brand-800',
    },
    size: {
      lg: cn(spacing.card.lg.inset, spacing.card.lg.gap),
      md: cn(spacing.card.md.inset, spacing.card.md.gap),
      sm: cn(spacing.card.sm.inset, spacing.card.sm.gap),
    },
    interactive: {
      true: 'cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      false: '',
    },
  },
  compoundVariants: [
    { variant: 'soft', interactive: true, className: 'hover:bg-muted' },
    { variant: 'tinted', interactive: true, className: 'hover:bg-primary/10' },
    { variant: 'outline', interactive: true, className: 'hover:bg-muted/50' },
  ],
});

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Defaults to `soft` */
  variant?: CardVariant;
  /**
   * `lg` for page sections, `md` for cards in sheets and dialogs, `sm` for
   * items inside another card. Defaults to `sm` for tinted cards, else `lg`.
   */
  size?: CardSize;
  /** Adds hover and focus states. Pair with `asChild` to render a link. */
  interactive?: boolean;
  /** Merge the card onto its only child, e.g. a router `<Link>` */
  asChild?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'soft',
      size,
      interactive = false,
      asChild = false,
      className,
      ...props
    },
    ref,
  ) => {
    const resolvedSize = size ?? (variant === 'tinted' ? 'sm' : 'lg');
    const Component = asChild ? Slot : 'div';
    return (
      <CardSizeContext.Provider value={resolvedSize}>
        <Component
          ref={ref}
          data-slot="card"
          className={cn(
            cardVariants({ variant, size: resolvedSize, interactive }),
            className,
          )}
          {...props}
        />
      </CardSizeContext.Provider>
    );
  },
);
Card.displayName = 'Card';

/**
 * Title and description on the left, an optional `CardAction` on the right.
 */
export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-header"
    className={cn(
      'grid auto-rows-min items-start gap-1 has-[[data-slot=card-action]]:grid-cols-[1fr_auto] has-[[data-slot=card-action]]:gap-x-3',
      className,
    )}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const titleVariantBySize: Record<CardSize, TextVariant> = {
  lg: 'heading',
  md: 'subheading',
  sm: 'body-strong',
};

const titleElementBySize: Record<CardSize, React.ElementType> = {
  lg: 'h2',
  md: 'h3',
  sm: 'h3',
};

const iconClassBySize: Record<CardSize, string> = {
  lg: '[&_svg]:size-5 md:[&_svg]:size-6',
  md: '[&_svg]:size-4',
  sm: '[&_svg]:size-4',
};

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Leading icon. Colored `text-primary` unless the icon sets its own color. */
  icon?: React.ReactNode;
  /** Count pill after the title. Leave undefined to hide it. */
  count?: number;
  /** Heading level; defaults to h2 on large cards and h3 otherwise */
  as?: React.ElementType;
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ icon, count, as, className, children, ...props }, ref) => {
    const size = React.useContext(CardSizeContext);
    const Component = as ?? titleElementBySize[size];
    return (
      <Component
        ref={ref}
        data-slot="card-title"
        className={cn(
          textVariants({ variant: titleVariantBySize[size] }),
          'flex min-w-0 items-center',
          spacing.inline,
          className,
        )}
        {...props}
      >
        {icon && (
          <span
            aria-hidden
            className={cn('flex shrink-0 text-primary', iconClassBySize[size])}
          >
            {icon}
          </span>
        )}
        <span className={cn('min-w-0', size === 'sm' && 'truncate')}>
          {children}
        </span>
        {count !== undefined && <CardCount>{count}</CardCount>}
      </Component>
    );
  },
);
CardTitle.displayName = 'CardTitle';

/** The count pill next to card titles: a neutral Badge sized to the card */
export const CardCount = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  const size = React.useContext(CardSizeContext);
  return (
    <Badge
      ref={ref}
      data-slot="card-count"
      size={size === 'lg' ? 'md' : 'sm'}
      className={cn('tracking-normal', className)}
      {...props}
    />
  );
});
CardCount.displayName = 'CardCount';

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const size = React.useContext(CardSizeContext);
  return (
    <p
      ref={ref}
      data-slot="card-description"
      className={cn(
        textVariants({
          variant: size === 'sm' ? 'caption' : 'body',
          tone: 'muted',
        }),
        className,
      )}
      {...props}
    />
  );
});
CardDescription.displayName = 'CardDescription';

/** Sits at the right of `CardHeader`, vertically centred on the title */
export const CardAction = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-action"
    className={cn(
      'col-start-2 row-span-2 row-start-1 flex items-center gap-2 self-center justify-self-end',
      className,
    )}
    {...props}
  />
));
CardAction.displayName = 'CardAction';

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-content"
    className={cn('min-w-0', className)}
    {...props}
  />
));
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-footer"
    className={cn('flex items-center', spacing.inline, className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';
