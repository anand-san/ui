import type { Meta, StoryObj } from '@storybook/react-vite';
import { Plus, Shield } from 'lucide-react';

import { Button } from '@/design-system/components/Button/Button';
import { Card } from '@/design-system/components/Card/Card';
import { Field } from '@/design-system/components/Field/Field';
import { Input } from '@/design-system/components/Input/Input';
import { Textarea } from '@/design-system/components/Input/Textarea';

import { PageHeader } from './PageHeader';

const meta = {
  title: 'Components/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The title block at the top of a page: the `title` type role, an optional muted description, an optional icon tile and actions on the right. Renders an h1; pass `as="h2"` for a step inside a flow, like onboarding.',
      },
    },
  },
  args: {
    title: 'Billing and usage',
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithDescription: Story = {
  name: 'With a description',
  args: {
    title: 'Project details',
    description:
      'Give the project a clear name and goal so the team knows what done looks like.',
  },
};

export const WithIconAndActions: Story = {
  name: 'With an icon and actions',
  args: {
    icon: <Shield />,
    title: 'Admin dashboard',
    description:
      'Monitor bans, check security status, and execute system maintenance.',
    actions: (
      <Button>
        <Plus />
        New note
      </Button>
    ),
  },
};

export const AddForm: Story = {
  name: 'Create form',
  parameters: {
    docs: {
      description: {
        story: 'The layout of a create page: a PageHeader, then the fields.',
      },
    },
  },
  render: () => (
    <div className="flex max-w-3xl flex-col gap-6">
      <PageHeader
        title="Create a project"
        description="Name the project and describe its goal. You can invite people and add tasks once it exists."
      />
      <hr />
      <div className="flex flex-col gap-4">
        <Field label="Project name" required>
          <Input placeholder="e.g. Website redesign" />
        </Field>
        <Field label="Goal" required>
          <Textarea
            placeholder="What should be true when this project is done?"
            className="min-h-[200px]"
          />
        </Field>
        <Button size="lg" className="self-start">
          Create project
        </Button>
      </div>
    </div>
  ),
};

export const StepInAFlow: Story = {
  name: 'Step in a flow',
  render: () => (
    <Card variant="outline" className="max-w-xl">
      <PageHeader
        as="h2"
        title="Invite your team"
        description="Add people by email. They get access to every project in the workspace."
      />
    </Card>
  ),
};
