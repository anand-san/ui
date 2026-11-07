# san-ui

Shared foundations and components, extracted from Eloovor and meant for any app: a shared base (neutrals, feedback colors, type scale, spacing, radius, components) with each app's brand on top as a theme. Components are built and reviewed in Storybook first; screens are then moved onto them one at a time.

Apps get this folder through the shadcn registry at ui.sandilya.dev (it lands at the same path, `src/design-system/`), and the tokens, themes and Tailwind preset from the `@sandilya/ui` npm package. Setup is in the repository README. Nothing here imports app code: domain UI built on it lives in the app. The Storybook guide **Guides / Used in Eloovor** shows one app doing that.

```bash
bun run dev    # Storybook at http://localhost:6006; the Brand toolbar switches themes
bun run build  # Storybook and the registry in dist/
```

## Layout

```
design-system/
├── index.ts              # public exports: import from '@/design-system'
├── foundations/
│   ├── colors.ts         # token metadata, tint steps, supported ramps, migration map
│   ├── controls.ts       # shared control, floating panel, menu item and overlay classes
│   ├── typography.ts     # textVariants (the type scale) and its docs
│   └── spacing.ts        # spacing scale, spacing roles, radius
├── lib/                  # cn, useMediaQuery, the dialog layout hook
├── components/           # one folder per component, with its stories
└── docs/                 # foundation stories and their helpers (not exported)
```

The tokens live in `packages/tokens/` (published as `@sandilya/ui`):

```
packages/tokens/
├── tokens.css            # base color roles, light and dark, built on the theme's hues
├── base.css              # border, page and selection defaults the components assume
├── themes/
│   ├── eloovor.css       # the Eloovor brand: ramps, hues, fonts
│   └── template.css      # a working starting point for a new app's theme
└── tailwind-preset.js    # Tailwind names for the tokens
```

An app's CSS imports its fonts, `tokens.css`, one theme and `base.css`; its `tailwind.config.js` uses the preset and adds only its own domain colors and motion. App code never defines colors of its own; it uses the token classes.

## Themes

`tokens.css` is the base every app shares. A theme, imported after it, gives an app its brand:

| Variable                             | What it sets                                                                |
| ------------------------------------ | --------------------------------------------------------------------------- |
| `--brand-50` … `--brand-950`         | The brand ramp. `brand-600` is `primary` in light mode, `brand-300` in dark |
| `--highlight-50` … `--highlight-950` | The highlighter ramp. `highlight-300` is the `highlight` fill               |
| `--tint-hue`                         | The hue the neutrals (canvas, surfaces, borders) lean toward                |
| `--ink-hue`                          | The hue of text, and of shadows in light mode                               |
| `--font-sans`, `--font-display`      | Optional. System fonts otherwise. The app loads the font files              |

Set the hues and ramps for light mode on `:root, .force-light-mode, .dark .force-light-mode`, and the dark-mode hues on `.dark`. A theme may also override any role, usually `primary`, `brand`, `highlight` and `ring` in dark mode. Start a new app from `themes/template.css`, and check every story in both themes.

Domain colors, like the statuses of an app's own workflow, belong to the app: define the variables in the app's CSS and their Tailwind names in its `tailwind.config.js`, then pass the classes to components like `StatusMenu`.

## Direction: pen and highlighter

The base sets the structure; a theme fills in the colors and faces.

- **Ink**: `primary` is the brand color. Neutrals (`background`, `surface`, `muted`, `border`) lean slightly toward `--tint-hue` instead of pure grey. Dark mode is deep ink, not charcoal.
- **Highlighter**: the `highlight-*` ramp and the `highlight` token. It is a fill behind dark text, never text on white. Use it through `Mark`, `Badge tone="highlight"` and text selection.
- **Type**: `font-display` for `display`, `title` and `heading`; `font-sans` for the rest.
- **Shape**: buttons default to pills. Radius goes up with size: `rounded-md` fields, `rounded-lg` small cards, `rounded-xl` section cards, `rounded-2xl` dialogs.
- **Shadows** are tinted with `--shadow-color` and kept for floating things: menus, dialogs, toasts, the primary button.
- **Paper stays paper**: `.force-light-mode` (printed pages, document previews) resets to plain greys and Helvetica, a PDF's font.

## Rules

1. **Semantic colors first.** Use `bg-surface`, `text-muted-foreground`, `text-success` and so on. Use a ramp like `neutral-200` only when no role fits. Never use `slate`, `gray`, `zinc`, `stone`, `emerald`, `indigo`, `violet`, `sky`, `rose`: see the migration map below.
2. **Tints, not new colors.** For a soft fill behind text, use a token at `/5`, `/10` or `/20` (`bg-primary/5`, `bg-success/10 text-success`). These follow the surface they sit on in both themes.
3. **Type roles, not sizes.** Use `<Text variant>` or `textVariants()`. No `text-[10px]`, `text-[13px]` or other arbitrary sizes. Labels are sentence case, never `uppercase tracking-wider`.
4. **Spacing steps.** Only `0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16`. Use the `spacing` roles for page gutters, card padding and gaps between cards.
5. **Radius.** `rounded-md` for fields, `rounded-xl` for cards, `rounded-2xl` for dialogs, `rounded-full` for buttons, badges and avatars.
6. **Both themes.** Every story must look right in light and dark. Check with the theme switch in the Storybook toolbar.
7. **Stories first.** A new component gets stories, including one that rebuilds the real screen it comes from, before it is used in the app.

## Mark

`<Mark>` puts a highlighter stroke over a few words, like the terms a search matched. `variant="underline"` is a quieter marker line for longer passages. Mark a few words, never whole sentences.

## Card

| Variant   | Use                                                | Default size |
| --------- | -------------------------------------------------- | ------------ |
| `soft`    | A section of a page (Recent, Your projects)        | `lg`         |
| `tinted`  | An item inside a section (one project)             | `sm`         |
| `outline` | Straight on the page canvas, where a fill vanishes | `lg`         |

| Size | Use                    | Padding     | Gap | Title role    |
| ---- | ---------------------- | ----------- | --- | ------------- |
| `lg` | Page sections          | 16px → 24px | 16  | `heading`     |
| `md` | Sheets, dialogs, rails | 16px        | 16  | `subheading`  |
| `sm` | Items inside a card    | 16px        | 12  | `body-strong` |

Child cards sit 12px apart (`spacing.items`). Padding is on the card and its parts are spaced by a gap, so you never add `pt-0` or per-part insets. Use `interactive` for hover and focus states and `asChild` to render the card as a `<Link>`.

## Components

- **Button**: `primary` (one per view), `secondary` (the child card tint), `outline`, `ghost` (quiet actions inside cards), `destructive`, `link`, and `inverse` / `inverse-soft` for brand banners. Sizes `sm`, `md`, `lg`, `icon-sm`, `icon`. Pills by default; `shape="rounded"` squares them off for toolbars and segmented groups. `loading` shows a spinner and disables it. It defaults to `type="button"`, so form submit buttons need `type="submit"`.
- **Card**: also has a `brand` variant for promo banners, with white text in both themes.
- **Badge**: seven tones (`neutral`, `brand`, `highlight`, `success`, `warning`, `info`, `destructive`) in `soft` (default), `solid` or `outline`, with an optional `dot`. `CardCount` is a neutral Badge.
- **StatusMenu**: a status badge that opens a menu to change the status. Options take a Badge `tone`, or the app's own colors through `className` when there are more statuses than tones. Without `onValueChange` it is a read-only badge. It is safe inside a linked card: its clicks don't reach the card.
- **Avatar**: image with an initials fallback from `name`, in the same six tones and three sizes (24, 32, 40px).
- **Field**: wraps one control with its label and its hint or error, and links them: the label's `htmlFor`, `aria-describedby` to the message, `aria-invalid` when there is an `error`, and `aria-required` with `required` (which also adds the asterisk). Set `id` on the Field, not the control. `size="sm"` is the dense style for forms inside a list of entries: a small muted label and 32px controls. `labelAction` puts something at the right of the label row.
- **Forms**: `Input`, `Textarea` and `SelectTrigger` share one control style and the Button heights, and read their id, size and states from a surrounding `Field`. Use `Label` on its own only beside a `Checkbox` or `Switch`. `DatePicker` wraps react-day-picker and takes `label`, `required` and `error` itself. Custom controls can join a Field with `useFieldControl`.
- **PageHeader**: the title block of a page: the `title` role, a muted description, an optional icon tile and actions. `as="h2"` for a step inside a flow.
- **Overlays**: `Dialog` (a bottom sheet on phones), `AlertDialog` (Cancel plus an action; use `variant="destructive"` for deletions), `Sheet`, `Popover`, `DropdownMenu` (items take `variant="destructive"`), `Tooltip`.
- **Navigation**: `Tabs` (pill segmented control, scrolls with arrows when it overflows), `Accordion`, `NavigationMenu` (the desktop header).
- **Feedback**: `Alert` in six tones, `Progress` and `ScoreRing` with tone colors, `Skeleton`, and `Toaster` for `sonner` toasts.
- **EmptyState**: `sm` (the default) for an empty list inside a card, with an icon. `lg` for a whole page or panel; with an `image` it sits beside the text from md. Use it for empty lists, pages waiting on the user (work in progress, a limit reached, setup to finish), the error boundary and maintenance screens.
- **Layout**: `Separator` and `ScrollArea`.

## Radix and shadcn

**Decision: Radix for behavior, our own code for everything visual.**

Radix provides behavior that is hard to get right and easy to get subtly wrong: focus trapping and restoring in dialogs, keyboard navigation in menus and selects, typeahead, dismissing on outside click and Escape, scroll locking, portals, and collision-aware positioning for popovers and tooltips. It is unstyled, so it puts no limit on the look.

| Kind of component                | Examples                                                                            | Built on                                                                |
| -------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Visual only                      | Text, Card, Button, Badge, Avatar, Skeleton, Input, Textarea, Label, Progress       | Our own code. No Radix, apart from `@radix-ui/react-slot` for `asChild` |
| Behavior heavy                   | Dialog, AlertDialog, Sheet, Popover, DropdownMenu, Select, Tooltip, Tabs, Accordion | A Radix primitive, styled with our tokens                               |
| Small inputs with state and ARIA | Checkbox, Switch                                                                    | Radix for now. Cheap to replace later                                   |

Base UI and React Aria Components are capable alternatives, but they solve the same problems Radix already solves here. Revisit only if Radix stops being maintained.

The Radix primitive is an internal detail. Screens import `Dialog` from `@/design-system`, never from `@radix-ui/*` directly, so the engine can be swapped without touching screens.

san-ui is distributed the way shadcn/ui is, as source copied into the app by the shadcn CLI, but it is not shadcn/ui: don't add shadcn components next to it. Build the missing component here, with stories, so every app gets it.

## Migrating a screen

When you move an existing screen onto san-ui (from shadcn/ui, or from hand-written Tailwind), use these replacements:

| Old                                                        | New                                                   |
| ---------------------------------------------------------- | ----------------------------------------------------- |
| `@/components/ui/*`                                        | The same component from `@/design-system`             |
| Title with icon and a count span                           | `<CardTitle icon={…} count={n}>`                      |
| Cards in sheets and dialogs                                | `<Card size="md">`                                    |
| `text-gray-500`, `text-slate-500`                          | `text-muted-foreground` or `<Text variant="caption">` |
| `Avatar` + `AvatarFallback` + `getInitials`                | `<Avatar name={…} tone="info">`                       |
| `Label` + control + `{errors.x && <FieldMessage>}`         | `<Field label error={errors.x?.message}>`             |
| `<p className="text-sm text-red-500">` under a field       | `<Field error>`, or `<FieldMessage error>`            |
| `border-red-500` on an invalid field                       | `<Field error>`, or `aria-invalid`                    |
| `"Name *"` in a label                                      | `<Field label="Name" required>`                       |
| Page `<h1>`/`<h2 className="text-2xl…">` + muted paragraph | `<PageHeader title description>`                      |
| `<Loader2 className="animate-spin" />` inside a Button     | `<Button loading>`                                    |
| Red `DropdownMenuItem` classes                             | `<DropdownMenuItem variant="destructive">`            |
| `slate`, `gray`, `zinc`, `stone`                           | `neutral`, or a semantic token                        |
| `emerald`, `teal`                                          | `success`, or `green`                                 |
| `violet`, `indigo`                                         | `brand`, or `purple`                                  |
| `rose`, `pink`                                             | `destructive`, or `red`                               |
| `sky`, `cyan`                                              | `info`, or `blue`                                     |
