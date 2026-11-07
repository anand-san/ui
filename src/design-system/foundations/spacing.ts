/**
 * Spacing is Tailwind's 4px grid, limited to the steps below. Roles are the
 * named jobs those steps do across the app, taken from the tracker home page.
 * Components use the roles; screens can use the scale directly.
 */
export const spacingScale = [
  { step: '0.5', px: 2, usage: 'Hairline nudges: pill padding, icon offsets' },
  { step: '1', px: 4, usage: 'Title to description inside a header' },
  { step: '1.5', px: 6, usage: 'Icon to label inside buttons and pills' },
  {
    step: '2',
    px: 8,
    usage: 'Icon to title, title to its pill',
  },
  { step: '3', px: 12, usage: 'Between item cards, parts of an item card' },
  {
    step: '4',
    px: 16,
    usage: 'Between section cards and their parts, item card padding',
  },
  { step: '6', px: 24, usage: 'Card padding on desktop, gaps between groups' },
  { step: '8', px: 32, usage: 'Page gutter on desktop' },
  { step: '12', px: 48, usage: 'Space above and below empty states' },
  { step: '16', px: 64, usage: 'Large page sections and marketing blocks' },
] as const;

export const spacing = {
  /** Page gutter and max width, as on the tracker home page */
  page: 'mx-auto w-full max-w-6xl p-4 md:p-8',
  /** Between section cards in a page grid or stack */
  section: 'gap-4',
  /**
   * Inside a card, by card size: padding around the card and gap between its
   * parts. Modelled on Fit by dimension in the job fit report.
   */
  card: {
    lg: { inset: 'p-4 md:p-6', gap: 'gap-4' },
    md: { inset: 'p-4', gap: 'gap-4' },
    sm: { inset: 'p-4', gap: 'gap-3' },
  },
  /** Between item cards stacked or gridded inside a section card */
  items: 'gap-3',
  /** Between an icon and its text, or a title and its count */
  inline: 'gap-2',
} as const;

export const radiusScale = [
  { name: 'rounded-md', usage: 'Controls: buttons, inputs, menu items' },
  { name: 'rounded-xl', usage: 'Every card, section or item' },
  { name: 'rounded-full', usage: 'Pills, counts, avatars, status dots' },
] as const;
