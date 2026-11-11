import { cva, type VariantProps } from 'class-variance-authority';
import type { ElementType } from 'react';

/**
 * The type scale. Each variant is a role, not a size: pick what the text is,
 * and size, leading, tracking and weight follow as one set. Sizes come from
 * the density, so the same role is larger on a touch screen, and they are in
 * rem, so they follow the user's text size.
 *
 * Emphasis comes from weight before size: `headline` is body text in
 * semibold, for list titles and labels that lead a row.
 */
export const textVariants = cva('', {
  variants: {
    variant: {
      display: 'text-balance font-display text-display',
      'title-1': 'text-balance font-display text-title-1',
      'title-2': 'text-balance font-display text-title-2',
      'title-3': 'text-title-3',
      headline: 'text-headline',
      body: 'text-body',
      subhead: 'text-subhead',
      caption: 'text-caption',
      code: 'font-mono text-subhead',
    },
    tone: {
      default: '',
      secondary: 'text-ink-secondary',
      accent: 'text-accent',
      success: 'text-success',
      warning: 'text-warning',
      danger: 'text-danger',
      info: 'text-info',
    },
    numeric: {
      true: 'tabular-nums',
      false: '',
    },
    truncate: {
      true: 'truncate',
      false: '',
    },
  },
  compoundVariants: [
    // Captions read as supporting text unless a tone says otherwise
    { variant: 'caption', tone: 'default', className: 'text-ink-secondary' },
  ],
  defaultVariants: {
    variant: 'body',
    tone: 'default',
    numeric: false,
    truncate: false,
  },
});

export type TextVariant = NonNullable<
  VariantProps<typeof textVariants>['variant']
>;
export type TextTone = NonNullable<VariantProps<typeof textVariants>['tone']>;

/** The element each variant renders by default; override with `as`. */
export const defaultTextElement: Record<TextVariant, ElementType> = {
  display: 'h1',
  'title-1': 'h1',
  'title-2': 'h2',
  'title-3': 'h3',
  headline: 'p',
  body: 'p',
  subhead: 'p',
  caption: 'p',
  code: 'code',
};

/** Documentation for the type scale story and future agents. */
export const typeScale: {
  variant: TextVariant;
  sizes: string;
  usage: string;
}[] = [
  {
    variant: 'display',
    sizes: '40 → 72px, fluid with the viewport, bold',
    usage: 'The one headline of a landing or marketing page.',
  },
  {
    variant: 'title-1',
    sizes: '24 / 28 / 34px, bold',
    usage: 'The page title at the top of a screen.',
  },
  {
    variant: 'title-2',
    sizes: '18 / 20 / 22px, semibold',
    usage: 'Section titles on a page and the title of a dialog.',
  },
  {
    variant: 'title-3',
    sizes: '15 / 17 / 20px, semibold',
    usage: 'Card and group titles.',
  },
  {
    variant: 'headline',
    sizes: 'body size, semibold',
    usage: 'The title of a list row, a field label, anything that leads.',
  },
  {
    variant: 'body',
    sizes: '14 / 15 / 17px',
    usage: 'Everything people read and operate: the default.',
  },
  {
    variant: 'subhead',
    sizes: '13 / 14 / 15px',
    usage: 'Descriptions under titles and secondary lines in rows.',
  },
  {
    variant: 'caption',
    sizes: '12 / 12 / 13px, secondary',
    usage: 'Metadata: dates, counts, footnotes under a group.',
  },
  {
    variant: 'code',
    sizes: 'subhead size, monospace',
    usage: 'IDs, keys and other literal values.',
  },
];
