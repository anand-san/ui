---
name: san-ui
description: Build and review React UI with the san-ui design system (tokens from @sandilya/ui, components in src/design-system/ imported from '@/design-system'). Use when a project has src/design-system/, @sandilya/ui in package.json, or imports from '@/design-system'; when adding the design system to a new app or creating a theme; and when writing, restyling or reviewing screens, components, colors, typography, spacing, density, motion or dark mode in such a project.
---

# san-ui

One interface for every app, with a native feel after Apple's platforms: OKLCH color roles that stay WCAG AA for any theme, a density system, springs, translucent materials and about 30 React 19 components on Tailwind CSS 4, Radix and Motion. Docs: https://ui.sandilya.dev.

- Tokens, themes, base styles and the Tailwind theme: the `@sandilya/ui` npm package.
- Components: copied into the app at `src/design-system/` from the shadcn registry at `https://ui.sandilya.dev/r/<item>.json`. The app owns these files; read them for props instead of guessing.

## First, find out where you are

1. `src/design-system/index.ts` exists: the system is installed. Import from `@/design-system` and follow the rules below.
2. Only `@sandilya/ui` is installed, or neither: set it up, per [references/setup.md](references/setup.md).
3. You are in the san-ui repo itself (it has `packages/tokens/` and `scripts/build-registry.ts`): new components need stories first, in light and dark, in every theme and density (the Storybook toolbars).

## Rules

1. **Roles, not colors.** Surfaces: `bg-canvas` (page), `bg-surface` (cards, lists, fields), `bg-surface-inset`, `bg-overlay`. Text: `text-ink`, `text-ink-secondary` (supporting text, placeholders), `text-ink-tertiary` (disabled and decoration only). Fills: `bg-fill`, `bg-fill-hover`, `bg-fill-strong`. Lines: `border-separator`, `border-control`. Accent: `bg-accent` + `text-accent-foreground` for fills, `text-accent` for text and links, `bg-accent-soft`. Status: `bg-success`, `text-success`, `bg-success-soft`, and the same for `warning`, `danger`, `info`. Tailwind's palette (`bg-slate-500`) and sizes (`text-sm`) are not built. Never hex, `rgb()` or `hsl()` in components.
2. **Highlight is a fill.** Use it through `<Mark>`, `<Badge tone="highlight">` or `bg-highlight text-highlight-foreground`, on a few words.
3. **Type roles.** `<Text variant>` or `textVariants({ variant })`: `display`, `title-1` (page title), `title-2` (section, dialog), `title-3` (card), `headline` (a row's title), `body`, `subhead`, `caption`, `code`; `tone` for color; `numeric` for digits that line up. Emphasis comes from weight before size. Labels are sentence case, never `uppercase tracking-wider`.
4. **Density tokens.** Sizes that scale with the density are tokens: `h-control-sm|md|lg`, `min-h-row`, `p-inset`, `rounded-control`, `rounded-card`. `data-density="compact|regular|comfortable"` on any element sets them; the default is `regular` with a mouse and `comfortable` on touch. Other spacing uses `0.5 1 1.5 2 3 4 6 8 12 16`, and the `spacing` roles for the page frame.
5. **Corners by role.** `rounded-control` fields, `rounded-card` cards and lists, `rounded-panel` menus, `rounded-item` rows inside them, `rounded-sheet` dialogs, `rounded-full` buttons, badges and avatars.
6. **Grouped surfaces, no nesting.** White cards and lists on the tinted canvas. Inside a card use `Card variant="inset"`, a `List` or a `Separator`, never another card.
7. **One `filled` button per view.** `tinted` beside it, `plain` for quiet actions, `link` in a sentence; `tone="neutral"` for secondary, `tone="danger"` for destructive. Submit buttons need `type="submit"` (Button defaults to `type="button"`).
8. **Focus, touch and press.** Anything clickable takes `focusRing`, never `focus-visible:ring-2`; fields keep their own ring. A control under 44px adds `touchTarget`; keep other controls `(44 − size) ÷ 2` away. Clickable surfaces take `pressable`.
9. **Motion.** Springs from `springs` in `@/design-system` (Motion) or `ease-spring` in CSS. No bounce on things that just appear; bounce only after a gesture. Never animate without honouring reduced motion: Motion's `MotionConfig reducedMotion="user"` or `motion-reduce:`.
10. **Every mode.** Everything must work with `dark` on `<html>`, in every theme and density. Tokens handle it; a `dark:` override usually means a raw color slipped in.
11. **Use the component, not its look.** `<Card>`, `<List>`/`<ListItem>` for rows, `<Field label hint error required>` around every form control (put `id` on the Field), `<PageHeader>` for page titles, `<EmptyState>` for empty lists, `<Alert>` for inline feedback, `<Button loading>`. Screens import `Dialog`, `Select` and the rest from `@/design-system`, never from `@radix-ui/*`.
12. **Domain in the app, look in san-ui.** App components wrap san-ui components and add the data and mutations. Don't edit `src/design-system/` for one app's needs.

## Picking a component

| Need                              | Use                                                                                               |
| --------------------------------- | ------------------------------------------------------------------------------------------------- | ---- | ------- |
| Settings, details, a list of rows | `ListSection title footer` > `List` > `ListItem title description leading trailing chevron`       |
| A group of content                | `<Card>` with `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`           |
| A card that is a link             | `<Card interactive asChild><a href>…</a></Card>`                                                  |
| A promo or hero band              | `<Card variant="accent">` or `<Surface tone="accent">`; all buttons work inside                   |
| A status or label                 | `<Badge tone variant dot>`                                                                        |
| A status the user can change      | `<StatusMenu value options onValueChange>`                                                        |
| A form                            | `Field` + `Input` / `Textarea` / `Select` / `DatePicker`; `Checkbox`/`Switch` with `Label`        |
| A modal                           | `Dialog` (draggable bottom sheet on phones); `AlertDialog` with `AlertDialogAction tone="danger"` |
| A panel from an edge              | `Sheet` with `SheetContent side="bottom                                                           | left | right"` |
| Menus and hints                   | `DropdownMenu` (`tone="danger"` items), `Popover`, `Tooltip` (inside `TooltipProvider`)           |
| A few views of one thing          | `Tabs` (segmented control)                                                                        |
| App or site navigation            | `NavigationMenu`; `active` on the current link                                                    |
| Progress, a meter                 | `Progress`, `Gauge value label tone`                                                              |
| Loading                           | `Skeleton`, `Button loading`                                                                      |

The full component guide is in [references/design-system.md](references/design-system.md).

Whole screens built only from these components are in https://github.com/anand-san/ui/tree/main/src/design-system/patterns (Patterns at https://ui.sandilya.dev): settings, dashboard, search and filter, detail, create form, sign in, phone app and pricing page. They don't ship with the registry; to start a new screen, read the closest one and adapt it.

## Themes

A theme sets five inputs on `:root` and nothing else: `--accent-hue` (0 to 360), `--accent-chroma` (0 to 0.2), `--neutral-hue`, `--neutral-chroma` (0 to 0.03) and `--radius-scale`, plus optionally `--font-sans` and `--font-display`. Every role is derived from them at contrast that holds for any value, so there is nothing to check by hand. Start from `themes/template.css` or use `forest`, `ember` or `graphite`. Domain colors go in the app's own CSS and its `@theme inline` block. Details: [references/setup.md](references/setup.md#themes).

## Before you finish

Search the files you changed for slips:

```bash
grep -nE '(slate|gray|zinc|stone|neutral|blue|red|green)-[0-9]|text-(xs|sm|base|lg|xl)\b|text-\[[0-9]+px\]|uppercase tracking|#[0-9a-fA-F]{3,6}\b|from .@radix-ui' <files>
```

Then run the app's typecheck, and look at the screen in light and dark mode, and on a phone if you can.
