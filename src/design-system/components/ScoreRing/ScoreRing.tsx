import * as React from 'react';

import { cn } from '@/design-system/lib/cn';

import { scoreTone } from './scoreTone';

export interface ScoreRingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0 to 10 */
  score: number;
  /** sm 80px, lg 160px. Defaults to `sm`. */
  size?: 'sm' | 'lg';
}

/** A ring that fills with a score out of 10, colored by how good it is */
export const ScoreRing = React.forwardRef<HTMLDivElement, ScoreRingProps>(
  ({ score, size = 'sm', className, ...props }, ref) => {
    const circumference = 2 * Math.PI * 35;
    const clamped = Math.min(10, Math.max(0, score));
    const offset = circumference - (clamped / 10) * circumference;
    const tone = scoreTone(clamped);
    return (
      <div
        ref={ref}
        role="img"
        aria-label={`Score ${clamped.toFixed(1)} out of 10`}
        data-slot="score-ring"
        className={cn(
          'relative shrink-0',
          size === 'lg' ? 'size-40' : 'size-20',
          className,
        )}
        {...props}
      >
        <svg className="size-full -rotate-90" viewBox="0 0 80 80" aria-hidden>
          <circle
            cx="40"
            cy="40"
            r="35"
            fill="none"
            strokeWidth="8"
            className="stroke-primary/10"
          />
          <circle
            cx="40"
            cy="40"
            r="35"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={cn('transition-[stroke-dashoffset]', tone)}
          />
        </svg>
        <span
          className={cn(
            'absolute inset-0 flex items-center justify-center font-bold tabular-nums tracking-tight',
            size === 'lg' ? 'text-4xl' : 'text-2xl',
            tone,
          )}
        >
          {clamped.toFixed(1)}
        </span>
      </div>
    );
  },
);
ScoreRing.displayName = 'ScoreRing';
