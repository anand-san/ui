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
          'A person or a company. Shows the image when it loads and falls back to initials, in rounded type, when there is none or it fails.',
      },
    },
  },
  args: { name: 'Ada Lovelace', size: 'md', tone: 'neutral' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] },
    tone: { control: 'inline-radio', options: ['neutral', 'accent'] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {(['sm', 'md', 'lg', 'xl'] as const).map(size => (
        <Avatar key={size} name="Ada Lovelace" size={size} />
      ))}
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="Grace Hopper" size="lg" />
      <Avatar name="Northwind" size="lg" tone="accent" />
    </div>
  ),
};

export const BrokenImage: Story = {
  name: 'When the image fails',
  args: { src: 'https://invalid.example/avatar.png', size: 'lg' },
};
