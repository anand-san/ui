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
    title: 'Your target job details',
    description:
      'Provide accurate job title and description to help us analyze your fit for this role.',
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
  name: 'Analyzer add form',
  parameters: {
    docs: {
      description: {
        story:
          'The layout the five analyzer add pages share: a PageHeader, then the fields.',
      },
    },
  },
  render: () => (
    <div className="flex max-w-3xl flex-col gap-6">
      <PageHeader
        title="Prepare for your interview"
        description="Provide accurate job title and description to help us prepare you for the interview. We'll analyze the role requirements and create a guide tailored to your profile."
      />
      <hr />
      <div className="flex flex-col gap-4">
        <Field label="Job title" required>
          <Input placeholder="e.g. Sales Manager" />
        </Field>
        <Field label="Job description" required>
          <Textarea
            placeholder="Paste job description here"
            className="min-h-[200px]"
          />
        </Field>
        <Button size="lg" className="self-start">
          Prepare
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
        title="Paste the job post into Eloovor"
        description="Copy and paste the company name, job title, and job description into your tracker."
      />
    </Card>
  ),
};
