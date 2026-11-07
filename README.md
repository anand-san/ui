# san-ui

The design system behind [Eloovor](https://www.eloovor.com), shared across apps: one base (neutrals, feedback colors, type scale, spacing, radius and about 30 React components) with each app's brand on top as a theme.

- **Docs and Storybook**: [ui.sandilya.dev](https://ui.sandilya.dev)
- **Tokens, themes and Tailwind theme**: [`@sandilya/ui`](https://www.npmjs.com/package/@sandilya/ui) on npm
- **Components**: a [shadcn registry](https://ui.sandilya.dev/r/registry.json). The source is copied into your app, so you own it and AI tools can read it
- **AI**: a Claude Code plugin with a skill that knows the rules (see [AI assistants](#ai-assistants))

Stack: React 18, Tailwind CSS 4, Radix primitives, class-variance-authority, lucide-react.

## Add it to an app

The app needs React, Tailwind CSS 4 and an `@/` alias that points at `src/` (in `tsconfig.json` and the bundler).

**1. Tokens**

```bash
bun add @sandilya/ui
```

**2. A theme.** Copy [`themes/template.css`](packages/tokens/themes/template.css) into the app as `src/brand.css` and set your brand (see [Themes](#themes)). Or use the Eloovor theme as is.

```css
/* src/index.css */
@import 'tailwindcss';
@import '@sandilya/ui/tokens.css';
@import './brand.css'; /* or '@sandilya/ui/themes/eloovor.css' */
@import '@sandilya/ui/theme.css';
@import '@sandilya/ui/base.css';
```

`@sandilya/ui/theme.css` gives Tailwind the token names (`bg-primary`, `text-muted-foreground`, `rounded-xl`, `shadow-lg`…), the `dark:` variant, and the `tw-animate-css` animations the components use.

Load your fonts in the app (the Eloovor theme expects `@fontsource-variable/figtree` and `@fontsource-variable/bricolage-grotesque`).

**3. Components.** The shadcn CLI needs a `components.json` (run `bunx shadcn@latest init` once, or write one by hand). Then:

```bash
# everything, with the index.ts barrel
bunx shadcn@latest add https://ui.sandilya.dev/r/san-ui.json

# or single components; their dependencies come along
bunx shadcn@latest add https://ui.sandilya.dev/r/button.json
```

Files land at `src/design-system/`, at the same paths as in this repo, and npm dependencies are installed for you. The components are now your app's own source, so import them through your `@/` alias, never from `@sandilya/ui` (which holds only tokens, themes and the Tailwind theme):

```tsx
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/design-system';
```

To take updates later, run the same `add` command with `--overwrite` and review the diff. Your local changes to those files are what the diff shows, so keep app-specific tweaks in your own components rather than in `src/design-system/`.

## Themes

[`tokens.css`](packages/tokens/tokens.css) is the shared base. A theme, imported after it, gives an app its brand:

| Variable                             | What it sets                                                                |
| ------------------------------------ | --------------------------------------------------------------------------- |
| `--brand-50` … `--brand-950`         | The brand ramp. `brand-600` is `primary` in light mode, `brand-300` in dark |
| `--highlight-50` … `--highlight-950` | The highlighter ramp. `highlight-300` is the `highlight` fill               |
| `--tint-hue`                         | The hue the neutrals (canvas, surfaces, borders) lean toward                |
| `--ink-hue`                          | The hue of text, and of shadows in light mode                               |
| `--font-sans`, `--font-display`      | Optional. System fonts otherwise                                            |

Values are bare HSL channels (`191 55% 31%`) so Tailwind opacity modifiers work. Set light values on `:root, .force-light-mode, .dark .force-light-mode` and dark-mode hues on `.dark`; a theme may override any role, usually `primary`, `brand`, `highlight` and `ring` in dark mode. Check `brand-600` against white and `highlight-950` on `highlight-300` for at least 4.5:1 contrast.

App-specific colors (Eloovor's pipeline statuses, say) belong to the app: define the variables in its CSS and their Tailwind names in an `@theme inline` block in the same file.

Dark mode is the `dark` class on an ancestor, usually `<html>`. `.force-light-mode` keeps a subtree light, for printed pages.

## AI assistants

The repo is a Claude Code plugin marketplace. In any project:

```
/plugin marketplace add anand-san/ui
/plugin install san-ui@san-ui
```

The `san-ui` skill teaches Claude the setup, the theme contract, the rules (semantic colors, type roles, spacing steps, radius, one primary button) and the component catalog. Other agents can read [ui.sandilya.dev/llms.txt](https://ui.sandilya.dev/llms.txt), which holds the same content.

## Working on the design system

```bash
bun install
bun run dev        # Storybook at http://localhost:6006
bun run typecheck
bun run test
bun run lint       # prettier
bun run build      # Storybook, registry and llms.txt in dist/
```

```
src/design-system/      the components and foundations, as apps receive them
packages/tokens/        @sandilya/ui: tokens.css, theme.css, base.css, themes
scripts/                registry.json and skill/llms.txt generators
plugins/san-ui/ the Claude Code plugin and its skill
.storybook/             the docs site, with a Brand toolbar to switch themes
```

The rules, the component guide and the migration table are in [`src/design-system/README.md`](src/design-system/README.md). New components get stories first, in both themes and both brands. `scripts/build-registry.ts` reads the imports, so a new component folder becomes a registry item with its dependencies on the next build.

### Releasing

- **Site and registry**: Cloudflare Workers builds `main` with `bun run build`, then `npx wrangler deploy` serves `dist/` (see `wrangler.jsonc`) at ui.sandilya.dev. Apps pick up component changes with `bunx shadcn@latest add https://ui.sandilya.dev/r/san-ui.json --overwrite`.
- **Tokens package**: bump `version` in `packages/tokens/package.json` and merge to `main`. The Release workflow (`.github/workflows/release.yml`) runs the checks and publishes `@sandilya/ui` with npm trusted publishing, only when that version isn't on npm yet. The registry's `foundations` item picks up the new version range on the same build.
- **Plugin**: bump `plugins/san-ui/.claude-plugin/plugin.json` when the skill changes.
- **Claude Design**: `.design-sync/` holds the pipeline that syncs the components to claude.ai/design; see its `NOTES.md`.

## License

[MIT](LICENSE)
