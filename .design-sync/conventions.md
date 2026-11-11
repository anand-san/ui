# san-ui: how to build with it

san-ui is a shared design system for every kind of app: tools and dashboards, consumer apps and content sites. It aims to feel native, after Apple's platforms: a tinted canvas with white grouped surfaces, the system font, one accent color, translucent menus and springs. These designs use the default theme (a blue accent and cool greys); apps change the accent and neutral hue, never the roles.

## Setup

- No provider is needed. Load `styles.css` and `_ds_bundle.js`, then take everything from `window.EloovorDesignSystem` (the global keeps an older name). Components and the lucide icon set share that global.
- Icons: `const { Plus, Search, Trash2 } = window.EloovorDesignSystem`. `Badge`, `Calendar`, `Gauge`, `List`, `Sheet` and `Text` are components, so use `BadgeIcon`, `CalendarIcon`, `GaugeIcon`, `ListIcon`, `SheetIcon` and `TextIcon` for those icons.
- Wrap any `Tooltip` in a `TooltipProvider`; Radix tooltips throw without it.
- Dark mode: `className="dark"` on an ancestor (usually `<html>`). `.light` inside it keeps a subtree light.
- Density: `data-density="compact"`, `"regular"` or `"comfortable"` on an ancestor sizes the type, controls and rows. Use `comfortable` for a phone design.
- `toast()` is not on the global, so `Toaster` shows nothing in a design. Use `Alert` for feedback.
- `Button` defaults to `type="button"`; give a form's submit button `type="submit"`.

## Styling: Tailwind classes on the roles

`_ds_bundle.css` is the compiled Tailwind. It contains only the classes the components and stories use, and Tailwind's default palette and type sizes are not built at all. For anything else, use an inline style on a token: `style={{ background: 'var(--surface-inset)' }}`.

| Purpose  | Classes                                                                                                                         |
| -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Surfaces | `bg-canvas` (page), `bg-surface` (cards, lists, fields), `bg-surface-inset` (a well inside a card)                              |
| Text     | `text-ink`, `text-ink-secondary` (supporting text), `text-accent` (links), `text-success`, `text-warning`, `text-danger`, `text-info` |
| Fills    | `bg-fill`, `bg-fill-hover`; `bg-accent text-accent-foreground`; soft tints `bg-accent-soft`, `bg-success-soft`, `bg-danger-soft` |
| Lines    | `border-separator`, `border-control`                                                                                            |
| Sizes    | `h-control-sm`, `h-control-md`, `h-control-lg`, `min-h-row`, `p-inset`, `p-panel`: these follow the density                    |
| Radius   | `rounded-control` fields, `rounded-card` cards and lists, `rounded-panel` menus, `rounded-sheet` dialogs, `rounded-full` buttons, badges, avatars |
| Spacing  | steps `0.5 1 1.5 2 3 4 6 8 12 16`. Page: `mx-auto w-full max-w-5xl px-4 py-6 md:px-8 md:py-10`; between groups `gap-6`, inside a card `gap-3` |

Rules: roles only, never `slate`, `gray`, hex or `text-sm`. Use `<Text variant>` for type: `display`, `title-1` (page), `title-2` (section, dialog), `title-3` (card), `headline` (row title), `body`, `subhead`, `caption`, `code`, with `tone` `secondary`, `accent`, `success`, `warning`, `danger` or `info`. Labels are sentence case. One `filled` button per view; `tinted` beside it, `plain` for quiet actions, `tone="neutral"` or `tone="danger"`. Use `<Mark>` on a few words, never a whole sentence. Cards never nest: inside a card use `Card variant="inset"`, a `List` or a `Separator`.

Settings and detail screens are `ListSection` > `List` > `ListItem` rows on `bg-canvas`. Form controls go inside `<Field label hint error required>`, with `id` on the Field.

## Where the truth is

`styles.css` imports `_ds_bundle.css`: grep it before using a class. Per component, read `components/<group>/<Name>/<Name>.prompt.md` (real story code) and `<Name>.d.ts` (props).

## Example

```jsx
const { PageHeader, ListSection, List, ListItem, Switch, Badge, Button, Card, CardHeader,
  CardTitle, CardDescription, CardAction, CardContent, Bell, CreditCard } = window.EloovorDesignSystem;

<div className="min-h-screen bg-canvas">
  <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-6 md:px-8 md:py-10">
    <PageHeader title="Settings" description="Your account and how we reach you." />
    <ListSection title="Notifications" footer="We never send more than one email a day.">
      <List>
        <ListItem leading={<Bell />} title="Push notifications" trailing={<Switch defaultChecked aria-label="Push notifications" />} />
        <ListItem leading={<CreditCard />} title="Plan" trailing={<Badge tone="accent">Pro</Badge>} chevron asChild>
          <a href="#plan" />
        </ListItem>
      </List>
    </ListSection>
    <Card>
      <CardHeader>
        <CardTitle>Storage</CardTitle>
        <CardDescription>12 GB of 50 GB used</CardDescription>
        <CardAction><Button variant="tinted" size="sm">Upgrade</Button></CardAction>
      </CardHeader>
    </Card>
  </div>
</div>
```
