import * as React from 'react';

import { useFieldControl } from '@/design-system/components/Field/fieldContext';
import {
  type ControlSize,
  controlVariants,
} from '@/design-system/foundations/controls';
import { cn } from '@/design-system/lib/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Sets the text size and padding; the height grows with `rows` or the content. Defaults to `md`, or the size of its Field. */
  size?: ControlSize;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size,
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
      <textarea
        ref={ref}
        data-slot="textarea"
        id={field.id}
        aria-describedby={field['aria-describedby']}
        aria-invalid={field['aria-invalid']}
        aria-required={field['aria-required']}
        className={cn(
          controlVariants({ size: field.size }),
          'h-auto min-h-20 resize-none py-2 leading-relaxed',
          className,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';
