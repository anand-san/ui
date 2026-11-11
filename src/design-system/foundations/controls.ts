import { cva } from 'class-variance-authority';

import { spacing } from '@/design-system/foundations/spacing';
import { cn } from '@/design-system/lib/cn';

/**
 * Shared look for text controls (Input, Textarea, Select trigger), so a field
 * and a button on the same row have the same height and the same focus ring.
 * Heights follow Button: sm 32px, md 36px, lg 40px.
 */
export const controlVariants = cva(
  'flex w-full min-w-0 rounded-md border border-input bg-card text-foreground transition-[color,border-color,box-shadow] placeholder:text-muted-foreground/70 hover:border-ring/50 focus-visible:border-ring focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive/60 aria-[invalid=true]:focus-visible:border-destructive aria-[invalid=true]:focus-visible:ring-destructive/15',
  {
    variants: {
      size: {
        sm: 'h-8 px-2.5 text-xs',
        md: 'h-9 px-3 text-sm',
        lg: 'h-10 px-3 text-sm',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export type ControlSize = 'sm' | 'md' | 'lg';

export const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring';

export const touchTarget =
  'relative pointer-coarse:after:absolute pointer-coarse:after:left-1/2 pointer-coarse:after:top-1/2 pointer-coarse:after:size-touch pointer-coarse:after:-translate-x-1/2 pointer-coarse:after:-translate-y-1/2';

/** Panel look shared by popovers, menus, select lists and tooltips */
export const floatingPanelClass =
  'z-50 rounded-xl border bg-popover text-popover-foreground shadow-lg outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2';

/** A row inside a menu or select list */
export const menuItemClass =
  'relative flex cursor-default select-none items-center gap-2 rounded-inset px-2 py-1.5 text-sm outline-hidden transition-colors focus:bg-primary/[0.07] data-[highlighted]:bg-primary/[0.07] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0';

/** Dimmed backdrop behind dialogs and sheets */
export const overlayClass =
  'fixed inset-0 z-50 bg-brand-950/50 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0';

export type ModalPlacement = 'center' | 'bottom' | 'top' | 'left' | 'right';

export const modalSurfaceVariants = cva(
  'fixed z-50 flex flex-col gap-4 overflow-y-auto bg-popover text-popover-foreground outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out',
  {
    variants: {
      placement: {
        center:
          'left-1/2 top-1/2 max-h-[calc(100dvh-2rem)] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border p-6 shadow-xl duration-200 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        bottom:
          'inset-x-0 bottom-0 max-h-[90dvh] rounded-t-2xl border-t px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 shadow-lg duration-300 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom md:px-6 md:pb-[max(1.5rem,env(safe-area-inset-bottom))] md:pt-6',
        top: 'inset-x-0 top-0 max-h-[90dvh] rounded-b-2xl border-b px-6 pb-6 pt-[max(1.5rem,env(safe-area-inset-top))] shadow-lg duration-300 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r pb-[max(1.5rem,env(safe-area-inset-bottom))] pl-[max(1.5rem,env(safe-area-inset-left))] pr-6 pt-[max(1.5rem,env(safe-area-inset-top))] shadow-lg duration-300 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right:
          'inset-y-0 right-0 h-full w-3/4 border-l pb-[max(1.5rem,env(safe-area-inset-bottom))] pl-6 pr-[max(1.5rem,env(safe-area-inset-right))] pt-[max(1.5rem,env(safe-area-inset-top))] shadow-lg duration-300 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
    },
    defaultVariants: { placement: 'center' },
  },
);

export const modalCloseVariants = cva(
  [
    touchTarget,
    'absolute inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground disabled:pointer-events-none',
    focusRing,
  ],
  {
    variants: {
      placement: {
        center: 'right-4 top-5.5',
        bottom: 'right-2 top-3.5 md:right-4 md:top-5.5',
        top: 'right-4 top-[calc(max(1.5rem,env(safe-area-inset-top))-2px)]',
        left: 'right-4 top-[calc(max(1.5rem,env(safe-area-inset-top))-2px)]',
        right:
          'right-[calc(max(1.5rem,env(safe-area-inset-right))-0.5rem)] top-[calc(max(1.5rem,env(safe-area-inset-top))-2px)]',
      },
    },
    defaultVariants: { placement: 'center' },
  },
);

export const modalHeaderClass = cn(
  'flex flex-col text-left in-data-close:pr-8',
  spacing.stack,
);

export const modalFooterClass =
  'mt-auto flex flex-col-reverse gap-2 sm:flex-row sm:justify-end';
