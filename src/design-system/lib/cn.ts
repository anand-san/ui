import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/** The san-ui names from theme.css, so cn() knows which classes conflict */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        'display',
        'title-1',
        'title-2',
        'title-3',
        'headline',
        'body',
        'subhead',
        'caption',
      ],
      radius: ['xs', 'control', 'item', 'card', 'panel', 'sheet'],
      shadow: ['control', 'floating', 'modal'],
      spacing: [
        'control-sm',
        'control-md',
        'control-lg',
        'row',
        'inset',
        'panel',
        'touch',
      ],
      ease: ['spring', 'out'],
      font: ['sans', 'display', 'rounded', 'mono'],
    },
  },
});

/** Joins class names and lets later Tailwind classes win over earlier ones */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
