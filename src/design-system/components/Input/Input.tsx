import type { ComponentProps } from 'react';

import { useFieldControl } from '@/design-system/components/Field/fieldContext';
import {
  type ControlSize,
  controlVariants,
} from '@/design-system/foundations/controls';
import { cn } from '@/design-system/lib/cn';

export interface InputProps extends Omit<ComponentProps<'input'>, 'size'> {
  /** Heights follow the density. Defaults to `md`, or the size of its Field. */
  size?: ControlSize;
}

export function Input({
  size,
  id,
  'aria-describedby': describedBy,
  'aria-invalid': invalid,
  className,
  ...props
}: InputProps) {
  const field = useFieldControl({
    id,
    size,
    'aria-describedby': describedBy,
    'aria-invalid': invalid,
  });
  return (
    <input
      data-slot="input"
      id={field.id}
      aria-describedby={field['aria-describedby']}
      aria-invalid={field['aria-invalid']}
      aria-required={field['aria-required']}
      className={cn(
        controlVariants({ size: field.size }),
        'py-1 file:mr-3 file:h-full file:border-0 file:bg-transparent file:font-medium file:text-accent',
        className,
      )}
      {...props}
    />
  );
}
