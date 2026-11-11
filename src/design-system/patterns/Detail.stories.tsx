import type { Meta, StoryObj } from '@storybook/react-vite';

import { DetailScreen } from './Detail';

const meta = {
  title: 'Patterns/Detail screen',
  component: DetailScreen,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'One record made only of library parts: a large title with a back link, its status and actions, tabs for its views and a grouped list of its properties.',
      },
    },
  },
} satisfies Meta<typeof DetailScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Detail: Story = {};
