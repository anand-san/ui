import type { CSSProperties } from 'react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

/**
 * The toast container, on the token roles so toasts follow the theme and
 * the mode. Call `toast()`, `toast.success()` and so on from `sonner`.
 */
export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--overlay)',
          '--normal-text': 'var(--ink)',
          '--normal-border': 'var(--separator)',
          '--border-radius': 'var(--radius-panel)',
        } as CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: 'font-sans! shadow-floating! text-subhead!',
          title: 'font-semibold!',
          description: 'text-ink-secondary!',
          actionButton:
            'rounded-full! bg-accent! font-medium! text-accent-foreground!',
          cancelButton: 'rounded-full! bg-fill! font-medium! text-ink!',
          success: '[&_[data-icon]]:text-success',
          error: '[&_[data-icon]]:text-danger',
          warning: '[&_[data-icon]]:text-warning',
          info: '[&_[data-icon]]:text-info',
        },
      }}
      {...props}
    />
  );
}
