import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ChevronDown } from 'lucide-react';
import type { ComponentProps } from 'react';

import { cn } from '@/design-system/lib/cn';

import { navigationMenuItemClass } from './navigationMenuStyles';

/**
 * The navigation bar of a desktop app or site, on Radix for keyboard
 * navigation. Menus open in one translucent panel that resizes between
 * them. Mark the current page with `active` on its NavigationMenuLink.
 */
export function NavigationMenu({
  className,
  children,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Root>) {
  return (
    <NavigationMenuPrimitive.Root
      className={cn(
        'relative z-10 flex max-w-max flex-1 items-center justify-center',
        className,
      )}
      {...props}
    >
      {children}
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  );
}

export function NavigationMenuList({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      className={cn(
        'flex flex-1 list-none items-center justify-center gap-0.5',
        className,
      )}
      {...props}
    />
  );
}

const NavigationMenuItem = NavigationMenuPrimitive.Item;

export function NavigationMenuTrigger({
  className,
  children,
  clickOnly,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Trigger> & {
  /** Open on click only, not on hover */
  clickOnly?: boolean;
}) {
  return (
    <NavigationMenuPrimitive.Trigger
      className={cn(navigationMenuItemClass, className)}
      {...props}
      onPointerEnter={
        clickOnly ? e => e.preventDefault() : props.onPointerEnter
      }
      onPointerMove={clickOnly ? e => e.preventDefault() : props.onPointerMove}
      onPointerLeave={
        clickOnly ? e => e.preventDefault() : props.onPointerLeave
      }
    >
      {children}
      <ChevronDown
        aria-hidden
        className="size-3! transition-transform duration-(--duration-spring) ease-spring group-data-[state=open]:rotate-180"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

export function NavigationMenuContent({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      className={cn(
        'left-0 top-0 w-full p-panel data-[motion^=from-]:animate-fade-in data-[motion^=to-]:animate-fade-out md:absolute md:w-auto',
        className,
      )}
      {...props}
    />
  );
}

/** A link in the bar or in a panel. `active` marks the current page. */
const NavigationMenuLink = NavigationMenuPrimitive.Link;

export function NavigationMenuViewport({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div className="absolute left-0 top-full flex justify-center">
      <NavigationMenuPrimitive.Viewport
        className={cn(
          'relative mt-1.5 h-(--radix-navigation-menu-viewport-height) w-full origin-top overflow-hidden rounded-panel border border-separator material text-ink shadow-floating transition-[width,height] duration-(--duration-spring) ease-spring data-[state=closed]:animate-pop-out data-[state=open]:animate-pop-in md:w-(--radix-navigation-menu-viewport-width)',
          className,
        )}
        {...props}
      />
    </div>
  );
}

export { NavigationMenuItem, NavigationMenuLink };
