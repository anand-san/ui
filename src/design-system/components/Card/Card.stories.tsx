import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  BarChart3,
  ChevronsUpDown,
  History,
  Search,
  Target,
} from 'lucide-react';
import { useState } from 'react';

import { Avatar } from '@/design-system/components/Avatar/Avatar';
import { Button } from '@/design-system/components/Button/Button';
import {
  type StatusOption,
  StatusMenu,
} from '@/design-system/components/StatusMenu/StatusMenu';
import { Text } from '@/design-system/components/Text/Text';
import { spacing } from '@/design-system/foundations/spacing';
import { cn } from '@/design-system/lib/cn';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The building block of a dashboard page. A soft card is a section of a page; a tinted card is an item inside a section; outline is for cards straight on the page canvas. Size sets padding, the gap between parts and the title role. Compose it from CardHeader (CardTitle, CardDescription, CardAction), CardContent and CardFooter.',
      },
    },
  },
  args: {
    variant: 'soft',
    interactive: false,
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['soft', 'tinted', 'outline', 'brand'],
    },
    size: { control: 'inline-radio', options: ['lg', 'md', 'sm'] },
    asChild: { control: false },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data: a small project workspace

const projects: {
  id: string;
  team: string;
  name: string;
  description: string;
  status: TaskStatus;
}[] = [
  {
    id: '1',
    team: 'Design',
    name: 'Website redesign',
    description:
      'New landing page, pricing and docs navigation, shipped in three steps with engineering.',
    status: 'In review',
  },
  {
    id: '2',
    team: 'Platform',
    name: 'Billing migration',
    description:
      'Move every plan to the new billing provider without interrupting renewals.',
    status: 'In progress',
  },
  {
    id: '3',
    team: 'Growth',
    name: 'Onboarding emails',
    description: 'A five-email welcome series for new workspaces.',
    status: 'Planned',
  },
  {
    id: '4',
    team: 'Mobile',
    name: 'Offline mode',
    description: 'Read and edit notes without a connection, then sync.',
    status: 'Done',
  },
];

type TaskStatus = 'Planned' | 'In progress' | 'In review' | 'Done' | 'Blocked';

const statuses: StatusOption<TaskStatus>[] = [
  { value: 'Planned', tone: 'neutral' },
  { value: 'In progress', tone: 'info' },
  { value: 'In review', tone: 'warning' },
  { value: 'Done', tone: 'success' },
  { value: 'Blocked', tone: 'destructive' },
];

function ProjectItem({ project }: { project: (typeof projects)[number] }) {
  const [status, setStatus] = useState(project.status);
  return (
    <Card variant="tinted" interactive asChild>
      <a href={`#project-${project.id}`}>
        <CardHeader>
          <Text variant="caption" truncate>
            {project.team}
          </Text>
          <CardAction>
            <StatusMenu
              value={status}
              options={statuses}
              onValueChange={setStatus}
            />
          </CardAction>
        </CardHeader>
        <CardContent className="flex items-start gap-3">
          <Avatar name={project.name} tone="info" />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <CardTitle>{project.name}</CardTitle>
            <CardDescription className="line-clamp-2">
              {project.description}
            </CardDescription>
          </div>
        </CardContent>
      </a>
    </Card>
  );
}

function ViewButton() {
  return (
    <Button
      variant="ghost"
      size="sm"
      shape="pill"
      aria-label="Change projects shown"
    >
      View
      <ChevronsUpDown className="size-3.5" />
    </Button>
  );
}

function ProjectListCard({ count = projects.length }: { count?: number }) {
  const items = projects.slice(0, count);
  return (
    <Card>
      <CardHeader>
        <CardTitle icon={<History />} count={items.length || undefined}>
          Recent
        </CardTitle>
        <CardAction>
          <ViewButton />
        </CardAction>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="flex min-h-48 flex-col items-center justify-center gap-1 px-4 text-center">
            <span className="mb-2 flex size-12 items-center justify-center rounded-full bg-muted">
              <Search className="size-6 text-muted-foreground" />
            </span>
            <Text variant="body-strong">No projects yet</Text>
            <Text variant="caption">
              Projects you create or update show up here for 14 days
            </Text>
          </div>
        ) : (
          <div className={cn('flex flex-col', spacing.items)}>
            {items.map(project => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const workload: { status: TaskStatus; count: number; className: string }[] = [
  { status: 'Planned', count: 8, className: 'text-brand' },
  { status: 'In progress', count: 12, className: 'text-info' },
  { status: 'In review', count: 3, className: 'text-warning' },
  { status: 'Done', count: 21, className: 'text-success' },
  { status: 'Blocked', count: 2, className: 'text-destructive' },
];

function WorkloadCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle icon={<BarChart3 />}>Tasks by status</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
          {workload.map(({ status, count, className }) => (
            <div key={status} className="flex flex-col-reverse">
              <Text as="dt" tone="muted">
                {status}
              </Text>
              <Text as="dd" variant="display" className={className}>
                {count}
              </Text>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}

export const Playground: Story = {
  render: args => (
    <div className="max-w-md">
      <Card {...args}>
        <CardHeader>
          <CardTitle icon={<Target className="text-warning" />} count={2}>
            Today’s focus
          </CardTitle>
          <CardDescription>
            Two small steps keep the week moving.
          </CardDescription>
          <CardAction>
            <ViewButton />
          </CardAction>
        </CardHeader>
        <CardContent>
          <Text>Review two pull requests, then plan tomorrow.</Text>
        </CardContent>
        <CardFooter>
          <Button size="sm">Start</Button>
          <Button size="sm" variant="ghost">
            Later
          </Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const ProjectList: Story = {
  name: 'Dashboard: project list',
  parameters: {
    docs: {
      description: {
        story:
          'A Recent card on a dashboard: a soft section card holding tinted, linked item cards. Each status is a StatusMenu, which works inside the linked card.',
      },
    },
  },
  render: () => (
    <div className="max-w-xl">
      <ProjectListCard />
    </div>
  ),
};

export const EmptyList: Story = {
  name: 'Dashboard: empty list',
  render: () => (
    <div className="max-w-xl">
      <ProjectListCard count={0} />
    </div>
  ),
};

export const Workload: Story = {
  name: 'Dashboard: counts',
  render: () => (
    <div className="max-w-md">
      <WorkloadCard />
    </div>
  ),
};

export const Dashboard: Story = {
  name: 'Dashboard: layout',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className={spacing.page}>
      <div
        className={cn(
          'grid grid-cols-1 lg:grid-cols-[3fr_2fr]',
          spacing.section,
        )}
      >
        <ProjectListCard />
        <WorkloadCard />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
      {(
        [
          ['soft', 'A section of a page. The default.'],
          ['tinted', 'An item inside a section. Defaults to size sm.'],
          [
            'outline',
            'Straight on the page canvas, where a fill would vanish.',
          ],
        ] as const
      ).map(([variant, description]) => (
        <Card key={variant} variant={variant} size="md">
          <CardHeader>
            <CardTitle>{variant}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
      <Card variant="brand" size="md">
        <CardHeader>
          <CardTitle>brand</CardTitle>
          <p className="text-sm text-white/85">
            A promo banner, like a new feature announcement.
          </p>
        </CardHeader>
        <CardFooter>
          <Button variant="inverse" size="sm">
            Open board
          </Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'lg for page sections (heading title, 16→24px padding), md for sheets and dialogs (subheading, 16px), sm for items (body-strong, 12→16px).',
      },
    },
  },
  render: () => (
    <div className="flex max-w-xl flex-col gap-4">
      {(['lg', 'md', 'sm'] as const).map(size => (
        <Card key={size} size={size}>
          <CardHeader>
            <CardTitle icon={<History />} count={4}>
              Size {size}
            </CardTitle>
            <CardDescription>
              Padding, gap and title role all follow the size.
            </CardDescription>
            <CardAction>
              <ViewButton />
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="h-10 rounded-xl bg-primary/5" />
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};

export const InsideSheet: Story = {
  name: 'Nested in a sheet',
  parameters: {
    docs: {
      description: {
        story:
          'Medium cards with tinted items, the pattern for a settings sheet.',
      },
    },
  },
  render: () => (
    <div className="flex max-w-sm flex-col gap-4 rounded-xl border bg-background p-4 shadow-xs">
      <Text variant="heading">Report defaults</Text>
      <Card size="md">
        <CardHeader>
          <CardTitle count={3}>Sections</CardTitle>
          <CardDescription>Order used for new reports.</CardDescription>
        </CardHeader>
        <CardContent className={cn('flex flex-col', spacing.items)}>
          {['Summary', 'Highlights', 'Next steps'].map(section => (
            <Card key={section} variant="tinted">
              <CardTitle>{section}</CardTitle>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  ),
};
