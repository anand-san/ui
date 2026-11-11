import type { ComponentProps } from 'react';

import { textVariants } from '@/design-system/foundations/typography';
import { cn } from '@/design-system/lib/cn';

/**
 * An inline message on a soft fill. Put an icon first and it lines up with
 * the title; everything else stacks next to it, actions included.
 *
 * Screen readers hear a `status` politely when it appears. A `danger` alert
 * is an `alert` and interrupts, so keep those for errors.
 */

export type AlertTone =
  | 'neutral'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

const tones: Record<AlertTone, string> = {
  neutral: 'bg-fill [&>svg]:text-ink-secondary',
  accent: 'bg-accent-soft [&>svg]:text-accent',
  success: 'bg-success-soft [&>svg]:text-success',
  warning: 'bg-warning-soft [&>svg]:text-warning',
  danger: 'bg-danger-soft [&>svg]:text-danger',
  info: 'bg-info-soft [&>svg]:text-info',
};

export interface AlertProps extends ComponentProps<'div'> {
  /** Defaults to `neutral` */
  tone?: AlertTone;
}

export function Alert({
  tone = 'neutral',
  role,
  className,
  ...props
}: AlertProps) {
  return (
    <div
      role={role ?? (tone === 'danger' ? 'alert' : 'status')}
      data-slot="alert"
      data-tone={tone}
      className={cn(
        'grid w-full grid-cols-[0_1fr] items-start gap-y-1 rounded-card px-4 py-3 text-subhead text-ink has-[>svg]:grid-cols-[1.125rem_1fr] has-[>svg]:gap-x-3 [&>*:not(svg)]:col-start-2 [&>svg]:size-[1.125rem] [&>svg]:translate-y-px',
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}

export function AlertTitle({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="alert-title"
      className={cn(
        textVariants({ variant: 'headline' }),
        'text-subhead',
        className,
      )}
      {...props}
    />
  );
}

export function AlertDescription({
  className,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn('text-ink-secondary [&_p+p]:mt-1', className)}
      {...props}
    />
  );
}
