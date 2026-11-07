import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/design-system/components/Button/Button';
import { Field } from '@/design-system/components/Field/Field';
import { useFieldControl } from '@/design-system/components/Field/fieldContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/design-system/components/Popover/Popover';
import { cn } from '@/design-system/lib/cn';

import { Calendar } from './Calendar';

export interface DatePickerProps {
  value?: string;
  onChange?: (date: string | undefined) => void;
  label?: string;
  /** Adds an asterisk to the label and marks the field required */
  required?: boolean;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  maxDate?: Date;
  minDate?: Date;
  fromYear?: number;
  toYear?: number;
  className?: string;
}

/** A date field that opens a calendar. Values are ISO strings at midnight UTC. */
export function DatePicker({
  value,
  onChange,
  label,
  required,
  placeholder = 'Pick a date',
  error,
  disabled,
  maxDate,
  minDate,
  fromYear,
  toYear,
  className,
}: DatePickerProps) {
  const handleSelect = (date: Date | undefined) => {
    if (!date) {
      onChange?.(undefined);
      return;
    }
    // Set the time to midnight UTC to avoid timezone issues
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    );
    onChange?.(utcDate.toISOString());
  };

  const displayDate = value
    ? (() => {
        const utcDate = new Date(value);
        return new Date(
          utcDate.getUTCFullYear(),
          utcDate.getUTCMonth(),
          utcDate.getUTCDate(),
        );
      })()
    : undefined;
  const defaultMonth = displayDate || new Date();

  const picker = (
    <Popover>
      <PopoverTrigger asChild>
        <DatePickerTrigger
          disabled={disabled}
          className={cn(
            !displayDate && 'text-muted-foreground',
            !label && !error && className,
          )}
        >
          {displayDate ? format(displayDate, 'PPP') : placeholder}
        </DatePickerTrigger>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={displayDate}
          defaultMonth={defaultMonth}
          onSelect={handleSelect}
          disabled={date => {
            if (maxDate && date > maxDate) return true;
            if (minDate && date < minDate) return true;
            return false;
          }}
          fromYear={fromYear}
          toYear={toYear}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );

  // With a label or an error the picker is its own Field; without, it can sit
  // inside one
  if (!label && !error) return picker;
  return (
    <Field
      label={label}
      required={required}
      error={error}
      className={className}
    >
      {picker}
    </Field>
  );
}

const DatePickerTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const field = useFieldControl({});
  return (
    <Button
      ref={ref}
      variant="outline"
      // Squared off like the text inputs it sits beside in forms
      shape="rounded"
      id={field.id}
      aria-describedby={field['aria-describedby']}
      aria-invalid={field['aria-invalid']}
      aria-required={field['aria-required']}
      className={cn(
        'w-full justify-start px-3 text-left font-normal aria-[invalid=true]:border-destructive/60',
        field.size === 'sm' && 'h-8 px-2.5 text-xs',
        className,
      )}
      {...props}
    >
      <CalendarIcon className="text-muted-foreground" />
      {children}
    </Button>
  );
});
DatePickerTrigger.displayName = 'DatePickerTrigger';
