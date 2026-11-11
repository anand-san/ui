import type { Meta, StoryObj } from '@storybook/react-vite';
import { Check } from 'lucide-react';

import { focusRing } from '@/design-system/foundations/controls';

import { Badge, BadgeDot } from './Badge';

const tones = [
  'neutral',
  'brand',
  'highlight',
  'success',
  'warning',
  'info',
  'destructive',
] as const;

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A short label in a pill. Soft is the default and reads well on any surface.',
      },
    },
  },
  args: {
    children: 'New',
    tone: 'neutral',
    variant: 'soft',
    size: 'sm',
    dot: false,
  },
  argTypes: {
    tone: { control: 'select', options: tones },
    variant: { control: 'inline-radio', options: ['soft', 'solid', 'outline'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    asChild: { control: false },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const TonesAndVariants: Story = {
  name: 'Tones and variants',
  render: () => (
    <div className="grid w-fit grid-cols-[6rem_repeat(3,auto)] items-center gap-x-4 gap-y-3 rounded-xl bg-surface p-6">
      <span />
      {(['soft', 'solid', 'outline'] as const).map(variant => (
        <span key={variant} className="text-xs text-muted-foreground">
          {variant}
        </span>
      ))}
      {tones.map(tone => (
        <div key={tone} className="contents">
          <span className="text-sm font-medium">{tone}</span>
          {(['soft', 'solid', 'outline'] as const).map(variant => (
            <Badge key={variant} tone={tone} variant={variant}>
              {tone === 'success'
                ? 'Saved'
                : tone === 'destructive'
                  ? 'Failed'
                  : tone === 'highlight'
                    ? 'New'
                    : 'Label'}
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
        Live
      </Badge>
      <Badge tone="warning" dot>
        Outdated
      </Badge>
      <Badge tone="brand">
        <Check />
        Tailored
      </Badge>
      <Badge size="md">12</Badge>
    </div>
  ),
};

export const AsAMenuTrigger: Story = {
  name: 'As a menu trigger',
  parameters: {
    docs: {
      description: {
        story:
          'With `asChild` the badge styles move onto a `<button>`, for a badge that opens a menu.',
      },
    },
  },
  render: () => (
    <Badge tone="info" asChild>
      <button type="button" className={focusRing}>
        <BadgeDot />
        In review
      </button>
    </Badge>
  ),
};
