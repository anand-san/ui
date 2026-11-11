import type { ComponentProps, ReactNode } from 'react';

import { textVariants } from '@/design-system/foundations/typography';
import { cn } from '@/design-system/lib/cn';

export interface PageHeaderProps extends Omit<
  ComponentProps<'header'>,
  'title'
> {
  title: ReactNode;
  /** One or two sentences under the title */
  description?: ReactNode;
  /** A small line above the title: a back link or where the page sits */
  eyebrow?: ReactNode;
  /** Buttons at the end; they wrap under the title on phones */
  actions?: ReactNode;
  /** Heading level. Defaults to h1; use h2 for a step inside a page. */
  as?: 'h1' | 'h2';
}

/**
 * The large title at the top of a page, as in a native app: the title is
 * the biggest text on the screen, and actions stay small beside it.
 */
export function PageHeader({
  title,
  description,
  eyebrow,
  actions,
  as: Heading = 'h1',
  className,
  ...props
}: PageHeaderProps) {
  return (
    <header
      data-slot="page-header"
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between',
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-col gap-1">
        {eyebrow && (
          <div
            className={cn(
              textVariants({ variant: 'subhead', tone: 'secondary' }),
              'mb-1 flex items-center gap-1',
            )}
          >
            {eyebrow}
          </div>
        )}
        <Heading className={textVariants({ variant: 'title-1' })}>
          {title}
        </Heading>
        {description && (
          <p
            className={cn(
              textVariants({ variant: 'body', tone: 'secondary' }),
              'max-w-2xl text-pretty',
            )}
          >
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {actions}
        </div>
      )}
    </header>
  );
}
