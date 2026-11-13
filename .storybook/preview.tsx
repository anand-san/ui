import './preview.css';

import emberTheme from '@sandilya/ui/themes/ember.css?inline';
import forestTheme from '@sandilya/ui/themes/forest.css?inline';
import graphiteTheme from '@sandilya/ui/themes/graphite.css?inline';
import { withThemeByClassName } from '@storybook/addon-themes';
import type { Decorator, Preview } from '@storybook/react-vite';

import { TooltipProvider } from '../src/design-system/components/Tooltip/Tooltip';

// A theme is one <style> tag after the tokens, so only one is ever applied.
// The default theme is the tokens themselves.
const themes: Record<string, string> = {
  default: '',
  forest: forestTheme,
  ember: emberTheme,
  graphite: graphiteTheme,
};

const withTheme: Decorator = (Story, context) => {
  let style = document.getElementById('san-ui-theme');
  if (!style) {
    style = document.createElement('style');
    style.id = 'san-ui-theme';
    document.head.appendChild(style);
  }
  style.textContent = themes[context.globals.brand as string] ?? '';
  return <Story />;
};

// Density goes on the root, so menus and dialogs in portals follow it too
const withDensity: Decorator = (Story, context) => {
  const density = context.globals.density as string;
  if (density && density !== 'auto') {
    document.documentElement.dataset.density = density;
  } else {
    delete document.documentElement.dataset.density;
  }
  return <Story />;
};

const withProviders: Decorator = Story => (
  <TooltipProvider>
    <Story />
  </TooltipProvider>
);

const preview: Preview = {
  parameters: {
    layout: 'padded',
    // Backgrounds come from the design system's own light and dark tokens
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
          ['Colors', 'Typography', 'Spacing', 'Motion'],
          'Components',
          'Patterns',
          [
            'Settings screen',
            'Dashboard',
            'Search and filter',
            'Detail screen',
            'Create form',
            'Sign in',
            'Phone app',
            'Pricing page',
          ],
        ],
      },
    },
  },
  globalTypes: {
    brand: {
      description: 'Theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'default', title: 'Default (blue)' },
          { value: 'forest', title: 'Forest' },
          { value: 'ember', title: 'Ember' },
          { value: 'graphite', title: 'Graphite' },
        ],
        dynamicTitle: true,
      },
    },
    density: {
      description: 'Density',
      toolbar: {
        title: 'Density',
        icon: 'component',
        items: [
          { value: 'auto', title: 'Auto (by pointer)' },
          { value: 'compact', title: 'Compact' },
          { value: 'regular', title: 'Regular' },
          { value: 'comfortable', title: 'Comfortable' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { brand: 'default', density: 'auto' },
  decorators: [
    withProviders,
    withTheme,
    withDensity,
    withThemeByClassName({
      themes: { light: '', dark: 'dark' },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
