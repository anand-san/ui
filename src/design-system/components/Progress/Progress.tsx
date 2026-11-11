import type { ComponentProps } from 'react';

import { cn } from '@/design-system/lib/cn';

export type ProgressTone =
  | 'accent'
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger';

const tones: Record<ProgressTone, string> = {
  accent: 'bg-accent',
  neutral: 'bg-ink-secondary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
};

export interface ProgressProps extends ComponentProps<'div'> {
  /** 0 to `max`. Leave it out while the amount is unknown. */
  value?: number | null;
  max?: number;
  /** Defaults to `accent` */
  tone?: ProgressTone;
  /** Name the bar for screen readers when no visible label does */
  label?: string;
}

/** A thin bar that fills from the start, and springs to each new value */
export function Progress({
  value,
  max = 100,
  tone = 'accent',
  label,
  className,
  ...props
}: ProgressProps) {
  const known = value != null;
  const fraction = known ? Math.min(1, Math.max(0, value / max)) : 0;
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={known ? value : undefined}
      data-slot="progress"
      className={cn(
        'relative h-1.5 w-full overflow-hidden rounded-full bg-fill-strong',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'h-full origin-left rounded-full transition-[scale] duration-(--duration-spring) ease-spring rtl:origin-right',
          known ? '' : 'w-1/3 animate-shimmer',
          tones[tone],
        )}
        style={known ? { scale: `${fraction} 1` } : undefined}
      />
    </div>
  );
}
