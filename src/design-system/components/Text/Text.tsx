import * as React from 'react';

import {
  defaultTextElement,
  type TextTone,
  type TextVariant,
  textVariants,
} from '@/design-system/foundations/typography';
import { cn } from '@/design-system/lib/cn';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /** The role of the text; sets size, weight and the default element */
  variant?: TextVariant;
  tone?: TextTone;
  /** Cut overflow to one line with an ellipsis */
  truncate?: boolean;
  /** Render as a different element, e.g. `as="h2"` on a display number */
  as?: React.ElementType;
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ variant = 'body', tone, truncate, as, className, ...props }, ref) => {
    const Component = as ?? defaultTextElement[variant];
    return (
      <Component
        ref={ref}
        className={cn(textVariants({ variant, tone, truncate }), className)}
        {...props}
      />
    );
  },
);
Text.displayName = 'Text';
