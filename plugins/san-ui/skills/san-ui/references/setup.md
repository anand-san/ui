<!-- Generated from README.md by scripts/build-docs.ts. Edit the source. -->

# san-ui

One interface for every app: tools and dashboards, consumer apps and content sites. It aims to feel native, the way Apple's platforms do: content first, quiet chrome, springs that can always be interrupted, and contrast that holds for any theme.

- **Docs and Storybook**: [ui.sandilya.dev](https://ui.sandilya.dev)
- **Tokens, themes and Tailwind theme**: [`@sandilya/ui`](https://www.npmjs.com/package/@sandilya/ui) on npm
- **Components**: a [shadcn registry](https://ui.sandilya.dev/r/registry.json). The source is copied into your app, so you own it and AI tools can read it
- **AI**: a Claude Code plugin with a skill that knows the rules (see [AI assistants](#ai-assistants))

Stack: React 19, Tailwind CSS 4, Radix primitives, Motion, class-variance-authority, lucide-react.

## Add it to an app

The app needs React 19, Tailwind CSS 4 and an `@/` alias that points at `src/` (in `tsconfig.json` and the bundler).

**1. Tokens**

```bash
bun add @sandilya/ui
```

**2. Styles.** Import the tokens, an optional theme, the Tailwind theme and the base styles:

```css
/* src/index.css */
@import 'tailwindcss';
@import '@sandilya/ui/tokens.css';
@import './theme.css'; /* optional: your theme, or '@sandilya/ui/themes/forest.css' */
@import '@sandilya/ui/theme.css';
@import '@sandilya/ui/base.css';
```

`@sandilya/ui/theme.css` replaces Tailwind's default colors, type sizes, radii and shadows with the san-ui roles (`bg-surface`, `text-ink-secondary`, `text-title-2`, `rounded-card`, `shadow-floating`…), so off-system classes like `bg-slate-500` or `text-sm` don't build. It also adds the `dark:` variant, the spring easing and the `material` utilities.

The type is the system font: San Francisco on Apple devices, Segoe UI or Roboto elsewhere. A theme may set `--font-sans` and `--font-display`; load those fonts in the app.

**3. Components.** The shadcn CLI needs a `components.json` (run `bunx shadcn@latest init` once, or write one by hand). Then:

```bash
# everything, with the index.ts barrel
bunx shadcn@latest add https://ui.sandilya.dev/r/san-ui.json

# or single components; their dependencies come along
bunx shadcn@latest add https://ui.sandilya.dev/r/button.json
```

Files land at `src/design-system/`, at the same paths as in this repo, and npm dependencies (Radix, Motion, react-day-picker…) are installed for you. The components are your app's own source, so import them through your `@/` alias, never from `@sandilya/ui` (which holds only tokens, themes and the Tailwind theme):

```tsx
import { List, ListItem, ListSection, Switch } from '@/design-system';
```

To take updates later, run the same `add` command with `--overwrite` and review the diff. Keep app-specific tweaks in your own components rather than in `src/design-system/`.

**4. Providers.** Put one `TooltipProvider` near the root if you use tooltips, and a `Toaster` if you use toasts.

## Themes

A theme sets five inputs and nothing else; every color role is derived from them in OKLCH, at a lightness that keeps WCAG AA contrast for any hue:

| Variable           | Default | What it sets                             |
| ------------------ | ------- | ---------------------------------------- |
| `--accent-hue`     | `250`   | The accent hue in degrees                |
| `--accent-chroma`  | `0.2`   | How vivid the accent is, 0 (grey) to 0.2 |
| `--neutral-hue`    | `250`   | The hue the greys lean toward            |
| `--neutral-chroma` | `0.008` | How far they lean, 0 to 0.03             |
| `--radius-scale`   | `1`     | Multiplies every corner radius           |

```css
/* src/theme.css */
:root {
  --accent-hue: 155;
  --accent-chroma: 0.15;
  --neutral-hue: 150;
  --neutral-chroma: 0.012;
  --radius-scale: 1.25;
}
```

Start from [`themes/template.css`](https://github.com/anand-san/ui/blob/main/packages/tokens/themes/template.css), or use a shipped theme: `forest`, `ember` or `graphite`. A test sweeps every hue and chroma in light and dark mode and fails if any text, control border or focus ring drops below its contrast minimum, so a theme can't break accessibility.

App-specific colors (a set of pipeline statuses, say) belong to the app: define the variables in its CSS and their Tailwind names in an `@theme inline` block in the same file.

**Modes.** Dark mode is the `dark` class on an ancestor, usually `<html>`; `.light` inside it keeps a subtree light. `prefers-contrast: more` darkens secondary text and lines, and `prefers-reduced-transparency` makes the materials solid.

**Density.** `data-density="compact" | "regular" | "comfortable"` on any element sizes the type, controls and rows inside it. Without it, a mouse gets `regular` and a touch screen `comfortable`, where every target is at least 44px.

## AI assistants

The repo is a Claude Code plugin marketplace. In any project:

```
/plugin marketplace add anand-san/ui
/plugin install san-ui@san-ui
```

The `san-ui` skill teaches Claude the setup, the theme contract, the rules (color roles, type roles, density, springs, one filled button) and the component catalog. Other agents can read [ui.sandilya.dev/llms.txt](https://ui.sandilya.dev/llms.txt), which holds the same content.

## Working on the design system

```bash
bun install
bun run dev        # Storybook at http://localhost:6006
bun run typecheck
bun run test       # unit tests and the contrast sweep
bun run lint       # prettier and the generated docs
bun run build      # Storybook, registry and llms.txt in dist/
```

```
src/design-system/      the components and foundations, as apps receive them
packages/tokens/        @sandilya/ui: tokens.css, theme.css, base.css, themes
scripts/                the registry and docs generators, and the token tests
plugins/san-ui/         the Claude Code plugin and its skill
.storybook/             the docs site, with Theme and Density toolbars
```

The rules and the component guide are in [`src/design-system/README.md`](https://github.com/anand-san/ui/blob/main/src/design-system/README.md); the design direction is in [`PRODUCT.md`](https://github.com/anand-san/ui/blob/main/PRODUCT.md) and [`DESIGN.md`](https://github.com/anand-san/ui/blob/main/DESIGN.md). New components get stories first, in light and dark, in every theme and density. `scripts/build-registry.ts` reads the imports, so a new component folder becomes a registry item with its dependencies on the next build.

### Releasing

- **Site and registry**: Cloudflare Workers builds `main` with `bun run build`, then `npx wrangler deploy` serves `dist/` (see `wrangler.jsonc`) at ui.sandilya.dev. Apps pick up component changes with `bunx shadcn@latest add https://ui.sandilya.dev/r/san-ui.json --overwrite`.
- **Tokens package**: bump `version` in `packages/tokens/package.json` and merge to `main`. The Release workflow (`.github/workflows/release.yml`) runs the checks and publishes `@sandilya/ui` with npm trusted publishing, only when that version isn't on npm yet. The registry's `foundations` item picks up the new version range on the same build.
- **Plugin**: bump `plugins/san-ui/.claude-plugin/plugin.json` when the skill changes.
- **Claude Design**: `.design-sync/` holds the pipeline that syncs the components to claude.ai/design; see its `NOTES.md`.

## License

[MIT](https://github.com/anand-san/ui/blob/main/LICENSE)
