import * as TabsPrimitive from '@radix-ui/react-tabs';
import { motion, MotionConfig } from 'motion/react';
import { type ComponentProps, createContext, use, useId } from 'react';

import { focusRing } from '@/design-system/foundations/controls';
import { springs } from '@/design-system/foundations/motion';
import { cn } from '@/design-system/lib/cn';
import { useControllableState } from '@/design-system/lib/useControllableState';

/**
 * Tabs as a segmented control: a few views of the same content, on a grey
 * track with a raised thumb that springs to the chosen segment. For more
 * than about five views, or for pages, use navigation instead. On a narrow
 * screen the track scrolls sideways.
 */

const TabsContext = createContext<{ value: string; thumbId: string } | null>(
  null,
);

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  ...props
}: ComponentProps<typeof TabsPrimitive.Root>) {
  const [current, setCurrent] = useControllableState({
    value,
    defaultValue: defaultValue ?? '',
    onChange: onValueChange,
  });
  const thumbId = useId();
  return (
    <TabsContext value={{ value: current, thumbId }}>
      <TabsPrimitive.Root
        value={current}
        onValueChange={setCurrent}
        {...props}
      />
    </TabsContext>
  );
}

export function TabsList({
  className,
  children,
  ...props
}: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'inline-flex h-control-md max-w-full items-stretch overflow-x-auto rounded-full bg-fill p-0.5 [scrollbar-width:none]',
        className,
      )}
      {...props}
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </TabsPrimitive.List>
  );
}

export function TabsTrigger({
  value,
  className,
  children,
  ...props
}: ComponentProps<typeof TabsPrimitive.Trigger>) {
  const tabs = use(TabsContext);
  const active = tabs?.value === value;
  return (
    <TabsPrimitive.Trigger
      value={value}
      data-slot="tabs-trigger"
      className={cn(
        'relative inline-flex min-w-0 flex-1 shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3.5 text-subhead font-medium text-ink-secondary transition-colors duration-(--duration-fast) hover:text-ink disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-ink [&_svg]:size-4 [&_svg]:shrink-0',
        focusRing,
        className,
      )}
      {...props}
    >
      {active && tabs && (
        <motion.span
          aria-hidden
          layoutId={tabs.thumbId}
          transition={springs.default}
          className="absolute inset-0 rounded-full bg-surface shadow-control dark:bg-fill-strong"
        />
      )}
      <span className="relative inline-flex items-center gap-1.5">
        {children}
      </span>
    </TabsPrimitive.Trigger>
  );
}

export function TabsContent({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('mt-4 rounded-card', focusRing, className)}
      {...props}
    />
  );
}
