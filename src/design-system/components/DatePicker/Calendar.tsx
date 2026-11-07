import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { controlVariants } from '@/design-system/foundations/controls';
import { cn } from '@/design-system/lib/cn';

const dayButtonClass =
  'inline-flex size-8 items-center justify-center rounded-md p-0 text-sm font-normal transition-colors hover:bg-primary/5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring aria-selected:opacity-100';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

/** A month grid with month and year dropdowns, built on react-day-picker */
export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  fromYear = 1900,
  toYear = new Date().getFullYear() + 10,
  ...props
}: CalendarProps & {
  fromYear?: number;
  toYear?: number;
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      captionLayout="dropdown"
      fromYear={fromYear}
      toYear={toYear}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center gap-1 py-1 relative items-center',
        caption_label: 'hidden',
        dropdown: 'p-0',
        dropdown_month: 'relative inline-flex',
        dropdown_year: 'relative inline-flex',
        dropdown_icon: 'hidden',
        nav: 'space-x-1 flex items-center px-2',
        nav_button:
          'inline-flex size-7 items-center justify-center rounded-md border border-input text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground',
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse mt-4',
        tbody: 'mt-1',
        head_row: 'flex',
        head_cell:
          'w-8 rounded-md py-px text-xs font-normal text-muted-foreground',
        row: 'flex w-full mt-2',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-primary/5 [&:has([aria-selected].day-outside)]:bg-primary/5 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md',
        ),
        day: dayButtonClass,
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-primary/10 font-medium',
        day_outside:
          'day-outside text-muted-foreground aria-selected:bg-primary/5 aria-selected:text-muted-foreground',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-primary/5 aria-selected:text-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn('size-4', className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn('size-4', className)} {...props} />
        ),
        CaptionLabel: () => null,
        Dropdown: ({ value, onChange, children, ...props }) => {
          return (
            <select
              value={value}
              onChange={onChange}
              className={cn(
                controlVariants({ size: 'md' }),
                'w-[120px] cursor-pointer px-2',
                props.name === 'months' && 'mr-2',
              )}
            >
              {children}
            </select>
          );
        },
      }}
      {...props}
    />
  );
}
