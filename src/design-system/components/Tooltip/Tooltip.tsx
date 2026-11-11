import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import type { ComponentProps } from 'react';

import { cn } from '@/design-system/lib/cn';

/**
 * A short label for a control that has no visible one, like an icon button.
 * It fades in without moving. Put one TooltipProvider near the app root.
 */

const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

function TooltipProvider({
  delayDuration = 500,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />;
}

export function TooltipContent({
  className,
  sideOffset = 6,
  collisionPadding = 8,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        data-slot="tooltip-content"
        className={cn(
          'z-50 max-w-64 animate-fade-in rounded-control border border-separator material px-2 py-1 text-caption text-ink shadow-floating data-[state=closed]:animate-fade-out',
          className,
        )}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipProvider, TooltipTrigger };
