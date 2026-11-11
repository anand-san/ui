import * as PopoverPrimitive from '@radix-ui/react-popover';
import type { ComponentProps } from 'react';

import { floatingPanelClass } from '@/design-system/foundations/controls';
import { cn } from '@/design-system/lib/cn';

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;
const PopoverClose = PopoverPrimitive.Close;

/**
 * A translucent panel that grows from its trigger. 288px wide with 16px
 * padding unless `className` says otherwise.
 */
export function PopoverContent({
  className,
  align = 'center',
  sideOffset = 6,
  collisionPadding = 8,
  ...props
}: ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        data-slot="popover-content"
        className={cn(floatingPanelClass, 'w-72 p-4', className)}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

export { Popover, PopoverAnchor, PopoverClose, PopoverTrigger };
