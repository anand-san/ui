---
name: san-ui
description: Build and review React UI with the san-ui design system (tokens from @sandilya/ui, components in src/design-system/ imported from '@/design-system'). Use when a project has src/design-system/, @sandilya/ui in package.json, or imports from '@/design-system'; when adding the design system to a new app or creating a brand theme; and when writing, restyling or reviewing screens, components, colors, typography, spacing or dark mode in such a project.
---

# san-ui

A shared base (neutral surfaces, feedback colors, type scale, spacing, radius, about 30 React components on Tailwind CSS 4 and Radix) with each app's brand on top as a theme. Docs: https://ui.sandilya.dev.

- Tokens, themes, base styles and the Tailwind theme: the `@sandilya/ui` npm package.
- Components: copied into the app at `src/design-system/` from the shadcn registry at `https://ui.sandilya.dev/r/<item>.json`. The app owns these files; read them for props instead of guessing.

## First, find out where you are

1. `src/design-system/index.ts` exists: the system is installed. Import from `@/design-system` and follow the rules below.
2. Only `@sandilya/ui` is installed, or neither: set it up, per [references/setup.md](references/setup.md).
3. You are in the san-ui repo itself (it has `packages/tokens/` and `scripts/build-registry.ts`): new components need stories first, in light and dark and in both brands (the Brand toolbar).

## Rules

1. **Semantic colors first.** `bg-background` (page), `bg-surface` (section), `bg-card`, `bg-muted`, `text-foreground`, `text-muted-foreground`, `text-primary`, `text-success`, `text-warning`, `text-info`, `text-destructive`, `border-border`, `border-input`. Use a ramp (`brand-200`, `highlight-300`, `neutral-200`) only when no role fits. Never `slate`, `gray`, `zinc`, `stone`, `emerald`, `indigo`, `violet`, `sky` or `rose`, and never hex or `rgb()` in components.
2. **Tints, not new colors.** A soft fill behind text is a token at `/5`, `/10` or `/20`: `bg-primary/5`, `bg-success/10 text-success`.
3. **Highlight is a fill, never text.** Use it through `<Mark>`, `<Badge tone="highlight">` or `bg-highlight text-highlight-foreground`, on a few words, never a whole sentence.
4. **Type roles, not sizes.** `<Text variant>` or `textVariants({ variant })` with `display`, `title`, `heading`, `subheading`, `body-lg`, `body`, `body-strong`, `caption`, `label` or `code`, and `tone` for color. No `text-[13px]` or other arbitrary sizes. Labels are sentence case, never `uppercase tracking-wider`.
5. **Spacing steps.** Only `0.5 1 1.5 2 3 4 6 8 12 16`. Use the `spacing` roles from `@/design-system` for page gutters, card padding and gaps. Items inside a card sit `gap-3` apart, cards `gap-4`.
6. **Radius by size.** `rounded-md` fields, `rounded-lg` small cards, `rounded-xl` section cards and floating panels, `rounded-2xl` dialogs and sheets, `rounded-inset` rows inside a menu, `rounded-full` buttons, badges and avatars.
7. **Focus and touch.** Anything clickable that isn't a text field takes `focusRing` from `@/design-system`, never `focus-visible:ring-2`. A control drawn smaller than 44px adds `touchTarget`, so its hit area reaches 44px on touch screens.
8. **One `primary` button per view.** Quiet actions inside cards are `ghost`; form submit buttons need `type="submit"` (Button defaults to `type="button"`).
9. **Both themes.** Everything must work with `dark` on `<html>`. Tokens handle it; a `dark:` override usually means a raw color slipped in.
10. **Use the component, not its look.** `<Card>` (not a styled div), `<Field label hint error required>` around every form control (put `id` on the Field), `<PageHeader>` for page titles, `<EmptyState>` for empty lists, `<Alert>` for inline feedback, `<Button loading>` instead of a spinner icon. Screens import `Dialog`, `Select` and the rest from `@/design-system`, never from `@radix-ui/*`.
11. **Domain in the app, look in san-ui.** App components (an order status dropdown, a project card) wrap san-ui components and add the data, types and mutations. Don't edit `src/design-system/` for one app's needs; if something is missing for every app, it belongs in the san-ui repo.

## Picking a component

| Need                               | Use                                                                                                           |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| A page section                     | `<Card>` (soft, size `lg`) with `CardHeader`, `CardTitle icon count`, `CardContent`                           |
| An item inside a section           | `<Card variant="tinted">` (size `sm`), `interactive` + `asChild` for a link                                   |
| A card straight on the page canvas | `<Card variant="outline">`                                                                                    |
| A promo banner                     | `<Card variant="brand">` with `Button variant="inverse"`                                                      |
| A status or label pill             | `<Badge tone variant dot>`                                                                                    |
| A status the user can change       | `<StatusMenu value options onValueChange>`; options take a `tone`, or the app's color classes via `className` |
| A form                             | `Field` + `Input` / `Textarea` / `Select` / `DatePicker`; `Checkbox`/`Switch` with `Label`                    |
| A modal                            | `Dialog` (bottom sheet on phones); `AlertDialog variant="destructive"` for deletes                            |
| A side panel                       | `Sheet`                                                                                                       |
| Menus and hints                    | `DropdownMenu` (`variant="destructive"` items), `Popover`, `Tooltip` (inside `TooltipProvider`)               |
| Switching views                    | `Tabs`                                                                                                        |
| Progress or a score                | `Progress`, `ScoreRing`                                                                                       |
| Loading                            | `Skeleton`, `Button loading`                                                                                  |

The full component guide, the Card size table and the migration table (old class or component → new) are in [references/design-system.md](references/design-system.md).

## Themes

A new app gets its own brand by copying `themes/template.css` from the tokens package and setting `--brand-*` and `--highlight-*` ramps, `--tint-hue`, `--ink-hue` and optionally `--font-sans` / `--font-display`. Values are bare HSL channels. Check 4.5:1 contrast for `brand-600` on white and `highlight-950` on `highlight-300`. Domain colors (like a pipeline status) go in the app's own CSS and its `@theme inline` block, not in the theme. Details: [references/setup.md](references/setup.md#themes).

## Before you finish

Search the files you changed for slips:

```bash
grep -nE '(slate|gray|zinc|stone|emerald|indigo|violet|sky|rose)-[0-9]|text-\[[0-9]+px\]|uppercase tracking|#[0-9a-fA-F]{3,6}\b|from .@radix-ui' <files>
```

Then run the app's typecheck, and look at the screen in light and dark mode if you can.
