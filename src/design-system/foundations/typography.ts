import { cva, type VariantProps } from 'class-variance-authority';
import type { ElementType } from 'react';

/**
 * The type scale. Each variant is a role, not a size: pick the one that
 * describes what the text is, and the size, weight and tracking follow.
 * Labels are sentence case; the design system has no tiny uppercase labels
 * and no arbitrary sizes like text-[10px] or text-[13px].
 *
 * Two faces, set by the theme: font-display for display, title and
 * heading, where its character shows; font-sans for everything people
 * read and operate. In the Eloovor theme they are Bricolage Grotesque and
 * Figtree.
 */
export const textVariants = cva('', {
  variants: {
    variant: {
      display:
        'font-display text-2xl font-bold tabular-nums tracking-tight md:text-3xl',
      title: 'text-balance font-display text-2xl font-semibold tracking-tight',
      heading:
        'text-balance font-display text-lg font-semibold tracking-tight md:text-xl',
      subheading: 'text-base font-semibold',
      'body-lg': 'text-base',
      body: 'text-sm',
      'body-strong': 'text-sm font-medium',
      caption: 'text-xs',
      label: 'text-xs font-medium',
      code: 'font-mono text-xs',
    },
    tone: {
      default: '',
      muted: 'text-muted-foreground',
      brand: 'text-brand',
      success: 'text-success',
      warning: 'text-warning',
      info: 'text-info',
      destructive: 'text-destructive',
    },
    truncate: {
      true: 'truncate',
      false: '',
    },
  },
  compoundVariants: [
    // Captions and labels read as supporting text unless a tone says otherwise
    {
      variant: ['caption', 'label'],
      tone: 'default',
      className: 'text-muted-foreground',
    },
  ],
  defaultVariants: {
    variant: 'body',
    tone: 'default',
    truncate: false,
  },
});

export type TextVariant = NonNullable<
  VariantProps<typeof textVariants>['variant']
>;
export type TextTone = NonNullable<VariantProps<typeof textVariants>['tone']>;

/** The element each variant renders by default; override with `as`. */
export const defaultTextElement: Record<TextVariant, ElementType> = {
  display: 'p',
  title: 'h1',
  heading: 'h2',
  subheading: 'h3',
  'body-lg': 'p',
  body: 'p',
  'body-strong': 'p',
  caption: 'p',
  label: 'span',
  code: 'code',
};

/** Documentation for the type scale story and future agents. */
export const typeScale: {
  variant: TextVariant;
  size: string;
  usage: string;
  replaces: string;
}[] = [
  {
    variant: 'display',
    size: '24px → 30px, display face, bold, tabular figures',
    usage: 'Key numbers and metrics, like the counts on a dashboard.',
    replaces: 'text-2xl/3xl/4xl font-bold',
  },
  {
    variant: 'title',
    size: '24px, display face, semibold',
    usage: 'The one page title at the top of a screen.',
    replaces: 'text-2xl/3xl font-semibold|bold',
  },
  {
    variant: 'heading',
    size: '18px → 20px, display face, semibold',
    usage: 'Section and card titles on a page, like Recent or Today’s Focus.',
    replaces: 'SECTION_TITLE_CLASS, text-lg/xl font-semibold',
  },
  {
    variant: 'subheading',
    size: '16px, semibold',
    usage: 'Card titles inside sheets, dialogs and side panels.',
    replaces: 'CONFIG_CARD_TITLE_CLASS, text-base font-semibold',
  },
  {
    variant: 'body-lg',
    size: '16px',
    usage: 'Long reading text: analyses, notes, generated documents.',
    replaces: 'text-base, text-[15px]',
  },
  {
    variant: 'body',
    size: '14px',
    usage: 'The default for UI text, descriptions and list rows.',
    replaces: 'text-sm, text-[13px], text-[13.5px], text-[14px]',
  },
  {
    variant: 'body-strong',
    size: '14px, medium',
    usage: 'Titles of child cards and list items, like a project name.',
    replaces: 'CONFIG_ITEM_TITLE_CLASS, text-sm font-medium',
  },
  {
    variant: 'caption',
    size: '12px, muted',
    usage: 'Metadata and secondary lines: owner, dates, counts.',
    replaces: 'text-xs text-gray-500, text-[11px], text-[10px]',
  },
  {
    variant: 'label',
    size: '12px, medium, muted',
    usage: 'Field and group labels. Sentence case, never uppercase.',
    replaces: 'text-[10px]/[11px] uppercase tracking-wider labels',
  },
  {
    variant: 'code',
    size: '12px, mono',
    usage: 'Hex values, IDs and other literal values.',
    replaces: 'font-mono text-[10px]/xs',
  },
];
