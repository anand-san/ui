import { focusRing } from '@/design-system/foundations/controls';
import { cn } from '@/design-system/lib/cn';

/**
 * A top-level item in the navigation bar: a link or a menu trigger. Hover
 * is a grey fill; the current page is the accent, so the two never look
 * alike. Radix sets `data-active` and `aria-current` on the active link.
 */
export const navigationMenuItemClass = cn(
  'group inline-flex h-control-md w-max cursor-pointer items-center justify-center gap-1.5 rounded-full px-3.5 text-subhead font-medium text-ink-secondary transition-colors duration-(--duration-fast) hover:bg-fill hover:text-ink disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-fill data-[state=open]:text-ink data-active:bg-accent-soft data-active:text-accent aria-[current=page]:bg-accent-soft aria-[current=page]:text-accent [&_svg]:size-4 [&_svg]:shrink-0',
  focusRing,
);

/** A link inside a navigation menu panel */
export const navigationMenuLinkClass = cn(
  'block select-none rounded-item p-3 transition-colors duration-(--duration-fast) hover:bg-fill data-active:bg-accent-soft',
  focusRing,
);
