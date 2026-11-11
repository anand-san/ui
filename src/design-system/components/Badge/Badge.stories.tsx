import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sparkles } from 'lucide-react';

import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A short label in a capsule: a status, a count, "New". `soft` is the default and reads on any surface; `solid` is for the rare badge that must stand out. Every tone keeps its text at 4.5:1 on its fill.',
      },
    },
  },
  args: { children: 'Active', tone: 'neutral', variant: 'soft', size: 'sm' },
  argTypes: {
    tone: {
      control: 'select',
      options: [
        'neutral',
        'accent',
        'success',
        'warning',
        'danger',
        'info',
        'highlight',
      ],
    },
    variant: { control: 'inline-radio', options: ['soft', 'solid'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    asChild: { control: false },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const tones = [
  ['neutral', 'Draft'],
  ['accent', 'In review'],
  ['success', 'Live'],
  ['warning', 'Expiring'],
  ['danger', 'Failed'],
  ['info', 'Beta'],
  ['highlight', 'New'],
] as const;

export const Tones: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(['soft', 'solid'] as const).map(variant => (
        <div key={variant} className="flex flex-wrap items-center gap-2">
          {tones.map(([tone, label]) => (
            <Badge key={tone} tone={tone} variant={variant}>
              {label}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const WithDotOrIcon: Story = {
  name: 'With a dot or icon',
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge tone="success" dot>
        Online
      </Badge>
      <Badge tone="highlight">
        <Sparkles />
        Suggested
      </Badge>
      <Badge size="md" tone="accent">
        12 new
      </Badge>
    </div>
  ),
};
