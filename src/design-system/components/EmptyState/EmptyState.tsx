import * as React from 'react';

import { textVariants } from '@/design-system/foundations/typography';
import { cn } from '@/design-system/lib/cn';

export interface EmptyStateProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> {
  /** Shown in a muted circle above the title */
  icon?: React.ReactNode;
  /** An illustration. Sits beside the text from md and above it on phones. */
  image?: string;
  /** Describe the illustration, or leave empty when it is decorative */
  imageAlt?: string;
  imageClassName?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Buttons or a link under the text */
  action?: React.ReactNode;
  /**
   * `sm` for an empty list or section inside a card. `lg` for a whole page
   * or panel: analysis in progress, quota reached, missing profile. Defaults
   * to `lg` with an image and `sm` without.
   */
  size?: 'sm' | 'lg';
  /** Extra content under the description, like a quota note */
  children?: React.ReactNode;
}

/**
 * What a list, section or page shows when there is nothing to show yet, or
 * when the user has to do something first.
 */
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      icon,
      image,
      imageAlt = '',
      imageClassName,
      title,
      description,
      action,
      size,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const large = (size ?? (image ? 'lg' : 'sm')) === 'lg';
    const Title = large ? 'h2' : 'p';

    return (
      <div
        ref={ref}
        data-slot="empty-state"
        data-size={large ? 'lg' : 'sm'}
        className={cn(
          'flex flex-col items-center justify-center text-center',
          large ? 'gap-6 p-4 md:p-6' : 'min-h-48 gap-1 px-4 py-6',
          image && 'md:flex-row md:text-left',
          className,
        )}
        {...props}
      >
        {image && (
          <img
            src={image}
            alt={imageAlt}
            className={cn(
              'w-full max-w-xs md:w-2/5 md:max-w-md',
              imageClassName,
            )}
          />
        )}
        {icon && !image && (
          <div
            aria-hidden
            className={cn(
              'flex items-center justify-center rounded-full bg-primary/5 text-muted-foreground',
              large ? 'size-14 [&_svg]:size-7' : 'mb-2 size-12 [&_svg]:size-6',
            )}
          >
            {icon}
          </div>
        )}
        <div
          className={cn(
            'flex flex-col items-center',
            large ? 'gap-6' : 'gap-1',
            image && 'md:w-1/2 md:items-start',
          )}
        >
          <div
            className={cn(
              'flex flex-col',
              large ? 'max-w-md gap-3' : 'items-center gap-1',
            )}
          >
            <Title
              className={textVariants({
                variant: large ? 'title' : 'body-strong',
              })}
            >
              {title}
            </Title>
            {description && (
              <p
                className={
                  large
                    ? textVariants({ variant: 'body', tone: 'muted' })
                    : cn(textVariants({ variant: 'caption' }), 'max-w-sm')
                }
              >
                {description}
              </p>
            )}
            {children}
          </div>
          {action && (
            <div
              className={cn(
                'flex flex-col gap-2 sm:flex-row',
                !large && 'mt-2',
              )}
            >
              {action}
            </div>
          )}
        </div>
      </div>
    );
  },
);
EmptyState.displayName = 'EmptyState';
