# @sandilya/ui

Color tokens, brand themes, base styles and the Tailwind CSS 3 preset for [san-ui](https://ui.sandilya.dev).

```bash
bun add @sandilya/ui
```

```js
// tailwind.config.js
import preset from '@sandilya/ui';

export default { presets: [preset], content: ['./src/**/*.{ts,tsx}'] };
```

```css
/* src/index.css */
@import '@sandilya/ui/tokens.css';
@import '@sandilya/ui/themes/eloovor.css'; /* or your own theme */
@import '@sandilya/ui/base.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

| File                 | What it is                                                        |
| -------------------- | ----------------------------------------------------------------- |
| `tokens.css`         | The shared base: every color role in light and dark, radius       |
| `themes/*.css`       | A brand: color ramps, the hues neutrals lean toward, fonts        |
| `base.css`           | Border, page and selection defaults the components assume         |
| `tailwind-preset.js` | Tailwind names for the tokens, radius, shadows, fonts, animations |

To make your own theme, copy `themes/template.css` into your app. The components come from the shadcn registry; setup, the theme contract and the rules are in the [repository README](https://github.com/anand-san/ui#readme).
