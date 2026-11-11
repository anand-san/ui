import type { Meta, StoryObj } from '@storybook/react-vite';
import { FolderOpen, Inbox, SearchX } from 'lucide-react';

import { Button } from '@/design-system/components/Button/Button';
import {
  Card,
  CardHeader,
  CardTitle,
} from '@/design-system/components/Card/Card';

import { EmptyState } from './EmptyState';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'What a list, section or page shows when there is nothing in it yet, or when the person has to do something first. Say what will be here and how to get it there. The icon is a large quiet glyph, not a tile. `sm` (the default without an image) is for a section in a card; `lg` for a whole page.',
      },
    },
  },
  args: {
    icon: <Inbox />,
    title: 'No messages',
    description: 'Messages from your team show up here.',
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const InACard: Story = {
  name: 'In a card',
  render: () => (
    <div className="rounded-sheet bg-canvas p-4">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Reports</CardTitle>
        </CardHeader>
        <EmptyState
          icon={<FolderOpen />}
          title="No reports yet"
          description="Reports you create show up here."
          action={
            <Button size="sm" variant="tinted">
              New report
            </Button>
          }
        />
      </Card>
    </div>
  ),
};

export const WholePage: Story = {
  name: 'A whole page',
  args: {
    size: 'lg',
    icon: <SearchX />,
    title: 'Nothing matches “quarterly”',
    description: 'Check the spelling, or search all folders instead.',
    action: (
      <>
        <Button>Search all folders</Button>
        <Button variant="plain">Clear search</Button>
      </>
    ),
  },
};
