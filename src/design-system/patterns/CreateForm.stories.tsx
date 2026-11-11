import type { Meta, StoryObj } from '@storybook/react-vite';

import { CreateFormScreen } from './CreateForm';

const meta = {
  title: 'Patterns/Create form',
  component: CreateFormScreen,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A long form to create a record, made only of library parts: a back link and a large title, titled groups of fields, a list of switches and one filled action that checks the form before it saves.',
      },
    },
  },
} satisfies Meta<typeof CreateFormScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreateForm: Story = {};

export const WithErrors: Story = {
  name: 'After a failed submit',
  args: { failedSubmit: true },
};
