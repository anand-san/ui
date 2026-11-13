import type { Meta, StoryObj } from '@storybook/react-vite';

import { PricingPage } from './Pricing';

const meta = {
  title: 'Patterns/Pricing page',
  component: PricingPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A pricing page for a content site made only of library parts: a site bar, a display headline, a billing switch that changes the prices, three plans with one filled action, questions in an accordion and a quiet closing band.',
      },
    },
  },
} satisfies Meta<typeof PricingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pricing: Story = {};
