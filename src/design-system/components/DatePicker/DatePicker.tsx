import { CalendarDays } from 'lucide-react';
import { type ComponentProps, useState } from 'react';

import { Field } from '@/design-system/components/Field/Field';
import { useFieldControl } from '@/design-system/components/Field/fieldContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/design-system/components/Popover/Popover';
import { controlVariants } from '@/design-system/foundations/controls';
import { cn } from '@/design-system/lib/cn';

import { Calendar } from './Calendar';

export interface DatePickerProps {
  /** An ISO string at midnight UTC, like `2026-11-11T00:00:00.000Z` */
  value?: string;
  onChange?: (date: string | undefined) => void;
  label?: string;
  hint?: string;
  /** Adds an asterisk to the label and marks the field required */
  required?: boolean;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  /**
   * `dropdown` adds month and year menus, for dates far from today like a
   * birthday. Defaults to `label`.
   */
  captionLayout?: 'label' | 'dropdown';
  className?: string;
}

const dateFormat = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' });

function fromIso(value: string) {
  const date = new Date(value);
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

function toIso(date: Date) {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  ).toISOString();
}

/**
 * A date field that opens a calendar and closes when a day is picked.
 * Values are ISO strings at midnight UTC, so a date doesn't shift between
 * time zones.
 */
export function DatePicker({
  value,
  onChange,
  label,
  hint,
  required,
  placeholder = 'Pick a date',
  error,
  disabled,
  minDate,
  maxDate,
  captionLayout = 'label',
  className,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const selected = value ? fromIso(value) : undefined;

  const picker = (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <DatePickerTrigger
          disabled={disabled}
          className={cn(
            !selected && 'text-ink-secondary',
            !label && !error && !hint && className,
          )}
        >
          {selected ? dateFormat.format(selected) : placeholder}
        </DatePickerTrigger>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          autoFocus
          selected={selected}
          defaultMonth={selected}
          captionLayout={captionLayout}
          startMonth={minDate}
          endMonth={maxDate}
          disabled={[
            ...(minDate ? [{ before: minDate }] : []),
            ...(maxDate ? [{ after: maxDate }] : []),
          ]}
          onSelect={date => {
            onChange?.(date ? toIso(date) : undefined);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );

  // With a label, hint or error the picker is its own Field; without, it can
  // sit inside one
  if (!label && !error && !hint) return picker;
  return (
    <Field
      label={label}
      hint={hint}
      required={required}
      error={error}
      className={className}
    >
      {picker}
    </Field>
  );
}

function DatePickerTrigger({
  className,
  children,
  ...props
}: ComponentProps<'button'>) {
  const field = useFieldControl({});
  return (
    <button
      type="button"
      id={field.id}
      aria-describedby={field['aria-describedby']}
      aria-invalid={field['aria-invalid']}
      aria-required={field['aria-required']}
      className={cn(
        controlVariants({ size: field.size }),
        'cursor-pointer items-center gap-2 text-left [&_svg]:size-4 [&_svg]:shrink-0',
        className,
      )}
      {...props}
    >
      <CalendarDays aria-hidden className="text-ink-secondary" />
      <span className="truncate">{children}</span>
    </button>
  );
}
