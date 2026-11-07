import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/design-system/components/Card/Card';
import { Text } from '@/design-system/components/Text/Text';

import { type StatusOption, StatusMenu } from './StatusMenu';

type TaskStatus = 'Planned' | 'In progress' | 'In review' | 'Done' | 'Blocked';

const taskStatuses: StatusOption<TaskStatus>[] = [
  { value: 'Planned', tone: 'neutral' },
  { value: 'In progress', tone: 'info' },
  { value: 'In review', tone: 'warning' },
  { value: 'Done', tone: 'success' },
  { value: 'Blocked', tone: 'destructive' },
];

function Controlled({
  initial = 'In progress',
  options = taskStatuses,
}: {
  initial?: TaskStatus;
  options?: StatusOption<TaskStatus>[];
}) {
  const [status, setStatus] = useState<TaskStatus>(initial);
  return (
    <StatusMenu value={status} options={options} onValueChange={setStatus} />
  );
}

const meta = {
  title: 'Components/StatusMenu',
  component: StatusMenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "A status badge that opens a menu to change the status. Options use a Badge tone, or the app's own colors through `className`. Safe inside a clickable card: its clicks never reach the card.",
      },
    },
  },
  args: {
    value: 'In progress',
    options: taskStatuses,
    label: 'Status',
  },
} satisfies Meta<typeof StatusMenu<TaskStatus>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => <Controlled />,
};

export const ReadOnly: Story = {
  name: 'Read only',
  parameters: {
    docs: {
      description: {
        story:
          'Without `onValueChange` it is a plain badge, for people who can see the status but not change it.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      {taskStatuses.map(option => (
        <StatusMenu
          key={option.value}
          value={option.value}
          options={taskStatuses}
        />
      ))}
    </div>
  ),
};

export const InACard: Story = {
  name: 'In a card link',
  parameters: {
    docs: {
      description: {
        story:
          'The whole card is a link. Changing the status does not follow it.',
      },
    },
  },
  render: () => (
    <div className="flex max-w-md flex-col gap-3 rounded-xl bg-surface p-4">
      {(['Planned', 'In review'] as const).map(initial => (
        <Card key={initial} variant="tinted" interactive asChild>
          <a href={`#task-${initial}`}>
            <CardHeader>
              <Text variant="caption">Website redesign</Text>
              <CardAction>
                <Controlled initial={initial} />
              </CardAction>
            </CardHeader>
            <CardTitle>Update the pricing page</CardTitle>
            <CardDescription>
              New plans, a comparison table and the FAQ.
            </CardDescription>
          </a>
        </Card>
      ))}
    </div>
  ),
};

export const AppColors: Story = {
  name: 'App colors',
  parameters: {
    docs: {
      description: {
        story:
          'When an app has more statuses than tones, give each option a `className` with a soft fill and a text color. Here they are ramps with a dark-mode step; an app would usually define its own tokens, with light and dark values, like `bg-status-done/10 text-status-done`.',
      },
    },
  },
  render: () => (
    <Controlled
      initial="In review"
      options={[
        {
          value: 'Planned',
          className: 'bg-neutral-500/10 text-neutral-600 dark:text-neutral-300',
        },
        {
          value: 'In progress',
          className: 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
        },
        {
          value: 'In review',
          className: 'bg-purple-500/10 text-purple-700 dark:text-purple-300',
        },
        {
          value: 'Done',
          className: 'bg-green-500/10 text-green-700 dark:text-green-300',
        },
        {
          value: 'Blocked',
          className: 'bg-red-500/10 text-red-700 dark:text-red-300',
        },
      ]}
    />
  ),
};
