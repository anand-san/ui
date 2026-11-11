import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { AnimatePresence } from 'motion/react';
import type { ComponentProps } from 'react';

import {
  Button,
  type ButtonProps,
} from '@/design-system/components/Button/Button';
import { modalFooterClass } from '@/design-system/foundations/controls';
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
 * A dialog that asks the person to confirm something, like a deletion. It
 * is centred at every width, has no close button and ignores outside
 * clicks: the person picks Cancel or the action.
 */

export function AlertDialog({ children, ...props }: ModalRootProps) {
  const state = useModalRoot(props);
  return (
    <AlertDialogPrimitive.Root open={state.open} onOpenChange={state.setOpen}>
      <ModalStateContext value={state}>{children}</ModalStateContext>
    </AlertDialogPrimitive.Root>
  );
}

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

export function AlertDialogContent({
  className,
  children,
  ...props
}: Omit<
  ComponentProps<typeof AlertDialogPrimitive.Content>,
  'forceMount' | 'asChild'
>) {
  const { open, setOpen } = useModalState();
  return (
    <AnimatePresence>
      {open && (
        <AlertDialogPrimitive.Portal forceMount>
          <AlertDialogPrimitive.Overlay forceMount asChild>
            <ModalScrim />
          </AlertDialogPrimitive.Overlay>
          <AlertDialogPrimitive.Content forceMount asChild {...props}>
            <ModalSurface
              data-slot="alert-dialog-content"
              placement="center"
              onDismiss={() => setOpen(false)}
              className={cn('max-w-md', className)}
            >
              {children}
            </ModalSurface>
          </AlertDialogPrimitive.Content>
        </AlertDialogPrimitive.Portal>
      )}
    </AnimatePresence>
  );
}

export function AlertDialogHeader(props: ComponentProps<'div'>) {
  return <ModalHeader data-slot="alert-dialog-header" {...props} />;
}

export function AlertDialogFooter({
  className,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(modalFooterClass, className)}
      {...props}
    />
  );
}

export function AlertDialogTitle({
  className,
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      className={cn(textVariants({ variant: 'title-3' }), className)}
      {...props}
    />
  );
}

export function AlertDialogDescription({
  className,
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      className={cn(
        textVariants({ variant: 'body', tone: 'secondary' }),
        className,
      )}
      {...props}
    />
  );
}

type AlertDialogButtonProps = Omit<ButtonProps, 'asChild'>;

/** The confirming button. Use `tone="danger"` for deletions. */
export function AlertDialogAction({
  variant = 'filled',
  ...props
}: AlertDialogButtonProps) {
  return (
    <AlertDialogPrimitive.Action asChild>
      <Button variant={variant} {...props} />
    </AlertDialogPrimitive.Action>
  );
}

export function AlertDialogCancel({
  variant = 'tinted',
  tone = 'neutral',
  ...props
}: AlertDialogButtonProps) {
  return (
    <AlertDialogPrimitive.Cancel asChild>
      <Button variant={variant} tone={tone} {...props} />
    </AlertDialogPrimitive.Cancel>
  );
}

export { AlertDialogTrigger };
