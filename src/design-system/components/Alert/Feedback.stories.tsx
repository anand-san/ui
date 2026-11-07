import type { Meta, StoryObj } from '@storybook/react-vite';
import { Crown, Info, RotateCcw, Search } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/design-system/components/Button/Button';
import { EmptyState } from '@/design-system/components/EmptyState/EmptyState';
import { Progress } from '@/design-system/components/Progress/Progress';
import { ScoreRing } from '@/design-system/components/ScoreRing/ScoreRing';
import { Skeleton } from '@/design-system/components/Skeleton/Skeleton';
import { Toaster } from '@/design-system/components/Toaster/Toaster';

import { Alert, AlertDescription, AlertTitle } from './Alert';

const meta = {
  title: 'Components/Feedback',
  parameters: {
    docs: {
      description: {
        component:
          'Alerts are tinted boxes in the six tones. Progress and ScoreRing take their color from the same tones. EmptyState is what a list shows before it has anything in it. Toasts come from `sonner`, styled by the design system Toaster.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Alerts: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-3">
      <Alert>
        <Info />
        <AlertDescription>
          Sometimes the company name alone is not enough to find the right
          company.
        </AlertDescription>
      </Alert>
      <Alert tone="info">
        <Crown />
        <AlertTitle>Premium membership active</AlertTitle>
        <AlertDescription>You have unlimited usage.</AlertDescription>
      </Alert>
      <Alert tone="warning">
        <RotateCcw />
        <AlertTitle>Need more credits?</AlertTitle>
        <AlertDescription>Reset all your monthly limits.</AlertDescription>
      </Alert>
      <Alert tone="destructive">
        <Info />
        <AlertTitle>We couldn&apos;t find much about this company</AlertTitle>
        <AlertDescription>Double-check the data yourself.</AlertDescription>
      </Alert>
    </div>
  ),
};

export const ProgressAndScores: Story = {
  name: 'Progress and scores',
  render: () => (
    <div className="flex max-w-xl flex-col gap-6">
      <div className="flex flex-col gap-3">
        <Progress value={30} tone="info" />
        <Progress value={70} tone="warning" />
        <Progress value={100} tone="success" />
        <Progress value={95} tone="destructive" />
      </div>
      <div className="flex gap-6">
        <ScoreRing score={8.2} />
        <ScoreRing score={5.1} />
        <ScoreRing score={3.4} />
        <ScoreRing score={8.8} size="lg" />
      </div>
    </div>
  ),
};

export const LoadingAndEmpty: Story = {
  name: 'Loading and empty',
  render: () => (
    <div className="grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
      <div className="flex flex-col gap-2 rounded-xl bg-surface p-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-[120px] rounded-xl" />
        <Skeleton className="h-[120px] rounded-xl" />
      </div>
      <div className="rounded-xl bg-surface p-4">
        <EmptyState
          icon={<Search />}
          title="No opportunities yet"
          description="Jobs you add or update show up here for 14 days"
          action={<Button size="sm">Add a job</Button>}
        />
      </div>
    </div>
  ),
};

export const Toasts: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Toaster />
      <Button variant="outline" onClick={() => toast('Note saved')}>
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.success('Payment successful')}
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.error('Failed to delete analysis')}
      >
        Error
      </Button>
    </div>
  ),
};
