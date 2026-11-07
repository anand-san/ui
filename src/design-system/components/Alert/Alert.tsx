import { cva } from 'class-variance-authority';
import * as React from 'react';

import { textVariants } from '@/design-system/foundations/typography';
import { cn } from '@/design-system/lib/cn';

/**
 * An inline message in a tinted box. Put an icon first and it lines up with
 * the title; the text sits in a column next to it.
 */

export type AlertTone =
  | 'neutral'
  | 'brand'
  | 'success'
  | 'warning'
  | 'info'
  | 'destructive';

const alertVariants = cva(
  'relative grid w-full grid-cols-[0_1fr] items-start gap-y-1 rounded-xl px-4 py-3 text-sm has-[>svg]:grid-cols-[1rem_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5',
  {
    variants: {
      tone: {
        neutral: 'bg-primary/5 text-foreground [&>svg]:text-muted-foreground',
        brand: 'bg-brand/10 text-foreground [&>svg]:text-brand',
        success: 'bg-success/10 text-foreground [&>svg]:text-success',
        warning: 'bg-warning/10 text-foreground [&>svg]:text-warning',
        info: 'bg-info/10 text-foreground [&>svg]:text-info',
        destructive:
          'bg-destructive/10 text-destructive [&>svg]:text-destructive',
      },
    },
  },
);

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Defaults to `neutral` */
  tone?: AlertTone;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ tone = 'neutral', className, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      data-slot="alert"
      className={cn(alertVariants({ tone }), className)}
      {...props}
    />
  ),
);
Alert.displayName = 'Alert';

export const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="alert-title"
    className={cn(
      textVariants({ variant: 'body-strong' }),
      'col-start-2',
      className,
    )}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

export const AlertDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="alert-description"
    className={cn(
      'col-start-2 text-sm opacity-90 [&_p]:leading-relaxed',
      className,
    )}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';
