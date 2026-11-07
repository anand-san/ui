import * as React from 'react';

import { textVariants } from '@/design-system/foundations/typography';
import { cn } from '@/design-system/lib/cn';

export interface PageHeaderProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  'title'
> {
  title: React.ReactNode;
  /** One or two sentences under the title */
  description?: React.ReactNode;
  /** Shown in a tinted tile before the title */
  icon?: React.ReactNode;
  /** Buttons at the right; they wrap under the title on phones */
  actions?: React.ReactNode;
  /** Heading level. Defaults to h1; use h2 for a step inside a page. */
  as?: 'h1' | 'h2';
}

/** The title block at the top of a page or a step in a flow */
export const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(
  (
    {
      title,
      description,
      icon,
      actions,
      as: Heading = 'h1',
      className,
      ...props
    },
    ref,
  ) => (
    <header
      ref={ref}
      data-slot="page-header"
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between',
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 items-start gap-3">
        {icon && (
          <span
            aria-hidden
            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary [&_svg]:size-5"
          >
            {icon}
          </span>
        )}
        <div className="flex min-w-0 flex-col gap-1">
          <Heading className={textVariants({ variant: 'title' })}>
            {title}
          </Heading>
          {description && (
            <p
              className={cn(
                textVariants({ variant: 'body', tone: 'muted' }),
                'max-w-2xl',
              )}
            >
              {description}
            </p>
          )}
        </div>
      </div>
      {actions && (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {actions}
        </div>
      )}
    </header>
  ),
);
PageHeader.displayName = 'PageHeader';
