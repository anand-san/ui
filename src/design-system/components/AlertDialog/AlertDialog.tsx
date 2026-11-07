import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as React from 'react';

import {
  Button,
  type ButtonVariant,
} from '@/design-system/components/Button/Button';
import { overlayClass } from '@/design-system/foundations/controls';
import { textVariants } from '@/design-system/foundations/typography';
import { cn } from '@/design-system/lib/cn';
import { useModalContentClass } from '@/design-system/lib/useModalContentClass';

/**
 * A dialog that asks the person to confirm something, usually a deletion.
 * It has no close button and does not close on outside click: the person
 * picks Cancel or the action.
 */

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;

export const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    className={cn(overlayClass, className)}
    {...props}
  />
));
AlertDialogOverlay.displayName = 'AlertDialogOverlay';

export const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => {
  const layoutClass = useModalContentClass();
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        ref={ref}
        data-slot="alert-dialog-content"
        className={cn(layoutClass, className)}
        {...props}
      />
    </AlertDialogPortal>
  );
});
AlertDialogContent.displayName = 'AlertDialogContent';

export function AlertDialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn('flex flex-col gap-1.5 text-left', className)}
      {...props}
    />
  );
}

export function AlertDialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  );
}

export const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn(textVariants({ variant: 'heading' }), className)}
    {...props}
  />
));
AlertDialogTitle.displayName = 'AlertDialogTitle';

export const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn(textVariants({ variant: 'body', tone: 'muted' }), className)}
    {...props}
  />
));
AlertDialogDescription.displayName = 'AlertDialogDescription';

type AlertDialogButtonProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Action
> & {
  variant?: ButtonVariant;
  loading?: boolean;
};

/** The confirming button. Use `variant="destructive"` for deletions. */
export const AlertDialogAction = React.forwardRef<
  HTMLButtonElement,
  AlertDialogButtonProps
>(({ variant = 'primary', loading, className, children, ...props }, ref) => (
  <AlertDialogPrimitive.Action asChild {...props}>
    <Button ref={ref} variant={variant} loading={loading} className={className}>
      {children}
    </Button>
  </AlertDialogPrimitive.Action>
));
AlertDialogAction.displayName = 'AlertDialogAction';

export const AlertDialogCancel = React.forwardRef<
  HTMLButtonElement,
  AlertDialogButtonProps
>(({ variant = 'outline', className, children, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel asChild {...props}>
    <Button ref={ref} variant={variant} className={className}>
      {children}
    </Button>
  </AlertDialogPrimitive.Cancel>
));
AlertDialogCancel.displayName = 'AlertDialogCancel';

export { AlertDialog, AlertDialogPortal, AlertDialogTrigger };
