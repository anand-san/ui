# @sandilya/ui

Color tokens, brand themes, base styles and the Tailwind CSS 4 theme for [san-ui](https://ui.sandilya.dev).

```bash
bun add @sandilya/ui
```

```css
/* src/index.css */
@import 'tailwindcss';
@import '@sandilya/ui/tokens.css';
@import '@sandilya/ui/themes/eloovor.css'; /* or your own theme */
@import '@sandilya/ui/theme.css';
@import '@sandilya/ui/base.css';
```

| File           | What it is                                                                      |
| -------------- | ------------------------------------------------------------------------------- |
| `tokens.css`   | The shared base: every color role in light and dark, radius                     |
| `themes/*.css` | A brand: color ramps, the hues neutrals lean toward, fonts                      |
| `theme.css`    | Tailwind names for the tokens, radius, shadows, fonts, dark variant, animations |
| `base.css`     | Border, cursor, page and selection defaults the components assume               |

To make your own theme, copy `themes/template.css` into your app. The components come from the shadcn registry; setup, the theme contract and the rules are in the [repository README](https://github.com/anand-san/ui#readme).
