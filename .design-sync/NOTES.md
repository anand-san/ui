# design-sync notes (san-ui)

Synced to claude.ai/design project "Eloovor Design System v2" (projectId in config.json).
The pipeline moved here from the Eloovor repo on 2026-11-07, when the design system became
san-ui; it has not been re-run since the move. `pkg` and `globalName` keep their Eloovor names
(`@eloovor/design-system`, `window.EloovorDesignSystem`) so existing designs in the project
keep working; renaming them means updating those designs. The older "Eloovor Design System"
project (2026-10-11, the shadcn `components/ui` era) is not synced from here; leave it alone.

## Re-sync recipe (from the repo root)

1. Stage the skill scripts into `.ds-sync/` (base skill §2.4), then
   `cd .ds-sync && npm i esbuild ts-morph @types/react playwright@1.63.0`.
2. `node .design-sync/build-ds.mjs` (the package wrapper; always, it's gitignored).
3. If anything under `src/design-system` or `.storybook` changed:
   `bunx storybook build -o .design-sync/sb-reference`.
4. Fetch `_ds_sync.json` from the project into `.design-sync/.cache/remote-sync.json`, then
   `node .ds-sync/resync.mjs --config .design-sync/config.json --node-modules node_modules --out ./ds-bundle --remote .design-sync/.cache/remote-sync.json`.

## Build setup

- [GENERAL] The components are source (`src/design-system`, shipped through the shadcn
  registry), not a package with a `dist/`. `node .design-sync/build-ds.mjs` (cfg.buildCmd) writes a throwaway package
  to `.design-sync/.cache/ds-pkg/`: `index.ts` re-exports the DS barrel (esbuild bundles the
  TS source, `@/` resolved via cfg.tsconfig = tsconfig.json), `types/` holds tsc
  declarations from `.design-sync/tsconfig.ds.json` with `@/` rewritten to relative paths,
  and `node_modules` links to the repo's `node_modules`. Run it before every converter run.
- 0.4 (2026-11-11) rebuilt the system: new color roles, type roles, Button and Card variants,
  `List`, `Surface` and `Gauge` (ScoreRing is gone). Designs in the project made against 0.3
  use the old class and prop names and need redoing after the next sync.
- Only a missing `types/design-system/index.d.ts` is fatal; other tsc errors are reported and
  declarations still emit.
- Reference storybook: `bunx storybook build -o .design-sync/sb-reference`.
- Playwright: this machine caches chromium-1243, which is playwright 1.63.0. Install that
  exact version in `.ds-sync/` (`npm i playwright@1.63.0`); latest wants a newer build.
- Node: the sync ran on node 24.14.0 without issues.

## Stories to components

- [GENERAL] Five story files each cover a family under one title (Components/Forms,
  Overlays, Feedback, Navigation, Layout). The fork `.design-sync/overrides/source-storybook.mjs`
  regroups their stories by story id into one card per component (36 cards), and sets
  the pane groups. A new story in a grouped file needs an entry in its STORY_COMPONENTS
  map, or the build warns and drops it. Editing the fork re-grades every component.
- Foundations stories (Colors, Typography, Spacing) are excluded via titleMap null: they
  document tokens, which ship in `_ds_bundle.css`.

## Styling

- [GENERAL] `.storybook/preview.css` loads only the tokens: the type is the system font, so
  there are no font files. The Theme toolbar injects a theme's inputs as an inline style and
  the Density toolbar sets `data-density`; previews get neither, so they render the default
  theme at the pointer's density.
- [GENERAL] `_ds_bundle.css` is Storybook's compiled Tailwind (CSS_FROM_STORYBOOK), so it
  holds only the utility classes used somewhere in `src` (the `@source` paths in
  `.storybook/preview.css`), plus the tokens. Tailwind's palette and type sizes are never built.

## Previews

- [GENERAL] No preview is owned. Stories that use `/images/...` (Storybook's
  `staticDirs: ['../public']`) would render a broken image; if one comes back, own its preview
  in `.design-sync/previews/` and import the file instead (inlined as a data URL).
- Overlay stories (Dialog, Popover and tooltip) render their closed triggers in Storybook, so
  the cards show the triggers too.
- Card uses `overrides.Card.viewport: "900x900"`: its "Dashboard: layout" story is
  fullscreen and 840px tall, so the default 900x700 capture cut it off.
- Badge, Card, EmptyState use `cardMode: "column"` (validate flagged them [GRID_OVERFLOW] wide).

## Bundle contents

- [GENERAL] `extraEntries: ["lucide-react"]` puts the app's whole icon set on
  `window.EloovorDesignSystem` (+~650 KB), since every screen and story uses lucide icons.
  Badge, Calendar, Gauge, List, Sheet and Text are both components and icons: the components
  win, and the icons are reachable as `BadgeIcon`, `CalendarIcon`, `GaugeIcon`, `ListIcon`,
  `SheetIcon`, `TextIcon`.
  `storyImports.bundle: ["lucide-react"]` makes stories bundle their own icons from source,
  so a story importing the `Calendar` icon still gets the icon.
- `.design-sync/conventions.md` (cfg.readmeHeader) is the design agent's guide; every class,
  component and icon in it was checked against `_ds_bundle.css` and the bundle.

## Known warns

- `[EXPORT_COLLISION] lucide-react exports 6 name(s) ... Badge, Calendar, Gauge, List, Sheet, Text`: expected,
  see Bundle contents. Prints on every build.
- `[REFERENCE_STALE?]` after a config-only rebuild: expected when the DS source didn't change.

## Re-sync risks

- The fork's STORY_COMPONENTS map is keyed by story id. Renaming or adding stories in the
  grouped files (Forms, Overlays, Feedback, Navigation, Layout) needs a matching map edit.
- conventions.md names classes from the compiled CSS. If the app stops using a class, Tailwind
  drops it from the build, and the header then names a class that no longer exists. Re-run the
  header validation on every sync.
- Overlay stories only show closed triggers, so open dialogs, menus and sheets were never
  visually compared. The shared stories (Fields, Choice controls, Popover and tooltip,
  Highlighter) are graded once and pixel-matched for the others.
- Toolchain: playwright 1.63.0 against the cached chromium-1243; Storybook 10.6.2; node 24.14.0.
