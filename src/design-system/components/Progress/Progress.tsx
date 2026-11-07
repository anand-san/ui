import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/design-system/lib/cn';

export type ProgressTone =
  | 'neutral'
  | 'brand'
  | 'success'
  | 'warning'
  | 'info'
  | 'destructive';

const indicatorVariants = cva('h-full rounded-full transition-all', {
  variants: {
    tone: {
      neutral: 'bg-primary',
      brand: 'bg-brand',
      success: 'bg-success',
      warning: 'bg-warning',
      info: 'bg-info',
      destructive: 'bg-destructive',
    },
  },
});

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0 to `max` */
  value?: number | null;
  max?: number;
  /** Defaults to `neutral` */
  tone?: ProgressTone;
  /** Extra classes for the filled bar, e.g. a status color */
  indicatorClassName?: string;
}

/** A horizontal progress bar on a 10% tint of its tone */
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = 100,
      tone = 'neutral',
      indicatorClassName,
      className,
      ...props
    },
    ref,
  ) => {
    const percent =
      value == null ? 0 : Math.min(100, Math.max(0, (value / max) * 100));
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value ?? undefined}
        data-slot="progress"
        className={cn(
          'relative h-2 w-full overflow-hidden rounded-full bg-primary/10',
          className,
        )}
        {...props}
      >
        <div
          className={cn(indicatorVariants({ tone }), indicatorClassName)}
          style={{ width: `${percent}%` }}
        />
      </div>
    );
  },
);
Progress.displayName = 'Progress';
