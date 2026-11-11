import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';
import type { ComponentProps } from 'react';

import { useFieldControl } from '@/design-system/components/Field/fieldContext';
import {
  type ControlSize,
  controlVariants,
  floatingPanelClass,
  menuItemClass,
  menuLabelClass,
  menuSeparatorClass,
} from '@/design-system/foundations/controls';
import { cn } from '@/design-system/lib/cn';

/**
 * A pop-up button, as on the desktop: the list opens over the trigger with
 * the chosen item where the trigger's text was, and a check marks it. Pass
 * `position="popper"` to SelectContent to drop the list below instead.
 */

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

export interface SelectTriggerProps extends ComponentProps<
  typeof SelectPrimitive.Trigger
> {
  /** Same heights as Input. Defaults to `md`, or the size of its Field. */
  size?: ControlSize;
}

export function SelectTrigger({
  size,
  id,
  'aria-describedby': describedBy,
  'aria-invalid': invalid,
  className,
  children,
  ...props
}: SelectTriggerProps) {
  const field = useFieldControl({
    id,
    size,
    'aria-describedby': describedBy,
    'aria-invalid': invalid,
  });
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      translate="no"
      id={field.id}
      aria-describedby={field['aria-describedby']}
      aria-invalid={field['aria-invalid']}
      aria-required={field['aria-required']}
      className={cn(
        controlVariants({ size: field.size }),
        'cursor-pointer items-center justify-between gap-2 whitespace-nowrap pr-2 text-left data-placeholder:text-ink-secondary [&>span]:line-clamp-1',
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronsUpDown className="size-4 shrink-0 text-ink-secondary" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({
  className,
  children,
  position = 'item-aligned',
  ...props
}: ComponentProps<typeof SelectPrimitive.Content>) {
  const popper = position === 'popper';
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        translate="no"
        position={position}
        sideOffset={popper ? 6 : undefined}
        collisionPadding={8}
        data-slot="select-content"
        className={cn(
          floatingPanelClass,
          'relative max-h-(--radix-select-content-available-height) min-w-32 p-0',
          className,
        )}
        {...props}
      >
        <SelectPrimitive.ScrollUpButton className="flex h-6 cursor-default items-center justify-center text-ink-secondary">
          <ChevronUp className="size-4" />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport
          className={cn(
            'p-panel',
            popper &&
              'h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width)',
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex h-6 cursor-default items-center justify-center text-ink-secondary">
          <ChevronDown className="size-4" />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export function SelectLabel({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      className={cn(menuLabelClass, 'pl-8', className)}
      {...props}
    />
  );
}

export function SelectItem({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      translate="no"
      className={cn(menuItemClass, 'w-full pl-8', className)}
      {...props}
    >
      <span className="absolute left-2.5 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check strokeWidth={2.5} className="text-current!" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export function SelectSeparator({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      className={cn(menuSeparatorClass, className)}
      {...props}
    />
  );
}

export { Select, SelectGroup, SelectValue };
