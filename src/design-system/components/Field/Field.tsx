import { type ComponentProps, type ReactNode, useId, useMemo } from 'react';

import { FieldMessage, Label } from '@/design-system/components/Label/Label';
import type { ControlSize } from '@/design-system/foundations/controls';
import { cn } from '@/design-system/lib/cn';

import { FieldContext } from './fieldContext';

export interface FieldProps extends Omit<ComponentProps<'div'>, 'id'> {
  /** Shown above the control and linked to it */
  label?: ReactNode;
  /** Sits at the right of the label row, e.g. a character count */
  labelAction?: ReactNode;
  /** Help text under the control. Hidden while there is an error. */
  hint?: ReactNode;
  /** Adds an asterisk to the label and marks the control `aria-required` */
  required?: boolean;
  /** Error text under the control. Any truthy value marks the control invalid. */
  error?: ReactNode;
  /**
   * `sm` for dense editors, like a form inside a list of entries: a small
   * secondary label and small controls. Defaults to `md`. Heights follow the
   * density.
   */
  size?: ControlSize;
  /** id for the control; set it here, not on the control. Generated when left out. */
  id?: string;
}

/**
 * A label, one control and its hint or error, wired together: the label
 * focuses the control, the message is read as its description and an error
 * marks it invalid. Works with Input, Textarea, SelectTrigger and DatePicker,
 * and anything built on them.
 */
export function Field({
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
}: FieldProps) {
  const generatedId = useId();
  const controlId = id ?? `field-${generatedId}`;
  const hasError = Boolean(error) && error !== true;
  const message = hasError ? error : hint;
  const messageId = message ? `${controlId}-message` : undefined;

  const context = useMemo(
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
      data-slot="field"
      className={cn(
        'flex min-w-0 flex-col',
        size === 'sm' ? 'gap-1' : 'gap-1.5',
        className,
      )}
      {...props}
    >
      {(label || labelAction) && (
        <div className="flex items-center justify-between gap-2">
          {label && (
            <Label htmlFor={controlId} size={size}>
              {label}
              {required && (
                <span aria-hidden className="text-ink-secondary">
                  {' *'}
                </span>
              )}
            </Label>
          )}
          {labelAction}
        </div>
      )}
      <FieldContext value={context}>{children}</FieldContext>
      {message && (
        <FieldMessage id={messageId} error={hasError}>
          {message}
        </FieldMessage>
      )}
    </div>
  );
}
