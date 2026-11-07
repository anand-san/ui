import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar } from './Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A person or company. Shows the image when it loads and falls back to initials from `name`, which also becomes the alt text.',
      },
    },
  },
  args: {
    name: 'Linear',
    tone: 'info',
    size: 'md',
  },
  argTypes: {
    tone: {
      control: 'select',
      options: [
        'neutral',
        'brand',
        'success',
        'warning',
        'info',
        'destructive',
      ],
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="Acme Robotics" tone="info" size="sm" />
      <Avatar name="Acme Robotics" tone="info" size="md" />
      <Avatar name="Acme Robotics" tone="info" size="lg" />
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div className="flex items-center gap-3 rounded-xl bg-surface p-6">
      {(
        [
          'neutral',
          'brand',
          'success',
          'warning',
          'info',
          'destructive',
        ] as const
      ).map(tone => (
        <Avatar key={tone} name={tone} tone={tone} />
      ))}
    </div>
  ),
};

export const ImageAndFallback: Story = {
  name: 'Image and fallback',
  parameters: {
    docs: {
      description: {
        story: 'The second image fails to load, so it falls back to initials.',
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="Eloovor" src="/images/logo.png" size="lg" />
      <Avatar
        name="Broken Image"
        src="/does-not-exist.png"
        tone="brand"
        size="lg"
      />
    </div>
  ),
};
