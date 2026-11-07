# san-ui

Shared foundations and components, built for Eloovor and meant for any app: a shared base (neutrals, feedback colors, type scale, spacing, radius, components) with each app's brand on top as a theme. Components are built and reviewed in Storybook first; screens are then moved onto them one at a time.

Apps get this folder through the shadcn registry at ui.sandilya.dev (it lands at the same path, `src/design-system/`), and the tokens, themes and Tailwind preset from the `@sandilya/ui` npm package. Setup is in the repository README. Nothing here imports app code: app-specific UI built on it lives in the app, like Eloovor's pipeline `StatusBadge`.

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

Domain colors, like Eloovor's pipeline statuses, belong to the app: define the variables in the app's CSS and their Tailwind names in its `tailwind.config.js`.

## Direction: ink and highlighter (the Eloovor theme)

The base sets the structure: tinted neutrals, a deep-ink dark mode, a highlighter used as a fill, pill buttons, tinted shadows. The Eloovor theme fills it in:

- **Ink**: the logo violet `#574a7d` is `primary`. Neutrals (`background`, `surface`, `muted`, `border`) lean slightly toward it instead of pure grey. Dark mode is deep ink, not charcoal.
- **Highlighter**: marigold is the second brand color, as the `highlight-*` ramp and the `highlight` token. It is a fill behind dark text, never text on white. Use it through `Mark`, `Badge tone="highlight"` and text selection.
- **Type**: `font-display` (Bricolage Grotesque) for `display`, `title` and `heading`; `font-sans` (Figtree) for the rest.
- **Shape**: buttons default to pills. Radius goes up with size: `rounded-md` fields, `rounded-lg` small cards, `rounded-xl` section cards, `rounded-2xl` dialogs.
- **Shadows** are tinted with `--shadow-color` and kept for floating things: menus, dialogs, toasts, the primary button.
- **Paper stays paper**: `.force-light-mode` (resume preview, documents) resets to plain greys and Helvetica, the PDF's font.

## Rules

1. **Semantic colors first.** Use `bg-surface`, `text-muted-foreground`, `text-success` and so on. Use a ramp like `neutral-200` only when no role fits. Never use `slate`, `gray`, `zinc`, `stone`, `emerald`, `indigo`, `violet`, `sky`, `rose`: see the migration map below.
2. **Tints, not new colors.** For a soft fill behind text, use a token at `/5`, `/10` or `/20` (`bg-primary/5`, `bg-success/10 text-success`). These follow the surface they sit on in both themes.
3. **Type roles, not sizes.** Use `<Text variant>` or `textVariants()`. No `text-[10px]`, `text-[13px]` or other arbitrary sizes. Labels are sentence case, never `uppercase tracking-wider`.
4. **Spacing steps.** Only `0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16`. Use the `spacing` roles for page gutters, card padding and gaps between cards.
5. **Radius.** `rounded-md` for fields, `rounded-xl` for cards, `rounded-2xl` for dialogs, `rounded-full` for buttons, badges and avatars.
6. **Both themes.** Every story must look right in light and dark. Check with the theme switch in the Storybook toolbar.
7. **Stories first.** A new component gets stories, including one that rebuilds the real screen it comes from, before it is used in the app.

## Mark

`<Mark>` puts a highlighter stroke over a few words, like the keywords a resume matches in a job ad. `variant="underline"` is a quieter marker line for longer passages. Mark a few words, never whole sentences.

## Card

| Variant   | Use                                                | Default size |
| --------- | -------------------------------------------------- | ------------ |
| `soft`    | A section of a page (Recent, Your pipeline)        | `lg`         |
| `tinted`  | An item inside a section (one opportunity)         | `sm`         |
| `outline` | Straight on the page canvas, where a fill vanishes | `lg`         |

| Size | Use                    | Padding     | Gap | Title role    |
| ---- | ---------------------- | ----------- | --- | ------------- |
| `lg` | Page sections          | 16px → 24px | 16  | `heading`     |
| `md` | Sheets, dialogs, rails | 16px        | 16  | `subheading`  |
| `sm` | Items inside a card    | 16px        | 12  | `body-strong` |

Child cards sit 12px apart (`spacing.items`). The spacing follows Fit by dimension in the job fit report. Padding is on the card and its parts are spaced by a gap, so you never add `pt-0` or per-part insets. Use `interactive` for hover and focus states and `asChild` to render the card as a `<Link>`.

## Components

- **Button**: `primary` (one per view), `secondary` (the child card tint), `outline`, `ghost` (quiet actions inside cards), `destructive`, `link`, and `inverse` / `inverse-soft` for brand banners. Sizes `sm`, `md`, `lg`, `icon-sm`, `icon`. Pills by default; `shape="rounded"` squares them off for toolbars and segmented groups. `loading` shows a spinner and disables it. It defaults to `type="button"`, so form submit buttons need `type="submit"`.
- **Card**: also has a `brand` variant for promo banners (board promo, job fit next step), with white text in both themes.
- **Badge**: seven tones (`neutral`, `brand`, `highlight`, `success`, `warning`, `info`, `destructive`) in `soft` (default), `solid` or `outline`, with an optional `dot`. `CardCount` is a neutral Badge.
- **Avatar**: image with an initials fallback from `name`, in the same six tones and three sizes (24, 32, 40px).
- **Field**: wraps one control with its label and its hint or error, and links them: the label's `htmlFor`, `aria-describedby` to the message, `aria-invalid` when there is an `error`, and `aria-required` with `required` (which also adds the asterisk). Set `id` on the Field, not the control. `size="sm"` is the dense style of the resume block forms: a small muted label and 32px controls. `labelAction` puts something at the right of the label row.
- **Forms**: `Input`, `Textarea` and `SelectTrigger` share one control style and the Button heights, and read their id, size and states from a surrounding `Field`. Use `Label` on its own only beside a `Checkbox` or `Switch`. `DatePicker` wraps react-day-picker and takes `label`, `required` and `error` itself. Custom controls can join a Field with `useFieldControl`.
- **PageHeader**: the title block of a page: the `title` role, a muted description, an optional icon tile and actions. `as="h2"` for a step inside a flow.
- **Overlays**: `Dialog` (a bottom sheet on phones), `AlertDialog` (Cancel plus an action; use `variant="destructive"` for deletions), `Sheet`, `Popover`, `DropdownMenu` (items take `variant="destructive"`), `Tooltip`.
- **Navigation**: `Tabs` (pill segmented control, scrolls with arrows when it overflows), `Accordion`, `NavigationMenu` (the desktop header).
- **Feedback**: `Alert` in six tones, `Progress` and `ScoreRing` with tone colors, `Skeleton`, and `Toaster` for `sonner` toasts.
- **EmptyState**: `sm` (the default) for an empty list inside a card, with an icon. `lg` for a whole page or panel; with an `image` it sits beside the text from md. Analysis status, outdated analysis, quota reached, missing profile, the error boundary and the maintenance screen all use it.
- **Layout**: `Separator` and `ScrollArea`.

## Radix and shadcn

**Decision: keep Radix for behavior, own everything visual, and stop adding shadcn components.**

shadcn isn't a dependency. It's code that was copied into `src/components/ui/` once, so we already own it, along with its gray-on-gray look. That folder stays only until screens are migrated off it, and new components are written here instead.

Radix is a different matter. It provides behavior that is hard to get right and easy to get subtly wrong: focus trapping and restoring in dialogs, keyboard navigation in menus and selects, typeahead, dismissing on outside click and Escape, scroll locking, portals, and collision-aware positioning for popovers and tooltips. It is unstyled, so it puts no limit on the look. It is also actively maintained, with releases in October 2026.

| Kind of component                | Examples                                                                            | Built on                                                                |
| -------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Visual only                      | Text, Card, Button, Badge, Avatar, Skeleton, Input, Textarea, Label, Progress       | Our own code. No Radix, apart from `@radix-ui/react-slot` for `asChild` |
| Behavior heavy                   | Dialog, AlertDialog, Sheet, Popover, DropdownMenu, Select, Tooltip, Tabs, Accordion | A Radix primitive, styled with our tokens                               |
| Small inputs with state and ARIA | Checkbox, Switch, RadioGroup                                                        | Radix for now. Cheap to replace later if we want to                     |

Avatar, Label and Progress no longer use Radix: each is a few lines of our own code. Base UI and React Aria Components are capable alternatives, but they solve the same problems Radix already solves for us, and switching would only add churn. Revisit only if Radix stops being maintained.

When a behavior component is built here, the Radix primitive should be an internal detail. Screens import `Dialog` from `@/design-system`, never from `@radix-ui/*` directly, so the engine can be swapped later without touching screens.

## Migrating a screen

Every screen has been moved onto the design system and `src/components/ui/` is gone. When you touch older code or write new screens, use these replacements:

| Old                                                          | New                                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------------ |
| `@/components/ui/*`                                          | The same component from `@/design-system`                          |
| `bg-neutral-50 dark:bg-neutral-900` cards, `SOFT_CARD_CLASS` | `<Card>`                                                           |
| `bg-primary/5 rounded-xl` children, `CONFIG_ITEM_CLASS`      | `<Card variant="tinted">`                                          |
| Title with icon and a count span                             | `<CardTitle icon={…} count={n}>`                                   |
| Cards in sheets and dialogs                                  | `<Card size="md">`                                                 |
| `bg-chat-user` banners                                       | `<Card variant="brand">` with `inverse` buttons                    |
| `text-gray-500`, `text-slate-500`                            | `text-muted-foreground` or `<Text variant="caption">`              |
| `statusColors` / `statusTextColors`                          | `statusFillClass` / `statusTextClass` (app, `@/components/status`) |
| Status `Badge` with `statusColors[status]`                   | `<StatusBadge status={…}>` (app, `@/components/status`)            |
| `cn` from `@/lib/utils` inside the design system             | `cn` from `@/design-system/lib/cn`                                 |
| `Avatar` + `AvatarFallback` + `getInitials`                  | `<Avatar name={…} tone="info">`                                    |
| `Label` + control + `{errors.x && <FieldMessage>}`           | `<Field label error={errors.x?.message}>`                          |
| `<p className="text-sm text-red-500">` under a field         | `<Field error>`, or `<FieldMessage error>`                         |
| `border-red-500` on an invalid field                         | `<Field error>`, or `aria-invalid`                                 |
| `"Job title *"` in a label                                   | `<Field label="Job title" required>`                               |
| Page `<h1>`/`<h2 className="text-2xl…">` + muted paragraph   | `<PageHeader title description>`                                   |
| `IllustratedMessage`                                         | `<EmptyState image>`                                               |
| `<Loader2 className="animate-spin" />` inside a Button       | `<Button loading>`                                                 |
| Red `DropdownMenuItem` classes                               | `<DropdownMenuItem variant="destructive">`                         |
| `RainbowButton`                                              | `<Button size="lg">`                                               |
| `CircularProgress`                                           | `<ScoreRing>`                                                      |
| `slate`, `gray`, `zinc`, `stone`                             | `neutral`, or a semantic token                                     |
| `emerald`, `teal`                                            | `success`, or `green`                                              |
| `violet`, `indigo`                                           | `brand`, or `purple`                                               |
| `rose`, `pink`                                               | `destructive`, or `red`                                            |
| `sky`, `cyan`                                                | `info`, or `blue`                                                  |

The resume preview and PDF keep fixed neutrals (`neutral-*`, `bg-white`) inside `.force-light-mode`, because they show a printed page. The Elo glass dock and chat keep their own glass styling.

Design changes that come with a migration, on purpose:

- Child card hover is now `bg-primary/10`, which darkens in light mode. It used to be `neutral-100`, which was lighter than the card.
- Status colors use the 600 step in light mode and 400 in dark, so status text is readable on both. The app used 500 everywhere, which put yellow text below contrast on white.
- Item cards are spaced only by the list `gap-2`; `OpportunityCard` also added `mb-2`, doubling the gap.
- Status badges are soft (a tint behind colored text) instead of solid with white text, which failed contrast for yellow and for every status in dark mode.
- The `Closed` status (enum `REJECTED`) is shown by its label, `Closed`, as it is in the app.
- Labels, titles and buttons are sentence case across the app ("Add experience", not "Add Experience"), and the all-caps form headings are gone.
- Profile list sections (experience, education, awards…) are one card each, with the add button in the card header, instead of a separate "Add new" card.
- Toasts use the theme tokens instead of sonner's rich colors.
- Required fields show a muted asterisk from `Field`, instead of a hand-typed `*` (sometimes red, sometimes without a space).
- Page titles on the analyzer add forms are the `title` role (24px) on every screen size; they grew to 30px from md before.
- Resume editor fields are 32px high everywhere; the header block used 36px.

## Theme notes

- `destructive` is a desaturated red rather than Tailwind's red: `0 55% 48%` (`#be3737`) in light mode and `0 55% 65%` (`#d77575`) in dark, with red-950 text on solid fills in dark. Both pass AA as text (5.5:1 and 5.6:1). It used to be red-500 in light mode (3.8:1, too bright) and a dark red in dark mode that was unreadable as text. The app uses the same token, so every destructive button, error message and delete action changes with it.
