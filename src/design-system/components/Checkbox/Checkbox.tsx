import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import type { ComponentProps } from 'react';

import { focusRing, touchTarget } from '@/design-system/foundations/controls';
import { cn } from '@/design-system/lib/cn';

/**
 * A checkbox sized from the body text, so it grows with the density and
 * lines up with the label beside it. Pair it with a Label.
 */
export function Checkbox({
  className,
  ...props
}: ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer grid size-[1.2em] shrink-0 place-content-center rounded-xs border-[1.5px] border-control bg-surface text-body transition-colors duration-(--duration-fast) disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground data-[state=indeterminate]:border-accent data-[state=indeterminate]:bg-accent data-[state=indeterminate]:text-accent-foreground',
        focusRing,
        touchTarget,
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="group grid place-content-center text-current">
        <Check
          strokeWidth={3}
          className="size-[0.8em] group-data-[state=indeterminate]:hidden"
        />
        <Minus
          strokeWidth={3}
          className="hidden size-[0.8em] group-data-[state=indeterminate]:block"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
