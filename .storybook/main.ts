import type { StorybookConfig } from '@storybook/react-vite';

// The san-ui site: these stories, built to dist/ and served at
// ui.sandilya.dev with the component registry under /r.
const config: StorybookConfig = {
  stories: [
    '../src/design-system/**/*.mdx',
    '../src/design-system/**/*.stories.@(ts|tsx)',
  ],
  staticDirs: ['../public'],
  addons: ['@storybook/addon-docs', '@storybook/addon-themes'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
};

export default config;
