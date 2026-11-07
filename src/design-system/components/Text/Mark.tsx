import * as React from 'react';

import { cn } from '@/design-system/lib/cn';

export interface MarkProps extends React.HTMLAttributes<HTMLElement> {
  /** `stroke` is a highlighter pass over the text; `underline` is a quieter marker line under it. Defaults to `stroke`. */
  variant?: 'stroke' | 'underline';
}

/**
 * A highlighter mark over a few words: keywords a resume matches, the part
 * of a job ad Elo is talking about. Use it sparingly; if half a paragraph is
 * marked, nothing is.
 */
export const Mark = React.forwardRef<HTMLElement, MarkProps>(
  ({ variant = 'stroke', className, ...props }, ref) => (
    <mark
      ref={ref}
      data-slot="mark"
      className={cn(
        'bg-transparent text-inherit [box-decoration-break:clone] [-webkit-box-decoration-break:clone]',
        variant === 'stroke'
          ? // A slightly uneven band, like a real highlighter pass
            '-mx-0.5 rounded-[0.2em_0.35em_0.25em_0.4em] bg-[linear-gradient(100deg,hsl(var(--highlight)/0.7),hsl(var(--highlight)/0.9)_8%,hsl(var(--highlight)/0.75)_92%,hsl(var(--highlight)/0.5))] px-0.5 dark:bg-highlight/85 dark:bg-none dark:text-highlight-foreground'
          : 'bg-[linear-gradient(transparent_62%,hsl(var(--highlight)/0.6)_62%,hsl(var(--highlight)/0.6)_92%,transparent_92%)]',
        className,
      )}
      {...props}
    />
  ),
);
Mark.displayName = 'Mark';
