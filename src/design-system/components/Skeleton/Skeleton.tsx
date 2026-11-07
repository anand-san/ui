import * as React from 'react';

import { cn } from '@/design-system/lib/cn';

/** Loading placeholder. Size it with the box it stands in for. */
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden
      className={cn('animate-pulse rounded-md bg-primary/10', className)}
      {...props}
    />
  );
}
