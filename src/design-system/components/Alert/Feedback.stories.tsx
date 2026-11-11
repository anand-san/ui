import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  CircleAlert,
  CircleCheck,
  Info,
  Sparkles,
  TriangleAlert,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/design-system/components/Button/Button';
import { Gauge } from '@/design-system/components/Gauge/Gauge';
import { Progress } from '@/design-system/components/Progress/Progress';
import { Skeleton } from '@/design-system/components/Skeleton/Skeleton';
import { Text } from '@/design-system/components/Text/Text';
import { Toaster } from '@/design-system/components/Toaster/Toaster';

import { Alert, AlertDescription, AlertTitle } from './Alert';

const meta = {
  title: 'Components/Feedback',
  parameters: {
    docs: {
      description: {
        component:
          'Alerts sit on the soft fill of their tone; they are a polite `status`, except `danger`, which is an `alert` and interrupts. Progress and Gauge spring to each new value. Toasts come from `sonner`, styled by the Toaster.',
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
          Imports match people by email, so check the email column first.
        </AlertDescription>
      </Alert>
      <Alert tone="accent">
        <Sparkles />
        <AlertTitle>Suggestions are on</AlertTitle>
        <AlertDescription>
          You will see ideas for titles and tags as you write.
        </AlertDescription>
      </Alert>
      <Alert tone="success">
        <CircleCheck />
        <AlertTitle>Backup finished</AlertTitle>
        <AlertDescription>All 1,204 files are safe.</AlertDescription>
      </Alert>
      <Alert tone="warning">
        <TriangleAlert />
        <AlertTitle>Your plan renews in 3 days</AlertTitle>
        <AlertDescription>
          Check the card on file so nothing pauses.
        </AlertDescription>
        <div className="mt-2 flex gap-2">
          <Button size="sm" variant="tinted" tone="neutral">
            Update card
          </Button>
        </div>
      </Alert>
      <Alert tone="danger">
        <CircleAlert />
        <AlertTitle>Couldn&apos;t publish</AlertTitle>
        <AlertDescription>
          The server didn&apos;t answer. Your draft is saved; try again in a
          moment.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

function Uploading() {
  const [value, setValue] = useState(20);
  useEffect(() => {
    const timer = setInterval(
      () => setValue(current => (current >= 100 ? 0 : current + 20)),
      1200,
    );
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="flex max-w-sm flex-col gap-2">
      <div className="flex justify-between text-subhead">
        <span>Uploading 5 photos</span>
        <span className="tabular-nums text-ink-secondary">{value}%</span>
      </div>
      <Progress value={value} label="Upload" />
    </div>
  );
}

export const ProgressStory: Story = {
  name: 'Progress',
  render: () => (
    <div className="flex flex-col gap-6">
      <Uploading />
      <div className="flex max-w-sm flex-col gap-3">
        <Progress value={80} tone="success" label="Goal" />
        <Progress value={92} tone="warning" label="Quota" />
        <Progress value={null} label="Preparing" />
      </div>
    </div>
  ),
};

export const GaugeStory: Story = {
  name: 'Gauge',
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Gauge value={37} label="Storage used" size="sm" />
      <Gauge value={72} label="Weekly goal" tone="success">
        72
      </Gauge>
      <Gauge value={7.4} max={10} label="Score" size="lg" tone="accent">
        7.4
      </Gauge>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex max-w-sm items-center gap-3 rounded-card bg-surface p-inset">
      <Skeleton className="size-10 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  ),
};

export const Toasts: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Text variant="subhead" tone="secondary">
        Toasts float on the overlay surface in both modes.
      </Text>
      <div className="flex flex-wrap gap-2">
        <Button variant="tinted" onClick={() => toast('Link copied')}>
          Plain
        </Button>
        <Button
          variant="tinted"
          onClick={() =>
            toast.success('Saved', { description: 'Your changes are live.' })
          }
        >
          Success
        </Button>
        <Button
          variant="tinted"
          tone="danger"
          onClick={() =>
            toast.error('Couldn’t save', {
              action: { label: 'Retry', onClick: () => {} },
            })
          }
        >
          Error
        </Button>
      </div>
      <Toaster />
    </div>
  ),
};
