import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from 'lucide-react';
import type { ComponentProps } from 'react';
import { DayPicker } from 'react-day-picker';

import { focusRing } from '@/design-system/foundations/controls';
import { cn } from '@/design-system/lib/cn';

export type CalendarProps = ComponentProps<typeof DayPicker>;

const chevrons = {
  up: ChevronUp,
  down: ChevronDown,
  left: ChevronLeft,
  right: ChevronRight,
};

const navButtonClass = cn(
  'inline-flex size-control-md cursor-pointer items-center justify-center rounded-full text-accent hover:bg-fill aria-disabled:pointer-events-none aria-disabled:opacity-40 [&_svg]:size-4',
  focusRing,
);

/**
 * A month grid on react-day-picker. Days are round, today is in the accent
 * and the chosen day fills with it; a range fills softly between its ends.
 * Day cells follow the density.
 */
export function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  components,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('relative w-fit p-3 text-ink', className)}
      classNames={{
        months: 'flex flex-col gap-4 sm:flex-row',
        month: 'flex flex-col gap-2',
        month_caption: 'flex h-control-md items-center pe-24 ps-2',
        caption_label:
          'inline-flex items-center gap-1 text-headline [&_svg]:size-3.5 [&_svg]:text-ink-secondary',
        dropdowns: 'flex items-center gap-1',
        dropdown_root:
          'relative inline-flex h-control-sm items-center rounded-control px-1.5 hover:bg-fill has-focus-visible:outline-2 has-focus-visible:outline-focus',
        dropdown:
          'absolute inset-0 z-10 cursor-pointer appearance-none opacity-0',
        nav: 'absolute end-3 top-3 flex items-center gap-1',
        button_previous: navButtonClass,
        button_next: navButtonClass,
        month_grid: 'border-collapse',
        weekdays: 'flex',
        weekday:
          'flex h-6 w-control-md items-center justify-center text-caption font-medium text-ink-secondary',
        weeks: '',
        week: 'mt-0.5 flex',
        day: 'group/day relative p-0 text-center data-disabled:text-ink-tertiary data-outside:text-ink-tertiary data-today:font-semibold data-today:text-accent',
        day_button: cn(
          'inline-flex size-control-md cursor-pointer items-center justify-center rounded-full text-body tabular-nums transition-colors duration-(--duration-fast) hover:bg-fill disabled:pointer-events-none group-data-selected/day:bg-accent group-data-selected/day:font-semibold group-data-selected/day:text-accent-foreground',
          focusRing,
          'outline-offset-1',
        ),
        range_start: 'rounded-s-full bg-accent-soft',
        range_middle:
          'bg-accent-soft [&>button]:bg-transparent! [&>button]:font-normal! [&>button]:text-accent!',
        range_end: 'rounded-e-full bg-accent-soft',
        hidden: 'invisible',
        footer: 'pt-2 text-caption text-ink-secondary',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation = 'down', className }) => {
          const Icon = chevrons[orientation];
          return <Icon aria-hidden className={className} />;
        },
        ...components,
      }}
      {...props}
    />
  );
}
