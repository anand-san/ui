import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@/design-system/components/Button/Button';
import { Field } from '@/design-system/components/Field/Field';
import { Input } from '@/design-system/components/Input/Input';
import { Text } from '@/design-system/components/Text/Text';

import { Surface } from './Surface';

const meta = {
  title: 'Components/Surface',
  component: Surface,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A region with its own background: a page section on the canvas, a white surface, an inset well, or the accent. Inside `accent` every role points at white, so text, buttons and fields need no special variants and keep their contrast for any theme.',
      },
    },
  },
  args: { tone: 'accent' },
  argTypes: {
    tone: {
      control: 'inline-radio',
      options: ['canvas', 'surface', 'inset', 'accent'],
    },
    asChild: { control: false },
  },
} satisfies Meta<typeof Surface>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: args => (
    <Surface {...args} className="flex flex-col gap-5 rounded-sheet p-8">
      <div className="flex flex-col gap-2">
        <Text variant="title-1">Ship the week, not the meeting</Text>
        <Text tone="secondary" className="max-w-md">
          Plans, notes and decisions in one place, for teams of two to two
          hundred.
        </Text>
      </div>
      <form
        className="flex max-w-md flex-col gap-2 sm:flex-row sm:items-end"
        onSubmit={event => event.preventDefault()}
      >
        <Field label="Work email" className="flex-1">
          <Input type="email" placeholder="you@company.com" />
        </Field>
        <Button type="submit">Start free</Button>
      </form>
    </Surface>
  ),
};
