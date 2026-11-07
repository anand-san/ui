import { ChevronDown } from 'lucide-react';
import * as React from 'react';

import {
  Badge,
  BadgeDot,
  type BadgeSize,
  type BadgeTone,
} from '@/design-system/components/Badge/Badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/design-system/components/DropdownMenu/DropdownMenu';
import { cn } from '@/design-system/lib/cn';

/**
 * StatusMenu: a status badge that opens a menu to change the status, like
 * the status of a task, an order or an application.
 *
 * Each option is a Badge `tone`, or the app's own colors through
 * `className` (a soft fill and a text color, e.g.
 * `bg-status-done/10 text-status-done`), for apps with more statuses than
 * tones. Without `onValueChange` it renders a plain badge.
 *
 * It is safe inside a clickable card or link: clicks on the badge and the
 * menu don't reach the parent, and closing the menu doesn't refocus it.
 */

export interface StatusOption<T extends string = string> {
  value: T;
  /** Defaults to `value` */
  label?: React.ReactNode;
  /** Defaults to `neutral` */
  tone?: BadgeTone;
  /** The app's own colors, instead of a tone: a soft fill and a text color */
  className?: string;
}

export interface StatusMenuProps<T extends string> extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'value' | 'defaultValue' | 'onChange'
> {
  value: T;
  options: readonly StatusOption<T>[];
  /** Called with the chosen value. Without it the badge is read-only. */
  onValueChange?: (value: T) => void;
  /** Heading of the menu and name in the trigger's label. Defaults to `Status` */
  label?: string;
  /** Defaults to `sm` */
  size?: BadgeSize;
  contentClassName?: string;
}

const optionColor = (option?: StatusOption) =>
  option?.className ? { className: option.className } : { tone: option?.tone };

const stop = (event: React.SyntheticEvent) => event.stopPropagation();

export function StatusMenu<T extends string>({
  value,
  options,
  onValueChange,
  label = 'Status',
  size = 'sm',
  className,
  contentClassName,
  disabled,
  ...props
}: StatusMenuProps<T>) {
  const current = options.find(option => option.value === value);
  const currentLabel = current?.label ?? value;
  const color = optionColor(current);

  if (!onValueChange) {
    return (
      <Badge
        size={size}
        tone={color.tone}
        className={cn(color.className, className)}
        dot
      >
        {currentLabel}
      </Badge>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <Badge
          size={size}
          tone={color.tone}
          className={cn(
            'cursor-pointer hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60 dark:hover:brightness-110',
            color.className,
            className,
          )}
          asChild
        >
          <button
            type="button"
            aria-label={`${label}: ${typeof currentLabel === 'string' ? currentLabel : value}. Change ${label.toLowerCase()}`}
            disabled={disabled}
            {...props}
            onClick={event => {
              // A badge inside a card link must not follow the link
              event.preventDefault();
              event.stopPropagation();
              props.onClick?.(event);
            }}
          >
            <BadgeDot />
            {currentLabel}
            <ChevronDown className="opacity-60" />
          </button>
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn('w-56', contentClassName)}
        // The menu is portaled, but React still bubbles its events to the parent
        onClick={stop}
        // Returning focus to the trigger would refocus a parent link
        onCloseAutoFocus={event => event.preventDefault()}
      >
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={next => onValueChange(next as T)}
        >
          {options.map(option => {
            const { tone, className: colorClass } = optionColor(option);
            return (
              <DropdownMenuRadioItem key={option.value} value={option.value}>
                <Badge
                  tone={tone}
                  // Only the text color is kept, for the dot
                  className={cn(
                    colorClass,
                    'bg-transparent p-0 dark:bg-transparent',
                  )}
                  asChild
                >
                  <span aria-hidden>
                    <BadgeDot className="size-2" />
                  </span>
                </Badge>
                {option.label ?? option.value}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
