import type { ComponentProps } from 'react';

import { cn } from '@/design-system/lib/cn';

/** A loading placeholder. Size it like the thing it stands in for. */
export function Skeleton({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden
      className={cn('animate-shimmer rounded-control bg-fill', className)}
      {...props}
    />
  );
}
