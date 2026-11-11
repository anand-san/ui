import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRight, Ellipsis, Plus, Share, Trash2 } from 'lucide-react';

import { Surface } from '@/design-system/components/Surface/Surface';

import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Prominence comes from the variant: one `filled` button for the main action in a view, `tinted` for the actions beside it, `plain` for quiet ones, `link` inside a sentence. The tone says what it does: `accent`, `neutral` or `danger`. Buttons sink a little when pressed and spring back. Sizes follow the density.',
      },
    },
  },
  args: {
    children: 'Continue',
    variant: 'filled',
    tone: 'accent',
    size: 'md',
    shape: 'capsule',
    loading: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['filled', 'tinted', 'plain', 'link'],
    },
    tone: { control: 'inline-radio', options: ['accent', 'neutral', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    shape: { control: 'inline-radio', options: ['capsule', 'rounded'] },
    asChild: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const variants = ['filled', 'tinted', 'plain', 'link'] as const;
const tones = ['accent', 'neutral', 'danger'] as const;

export const VariantsAndTones: Story = {
  name: 'Variants and tones',
  render: () => (
    <div className="grid w-fit grid-cols-[auto_repeat(3,auto)] items-center gap-x-4 gap-y-3">
      <span />
      {tones.map(tone => (
        <span key={tone} className="text-caption text-ink-secondary">
          {tone}
        </span>
      ))}
      {variants.map(variant => (
        <div key={variant} className="contents">
          <span className="text-caption text-ink-secondary">{variant}</span>
          {tones.map(tone => (
            <Button key={tone} variant={variant} tone={tone}>
              {tone === 'danger' ? 'Delete' : 'Continue'}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  name: 'With icons',
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        <Plus />
        New project
      </Button>
      <Button variant="tinted">
        Next
        <ArrowRight />
      </Button>
      <Button variant="tinted" tone="danger">
        <Trash2 />
        Delete
      </Button>
      <Button variant="plain" tone="neutral" icon aria-label="Share">
        <Share />
      </Button>
      <Button variant="tinted" tone="neutral" icon aria-label="More">
        <Ellipsis />
      </Button>
      <Button variant="tinted" tone="neutral" icon size="sm" aria-label="Add">
        <Plus />
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  args: { loading: true, children: 'Saving' },
};

export const Rounded: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`rounded` squares a button off to the control radius, for a toolbar or a row of fields.',
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-2">
      <Button shape="rounded" variant="tinted" tone="neutral">
        Cancel
      </Button>
      <Button shape="rounded">Apply</Button>
    </div>
  ),
};

export const InASentence: Story = {
  name: 'In a sentence',
  render: () => (
    <p className="max-w-md text-body">
      Your trial ends in 3 days. <Button variant="link">Choose a plan</Button>{' '}
      to keep your projects.
    </p>
  ),
};

export const OnTheAccent: Story = {
  name: 'On an accent surface',
  parameters: {
    docs: {
      description: {
        story:
          'Inside an accent Surface or Card every role turns white, so the same variants stay legible without special cases.',
      },
    },
  },
  render: () => (
    <Surface tone="accent" className="flex flex-col gap-4 rounded-card p-6">
      <p className="text-title-3">Try the new editor</p>
      <div className="flex flex-wrap gap-2">
        <Button>Try it</Button>
        <Button variant="tinted">Later</Button>
        <Button variant="plain">Learn more</Button>
      </div>
    </Surface>
  ),
};
