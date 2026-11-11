import * as TabsPrimitive from '@radix-ui/react-tabs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/design-system/components/Button/Button';
import { focusRing } from '@/design-system/foundations/controls';
import { cn } from '@/design-system/lib/cn';

/**
 * Tabs as a pill segmented control on the child card tint. When the tabs
 * don't fit, the list scrolls sideways and shows arrow buttons.
 */

const Tabs = TabsPrimitive.Root;

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, children, ...props }, forwardedRef) => {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [overflow, setOverflow] = React.useState({
    left: false,
    right: false,
  });

  const update = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setOverflow({
      left: max > 1 && el.scrollLeft > 1,
      right: max > 1 && el.scrollLeft < max - 1,
    });
  }, []);

  React.useEffect(() => {
    update();
    const el = scrollRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [update]);

  const setRefs = (node: HTMLDivElement | null) => {
    scrollRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  const scrollBy = (amount: number) =>
    scrollRef.current?.scrollBy({ left: amount, behavior: 'smooth' });

  return (
    <TabsPrimitive.List
      ref={setRefs}
      onScroll={update}
      data-slot="tabs-list"
      className={cn(
        'no-scrollbar relative inline-flex h-10 max-w-full items-center gap-1 overflow-x-auto rounded-full bg-primary/5 p-1 text-muted-foreground',
        className,
      )}
      {...props}
    >
      {overflow.left && (
        <Button
          variant="outline"
          size="icon-sm"
          shape="pill"
          aria-label="Scroll tabs left"
          onClick={() => scrollBy(-200)}
          className="sticky left-0 z-10 size-7 shrink-0 pointer-coarse:after:hidden"
        >
          <ChevronLeft />
        </Button>
      )}
      {children}
      {overflow.right && (
        <Button
          variant="outline"
          size="icon-sm"
          shape="pill"
          aria-label="Scroll tabs right"
          onClick={() => scrollBy(200)}
          className="sticky right-0 z-10 size-7 shrink-0 pointer-coarse:after:hidden"
        >
          <ChevronRight />
        </Button>
      )}
    </TabsPrimitive.List>
  );
});
TabsList.displayName = 'TabsList';

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    data-slot="tabs-trigger"
    className={cn(
      'inline-flex h-full shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-xs [&_svg]:size-4 [&_svg]:shrink-0',
      focusRing,
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = 'TabsTrigger';

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    data-slot="tabs-content"
    className={cn('mt-4 data-[state=inactive]:hidden', focusRing, className)}
    {...props}
  />
));
TabsContent.displayName = 'TabsContent';

export { Tabs };
