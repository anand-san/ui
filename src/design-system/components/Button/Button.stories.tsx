import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronsUpDown, Plus, Trash2 } from 'lucide-react';

import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'One primary button per view. Secondary uses the child card tint, ghost is for quiet actions inside cards, and pill shape suits compact actions in card headers. `loading` swaps in a spinner and disables the button; `asChild` renders a router `<Link>` with button styles.',
      },
    },
  },
  args: {
    children: 'Add a job',
    variant: 'primary',
    size: 'md',
    shape: 'rounded',
    loading: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'outline',
        'ghost',
        'destructive',
        'link',
        'inverse',
        'inverse-soft',
      ],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg', 'icon-sm', 'icon'],
    },
    shape: { control: 'inline-radio', options: ['rounded', 'pill'] },
    asChild: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">
        <Trash2 />
        Delete
      </Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const OnABrandBanner: Story = {
  name: 'On a brand banner',
  parameters: {
    docs: {
      description: {
        story:
          'Inverse buttons keep their white look in both themes, for banners in the brand color like the board promo.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3 rounded-xl bg-brand-600 p-6 dark:bg-brand-800">
      <Button variant="inverse" size="lg">
        Open board
      </Button>
      <Button variant="inverse-soft" size="lg">
        Tailored resume
      </Button>
    </div>
  ),
};

export const OnASoftCard: Story = {
  name: 'On a soft card',
  parameters: {
    docs: {
      description: {
        story:
          'Every variant needs to hold up on the surface token, where most buttons sit.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3 rounded-xl bg-surface p-6">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon-sm" variant="secondary" aria-label="Add">
        <Plus />
      </Button>
      <Button size="icon" variant="secondary" aria-label="Add">
        <Plus />
      </Button>
    </div>
  ),
};

export const HeaderAction: Story = {
  name: 'Card header action',
  parameters: {
    docs: {
      description: {
        story:
          'The View switcher from the tracker home page: small, ghost and pill.',
      },
    },
  },
  render: () => (
    <div className="rounded-xl bg-surface p-6">
      <Button variant="ghost" size="sm" shape="pill">
        View
        <ChevronsUpDown className="size-3.5" />
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button loading>Saving</Button>
      <Button variant="secondary" loading>
        Generating resume
      </Button>
    </div>
  ),
};

export const AsLink: Story = {
  name: 'As a link',
  render: () => (
    <Button asChild variant="outline">
      <a href="#board">Open the board</a>
    </Button>
  ),
};
