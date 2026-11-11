import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/design-system/lib/cn';

export type GaugeTone = 'accent' | 'neutral' | 'success' | 'warning' | 'danger';
export type GaugeSize = 'sm' | 'md' | 'lg';

const tones: Record<GaugeTone, string> = {
  accent: 'text-accent',
  neutral: 'text-ink-secondary',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
};

const sizes: Record<GaugeSize, { box: string; stroke: number; text: string }> =
  {
    sm: { box: 'size-12', stroke: 10, text: 'text-caption' },
    md: { box: 'size-20', stroke: 8, text: 'text-title-3' },
    lg: { box: 'size-36', stroke: 6, text: 'text-title-1' },
  };

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export interface GaugeProps extends Omit<ComponentProps<'div'>, 'children'> {
  /** 0 to `max` */
  value: number;
  max?: number;
  /** What the gauge measures, for screen readers: "Storage used" */
  label: string;
  /** Defaults to `accent`. Pick the tone from the value in the app. */
  tone?: GaugeTone;
  /** sm 48px, md 80px, lg 144px. Defaults to `md`. */
  size?: GaugeSize;
  /** What the centre shows. Defaults to the value; pass `null` for nothing. */
  children?: ReactNode;
}

/**
 * A ring that fills to a value, like storage used or a score. The ring
 * springs to each new value; the number in the middle reads as text.
 */
export function Gauge({
  value,
  max = 100,
  label,
  tone = 'accent',
  size = 'md',
  className,
  children,
  ...props
}: GaugeProps) {
  const clamped = Math.min(max, Math.max(0, value));
  const { box, stroke, text } = sizes[size];
  return (
    <div
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={clamped}
      data-slot="gauge"
      className={cn(
        'relative inline-grid shrink-0 place-items-center',
        box,
        tones[tone],
        className,
      )}
      {...props}
    >
      <svg
        viewBox="0 0 100 100"
        aria-hidden
        className="absolute inset-0 size-full -rotate-90"
      >
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          strokeWidth={stroke}
          className="stroke-fill-strong"
        />
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - clamped / max)}
          className="transition-[stroke-dashoffset] duration-(--duration-spring) ease-spring"
        />
      </svg>
      <span
        aria-hidden
        className={cn(
          'relative font-rounded font-semibold tabular-nums text-ink',
          text,
        )}
      >
        {children === undefined ? clamped : children}
      </span>
    </div>
  );
}
