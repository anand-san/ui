import type { Meta, StoryObj } from '@storybook/react-vite';

import { SearchAndFilterScreen } from './SearchAndFilter';

const meta = {
  title: 'Patterns/Search and filter',
  component: SearchAndFilterScreen,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A collection screen made only of library parts: a large title with one filled action, a search box, a role filter and a segmented control over a list of people with row menus, and empty and loading states.',
      },
    },
  },
} satisfies Meta<typeof SearchAndFilterScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SearchAndFilter: Story = {};

export const Loading: Story = {
  args: { loading: true },
};

export const Empty: Story = {
  args: { members: [] },
};
