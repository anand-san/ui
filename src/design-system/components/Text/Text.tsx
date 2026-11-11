import type { ElementType, HTMLAttributes, Ref } from 'react';

import {
  defaultTextElement,
  type TextTone,
  type TextVariant,
  textVariants,
} from '@/design-system/foundations/typography';
import { cn } from '@/design-system/lib/cn';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
  /** The role of the text; sets size, weight and the default element */
  variant?: TextVariant;
  tone?: TextTone;
  /** Digits of equal width, for numbers that line up or change in place */
  numeric?: boolean;
  /** Cut overflow to one line with an ellipsis */
  truncate?: boolean;
  /** Render a different element, like `as="h2"` on a `title-1` */
  as?: ElementType;
}

export function Text({
  variant = 'body',
  tone,
  numeric,
  truncate,
  as,
  className,
  ...props
}: TextProps) {
  const Component = as ?? defaultTextElement[variant];
  return (
    <Component
      className={cn(
        textVariants({ variant, tone, numeric, truncate }),
        className,
      )}
      {...props}
    />
  );
}
