import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Brain,
  FileText,
  RefreshCw,
  Search,
  TriangleAlert,
} from 'lucide-react';

import { Button } from '@/design-system/components/Button/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/design-system/components/Card/Card';
import { Text } from '@/design-system/components/Text/Text';

import { EmptyState } from './EmptyState';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'What a list, section or page shows when there is nothing in it yet, or when the user has to do something first. `sm` (the default without an image) is for a list inside a card. `lg` is for a whole page or panel; with an `image` it sits beside the text from md and stacks on phones.',
      },
    },
  },
  args: {
    icon: <Search />,
    title: 'No projects yet',
    description: 'Projects you create or update show up here for 14 days',
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const InACard: Story = {
  name: 'In a card (sm)',
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle icon={<FileText />} count={0}>
          Reports
        </CardTitle>
      </CardHeader>
      <CardContent>
        <EmptyState
          icon={<Search />}
          title="No reports yet"
          description="Reports you create show up here"
          action={<Button size="sm">New report</Button>}
        />
      </CardContent>
    </Card>
  ),
};

export const WithIllustration: Story = {
  name: 'With an illustration (lg)',
  parameters: {
    docs: {
      description: {
        story:
          'For pages that need the user to act first: work in progress, a limit reached, setup to finish.',
      },
    },
  },
  render: () => (
    <EmptyState
      image="/images/drawing.png"
      title="Your report can be generated again"
      description="Last time the report stopped because you reached your monthly limit. You have some of it back now. Would you like to generate the report again?"
      action={
        <Button size="lg">
          <Brain />
          Generate report
        </Button>
      }
    />
  ),
};

export const WithANote: Story = {
  name: 'With a note',
  render: () => (
    <EmptyState
      image="/images/documents.png"
      imageAlt="Outdated documents"
      title="This report is out of date"
      description="The data changed since this report was generated. Generate it again to include the latest numbers."
      action={
        <Button size="lg">
          <RefreshCw />
          Update report
        </Button>
      }
    >
      <Text variant="caption" tone="default">
        <strong className="font-medium">Important:</strong> Updating uses one
        report from your monthly limit.
      </Text>
    </EmptyState>
  ),
};

export const PageLevelWithoutImage: Story = {
  name: 'Page level without an image',
  render: () => (
    <EmptyState
      size="lg"
      icon={<TriangleAlert />}
      title="Oops, something went wrong"
      description="It's not you, it's us. The error has been reported. If the problem persists, please reach out to support"
      action={<Button variant="outline">Go back to home</Button>}
    />
  ),
};
