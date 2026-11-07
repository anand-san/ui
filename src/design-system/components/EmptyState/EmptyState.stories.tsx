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
    title: 'No opportunities yet',
    description: 'Jobs you add or update show up here for 14 days',
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
          Analyses
        </CardTitle>
      </CardHeader>
      <CardContent>
        <EmptyState
          icon={<Search />}
          title="No analyses yet"
          description="Analyses you run show up here"
          action={<Button size="sm">Analyze a job</Button>}
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
          'Analysis in progress, out of date, quota reached and missing profile all use this layout.',
      },
    },
  },
  render: () => (
    <EmptyState
      image="/images/drawing.png"
      title="Analysis regeneration possible"
      description="We failed to generate analyses last time as you reached the monthly quota. It seems that you have some quota available at the moment. Would you like to regenerate this analysis?"
      action={
        <Button size="lg">
          <Brain />
          Regenerate analysis
        </Button>
      }
    />
  ),
};

export const WithANote: Story = {
  name: 'With a note',
  render: () => (
    <EmptyState
      image="/images/outdated-resume-update.png"
      imageAlt="Outdated analysis"
      title="This resume is out of date"
      description="Your profile changed since this resume was generated. Regenerate it to include your latest experience."
      action={
        <Button size="lg">
          <RefreshCw />
          Regenerate resume
        </Button>
      }
    >
      <Text variant="caption" tone="default">
        <strong className="font-medium">Important:</strong> Regenerating uses
        one analysis from your monthly quota.
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
