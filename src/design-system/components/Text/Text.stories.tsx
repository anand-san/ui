import type { Meta, StoryObj } from '@storybook/react-vite';

import { Mark } from './Mark';
import { Text } from './Text';

const meta = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Renders a type role with its default element: `title-1` is an h1, `body` a p. Pick the role, and override the element with `as` when the outline needs it. `numeric` lines digits up.',
      },
    },
  },
  args: {
    children: 'Get a summary of what changed every Monday morning.',
    variant: 'body',
    tone: 'default',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'display',
        'title-1',
        'title-2',
        'title-3',
        'headline',
        'body',
        'subhead',
        'caption',
        'code',
      ],
    },
    tone: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'accent',
        'success',
        'warning',
        'danger',
        'info',
      ],
    },
    as: { control: false },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Highlighter: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`Mark` is the highlighter: a fill behind a few words, or a quieter line under them. Both keep the text readable in light and dark.',
      },
    },
  },
  render: () => (
    <div className="flex max-w-lg flex-col gap-3">
      <Text>
        Results for <Mark>quarterly report</Mark> in Documents.
      </Text>
      <Text>
        The comment is about{' '}
        <Mark variant="underline">the second paragraph</Mark>.
      </Text>
    </div>
  ),
};
