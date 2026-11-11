import type { ComponentProps, CSSProperties } from 'react';

import { useFieldControl } from '@/design-system/components/Field/fieldContext';
import {
  type ControlSize,
  controlVariants,
} from '@/design-system/foundations/controls';
import { cn } from '@/design-system/lib/cn';

export interface TextareaProps extends ComponentProps<'textarea'> {
  /**
   * Sets the text size and padding. The field grows with its content, from
   * `rows` lines. Defaults to `md`, or the size of its Field.
   */
  size?: ControlSize;
}

export function Textarea({
  size,
  id,
  rows = 3,
  'aria-describedby': describedBy,
  'aria-invalid': invalid,
  className,
  style,
  ...props
}: TextareaProps) {
  const field = useFieldControl({
    id,
    size,
    'aria-describedby': describedBy,
    'aria-invalid': invalid,
  });
  return (
    <textarea
      data-slot="textarea"
      id={field.id}
      rows={rows}
      aria-describedby={field['aria-describedby']}
      aria-invalid={field['aria-invalid']}
      aria-required={field['aria-required']}
      className={cn(
        controlVariants({ size: field.size }),
        'field-sizing-content h-auto max-h-80 min-h-[calc(1lh*var(--rows)+1rem)] resize-none py-2',
        className,
      )}
      style={{ '--rows': rows, ...style } as CSSProperties}
      {...props}
    />
  );
}
