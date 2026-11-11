import * as React from 'react';

import type { ControlSize } from '@/design-system/foundations/controls';
import { textVariants } from '@/design-system/foundations/typography';
import { cn } from '@/design-system/lib/cn';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** `sm` is a small muted label for dense editors. Defaults to `md`. */
  size?: ControlSize;
}

/**
 * A form field label. Prefer `Field`, which links the label for you; use
 * Label directly beside a Checkbox or Switch, with `htmlFor`.
 */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ size = 'md', className, ...props }, ref) => (
    <label
      ref={ref}
      data-slot="label"
      className={cn(
        textVariants({ variant: size === 'sm' ? 'label' : 'body-strong' }),
        'leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
      {...props}
    />
  ),
);
Label.displayName = 'Label';

export interface FieldMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Shows the message as a validation error */
  error?: boolean;
}

/** Hint or validation message under a field */
export const FieldMessage = React.forwardRef<
  HTMLParagraphElement,
  FieldMessageProps
>(({ error = false, className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="field-message"
    role={error ? 'alert' : undefined}
    className={cn(
      textVariants({
        variant: 'caption',
        tone: error ? 'destructive' : 'muted',
      }),
      className,
    )}
    {...props}
  />
));
FieldMessage.displayName = 'FieldMessage';
