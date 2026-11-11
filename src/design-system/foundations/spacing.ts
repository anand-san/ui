/**
 * Spacing is Tailwind's 4px grid. The sizes that change with the density
 * (control heights, row height, card inset) are tokens: `h-control-md`,
 * `min-h-row`, `p-inset`. Everything else uses the scale below.
 */
export const spacingScale = [
  { step: '0.5', px: 2, usage: 'Hairline nudges: icon offsets' },
  { step: '1', px: 4, usage: 'Title to subtitle inside a row or header' },
  { step: '1.5', px: 6, usage: 'Icon to label inside buttons and badges' },
  { step: '2', px: 8, usage: 'Between controls in a group' },
  { step: '3', px: 12, usage: 'Leading icon to text in a row' },
  { step: '4', px: 16, usage: 'Between cards and the parts of a card' },
  { step: '6', px: 24, usage: 'Between groups; page gutter on phones' },
  { step: '8', px: 32, usage: 'Page gutter on desktop; above a section title' },
  { step: '12', px: 48, usage: 'Between page sections' },
  { step: '16', px: 64, usage: 'Between marketing blocks' },
] as const;

export const spacing = {
  /** Page gutter and the width of an app page */
  page: 'mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 md:px-8 md:py-8',
  /** A narrower page for forms and settings */
  pageNarrow: 'mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 md:py-8',
  /** A column for long reading */
  prose: 'mx-auto w-full max-w-prose',
  /** Between sections of a page */
  sections: 'gap-8',
  /** Between cards or groups in a section */
  groups: 'gap-4',
  /** Between a title and its description */
  stack: 'gap-1',
  /** Between an icon and its text */
  inline: 'gap-2',
} as const;

/**
 * Density sets type, control and row sizes for a subtree. `regular` suits a
 * mouse, `comfortable` touch (it is the default on touch screens), and
 * `compact` dense tools. Set it with `data-density` on any element.
 */
export type Density = 'compact' | 'regular' | 'comfortable';

export const densityScale: {
  density: Density;
  body: string;
  control: string;
  row: string;
  usage: string;
}[] = [
  {
    density: 'compact',
    body: '14px',
    control: '24 / 32 / 40px',
    row: '36px',
    usage: 'Dense tools: tables, editors, admin',
  },
  {
    density: 'regular',
    body: '15px',
    control: '28 / 36 / 44px',
    row: '44px',
    usage: 'Desktop apps and sites, with a mouse',
  },
  {
    density: 'comfortable',
    body: '17px',
    control: '32 / 44 / 52px',
    row: '48px',
    usage: 'Touch screens; the default when the pointer is coarse',
  },
];

export const radiusScale = [
  { name: 'rounded-xs', usage: 'Checkboxes and small marks' },
  {
    name: 'rounded-control',
    usage: 'Fields and square buttons; follows the density',
  },
  {
    name: 'rounded-item',
    usage: 'Rows inside a menu, concentric with the panel',
  },
  { name: 'rounded-card', usage: 'Cards and list groups; follows the density' },
  { name: 'rounded-panel', usage: 'Menus, popovers and select lists' },
  { name: 'rounded-sheet', usage: 'Dialogs and sheets' },
  { name: 'rounded-full', usage: 'Buttons, badges, avatars and switches' },
] as const;
