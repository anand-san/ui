import tailwindcssAnimate from 'tailwindcss-animate';

/**
 * Tailwind names for the san-ui tokens (tokens.css plus a theme from
 * themes/). An app's tailwind.config.js uses this as a preset and adds only
 * its own domain colors and motion.
 */
const token = name => `hsl(var(--${name}))`;
const ramp = name =>
  Object.fromEntries(
    [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(step => [
      step,
      token(`${name}-${step}`),
    ]),
  );

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  theme: {
    extend: {
      // Radius by role: sm for chips, md for fields, lg for small cards,
      // xl for section cards, 2xl for dialogs. Buttons are pills.
      borderRadius: {
        sm: 'calc(var(--radius) - 4px)',
        md: 'calc(var(--radius) - 2px)',
        lg: 'var(--radius)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 8px)',
      },
      // The faces come from the theme (--font-sans, --font-display)
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
      },
      // Ink-tinted shadows, only for things that float: menus, dialogs, toasts
      boxShadow: {
        sm: '0 1px 2px hsl(var(--shadow-color) / 0.06)',
        DEFAULT:
          '0 1px 3px hsl(var(--shadow-color) / 0.08), 0 1px 2px hsl(var(--shadow-color) / 0.04)',
        md: '0 4px 12px -2px hsl(var(--shadow-color) / 0.1), 0 2px 4px hsl(var(--shadow-color) / 0.04)',
        lg: '0 12px 32px -8px hsl(var(--shadow-color) / 0.18), 0 2px 6px hsl(var(--shadow-color) / 0.06)',
        xl: '0 24px 56px -12px hsl(var(--shadow-color) / 0.26), 0 4px 12px hsl(var(--shadow-color) / 0.08)',
      },
      colors: {
        background: token('background'),
        foreground: token('foreground'),
        surface: token('surface'),
        card: { DEFAULT: token('card'), foreground: token('card-foreground') },
        popover: {
          DEFAULT: token('popover'),
          foreground: token('popover-foreground'),
        },
        muted: {
          DEFAULT: token('muted'),
          foreground: token('muted-foreground'),
        },
        primary: {
          DEFAULT: token('primary'),
          foreground: token('primary-foreground'),
        },
        brand: {
          DEFAULT: token('brand'),
          foreground: token('brand-foreground'),
          ...ramp('brand'),
        },
        highlight: {
          DEFAULT: token('highlight'),
          foreground: token('highlight-foreground'),
          ...ramp('highlight'),
        },
        destructive: {
          DEFAULT: token('destructive'),
          foreground: token('destructive-foreground'),
        },
        success: {
          DEFAULT: token('success'),
          foreground: token('success-foreground'),
        },
        warning: {
          DEFAULT: token('warning'),
          foreground: token('warning-foreground'),
        },
        info: { DEFAULT: token('info'), foreground: token('info-foreground') },
        border: token('border'),
        input: token('input'),
        ring: token('ring'),
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
