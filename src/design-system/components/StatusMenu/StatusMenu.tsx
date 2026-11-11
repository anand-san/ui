import { ChevronDown } from 'lucide-react';
import type {
  ComponentProps,
  HTMLAttributes,
  ReactNode,
  SyntheticEvent,
} from 'react';

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
import { focusRing, touchTarget } from '@/design-system/foundations/controls';
import { cn } from '@/design-system/lib/cn';

/**
 * StatusMenu: a status badge that opens a menu to change the status, like
 * the status of a task, an order or an application.
 *
 * Each option is a Badge `tone`, or the app's own colors through
 * `className` (a soft fill and a text color, like
 * `bg-status-done/15 text-status-done`), for apps with more statuses than
 * tones. Without `onValueChange` it renders a plain badge.
 *
 * It is safe inside a clickable card or link: clicks on the badge and the
 * menu don't reach the parent, and closing the menu doesn't refocus it.
 */

export interface StatusOption<T extends string = string> {
  value: T;
  /** Defaults to `value` */
  label?: ReactNode;
  /** Defaults to `neutral` */
  tone?: BadgeTone;
  /** The app's own colors, instead of a tone: a soft fill and a text color */
  className?: string;
}

export interface StatusMenuProps<T extends string> extends Omit<
  ComponentProps<'button'>,
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

/** The text color of each tone, for the dots in the menu */
const toneDot: Record<BadgeTone, string> = {
  neutral: 'text-ink-secondary',
  accent: 'text-accent',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
  info: 'text-info',
  highlight: 'text-highlight',
};

const stop = (event: SyntheticEvent) => event.stopPropagation();

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
        {...(props as HTMLAttributes<HTMLSpanElement>)}
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
            'cursor-pointer hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:brightness-110',
            focusRing,
            touchTarget,
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
            <ChevronDown aria-hidden className="opacity-70" />
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
          onValueChange={next => next !== value && onValueChange(next as T)}
        >
          {options.map(option => {
            const { tone, className: colorClass } = optionColor(option);
            return (
              <DropdownMenuRadioItem key={option.value} value={option.value}>
                <span
                  aria-hidden
                  className={cn(
                    toneDot[tone ?? 'neutral'],
                    colorClass,
                    'flex bg-transparent',
                  )}
                >
                  <BadgeDot className="size-2" />
                </span>
                {option.label ?? option.value}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
