import type { ComponentProps, ReactNode } from 'react';

import { textVariants } from '@/design-system/foundations/typography';
import { cn } from '@/design-system/lib/cn';

export interface EmptyStateProps extends Omit<ComponentProps<'div'>, 'title'> {
  /** A glyph above the title, drawn large and quiet */
  icon?: ReactNode;
  /** An illustration in place of the icon */
  image?: string;
  /** Describe the illustration, or leave empty when it is decorative */
  imageAlt?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Buttons or a link under the text */
  action?: ReactNode;
  /**
   * `sm` for an empty list or section inside a card; `lg` for a whole page
   * or panel. Defaults to `lg` with an image and `sm` without.
   */
  size?: 'sm' | 'lg';
  /** Extra content under the description, like a quota note */
  children?: ReactNode;
}

/**
 * What a list, section or page shows when there is nothing in it yet, or
 * when the person has to do something first. Say what will be here and
 * how to get it there.
 */
export function EmptyState({
  icon,
  image,
  imageAlt = '',
  title,
  description,
  action,
  size,
  className,
  children,
  ...props
}: EmptyStateProps) {
  const large = (size ?? (image ? 'lg' : 'sm')) === 'lg';
  const Title = large ? 'h2' : 'p';

  return (
    <div
      data-slot="empty-state"
      data-size={large ? 'lg' : 'sm'}
      className={cn(
        'flex flex-col items-center justify-center px-4 text-center',
        large ? 'min-h-80 gap-5 py-12' : 'min-h-48 gap-3 py-8',
        className,
      )}
      {...props}
    >
      {image ? (
        <img src={image} alt={imageAlt} className="w-full max-w-60" />
      ) : (
        icon && (
          <span
            aria-hidden
            className={cn(
              'flex text-ink-tertiary',
              large ? '[&_svg]:size-12' : '[&_svg]:size-8',
            )}
          >
            {icon}
          </span>
        )
      )}
      <div className="flex max-w-sm flex-col items-center gap-1">
        <Title
          className={textVariants({ variant: large ? 'title-2' : 'headline' })}
        >
          {title}
        </Title>
        {description && (
          <p
            className={textVariants({
              variant: large ? 'body' : 'subhead',
              tone: 'secondary',
            })}
          >
            {description}
          </p>
        )}
        {children}
      </div>
      {action && (
        <div className="flex flex-col items-center gap-2 sm:flex-row">
          {action}
        </div>
      )}
    </div>
  );
}
