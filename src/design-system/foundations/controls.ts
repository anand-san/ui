import { cva } from 'class-variance-authority';

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

/** Panel look shared by popovers, menus, select lists and tooltips */
export const floatingPanelClass =
  'z-50 rounded-xl border bg-popover text-popover-foreground shadow-lg outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2';

/** A row inside a menu or select list */
export const menuItemClass =
  'relative flex cursor-default select-none items-center gap-2 rounded-inset px-2 py-1.5 text-sm outline-hidden transition-colors focus:bg-primary/[0.07] data-[highlighted]:bg-primary/[0.07] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0';

/** Dimmed backdrop behind dialogs and sheets */
export const overlayClass =
  'fixed inset-0 z-50 bg-brand-950/50 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0';
