import { Slot, Slottable } from '@radix-ui/react-slot';
import { ChevronRight } from 'lucide-react';
import { type ComponentProps, type ReactNode, useId } from 'react';

import { focusRing } from '@/design-system/foundations/controls';
import { textVariants } from '@/design-system/foundations/typography';
import { cn } from '@/design-system/lib/cn';

/**
 * Grouped list rows, as in a settings screen: rows in a rounded group on the
 * canvas, divided by separators that start where the text starts. Rows are
 * at least the row height of the density, 44px on a desk.
 *
 *   <ListSection title="Account" footer="Used to sign in.">
 *     <List>
 *       <ListItem title="Email" trailing="ada@example.com" />
 *       <ListItem title="Password" chevron asChild><a href="/password" /></ListItem>
 *     </List>
 *   </ListSection>
 */

export interface ListSectionProps extends Omit<
  ComponentProps<'section'>,
  'title'
> {
  /** A short heading above the group */
  title?: ReactNode;
  /** Heading level of the title. Defaults to h2, a section of the page. */
  titleAs?: 'h2' | 'h3' | 'h4';
  /** A note under the group, like what a setting does */
  footer?: ReactNode;
}

export function ListSection({
  title,
  titleAs: Heading = 'h2',
  footer,
  className,
  children,
  ...props
}: ListSectionProps) {
  const titleId = useId();
  return (
    <section
      data-slot="list-section"
      aria-labelledby={title ? titleId : undefined}
      className={cn('flex flex-col gap-1.5', className)}
      {...props}
    >
      {title && (
        <Heading
          id={titleId}
          className={cn(
            textVariants({ variant: 'subhead', tone: 'secondary' }),
            'px-inset font-medium',
          )}
        >
          {title}
        </Heading>
      )}
      {children}
      {footer && (
        <p className={cn(textVariants({ variant: 'caption' }), 'px-inset')}>
          {footer}
        </p>
      )}
    </section>
  );
}

export function List({ className, ...props }: ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="list"
      role="list"
      className={cn(
        'flex flex-col overflow-hidden rounded-card bg-surface',
        className,
      )}
      {...props}
    />
  );
}

export interface ListItemProps extends Omit<ComponentProps<'li'>, 'title'> {
  title?: ReactNode;
  /** A second line under the title */
  description?: ReactNode;
  /** An icon or avatar before the text; the separator starts after it */
  leading?: ReactNode;
  /** A value, badge or control at the end of the row */
  trailing?: ReactNode;
  /** A chevron at the end, for a row that opens another screen */
  chevron?: boolean;
  /**
   * Make the row its only child, like `<a href>` or `<button>`: the whole
   * row is then the link, with a pressed state. The child's own children are
   * ignored; use `title`.
   */
  asChild?: boolean;
}

export function ListItem({
  title,
  description,
  leading,
  trailing,
  chevron = false,
  asChild = false,
  className,
  children,
  ...props
}: ListItemProps) {
  const Row = asChild ? Slot : 'div';
  return (
    <li data-slot="list-item" className="group/item" {...props}>
      <Row
        className={cn(
          'flex min-h-row w-full items-stretch gap-3 pl-inset text-left text-body text-ink',
          asChild && [
            'cursor-pointer transition-colors duration-(--duration-fast) hover:bg-fill active:bg-fill-hover',
            focusRing,
            '-outline-offset-2',
          ],
          className,
        )}
      >
        {leading && (
          <span
            data-slot="list-item-leading"
            className="flex shrink-0 items-center text-ink-secondary [&_svg]:size-5"
          >
            {leading}
          </span>
        )}
        <span
          data-slot="list-item-content"
          className="flex min-w-0 flex-1 items-center gap-3 border-separator py-2 pr-inset group-not-first/item:border-t"
        >
          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            {title && <span className="min-w-0">{title}</span>}
            {description && (
              <span
                className={textVariants({
                  variant: 'subhead',
                  tone: 'secondary',
                })}
              >
                {description}
              </span>
            )}
            {!asChild && children}
          </span>
          {(trailing || chevron) && (
            <span className="flex shrink-0 items-center gap-2 text-ink-secondary">
              {trailing}
              {chevron && (
                <ChevronRight
                  aria-hidden
                  className="size-4 text-ink-tertiary"
                />
              )}
            </span>
          )}
        </span>
        {asChild && <Slottable>{children}</Slottable>}
      </Row>
    </li>
  );
}
