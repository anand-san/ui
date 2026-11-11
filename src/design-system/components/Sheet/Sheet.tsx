import * as SheetPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import type { ComponentProps } from 'react';

import {
  modalCloseClass,
  modalFooterClass,
} from '@/design-system/foundations/controls';
import { textVariants } from '@/design-system/foundations/typography';
import { cn } from '@/design-system/lib/cn';
import {
  ModalHeader,
  type ModalRootProps,
  ModalScrim,
  ModalStateContext,
  ModalSurface,
  useModalRoot,
  useModalState,
} from '@/design-system/lib/modal';

/**
 * A panel that slides in from an edge and leaves the way it came. A side
 * sheet floats just inside the screen edge, like an inspector; a bottom
 * sheet can be dragged down to close. Built on the Radix dialog.
 */

export function Sheet({ children, ...props }: ModalRootProps) {
  const state = useModalRoot(props);
  return (
    <SheetPrimitive.Root open={state.open} onOpenChange={state.setOpen}>
      <ModalStateContext value={state}>{children}</ModalStateContext>
    </SheetPrimitive.Root>
  );
}

const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;

export interface SheetContentProps extends Omit<
  ComponentProps<typeof SheetPrimitive.Content>,
  'forceMount' | 'asChild'
> {
  /** Defaults to `right` */
  side?: 'bottom' | 'left' | 'right';
  /** Show the close button in the corner. Defaults to `true`. */
  close?: boolean;
}

export function SheetContent({
  side = 'right',
  close = true,
  className,
  children,
  ...props
}: SheetContentProps) {
  const { open, setOpen } = useModalState();
  return (
    <AnimatePresence>
      {open && (
        <SheetPrimitive.Portal forceMount>
          <SheetPrimitive.Overlay forceMount asChild>
            <ModalScrim />
          </SheetPrimitive.Overlay>
          <SheetPrimitive.Content forceMount asChild {...props}>
            <ModalSurface
              data-slot="sheet-content"
              placement={side}
              onDismiss={() => setOpen(false)}
              className={className}
              close={
                close && (
                  <SheetPrimitive.Close
                    aria-label="Close"
                    className={modalCloseClass}
                  >
                    <X aria-hidden />
                  </SheetPrimitive.Close>
                )
              }
            >
              {children}
            </ModalSurface>
          </SheetPrimitive.Content>
        </SheetPrimitive.Portal>
      )}
    </AnimatePresence>
  );
}

export function SheetHeader(props: ComponentProps<'div'>) {
  return <ModalHeader data-slot="sheet-header" {...props} />;
}

export function SheetFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(modalFooterClass, className)}
      {...props}
    />
  );
}

export function SheetTitle({
  className,
  ...props
}: ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      className={cn(textVariants({ variant: 'title-3' }), className)}
      {...props}
    />
  );
}

export function SheetDescription({
  className,
  ...props
}: ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      className={cn(
        textVariants({ variant: 'subhead', tone: 'secondary' }),
        className,
      )}
      {...props}
    />
  );
}

export { SheetClose, SheetTrigger };
