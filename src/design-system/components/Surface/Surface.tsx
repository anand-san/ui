import { Slot } from '@radix-ui/react-slot';
import type { ComponentProps } from 'react';

import { cn } from '@/design-system/lib/cn';

/**
 * A region with its own background: the canvas a page sits on, a white
 * surface, an inset well, or the accent. Inside an `accent` surface every
 * role turns to white, so text, buttons and fields stay legible without
 * special variants.
 */

export type SurfaceTone = 'canvas' | 'surface' | 'inset' | 'accent';

const tones: Record<SurfaceTone, string> = {
  canvas: 'bg-canvas text-ink',
  surface: 'bg-surface text-ink',
  inset: 'bg-surface-inset text-ink',
  accent: 'surface-accent',
};

export interface SurfaceProps extends ComponentProps<'div'> {
  /** Defaults to `surface` */
  tone?: SurfaceTone;
  /** Merge onto the only child, like a `<section>` */
  asChild?: boolean;
}

export function Surface({
  tone = 'surface',
  asChild = false,
  className,
  ...props
}: SurfaceProps) {
  const Component = asChild ? Slot : 'div';
  return (
    <Component
      data-slot="surface"
      data-tone={tone}
      className={cn(tones[tone], className)}
      {...props}
    />
  );
}
