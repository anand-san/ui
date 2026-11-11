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
  { value: 'In progress', tone: 'accent' },
  { value: 'In review', tone: 'warning' },
  { value: 'Done', tone: 'success' },
  { value: 'Blocked', tone: 'danger' },
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
    <div className="flex max-w-md flex-col gap-3 rounded-sheet bg-canvas p-4">
      {(['Planned', 'In review'] as const).map(initial => (
        <Card key={initial} interactive asChild>
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
          'When an app has more statuses than tones, give each option a `className` with a soft fill and a text color. An app would define these as its own tokens in its @theme block, with light and dark values; here they are inline OKLCH values.',
      },
    },
  },
  render: () => (
    <Controlled
      initial="In review"
      options={[
        {
          value: 'Planned',
          className: 'bg-fill text-ink-secondary',
        },
        {
          value: 'In progress',
          className:
            'bg-[oklch(0.62_0.17_230/0.14)] text-[oklch(0.48_0.15_230)] dark:text-[oklch(0.8_0.12_230)]',
        },
        {
          value: 'In review',
          className:
            'bg-[oklch(0.6_0.2_300/0.14)] text-[oklch(0.48_0.2_300)] dark:text-[oklch(0.8_0.13_300)]',
        },
        {
          value: 'Done',
          className:
            'bg-[oklch(0.65_0.15_150/0.14)] text-[oklch(0.46_0.13_150)] dark:text-[oklch(0.8_0.13_150)]',
        },
        {
          value: 'Blocked',
          className:
            'bg-[oklch(0.62_0.2_27/0.14)] text-[oklch(0.5_0.19_27)] dark:text-[oklch(0.8_0.12_27)]',
        },
      ]}
    />
  ),
};
