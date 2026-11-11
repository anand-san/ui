# @sandilya/ui

Design tokens, themes, base styles and the Tailwind CSS 4 theme for [san-ui](https://ui.sandilya.dev): OKLCH color roles that stay WCAG AA for any theme, density, type, springs and materials.

```bash
bun add @sandilya/ui
```

```css
/* src/index.css */
@import 'tailwindcss';
@import '@sandilya/ui/tokens.css';
@import '@sandilya/ui/themes/forest.css'; /* optional: or your own theme */
@import '@sandilya/ui/theme.css';
@import '@sandilya/ui/base.css';
```

| File           | What it is                                                                           |
| -------------- | ------------------------------------------------------------------------------------ |
| `tokens.css`   | Every role in light and dark, derived from the theme inputs; density; radius; motion |
| `themes/*.css` | Five inputs: accent hue and chroma, neutral hue and chroma, radius scale             |
| `theme.css`    | Tailwind names for the roles, in place of Tailwind's defaults; keyframes; `material` |
| `base.css`     | Page, border, selection and placeholder defaults the components assume               |

To make your own theme, copy `themes/template.css` into your app. The components come from the shadcn registry; setup, the theme contract and the rules are in the [repository README](https://github.com/anand-san/ui#readme).
