/**
 * The color roles, for the docs and for agents. Every value lives in
 * @sandilya/ui/tokens.css; a test keeps this list and theme.css in step with
 * it.
 *
 * Use the role that names the job. There are no color ramps: a theme picks
 * an accent hue and the base derives the rest, at contrast that holds for
 * any hue.
 */

export interface ColorToken {
  /** CSS variable name without the leading dashes */
  name: string;
  /** Tailwind utility that applies it */
  className: string;
  usage: string;
}

export interface ColorGroup {
  title: string;
  description: string;
  tokens: ColorToken[];
}

export const colorGroups: ColorGroup[] = [
  {
    title: 'Surfaces',
    description:
      'Grouped surfaces, as in Apple’s settings: a tinted canvas with white groups on it. In dark mode elevation is lightness, so groups and floating panels get lighter.',
    tokens: [
      { name: 'canvas', className: 'bg-canvas', usage: 'The page' },
      {
        name: 'surface',
        className: 'bg-surface',
        usage: 'Cards, list groups and fields on the canvas',
      },
      {
        name: 'surface-inset',
        className: 'bg-surface-inset',
        usage: 'A well inside a surface: code, a nested group',
      },
      {
        name: 'overlay',
        className: 'bg-overlay',
        usage: 'Menus, popovers, dialogs and sheets',
      },
    ],
  },
  {
    title: 'Text',
    description:
      'Two inks cover almost everything. Placeholders use the secondary ink, which reads at 4.5:1 on every surface and fill.',
    tokens: [
      {
        name: 'ink',
        className: 'text-ink',
        usage: 'Primary text and icons',
      },
      {
        name: 'ink-secondary',
        className: 'text-ink-secondary',
        usage: 'Descriptions, metadata, placeholders, inactive icons',
      },
      {
        name: 'ink-tertiary',
        className: 'text-ink-tertiary',
        usage: 'Disabled text and decoration only; it is not for reading',
      },
    ],
  },
  {
    title: 'Fills and lines',
    description:
      'Neutral fills are translucent, so a grey button reads the same on the canvas, a card or a sheet. Separators divide; control borders outline fields at 3:1.',
    tokens: [
      {
        name: 'fill',
        className: 'bg-fill',
        usage: 'Grey buttons, segmented tracks, chips',
      },
      {
        name: 'fill-hover',
        className: 'bg-fill-hover',
        usage: 'Hover on a fill or a plain button',
      },
      {
        name: 'fill-strong',
        className: 'bg-fill-strong',
        usage: 'Pressed fills, a switch that is off, progress tracks',
      },
      {
        name: 'separator',
        className: 'border-separator',
        usage: 'Dividers and card outlines; the default border',
      },
      {
        name: 'border-control',
        className: 'border-control',
        usage: 'The outline of a field, checkbox or radio',
      },
      {
        name: 'scrim',
        className: 'bg-scrim',
        usage: 'The dimmed layer behind a modal',
      },
    ],
  },
  {
    title: 'Accent',
    description:
      'The app’s color, from its theme: filled buttons, selection, links and focus. `bg-accent` is the fill under white text; `text-accent` is a shade that reads as text on any surface.',
    tokens: [
      {
        name: 'accent',
        className: 'bg-accent',
        usage: 'Filled buttons, checked controls, the selected item',
      },
      {
        name: 'accent-pressed',
        className: 'bg-accent-pressed',
        usage: 'A filled button while it is pressed',
      },
      {
        name: 'accent-foreground',
        className: 'text-accent-foreground',
        usage: 'Text and icons on the accent',
      },
      {
        name: 'accent-text',
        className: 'text-accent',
        usage: 'Links, tinted buttons, accent icons',
      },
      {
        name: 'accent-soft',
        className: 'bg-accent-soft',
        usage: 'Tinted buttons, a selected row, accent badges',
      },
      {
        name: 'accent-soft-hover',
        className: 'bg-accent-soft-hover',
        usage: 'Hover on a soft accent fill',
      },
      { name: 'focus', className: 'outline-focus', usage: 'Focus rings' },
    ],
  },
  {
    title: 'Status',
    description:
      'Four feedback colors, each with a solid fill (`bg-success` under `text-success-foreground`), a text shade (`text-success`) and a soft fill (`bg-success-soft`) that the text shade reads on.',
    tokens: (['success', 'warning', 'danger', 'info'] as const).flatMap(
      name => [
        {
          name,
          className: `bg-${name}`,
          usage: {
            success: 'Done, saved, goal met',
            warning: 'Needs attention, close to a limit',
            danger: 'Errors and destructive actions',
            info: 'Neutral notices and tips',
          }[name],
        },
        {
          name: `${name}-foreground`,
          className: `text-${name}-foreground`,
          usage: `Text and icons on the solid ${name} fill`,
        },
        {
          name: `${name}-text`,
          className: `text-${name}`,
          usage: `${name[0].toUpperCase()}${name.slice(1)} text and icons`,
        },
        {
          name: `${name}-soft`,
          className: `bg-${name}-soft`,
          usage: 'Soft badges and callouts',
        },
      ],
    ),
  },
  {
    title: 'Highlight',
    description:
      'A highlighter: a fill behind a few words, like the terms a search matched, and text selection.',
    tokens: [
      { name: 'highlight', className: 'bg-highlight', usage: 'Mark' },
      {
        name: 'highlight-foreground',
        className: 'text-highlight-foreground',
        usage: 'Text on the highlight',
      },
    ],
  },
];

/** The inputs a theme sets; everything else is derived from them */
export const themeInputs = [
  {
    name: 'accent-hue',
    example: '250',
    usage: 'The accent hue in degrees, 0 to 360',
  },
  {
    name: 'accent-chroma',
    example: '0.2',
    usage: 'How vivid the accent is, 0 (grey) to 0.2',
  },
  {
    name: 'neutral-hue',
    example: '250',
    usage: 'The hue the greys lean toward',
  },
  {
    name: 'neutral-chroma',
    example: '0.008',
    usage: 'How far the greys lean, 0 to 0.03',
  },
  {
    name: 'radius-scale',
    example: '1',
    usage: 'Multiplies every corner radius',
  },
  {
    name: 'font-sans',
    example: 'system-ui, …',
    usage: 'The text face; the system font by default',
  },
  {
    name: 'font-display',
    example: 'var(--font-sans)',
    usage: 'The face for display and titles',
  },
] as const;
