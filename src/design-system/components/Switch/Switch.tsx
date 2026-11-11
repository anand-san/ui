import * as SwitchPrimitive from '@radix-ui/react-switch';
import type { ComponentProps } from 'react';

import { focusRing, touchTarget } from '@/design-system/foundations/controls';
import { cn } from '@/design-system/lib/cn';

/**
 * An on and off switch, sized from the body text so it grows with the
 * density. The thumb springs across. The off track is dark enough to see
 * against any surface, and the white thumb against it.
 */
export function Switch({
  className,
  ...props
}: ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'peer inline-flex h-[1.6em] w-[2.7em] shrink-0 cursor-pointer items-center rounded-full p-0.5 text-body transition-colors duration-(--duration-base) disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-accent data-[state=unchecked]:bg-control',
        focusRing,
        touchTarget,
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="pointer-events-none block aspect-square h-full rounded-full bg-white shadow-control transition-[translate] duration-(--duration-spring) ease-spring data-[state=checked]:translate-x-[1.1em] rtl:data-[state=checked]:-translate-x-[1.1em]" />
    </SwitchPrimitive.Root>
  );
}
