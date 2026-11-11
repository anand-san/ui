import { cva } from 'class-variance-authority';
import { type ComponentProps, useState } from 'react';

import { cn } from '@/design-system/lib/cn';

import { getInitials } from './initials';

/**
 * Avatar for a person or a company. Shows `src` when it loads and falls back
 * to initials from `name` when there is no image or it fails.
 */

export type AvatarTone = 'neutral' | 'accent';
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

const avatarVariants = cva(
  'relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full font-rounded font-semibold',
  {
    variants: {
      tone: {
        neutral: 'bg-fill-strong text-ink',
        accent: 'bg-accent-soft text-accent',
      },
      size: {
        sm: 'size-6 text-[0.625rem]',
        md: 'size-8 text-caption',
        lg: 'size-10 text-subhead',
        xl: 'size-16 text-title-3',
      },
    },
  },
);

export interface AvatarProps extends Omit<ComponentProps<'span'>, 'children'> {
  /** Used for the initials and the image's alt text */
  name: string;
  src?: string;
  /** Color of the initials. Defaults to `neutral`. */
  tone?: AvatarTone;
  /** sm 24px, md 32px, lg 40px, xl 64px. Defaults to `md`. */
  size?: AvatarSize;
}

export function Avatar({
  name,
  src,
  tone = 'neutral',
  size = 'md',
  className,
  ...props
}: AvatarProps) {
  // Remember which src failed, so a new src gets a fresh attempt
  const [failedSrc, setFailedSrc] = useState<string>();
  const showImage = Boolean(src) && failedSrc !== src;

  return (
    <span
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
}
