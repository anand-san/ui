import type { Meta, StoryObj } from '@storybook/react-vite';

import { SettingsScreen } from './Showcase';

const meta = {
  title: 'Patterns/Settings screen',
  component: SettingsScreen,
  parameters: {
    docs: {
      description: {
        component:
          'A settings screen made only of library parts: a large title, a segmented control, grouped lists and one filled action.',
      },
    },
  },
} satisfies Meta<typeof SettingsScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Settings: Story = {};
