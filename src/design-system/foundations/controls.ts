import { cva } from 'class-variance-authority';

/**
 * Shared looks for controls, so a field and a button on one row have the
 * same height, the same corners and the same focus ring.
 */

/** The focus ring for anything that is not a text field */
export const focusRing =
  'outline-offset-2 outline-focus focus-visible:outline-2';

/**
 * Grows the hit area of a small control to 44px on touch screens without
 * changing its size, so a 28px icon button is still easy to tap.
 */
export const touchTarget =
  'relative pointer-coarse:after:absolute pointer-coarse:after:left-1/2 pointer-coarse:after:top-1/2 pointer-coarse:after:size-full pointer-coarse:after:min-h-touch pointer-coarse:after:min-w-touch pointer-coarse:after:-translate-x-1/2 pointer-coarse:after:-translate-y-1/2';

/**
 * The press response: a pressed control sinks a little at once and springs
 * back when it is released. Reduced motion keeps the color change only.
 */
export const pressable =
  'transition-[scale] duration-(--duration-spring) ease-spring active:scale-[0.97] active:duration-(--duration-press) active:ease-out motion-reduce:active:scale-100';

/**
 * Text fields: Input, Textarea and the Select trigger. Text is never below
 * 16px on a touch screen, so iOS doesn't zoom into the field.
 */
export const controlVariants = cva(
  'flex w-full min-w-0 rounded-control border border-control bg-surface text-ink outline-focus transition-[border-color,outline-color] duration-(--duration-fast) ease-out focus-visible:border-focus focus-visible:outline-2 focus-visible:-outline-offset-1 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-danger aria-[invalid=true]:outline-danger',
  {
    variants: {
      size: {
        sm: 'h-control-sm px-2.5 text-subhead pointer-coarse:text-body',
        md: 'h-control-md px-3 text-body',
        lg: 'h-control-lg px-3.5 text-body',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export type ControlSize = 'sm' | 'md' | 'lg';

/**
 * Menus, popovers and select lists: a translucent panel that grows from the
 * control that opened it. The origin comes from Radix.
 */
export const floatingPanelClass =
  'z-50 origin-(--radix-popper-transform-origin) overflow-hidden rounded-panel border border-separator material p-panel text-ink shadow-floating outline-hidden data-[state=closed]:animate-pop-out data-[state=open]:animate-pop-in';

/**
 * A row in a menu or select list. The highlighted row fills with the accent,
 * as in a native menu; rows are 44px tall on a touch screen.
 */
export const menuItemClass =
  'relative flex min-h-control-sm cursor-default select-none items-center gap-2.5 rounded-item px-2.5 py-1 text-body outline-hidden pointer-coarse:min-h-touch data-disabled:pointer-events-none data-disabled:text-ink-tertiary data-highlighted:bg-accent data-highlighted:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-ink-secondary data-highlighted:[&_svg]:text-current';

/** A destructive row: red text, a red fill when highlighted */
export const menuItemDangerClass =
  'text-danger [&_svg]:text-current data-highlighted:bg-danger data-highlighted:text-danger-foreground';

export const menuLabelClass =
  'px-2.5 pb-1 pt-2 text-caption font-semibold text-ink-secondary';

export const menuSeparatorClass = '-mx-panel my-1 h-px bg-separator';

/** The dimmed layer behind a dialog or sheet */
export const scrimClass = 'fixed inset-0 z-50 bg-scrim';

export type ModalPlacement = 'center' | 'bottom' | 'left' | 'right';

export const modalSurfaceVariants = cva(
  'fixed z-50 flex flex-col bg-overlay text-ink shadow-modal outline-hidden dark:border dark:border-separator',
  {
    variants: {
      placement: {
        center:
          'left-1/2 top-1/2 max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-sheet',
        bottom:
          'inset-x-0 bottom-0 max-h-[calc(100dvh-max(1rem,env(safe-area-inset-top)))] rounded-t-sheet after:absolute after:inset-x-0 after:top-full after:h-24 after:bg-overlay',
        left: 'bottom-2 left-2 top-2 w-[min(24rem,calc(100vw-3rem))] rounded-sheet',
        right:
          'bottom-2 right-2 top-2 w-[min(24rem,calc(100vw-3rem))] rounded-sheet',
      },
    },
    defaultVariants: { placement: 'center' },
  },
);

/** The scrolling body of a dialog or sheet */
export const modalBodyVariants = cva(
  'flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain',
  {
    variants: {
      placement: {
        center: 'p-6',
        bottom:
          'px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-1 sm:px-6 sm:pb-[max(1.5rem,env(safe-area-inset-bottom))]',
        left: 'p-5',
        right: 'p-5',
      },
    },
    defaultVariants: { placement: 'center' },
  },
);

export const modalCloseClass =
  'absolute right-3 top-3 z-10 inline-flex size-8 items-center justify-center rounded-full bg-fill text-ink-secondary hover:bg-fill-hover hover:text-ink [&_svg]:size-4';

export const modalHeaderClass =
  'flex flex-col gap-1 text-left in-data-close:pr-10';

export const modalFooterClass =
  'mt-auto flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end';
