# san-ui

Shared foundations and components for every app: tools and dashboards, consumer apps and content sites. The goal is a native feel, after Apple's platforms: content first, quiet chrome, springs that can be interrupted, and contrast that holds for any theme.

Apps get this folder through the shadcn registry at ui.sandilya.dev (it lands at the same path, `src/design-system/`), and the tokens, themes and Tailwind theme from the `@sandilya/ui` npm package. Setup is in the repository README. Nothing here imports app code: domain UI built on it lives in the app.

```bash
bun run dev    # Storybook at http://localhost:6006, with Theme and Density toolbars
bun run build  # Storybook and the registry in dist/
```

## Layout

```
design-system/
├── index.ts              # public exports: import from '@/design-system'
├── foundations/
│   ├── colors.ts         # the color roles and theme inputs, for docs and agents
│   ├── controls.ts       # focus ring, touch target, press, fields, panels, menus, modals
│   ├── motion.ts         # spring presets and momentum projection
│   ├── typography.ts     # textVariants (the type roles) and their docs
│   └── spacing.ts        # spacing scale and roles, density, radius
├── lib/                  # cn, hooks, and the modal frame Dialog, AlertDialog and Sheet share
├── components/           # one folder per component, with its stories
├── patterns/             # whole screens built only from the components (not exported)
└── docs/                 # foundation stories and their helpers (not exported)
```

The tokens live in `packages/tokens/` (published as `@sandilya/ui`):

```
packages/tokens/
├── tokens.css            # every role, derived in OKLCH from the theme inputs; density
├── theme.css             # Tailwind names for the roles, keyframes, materials
├── base.css              # page, border, selection and placeholder defaults
└── themes/               # template, forest, ember, graphite
```

## Direction

- **Roles, not ramps.** Colors name a job: `canvas`, `surface`, `ink`, `ink-secondary`, `fill`, `separator`, `accent`, `danger`. There are no color ramps. A theme sets an accent hue and chroma; the base derives the rest at a lightness that keeps WCAG AA for any hue, and a test sweeps all 360 to prove it.
- **Grouped surfaces.** A tinted canvas with white groups on it, as in a settings screen. In dark mode elevation is lightness, so groups and floating panels get lighter. Cards don't nest.
- **Accent.** `bg-accent` is the fill under white text; `text-accent` is a shade that reads as text on any surface. Inside `Surface tone="accent"` or `Card variant="accent"` every role turns white, so nothing needs a special variant.
- **Type.** The system font, with tracking that tightens as text grows. Hierarchy comes from weight before size. Sizes follow the density.
- **Density.** `data-density` sizes type, controls and rows: `regular` on a desk, `comfortable` on touch (the default with a coarse pointer, so every target is 44px), `compact` for dense tools.
- **Motion.** Springs that start from wherever an element is and keep its speed. Things that appear use the critically damped default; bounce is only for motion a gesture started. Reduced motion keeps the state change and drops the movement.
- **Materials.** Menus, popovers, tooltips and the navigation panel are translucent and grow from their trigger. With reduced transparency or more contrast they turn solid.
- **Shadows** are kept for things that float: menus, dialogs, toasts.

## Rules

1. **Roles first.** Use `bg-surface`, `text-ink-secondary`, `bg-success-soft text-success` and so on. Tailwind's default palette is not built. An app's own domain colors go in its own `@theme inline` block.
2. **Type roles, not sizes.** Use `<Text variant>` or `textVariants()`: `display`, `title-1`, `title-2`, `title-3`, `headline`, `body`, `subhead`, `caption`, `code`. There is no `text-sm`. Labels are sentence case, never `uppercase tracking-wider`.
3. **Two inks.** `text-ink` for what people read, `text-ink-secondary` for supporting text and placeholders. `text-ink-tertiary` is for disabled text and decoration only; it is not for reading.
4. **One filled button per view.** `filled` for the main action, `tinted` beside it, `plain` for quiet ones. The tone says what it does: `accent`, `neutral` or `danger`.
5. **Density tokens for sizes that scale.** `h-control-sm|md|lg`, `min-h-row`, `p-inset`, `rounded-control`, `rounded-card`. Everything else is the 4px grid: `0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16`.
6. **Corners by role.** `rounded-control` fields, `rounded-card` cards and lists, `rounded-panel` menus and popovers, `rounded-item` rows inside them (concentric with the panel), `rounded-sheet` dialogs and sheets, `rounded-full` buttons, badges and avatars. The theme's `--radius-scale` scales them all.
7. **Focus and touch.** Anything clickable takes `focusRing`. Fields keep their own ring from `controlVariants`, drawn on the border. A control drawn smaller than 44px adds `touchTarget`, which grows its hit area on touch screens without changing its size; the extra area reaches `(44 − size) ÷ 2` past each edge, so keep other controls that far away.
8. **Press.** Buttons and interactive cards take `pressable`: they sink a little at once and spring back on release.
9. **Every mode.** Every story must look right in light and dark, in every theme and density. Check with the Storybook toolbar.
10. **Stories first.** A new component gets stories before an app uses it.

## Components

- **Button**: `filled`, `tinted`, `plain` and `link`, in `accent`, `neutral` and `danger`. Sizes `sm`, `md`, `lg` follow the density; `icon` makes it square for a lone icon (give it an `aria-label`). Capsules by default; `shape="rounded"` sits flush in a toolbar. `loading` shows a spinner and disables it. It defaults to `type="button"`.
- **Surface**: a region on the `canvas`, `surface`, `inset` or `accent` background.
- **Card**: `surface` (default), `inset` (a well inside a card), `outline`, `accent`. Parts: `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`. `interactive` plus `asChild` makes the whole card a link.
- **List**: `ListSection` (title and footer), `List` (the rounded group) and `ListItem` (`title`, `description`, `leading`, `trailing`, `chevron`). With `asChild` the row is its child, like `<a href>`, with a pressed state. Separators start where the text starts.
- **Badge**: `neutral`, `accent`, `success`, `warning`, `danger`, `info`, `highlight`, in `soft` (default) or `solid`, with an optional `dot`.
- **StatusMenu**: a status badge that opens a menu to change it. Options take a Badge `tone`, or the app's own colors through `className`. Without `onValueChange` it is a read-only badge. It is safe inside a linked card.
- **Avatar**: an image with an initials fallback in rounded type, `neutral` or `accent`, 24 to 64px.
- **Text** and **Mark**: `Text` renders a type role; `Mark` is the highlighter, a `fill` or an `underline`.
- **Field**: wraps one control with its label and its hint or error, and links them (`htmlFor`, `aria-describedby`, `aria-invalid`, `aria-required`). Set `id` on the Field. `size="sm"` is the dense style.
- **Forms**: `Input`, `Textarea` (grows with its content) and `SelectTrigger` share one style and the Button heights, and read their state from a surrounding `Field`. `Checkbox` and `Switch` size from the body text. `Select` opens over its trigger like a desktop pop-up button; pass `position="popper"` to drop below. `DatePicker` closes once a day is picked; `captionLayout="dropdown"` adds month and year menus. Custom controls join a Field with `useFieldControl`.
- **PageHeader**: the large title of a page, with a description, an `eyebrow` (a back link) and actions.
- **Overlays**: `Dialog` (centred from 768px, a draggable bottom sheet on phones), `AlertDialog` (centred, Cancel plus an action; `tone="danger"` for deletions), `Sheet` (`bottom`, `left` or `right`), `Popover`, `DropdownMenu` (items take `tone="danger"`), `Tooltip`. Dialogs and sheets are controlled or uncontrolled through `open`, `defaultOpen` and `onOpenChange`.
- **Navigation**: `Tabs` (a segmented control with a springing thumb), `Accordion`, `NavigationMenu` (the bar of a desktop app or site; pass `active` to the current link).
- **Feedback**: `Alert` (a `status`, or an `alert` when `danger`), `Progress`, `Gauge` (a ring meter with a label), `Skeleton`, and `Toaster` for `sonner` toasts.
- **EmptyState**: `sm` (default) for an empty section in a card, `lg` for a whole page. A large quiet glyph, never a tile.
- **Layout**: `Separator` and `ScrollArea`.

## Patterns

Whole screens built only from the components, under Patterns in Storybook, with the source in [`patterns/`](patterns/). They stay in this repository, so start a new screen by copying the closest one into the app.

- **Settings screen**: a large title, a segmented control and grouped lists of rows with switches and values.
- **Dashboard**: a desk tool. A translucent top bar with navigation and an account menu, a period select, stat cards with trends, a list of orders whose status can be changed, and a gauge with progress bars.
- **Search and filter**: a collection. A search box, a select and a segmented control filter a list with row menus; a removal is confirmed in an AlertDialog. Stories for no results, an empty collection and loading.
- **Detail screen**: one record. A back link, a status, actions and a menu, tabs for its views, and a side column of properties and linked items. Editing happens in a Dialog.
- **Create form**: a long form. Fields grouped in sections, a date range, switches, and a submit that lists what's wrong in an Alert and moves focus to it.
- **Sign in**: a centred form in a card with validation, a loading button and a passkey as the second way in.
- **Phone app**: touch at comfortable density. A large title, a gauge that follows ticked rows, a bottom tab bar and a bottom Sheet with a form.
- **Pricing page**: a content site. A header that folds into a menu on phones, a display headline with a `Mark`, plans with the recommended one as the accent card, and questions in an Accordion.

## Radix, Motion and shadcn

**Radix for behavior, Motion for movement, our own code for everything visual.**

Radix provides behavior that is hard to get right: focus trapping and restoring, keyboard navigation in menus and selects, typeahead, dismissing on outside click and Escape, scroll locking, portals and collision-aware positioning. It is unstyled, so it puts no limit on the look. Motion provides springs, interruptible exit animations and gestures with velocity, which CSS can't do: the bottom sheet's drag to dismiss and the segmented thumb use it. Simple enter and exit animations stay in CSS, on the same spring curve.

| Kind of component                | Examples                                                                            | Built on                                                                |
| -------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Visual only                      | Text, Card, List, Button, Badge, Avatar, Skeleton, Input, Textarea, Label, Gauge    | Our own code. No Radix, apart from `@radix-ui/react-slot` for `asChild` |
| Behavior heavy                   | Dialog, AlertDialog, Sheet, Popover, DropdownMenu, Select, Tooltip, Tabs, Accordion | A Radix primitive, styled with our tokens, moved with Motion            |
| Small inputs with state and ARIA | Checkbox, Switch                                                                    | Radix for now. Cheap to replace later                                   |

The primitives are an internal detail. Screens import `Dialog` from `@/design-system`, never from `@radix-ui/*` directly, so the engine can be swapped without touching screens.

san-ui is distributed the way shadcn/ui is, as source copied into the app by the shadcn CLI, but it is not shadcn/ui: don't add shadcn components next to it. Build the missing component here, with stories, so every app gets it.

## From 0.3 to 0.4

0.4 is a rebuild; nothing used 0.3 yet, so there is no migration path, only a map:

| 0.3                                                | 0.4                                                        |
| -------------------------------------------------- | ---------------------------------------------------------- |
| `--brand-*` ramps, `--tint-hue`, `--ink-hue`       | `--accent-hue`, `--accent-chroma`, `--neutral-*`           |
| `bg-primary`, `text-muted-foreground`, `bg-card`   | `bg-accent`, `text-ink-secondary`, `bg-surface`            |
| `text-destructive`, `tone="destructive"`           | `text-danger`, `tone="danger"`                             |
| Type roles `title`, `heading`, `body-strong`       | `title-1`, `title-2` / `title-3`, `headline`               |
| Button `primary`, `secondary`, `ghost`, `inverse`  | `filled`, `tinted` + `neutral`, `plain`, an accent Surface |
| Button sizes `icon`, `icon-sm`                     | `icon` with `size`                                         |
| Card `soft`, `tinted`, `brand`; `size`; title icon | `surface`, `inset`, `accent`; the density sets the size    |
| `ScoreRing` and `scoreTone`                        | `Gauge` with a `tone` the app picks                        |
| `tw-animate-css`, Figtree and Bricolage            | The san-ui keyframes and the system font                   |
