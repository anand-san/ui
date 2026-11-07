import './preview.css';

import eloovorTheme from '@sandilya/ui/themes/eloovor.css?inline';
import templateTheme from '@sandilya/ui/themes/template.css?inline';
import { withThemeByClassName } from '@storybook/addon-themes';
import type { Decorator, Preview } from '@storybook/react-vite';

// Brand themes are swapped as one <style> tag, so only one is ever applied
const brands: Record<string, string> = {
  eloovor: eloovorTheme,
  template: templateTheme,
};

const withBrand: Decorator = (Story, context) => {
  const brand = (context.globals.brand as string) ?? 'eloovor';
  let style = document.getElementById('brand-theme');
  if (!style) {
    style = document.createElement('style');
    style.id = 'brand-theme';
    document.head.appendChild(style);
  }
  style.textContent = brands[brand] ?? brands.eloovor;
  return <Story />;
};

const preview: Preview = {
  parameters: {
    layout: 'padded',
    // Themes come from the design system's own light and dark tokens
    backgrounds: { disable: true },
    controls: {
      expanded: true,
      matchers: { color: /(background|color)$/i },
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Foundations',
          ['Colors', 'Typography', 'Spacing'],
          'Components',
          'Guides',
        ],
      },
    },
  },
  globalTypes: {
    brand: {
      description: 'Brand theme',
      toolbar: {
        title: 'Brand',
        icon: 'paintbrush',
        items: [
          { value: 'eloovor', title: 'Eloovor' },
          { value: 'template', title: 'Template (teal)' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { brand: 'eloovor' },
  decorators: [
    withBrand,
    withThemeByClassName({
      themes: { light: '', dark: 'dark' },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
