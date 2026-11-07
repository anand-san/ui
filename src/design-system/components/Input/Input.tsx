import * as React from 'react';

import { useFieldControl } from '@/design-system/components/Field/fieldContext';
import {
  type ControlSize,
  controlVariants,
} from '@/design-system/foundations/controls';
import { cn } from '@/design-system/lib/cn';

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> {
  /** sm 32px, md 36px, lg 40px. Defaults to `md`, or the size of its Field. */
  size?: ControlSize;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size,
      type,
      id,
      'aria-describedby': describedBy,
      'aria-invalid': invalid,
      className,
      ...props
    },
    ref,
  ) => {
    const field = useFieldControl({
      id,
      size,
      'aria-describedby': describedBy,
      'aria-invalid': invalid,
    });
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        id={field.id}
        aria-describedby={field['aria-describedby']}
        aria-invalid={field['aria-invalid']}
        aria-required={field['aria-required']}
        className={cn(
          controlVariants({ size: field.size }),
          'py-1 file:mr-3 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';
