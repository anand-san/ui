import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronLeft, Plus } from 'lucide-react';

import { Button } from '@/design-system/components/Button/Button';

import { PageHeader } from './PageHeader';

const meta = {
  title: 'Components/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The large title at the top of a page, as in a native app: the title is the biggest text on the screen and actions stay small beside it. An `eyebrow` holds a back link or where the page sits. Renders an h1; pass `as="h2"` for a step inside a flow.',
      },
    },
  },
  args: { title: 'Projects' },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithActions: Story = {
  name: 'With a description and actions',
  args: {
    title: 'Projects',
    description: 'Everything your team is working on, newest first.',
    actions: (
      <>
        <Button variant="tinted" tone="neutral">
          Import
        </Button>
        <Button>
          <Plus />
          New project
        </Button>
      </>
    ),
  },
};

export const WithABackLink: Story = {
  name: 'With a back link',
  args: {
    eyebrow: (
      <Button variant="link" asChild>
        <a href="#projects">
          <ChevronLeft />
          Projects
        </a>
      </Button>
    ),
    title: 'Website redesign',
    description: 'Due 28 November · 6 people',
  },
};
