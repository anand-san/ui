import * as DialogPrimitive from '@radix-ui/react-dialog';
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
  useModalPlacement,
  useModalRoot,
  useModalState,
} from '@/design-system/lib/modal';

/**
 * Dialog, on Radix for focus, Escape and outside clicks. From 768px it is a
 * centred panel that grows in; on phones it is a bottom sheet that slides
 * up and can be dragged down to close. It is 512px wide; widen it with
 * `className`.
 */

export interface DialogProps extends ModalRootProps {
  /** Set false to let people use the page behind it. Defaults to true. */
  modal?: boolean;
}

export function Dialog({ modal, children, ...props }: DialogProps) {
  const state = useModalRoot(props);
  return (
    <DialogPrimitive.Root
      open={state.open}
      onOpenChange={state.setOpen}
      modal={modal}
    >
      <ModalStateContext value={state}>{children}</ModalStateContext>
    </DialogPrimitive.Root>
  );
}

const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;

export interface DialogContentProps extends Omit<
  ComponentProps<typeof DialogPrimitive.Content>,
  'forceMount' | 'asChild'
> {
  /** Show the close button in the corner. Defaults to `true`; turn it off when the footer has one. */
  close?: boolean;
}

export function DialogContent({
  close = true,
  className,
  children,
  ...props
}: DialogContentProps) {
  const { open, setOpen } = useModalState();
  const placement = useModalPlacement();
  return (
    <AnimatePresence>
      {open && (
        <DialogPrimitive.Portal forceMount>
          <DialogPrimitive.Overlay forceMount asChild>
            <ModalScrim />
          </DialogPrimitive.Overlay>
          <DialogPrimitive.Content forceMount asChild {...props}>
            <ModalSurface
              data-slot="dialog-content"
              placement={placement}
              onDismiss={() => setOpen(false)}
              className={className}
              close={
                close && (
                  <DialogPrimitive.Close
                    aria-label="Close"
                    className={modalCloseClass}
                  >
                    <X aria-hidden />
                  </DialogPrimitive.Close>
                )
              }
            >
              {children}
            </ModalSurface>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      )}
    </AnimatePresence>
  );
}

export function DialogHeader(props: ComponentProps<'div'>) {
  return <ModalHeader data-slot="dialog-header" {...props} />;
}

export function DialogFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(modalFooterClass, className)}
      {...props}
    />
  );
}

export function DialogTitle({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn(textVariants({ variant: 'title-2' }), className)}
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn(
        textVariants({ variant: 'body', tone: 'secondary' }),
        className,
      )}
      {...props}
    />
  );
}

export { DialogClose, DialogTrigger };
