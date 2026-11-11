import { CircleAlert } from 'lucide-react';
import type { ComponentProps } from 'react';

import type { ControlSize } from '@/design-system/foundations/controls';
import { textVariants } from '@/design-system/foundations/typography';
import { cn } from '@/design-system/lib/cn';

export interface LabelProps extends ComponentProps<'label'> {
  /** `sm` is a small secondary label for dense editors. Defaults to `md`. */
  size?: ControlSize;
}

/**
 * A form field label. Prefer `Field`, which links the label for you; use
 * Label directly beside a Checkbox or Switch, with `htmlFor`.
 */
export function Label({ size = 'md', className, ...props }: LabelProps) {
  return (
    <label
      data-slot="label"
      className={cn(
        size === 'sm'
          ? textVariants({ variant: 'caption' })
          : textVariants({ variant: 'subhead' }),
        'font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export interface FieldMessageProps extends ComponentProps<'p'> {
  /** Shows the message as a validation error, with an icon */
  error?: boolean;
}

/** Hint or validation message under a field */
export function FieldMessage({
  error = false,
  className,
  children,
  ...props
}: FieldMessageProps) {
  return (
    <p
      data-slot="field-message"
      role={error ? 'alert' : undefined}
      className={cn(
        textVariants({
          variant: 'caption',
          tone: error ? 'danger' : 'default',
        }),
        error && 'flex items-start gap-1',
        className,
      )}
      {...props}
    >
      {error && <CircleAlert aria-hidden className="mt-px size-3.5 shrink-0" />}
      {children}
    </p>
  );
}
