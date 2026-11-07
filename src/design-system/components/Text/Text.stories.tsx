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
          'Renders text in one of the type scale roles. The role picks the size, weight and default element (title is h1, heading h2, subheading h3). Use `as` to change the element without changing the look.',
      },
    },
  },
  args: {
    children: 'Senior Product Designer at Linear',
    variant: 'body',
    tone: 'default',
    truncate: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'display',
        'title',
        'heading',
        'subheading',
        'body-lg',
        'body',
        'body-strong',
        'caption',
        'label',
        'code',
      ],
    },
    tone: {
      control: 'select',
      options: [
        'default',
        'muted',
        'brand',
        'success',
        'warning',
        'info',
        'destructive',
      ],
    },
    as: { control: false },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Truncated: Story = {
  args: {
    variant: 'body-strong',
    truncate: true,
    children:
      'A very long company name that would otherwise wrap onto a second line inside a narrow card',
  },
  render: args => (
    <div className="w-64">
      <Text {...args} />
    </div>
  ),
};

export const DifferentElement: Story = {
  name: 'Different element',
  args: { variant: 'display', as: 'h2', children: '24' },
};

export const Highlighter: Story = {
  name: 'Highlighter (Mark)',
  parameters: {
    docs: {
      description: {
        story:
          '`Mark` is the marigold highlighter. Use it for the few words that matter, like the keywords a resume matches in a job ad. `underline` is the quieter version for long passages.',
      },
    },
  },
  render: () => (
    <div className="flex max-w-xl flex-col gap-6">
      <Text variant="body-lg">
        We are looking for a product designer with{' '}
        <Mark>5+ years of B2B SaaS</Mark> experience, fluent in{' '}
        <Mark>Figma</Mark> and comfortable running <Mark>user research</Mark> on
        their own. Experience with design systems is a plus.
      </Text>
      <Text>
        Elo suggests leading with your{' '}
        <Mark variant="underline">design systems work at Personio</Mark>, since
        the role mentions it twice.
      </Text>
    </div>
  ),
};
