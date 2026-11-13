import type { Meta, StoryObj } from '@storybook/react-vite';

import { DashboardScreen } from './Dashboard';

const meta = {
  title: 'Patterns/Dashboard',
  component: DashboardScreen,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "A shop's overview made only of library parts: a navigation bar, stat cards with their trend, a goal gauge over a breakdown, and recent orders whose status can change.",
      },
    },
  },
} satisfies Meta<typeof DashboardScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dashboard: Story = {};
