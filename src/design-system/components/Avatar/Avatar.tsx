import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/design-system/lib/cn';

import { getInitials } from './initials';

/**
 * Avatar for a person or company. Shows `src` when it loads and falls back
 * to initials from `name` when there is no image or it fails.
 */

export type AvatarTone =
  | 'neutral'
  | 'brand'
  | 'success'
  | 'warning'
  | 'info'
  | 'destructive';
export type AvatarSize = 'sm' | 'md' | 'lg';

const avatarVariants = cva(
  'relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full font-medium',
  {
    variants: {
      tone: {
        neutral: 'bg-primary/10 text-primary',
        brand: 'bg-brand/10 text-brand',
        success: 'bg-success/10 text-success',
        warning: 'bg-warning/10 text-warning',
        info: 'bg-info/10 text-info',
        destructive: 'bg-destructive/10 text-destructive',
      },
      size: {
        sm: 'size-6 text-xs',
        md: 'size-8 text-xs',
        lg: 'size-10 text-sm',
      },
    },
  },
);

export interface AvatarProps extends Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  'children'
> {
  /** Used for the initials and the image's alt text */
  name: string;
  src?: string;
  /** Color of the initials fallback. Defaults to `neutral`. */
  tone?: AvatarTone;
  /** sm 24px, md 32px, lg 40px. Defaults to `md`. */
  size?: AvatarSize;
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ name, src, tone = 'neutral', size = 'md', className, ...props }, ref) => {
    // Remember which src failed, so a new src gets a fresh attempt
    const [failedSrc, setFailedSrc] = React.useState<string>();
    const showImage = Boolean(src) && failedSrc !== src;

    return (
      <span
        ref={ref}
        data-slot="avatar"
        className={cn(avatarVariants({ tone, size }), className)}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={name}
            className="size-full object-cover"
            onError={() => setFailedSrc(src)}
          />
        ) : (
          <>
            <span aria-hidden>{getInitials(name)}</span>
            <span className="sr-only">{name}</span>
          </>
        )}
      </span>
    );
  },
);
Avatar.displayName = 'Avatar';
