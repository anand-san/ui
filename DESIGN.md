---
name: san-ui
description: One native-feeling interface for every app, with roles derived in OKLCH from five theme inputs.
colors:
  canvas: 'oklch(0.967 0.008 250)'
  surface: 'oklch(1 0 0)'
  surface-inset: 'oklch(0.975 0.0048 250)'
  overlay: 'oklch(0.995 0.0024 250)'
  ink: 'oklch(0.2 0.012 250)'
  ink-secondary: 'oklch(0.46 0.012 250)'
  ink-tertiary: 'oklch(0.68 0.008 250)'
  separator: 'oklch(0.885 0.008 250)'
  border-control: 'oklch(0.62 0.008 250)'
  fill: 'oklch(0.55 0.016 250 / 0.1)'
  accent: 'oklch(0.538 0.2 250)'
  accent-text: 'oklch(0.478 0.2 250)'
  accent-foreground: 'oklch(1 0 0)'
  accent-soft: 'oklch(0.955 0.044 250)'
  success: 'oklch(0.53 0.14 150)'
  warning: 'oklch(0.56 0.15 55)'
  danger: 'oklch(0.55 0.19 27)'
  info: 'oklch(0.54 0.17 245)'
  highlight: 'oklch(0.9 0.15 98)'
  highlight-foreground: 'oklch(0.22 0.03 80)'
typography:
  display:
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif'
    fontSize: 'clamp(2.5rem, 1.6rem + 3.6vw, 4.5rem)'
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: '-0.028em'
  title-1:
    fontSize: '1.75rem'
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: '-0.022em'
  title-2:
    fontSize: '1.25rem'
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: '-0.016em'
  title-3:
    fontSize: '1.0625rem'
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: '-0.012em'
  headline:
    fontSize: '0.9375rem'
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: '-0.006em'
  body:
    fontSize: '0.9375rem'
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: '-0.003em'
  subhead:
    fontSize: '0.875rem'
    fontWeight: 400
    lineHeight: 1.4
  caption:
    fontSize: '0.75rem'
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: '0.006em'
rounded:
  xs: '4px'
  control: '9px'
  item: '8px'
  card: '14px'
  panel: '14px'
  sheet: '22px'
  full: '9999px'
spacing:
  '1': '4px'
  '2': '8px'
  '3': '12px'
  '4': '16px'
  '6': '24px'
  '8': '32px'
  '12': '48px'
  '16': '64px'
  control-sm: '28px'
  control-md: '36px'
  control-lg: '44px'
  row: '44px'
  inset: '16px'
components:
  button-filled:
    backgroundColor: '{colors.accent}'
    textColor: '{colors.accent-foreground}'
    rounded: '{rounded.full}'
    height: '{spacing.control-md}'
    padding: '0 16px'
  button-tinted:
    backgroundColor: '{colors.accent-soft}'
    textColor: '{colors.accent-text}'
    rounded: '{rounded.full}'
    height: '{spacing.control-md}'
    padding: '0 16px'
  button-tinted-neutral:
    backgroundColor: '{colors.fill}'
    textColor: '{colors.ink}'
    rounded: '{rounded.full}'
    height: '{spacing.control-md}'
    padding: '0 16px'
  list:
    backgroundColor: '{colors.surface}'
    rounded: '{rounded.card}'
  list-item:
    textColor: '{colors.ink}'
    height: '{spacing.row}'
    padding: '0 16px'
  card:
    backgroundColor: '{colors.surface}'
    rounded: '{rounded.card}'
    padding: '{spacing.inset}'
  input:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.ink}'
    rounded: '{rounded.control}'
    height: '{spacing.control-md}'
    padding: '0 12px'
  badge:
    backgroundColor: '{colors.accent-soft}'
    textColor: '{colors.accent-text}'
    rounded: '{rounded.full}'
---

# Design System: san-ui

## Overview

**Creative North Star: "Native by default"**

san-ui should feel like the platform rather than a product brand: an app built on it looks as if the system drew it. The model is Apple's own apps. Content sits on white grouped surfaces over a faintly tinted canvas, the chrome stays quiet, one accent color marks what can be acted on, and motion is physical: springs that start from wherever an element is and keep its speed when interrupted.

It has no brand of its own. A theme sets five inputs (accent hue and chroma, neutral hue and chroma, radius scale), and every color role is derived from them at a lightness that keeps WCAG AA for any hue. The values below are the default theme; forest, ember and graphite ship alongside it. The same components serve a desk and a phone: density follows the pointer, so a mouse gets regular sizes and a touch screen gets 44px targets everywhere.

**Key Characteristics:**

- Grouped surfaces: white groups on a tinted canvas; elevation is lightness in dark mode.
- One accent, used for actions and selection only.
- The system font, tightening as it grows; hierarchy from weight before size.
- Sizes that follow the density, not the breakpoint.
- Springs and translucent materials, both of which turn off when the user asks.

## Colors

Roles, not ramps: every color names a job, and there is no `blue-500` to reach for.

### Primary

- **System Accent** (`accent`): the fill under white text on the one filled button, switches, the selected day and progress. `accent-text` is a darker shade of the same hue for links and tinted buttons, because the fill shade is not always readable as text. `accent-soft` is the pale fill behind tinted buttons and selected rows.

### Neutral

- **Grouped Canvas** (`canvas`): the page, a faint tint of the neutral hue so white groups read without borders.
- **Group White** (`surface`): cards, lists, fields. In dark mode it is lighter than the canvas.
- **Inset Well** (`surface-inset`): a well inside a group, for a quote or code.
- **Overlay** (`overlay`): the base of floating panels, usually seen through a material.
- **Ink** (`ink`): text people read.
- **Secondary Ink** (`ink-secondary`): supporting text, values, placeholders, icons in rows.
- **Tertiary Ink** (`ink-tertiary`): disabled text and decoration (chevrons). Never for reading.
- **Hairline** (`separator`): lines between rows and around outlined cards.
- **Control Edge** (`border-control`): the 3:1 border of fields and the off track of switches.
- **Fill** (`fill`): translucent grey for neutral tinted buttons, hover and the segmented control's track.

### Status and highlight

- **Success, Warning, Danger, Info**: each has a fill, a `-text` shade and a `-soft` tint. Danger is reserved for destructive actions and errors.
- **Highlighter** (`highlight` behind `highlight-foreground`): a marker pass behind a few words, and the text selection color.

### Named Rules

**The Derived Contrast Rule.** Themes set inputs, never colors. A test sweeps every hue and chroma in light and dark and fails if any text, control border or focus ring drops below its minimum, so a theme cannot break accessibility.

**The One Accent Rule.** The accent marks what can be acted on or what is selected. It is never decoration, and there is only one filled accent button per view.

## Typography

**Display Font:** the system font (San Francisco on Apple devices, Segoe UI or Roboto elsewhere)
**Body Font:** the same
**Label/Mono Font:** `ui-monospace` (SF Mono, Menlo, Consolas) for code; `ui-rounded` for avatar initials

**Character:** the platform's own voice. Tracking tightens as size grows, as Apple's optical sizes do, so titles are dense and captions open.

### Hierarchy

- **Display** (700, 40–72px fluid, 1.05): marketing heroes only.
- **Title 1** (700, 28px, 1.15): the large title of a page.
- **Title 2** (600, 20px, 1.25): sections and dialog titles.
- **Title 3** (600, 17px, 1.3): card titles.
- **Headline** (600, 15px, 1.35): a row's title or an alert's title; body size with weight.
- **Body** (400, 15px, 1.45): running text and controls.
- **Subhead** (400, 14px, 1.4): descriptions, list section titles, small buttons.
- **Caption** (400, 12px, 1.35): hints, footers, timestamps.

Sizes are for regular density. Comfortable raises body to 17px and title 1 to 34px; compact lowers body to 14px. Type is set in rem, so it also follows the user's text size.

### Named Rules

**The Weight First Rule.** Emphasis comes from weight before size. A row title is body size at 600, not a bigger font.

**The Sentence Case Rule.** Labels, buttons and section titles are sentence case. No `uppercase tracking-wider` eyebrows.

## Layout

A single column of grouped content, centred and capped: forms and settings at 672px, app pages at 1152px, long reading at the prose measure, with a 16px gutter on phones and 32px from 768px. Spacing is a 4px grid (4, 8, 12, 16, 24, 32, 48, 64): 32px between sections, 16px between groups and between the parts of a card, 4px between a title and its description.

Density, not the breakpoint, sets the size of things. `data-density` on any element switches compact (dense tools), regular (the default with a mouse) and comfortable (the default on touch, every target at least 44px). Controls (28/36/44px), rows (44px), the card inset (16px) and corners all scale together. Below 768px dialogs become bottom sheets.

## Elevation & Depth

Depth comes from layering, not shadows. Groups sit on the canvas by contrast alone; in dark mode each level up is lighter (canvas, then surface, then overlay). Shadows are kept for things that float above the page, tinted with the neutral hue.

### Shadow Vocabulary

- **Control**: a 1–6px soft shadow under a switch thumb or the segmented control's thumb.
- **Floating**: a 32px diffuse shadow under menus, popovers, the select list and toasts.
- **Modal**: a 64px shadow under dialogs and sheets, over a dimming scrim.

Menus, popovers, tooltips and the navigation panel are translucent materials (93% overlay, 24px blur, 180% saturation) that grow from their trigger. With reduced transparency or more contrast they turn solid.

### Named Rules

**The Float-Only Rule.** A shadow means "this is above the page". Cards and lists never cast one.

## Shapes

Continuous, rounded and concentric. Every radius comes from a role and is multiplied by the theme's radius scale.

- **Fields** have gently rounded corners (9px), tighter in compact (7px) and softer on touch (12px).
- **Cards and lists** are rounder (14px; 10px compact, 18px touch).
- **Panels** (menus, popovers) are 14px, and the rows inside them are concentric with that edge (14px minus the 5px inset).
- **Sheets and dialogs** are the roundest (22px).
- **Buttons, badges, avatars, switches and the segmented control** are capsules. Toolbar buttons can opt into the field radius.

## Components

### Buttons

- **Shape:** capsules (full radius); 28, 36 or 44px tall following the density.
- **Filled:** the accent fill with white text, for the one main action. Neutral (ink) and danger tones exist.
- **Tinted:** a pale fill with colored text, beside the filled action.
- **Plain:** text only, a fill on hover, for quiet actions.
- **Link:** sits in a sentence, with a faint underline that is solid on hover, so it never relies on color.
- **Press:** sinks to 97% at once and springs back on release. Focus is a 2px outline in the focus color, 2px out.

### Lists (signature)

- **Style:** a white rounded group of rows; separators are hairlines that start where the text starts, so an icon column reads as one.
- **Rows:** at least the row height (44px), an optional leading icon in secondary ink, a title, a description in subhead, and a trailing value, control or chevron. Long values truncate before the title wraps.
- **Sections:** a subhead title above (h2 by default) and a caption footer below.
- **Pressed:** linked rows take the fill on hover and press.

### Cards / Containers

- **Corner Style:** the card radius.
- **Background:** surface (default), inset (a well inside a card), outline (a hairline, for a card on a surface) or accent (a promo band where every role turns white).
- **Shadow Strategy:** none (see Elevation).
- **Internal Padding:** the density's inset (16px regular).

### Inputs / Fields

- **Style:** white fill, a 3:1 control border, the field radius, the button heights.
- **Focus:** the border turns the focus color and a 2px outline is drawn on it.
- **Error / Disabled:** a danger border and outline plus a message with an alert icon; disabled is 50% opacity.
- **Field:** wraps one control with its label and its hint or error, and wires up the ARIA.

### Navigation

- **Tabs** are a segmented control: a fill track with a white thumb that springs between segments.
- **NavigationMenu** is the bar of a desktop app or site: capsule items in secondary ink, a grey fill on hover, and the current page in the accent's soft fill, so hover and current never look alike.

### Overlays

Dialogs are centred from 768px and become bottom sheets on phones that can be dragged down to close; a flick dismisses when its projected travel passes 40% of the height. Bounce is only used after a gesture.

## Do's and Don'ts

### Do:

- **Do** use the role classes (`bg-surface`, `text-ink-secondary`, `bg-success-soft text-success`) and the type roles (`<Text variant="title-2">`).
- **Do** put grouped content in `List` and `Card` on the canvas, and use an inset well or a list inside a card.
- **Do** use the density tokens for anything that should grow on touch (`h-control-md`, `min-h-row`, `p-inset`).
- **Do** give anything clickable the focus ring, and any control under 44px the touch target.
- **Do** honor reduced motion: keep the state change, drop the movement.

### Don't:

- **Don't** use Tailwind's palette or sizes (`bg-slate-500`, `text-sm`) or raw hex in components; they are not built.
- **Don't** nest cards, or put a shadow on a card.
- **Don't** use more than one filled button in a view.
- **Don't** use tertiary ink for text people need to read.
- **Don't** add bounce to things that simply appear.
