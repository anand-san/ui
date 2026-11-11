# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, confirmed 2026-11-11:

- **Builders.** Anand, and the AI coding agents working in his repos, who build new apps on san-ui and need one set of tokens, rules and components so every app stays consistent without redesigning the basics each time.
- **The people using those apps.** Three kinds of apps are planned, all in scope: tools and dashboards used at a desk with a mouse and keyboard, consumer apps used on phones by touch, and marketing and content sites read on any screen.

## Product Purpose

san-ui is the shared base for every app Anand builds: neutral surfaces, feedback colors, type, spacing, motion and about 30 React components, with each app's brand applied on top as a theme. Success means a new app gets a finished, accessible, consistent interface on day one and spends its design effort on its own domain.

## Positioning

A personal, cross-app system rather than a public kit: one owner, one rule set, distributed as source (a shadcn registry), so each app owns and can read its copy, and written for AI agents as much as for people (a Claude Code plugin skill and llms.txt carry the same rules).

## Operating Context

- Tokens, themes and the Tailwind theme ship as the `@sandilya/ui` npm package; components are copied into each app at `src/design-system/` by the shadcn CLI.
- Storybook at ui.sandilya.dev is the reference and review surface; new components get stories in light and dark, every theme and every density first.
- Apps run React with Tailwind CSS 4 and an `@/` alias to `src/`.

## Capabilities and Constraints

- No app uses san-ui yet (as of 2026-11-11), so breaking changes cost nothing until the first adoption.
- It is not tied to Eloovor or any other product; app-specific colors, statuses and components live in the app.
- Radix provides behavior for overlays and complex controls; Motion provides springs and gestures (approved 2026-11-11).
- The tokens package version for the redesign is 0.4.0.

## Brand Commitments

- Follows Apple's design principles as distilled in `.claude/skills/apple-design/` (the owner's choice, 2026-11-11).
- No brand of its own: each app supplies its brand through a theme.

## Evidence on Hand

None yet: no app, screenshot or user data exists. Stories use clearly invented sample content.

## Product Principles

1. One decision, made once: a rule lives in the system so no app has to make it again.
2. Accessible by construction: contrast, focus, touch size and reduced motion are guaranteed by tokens and components, not left to each screen.
3. Adapt to the device, not the app: density follows the pointer, so the same components serve a desk and a phone.
4. Readable by agents: every rule is written down where an AI agent will find it.

## Accessibility & Inclusion

WCAG 2.2 AA for every component in every theme, light and dark, at every density. Honors `prefers-reduced-motion`, `prefers-reduced-transparency`, `prefers-contrast` and the user's text size.
