import * as React from 'react';

import { FieldMessage, Label } from '@/design-system/components/Label/Label';
import { cn } from '@/design-system/lib/cn';

import { FieldContext } from './fieldContext';

export interface FieldProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'id'
> {
  /** Shown above the control and linked to it */
  label?: React.ReactNode;
  /** Sits at the right of the label row, e.g. a character count */
  labelAction?: React.ReactNode;
  /** Help text under the control. Hidden while there is an error. */
  hint?: React.ReactNode;
  /** Adds an asterisk to the label and marks the control `aria-required` */
  required?: boolean;
  /** Error text under the control. Any truthy value marks the control invalid. */
  error?: React.ReactNode;
  /**
   * `sm` for dense editors like the resume block forms: a small muted label
   * and 32px controls. Defaults to `md`.
   */
  size?: 'sm' | 'md';
  /** id for the control; set it here, not on the control. Generated when left out. */
  id?: string;
}

/**
 * A label, one control and its hint or error, wired together: the label
 * focuses the control, the message is read as its description and an error
 * marks it invalid. Works with Input, Textarea, SelectTrigger and DatePicker,
 * and anything built on them.
 */
export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  (
    {
      label,
      labelAction,
      hint,
      error,
      required = false,
      size = 'md',
      id,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const controlId = id ?? `field-${generatedId}`;
    const hasError = Boolean(error) && error !== true;
    const message = hasError ? error : hint;
    const messageId = message ? `${controlId}-message` : undefined;

    const context = React.useMemo(
      () => ({
        controlId,
        messageId,
        invalid: Boolean(error),
        required,
        size,
      }),
      [controlId, messageId, error, required, size],
    );

    return (
      <div
        ref={ref}
        data-slot="field"
        className={cn(
          'flex min-w-0 flex-col',
          size === 'sm' ? 'gap-1' : 'gap-2',
          className,
        )}
        {...props}
      >
        {(label || labelAction) && (
          <div className="flex min-h-4 items-center justify-between gap-2">
            {label && (
              <Label htmlFor={controlId} size={size}>
                {label}
                {required && (
                  <span aria-hidden className="text-muted-foreground">
                    {' *'}
                  </span>
                )}
              </Label>
            )}
            {labelAction}
          </div>
        )}
        <FieldContext.Provider value={context}>
          {children}
        </FieldContext.Provider>
        {message && (
          <FieldMessage id={messageId} error={hasError}>
            {message}
          </FieldMessage>
        )}
      </div>
    );
  },
);
Field.displayName = 'Field';
