import type { Meta, StoryObj } from '@storybook/react-vite';

import { PhoneAppScreen } from './PhoneApp';

const meta = {
  title: 'Patterns/Phone app',
  component: PhoneAppScreen,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The habits screen of a phone app made only of library parts at the comfortable density: a large title, a segmented control, a gauge that follows the checked rows, a tab bar and a bottom sheet to add a habit.',
      },
    },
  },
} satisfies Meta<typeof PhoneAppScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PhoneApp: Story = {
  name: 'Phone app',
};

export const AddingAHabit: Story = {
  name: 'Adding a habit',
  args: { sheetOpen: true },
};
