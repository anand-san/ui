# san-ui: how to build with it

san-ui is a shared design system for web apps (extracted from Eloovor, a job search workspace). These designs use its Eloovor theme, "ink and highlighter": the logo violet (`primary`/`brand`) for actions, violet-tinted neutrals, and marigold (`highlight`) as a fill behind dark text, never as text on white. Type is Figtree (`font-sans`), with Bricolage Grotesque (`font-display`) for titles and key numbers. Other apps keep the same components and roles with their own brand colors and fonts.

## Setup

- No provider is needed. Load `styles.css` and `_ds_bundle.js`, then take everything from `window.EloovorDesignSystem`. Components and the lucide icon set share that global.
- Icons: `const { Plus, Search, Trash2 } = window.EloovorDesignSystem`. `Badge`, `Calendar`, `Sheet` and `Text` are components, so use `CalendarIcon`, `BadgeIcon`, `SheetIcon` and `TextIcon` for those icons.
- Wrap any `Tooltip` in a `TooltipProvider`; Radix tooltips throw without it.
- Dark mode: put `className="dark"` on an ancestor (usually `<html>`). `.force-light-mode` keeps a subtree light, as for a printed resume.
- `toast()` is not on the global, so `Toaster` shows nothing in a design. Use `Alert` for feedback.
- `Button` defaults to `type="button"`; give a form's submit button `type="submit"`.

## Styling: Tailwind classes on the design tokens

`_ds_bundle.css` is the app's compiled Tailwind. It contains only the classes the app uses, so stick to the families below. For anything else, use an inline style on a token: `style={{ background: 'hsl(var(--surface))' }}`.

| Purpose | Classes |
|---|---|
| Surfaces | `bg-background` (page), `bg-surface` (section), `bg-card`, `bg-muted`, `bg-popover` |
| Text | `text-foreground`, `text-muted-foreground`, `text-primary`, `text-success`, `text-warning`, `text-info`, `text-destructive` |
| Fills | `bg-primary text-primary-foreground`, `bg-highlight text-highlight-foreground`; soft tints `bg-primary/5`, `bg-primary/10`, `bg-success/10`, `bg-destructive/10` |
| Ramps | `bg-brand-50` … `bg-brand-950`, `bg-highlight-50` … `bg-highlight-950`, only when no role fits |
| Lines | `border-border`, `border-input` |
| Radius | `rounded-md` fields, `rounded-lg` small cards, `rounded-xl` section cards and floating panels, `rounded-2xl` dialogs and sheets, `rounded-inset` rows inside a menu, `rounded-full` buttons, badges, avatars |
| Spacing | steps `0.5 1 1.5 2 3 4 6 8` (`gap-3`, `p-4`, `md:p-8`); 12 and 16 exist only for some properties, so grep first. Page: `mx-auto w-full max-w-6xl p-4 md:p-8`; between cards `gap-4`, items in a card `gap-3` |

Rules: semantic colors first, never `slate`, `gray`, `zinc`, `indigo` or `violet`. Use `<Text variant>` for type, not text sizes: `display`, `title`, `heading`, `subheading`, `body-lg`, `body`, `body-strong`, `caption`, `label`, `code`, with `tone` `muted`, `brand`, `success`, `warning`, `info` or `destructive`. Labels are sentence case. Use one `primary` button per view. Use `<Mark>` on a few words, never a whole sentence.

Cards: `variant="soft"` (default) for a page section, `tinted` for an item inside a section, `outline` straight on the page, `brand` for a promo banner with `inverse` buttons. Card padding and gaps come from `size` (`lg`, `md`, `sm`), so don't add your own. Form controls go inside `<Field label hint error required>`, with `id` on the Field.

## Where the truth is

`styles.css` imports `_ds_bundle.css`: grep it before using a class. Per component, read `components/<group>/<Name>/<Name>.prompt.md` (real story code) and `<Name>.d.ts` (props).

## Example

```jsx
const { Card, CardHeader, CardTitle, CardAction, CardContent, CardDescription,
  StatusMenu, Avatar, Text, Button, History, Plus } = window.EloovorDesignSystem;

<div className="mx-auto w-full max-w-6xl p-4 md:p-8">
  <Card>
    <CardHeader>
      <CardTitle icon={<History />} count={1}>Recent</CardTitle>
      <CardAction><Button size="sm" variant="ghost"><Plus />New project</Button></CardAction>
    </CardHeader>
    <CardContent className="flex flex-col gap-3">
      <Card variant="tinted">
        <CardHeader>
          <Text variant="caption" truncate>Design</Text>
          <CardAction><StatusMenu value="In review" options={[{ value: "In review", tone: "warning" }]} /></CardAction>
        </CardHeader>
        <CardContent className="flex items-start gap-3">
          <Avatar name="Website redesign" tone="info" />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <CardTitle>Website redesign</CardTitle>
            <CardDescription className="line-clamp-2">New landing page, pricing and docs navigation.</CardDescription>
          </div>
        </CardContent>
      </Card>
    </CardContent>
  </Card>
</div>
```
