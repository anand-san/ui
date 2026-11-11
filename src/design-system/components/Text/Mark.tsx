import type { ComponentProps } from 'react';

import { cn } from '@/design-system/lib/cn';

export interface MarkProps extends ComponentProps<'mark'> {
  /**
   * `fill` is a highlighter pass behind the words; `underline` is a quieter
   * marker line under them. Defaults to `fill`.
   */
  variant?: 'fill' | 'underline';
}

/**
 * A highlighter over a few words: the terms a search matched, the part of a
 * text a comment is about. Use it sparingly; if half a paragraph is marked,
 * nothing is.
 */
export function Mark({ variant = 'fill', className, ...props }: MarkProps) {
  return (
    <mark
      data-slot="mark"
      className={cn(
        'box-decoration-clone',
        variant === 'fill'
          ? '-mx-[0.1em] rounded-[0.25em] bg-highlight px-[0.1em] text-highlight-foreground'
          : 'bg-transparent text-inherit underline decoration-highlight decoration-[0.18em] underline-offset-[0.16em] [text-decoration-skip-ink:none]',
        className,
      )}
      {...props}
    />
  );
}
