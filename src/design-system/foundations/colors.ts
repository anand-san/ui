/**
 * Color tokens come in two tiers.
 *
 * Primitives are the raw ramps (neutral-500, brand-600). Semantic tokens name
 * a job (surface, muted-foreground, success) and switch value between light
 * and dark mode. Components and screens use semantic tokens; primitives are
 * for the rare case no role fits, like an illustration.
 */

export interface ColorToken {
  /** CSS variable name without the leading dashes */
  name: string;
  /** Tailwind utility that applies it */
  className: string;
  usage: string;
  /** Variable to use for text placed on this color, if any */
  onColor?: string;
}

export interface ColorGroup {
  title: string;
  description: string;
  tokens: ColorToken[];
}

export const semanticColors: ColorGroup[] = [
  {
    title: 'Surfaces',
    description:
      'Backgrounds, from the page canvas up. The canvas is a faint violet-white so white outline cards lift off it; soft section cards use surface; child cards add a tint of primary on top.',
    tokens: [
      { name: 'background', className: 'bg-background', usage: 'Page canvas' },
      {
        name: 'surface',
        className: 'bg-surface',
        usage: 'Soft section cards, like the tracker home cards',
      },
      {
        name: 'card',
        className: 'bg-card',
        usage: 'Outlined cards and popovers on the canvas',
      },
      {
        name: 'muted',
        className: 'bg-muted',
        usage: 'Wells, skeletons, empty-state icon circles',
      },
    ],
  },
  {
    title: 'Text',
    description: 'Two text colors cover almost everything.',
    tokens: [
      {
        name: 'foreground',
        className: 'text-foreground',
        usage: 'Primary text and icons',
      },
      {
        name: 'muted-foreground',
        className: 'text-muted-foreground',
        usage: 'Secondary text, captions, labels, placeholder icons',
      },
    ],
  },
  {
    title: 'Actions and brand',
    description:
      'Primary is the brand color, used like a pen: main buttons, selection, focus. Highlight is used like a highlighter: a fill behind the few things that should jump out. Never use highlight as text on white. Both come from the theme.',
    tokens: [
      {
        name: 'primary',
        className: 'bg-primary',
        usage: 'Main buttons, selection, checked controls, child card tints',
        onColor: 'primary-foreground',
      },
      {
        name: 'brand',
        className: 'bg-brand',
        usage: 'Logo, Elo chat and promo banners',
        onColor: 'brand-foreground',
      },
      {
        name: 'highlight',
        className: 'bg-highlight',
        usage: 'Matched keywords, Elo suggestions, text selection, new items',
        onColor: 'highlight-foreground',
      },
      {
        name: 'ring',
        className: 'ring-ring',
        usage: 'Focus rings',
      },
    ],
  },
  {
    title: 'Feedback',
    description:
      'Solid for icons and text, or use a 10% tint behind text (bg-success/10 text-success) for pills and banners.',
    tokens: [
      {
        name: 'success',
        className: 'bg-success',
        usage: 'Done, saved, goal met',
        onColor: 'success-foreground',
      },
      {
        name: 'warning',
        className: 'bg-warning',
        usage: 'Needs attention, quota close, outdated',
        onColor: 'warning-foreground',
      },
      {
        name: 'info',
        className: 'bg-info',
        usage: 'Neutral notices and tips',
        onColor: 'info-foreground',
      },
      {
        name: 'destructive',
        className: 'bg-destructive',
        usage: 'Errors and delete actions',
        onColor: 'destructive-foreground',
      },
    ],
  },
  {
    title: 'Lines',
    description:
      'Borders and dividers. Prefer spacing and surfaces over lines.',
    tokens: [
      {
        name: 'border',
        className: 'border-border',
        usage: 'Dividers, outlined cards',
      },
      {
        name: 'input',
        className: 'border-input',
        usage: 'Form control borders',
      },
    ],
  },
];

/**
 * Tint steps: a semantic color at low opacity over the surface below it.
 * Only these three steps are used.
 */
export const tintScale = [
  { opacity: 5, usage: 'Child cards inside a section card (bg-primary/5)' },
  { opacity: 10, usage: 'Counts, pills, hover on child cards (bg-primary/10)' },
  { opacity: 20, usage: 'Selected or pressed states' },
] as const;

/** The Tailwind ramps the app supports. Others (slate, zinc, emerald...) map onto these. */
export const supportedRamps = [
  'neutral',
  'brand',
  'highlight',
  'red',
  'orange',
  'amber',
  'yellow',
  'green',
  'blue',
  'purple',
  'fuchsia',
] as const;

export const rampSteps = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const;

export const rampMigrations: { from: string; to: string }[] = [
  { from: 'slate, gray, zinc, stone', to: 'neutral, or a semantic token' },
  { from: 'yellow-200 marker fills', to: 'highlight, or Mark' },
  { from: 'text-gray-500, text-slate-500', to: 'text-muted-foreground' },
  { from: 'emerald, teal', to: 'success, or green' },
  { from: 'violet, indigo', to: 'brand, or purple' },
  { from: 'rose, pink', to: 'destructive, or red' },
  { from: 'sky, cyan', to: 'info, or blue' },
];
