import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  BarChart3,
  ChevronsUpDown,
  History,
  Search,
  Target,
} from 'lucide-react';

import { Avatar } from '@/design-system/components/Avatar/Avatar';
import { Badge, type BadgeTone } from '@/design-system/components/Badge/Badge';
import { Button } from '@/design-system/components/Button/Button';
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
          'Modelled on the tracker home page. A soft card is a section of a page; a tinted card is an item inside a section; outline is for cards straight on the page canvas. Size sets padding, the gap between parts and the title role. Compose it from CardHeader (CardTitle, CardDescription, CardAction), CardContent and CardFooter.',
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

// Sample data for the tracker stories

const opportunities: {
  id: string;
  title: string;
  company: string;
  description: string;
  status: string;
  tone: BadgeTone;
}[] = [
  {
    id: '1',
    title: 'Senior Product Designer',
    company: 'Linear',
    description:
      'Shape the planning tools used by thousands of product teams, working closely with engineering on every release.',
    status: 'Interviewing',
    tone: 'warning',
  },
  {
    id: '2',
    title: 'Staff Frontend Engineer, Design Systems',
    company: 'Vercel',
    description:
      'Own the component library behind the dashboard and help teams ship consistent interfaces faster.',
    status: 'Applied',
    tone: 'info',
  },
  {
    id: '3',
    title: 'Product Engineer',
    company: 'Raycast',
    description:
      'Build extensions and core features for a fast, keyboard-first launcher.',
    status: 'To Apply',
    tone: 'brand',
  },
  {
    id: '4',
    title: 'Design Engineer',
    company: 'Figma',
    description:
      'Prototype and ship new editor interactions with the design and research teams.',
    status: 'Offer',
    tone: 'success',
  },
];

function OpportunityItem({
  opportunity,
}: {
  opportunity: (typeof opportunities)[number];
}) {
  return (
    <Card variant="tinted" interactive asChild>
      <a href={`#opportunity-${opportunity.id}`}>
        <CardHeader>
          <Text variant="caption" truncate>
            {opportunity.title}
          </Text>
          <CardAction>
            <Badge tone={opportunity.tone}>{opportunity.status}</Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="flex items-start gap-3">
          <Avatar name={opportunity.company} tone="info" />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <CardTitle>{opportunity.company}</CardTitle>
            <CardDescription className="line-clamp-2">
              {opportunity.description}
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
      aria-label="Change opportunities shown"
    >
      View
      <ChevronsUpDown className="size-3.5" />
    </Button>
  );
}

function OpportunityListCard({
  count = opportunities.length,
}: {
  count?: number;
}) {
  const items = opportunities.slice(0, count);
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
            <Text variant="body-strong">No opportunities yet</Text>
            <Text variant="caption">
              Jobs you add or update show up here for 14 days
            </Text>
          </div>
        ) : (
          <div className={cn('flex flex-col', spacing.items)}>
            {items.map(opportunity => (
              <OpportunityItem key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const pipeline: { status: string; count: number; className: string }[] = [
  { status: 'To Apply', count: 8, className: 'text-brand' },
  { status: 'Applied', count: 12, className: 'text-info' },
  { status: 'Interviewing', count: 3, className: 'text-warning' },
  { status: 'Negotiating', count: 1, className: 'text-primary' },
  { status: 'Offer', count: 1, className: 'text-success' },
  { status: 'Rejected', count: 5, className: 'text-destructive' },
];

function PipelineCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle icon={<BarChart3 />}>Your pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
          {pipeline.map(({ status, count, className }) => (
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
          <CardTitle icon={<Target className="text-amber-500" />} count={2}>
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
          <Text>Add 3 jobs to the board, then send one application.</Text>
        </CardContent>
        <CardFooter>
          <Button size="sm">Add a job</Button>
          <Button size="sm" variant="ghost">
            Later
          </Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const OpportunityList: Story = {
  name: 'Tracker: opportunity list',
  parameters: {
    docs: {
      description: {
        story:
          'The Recent card from the tracker home page, rebuilt with the design system: a soft section card holding tinted, linked item cards.',
      },
    },
  },
  render: () => (
    <div className="max-w-xl">
      <OpportunityListCard />
    </div>
  ),
};

export const EmptyList: Story = {
  name: 'Tracker: empty list',
  render: () => (
    <div className="max-w-xl">
      <OpportunityListCard count={0} />
    </div>
  ),
};

export const Pipeline: Story = {
  name: 'Tracker: pipeline',
  render: () => (
    <div className="max-w-md">
      <PipelineCard />
    </div>
  ),
};

export const Dashboard: Story = {
  name: 'Tracker: home layout',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className={spacing.page}>
      <div
        className={cn(
          'grid grid-cols-1 lg:grid-cols-[3fr_2fr]',
          spacing.section,
        )}
      >
        <OpportunityListCard />
        <PipelineCard />
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
            A promo banner, like Board view on the tracker home.
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
          'Medium cards with tinted items, the pattern the resume defaults sheet already uses.',
      },
    },
  },
  render: () => (
    <div className="flex max-w-sm flex-col gap-4 rounded-xl border bg-background p-4 shadow-sm">
      <Text variant="heading">Resume defaults</Text>
      <Card size="md">
        <CardHeader>
          <CardTitle count={3}>Sections</CardTitle>
          <CardDescription>Order used for new resumes.</CardDescription>
        </CardHeader>
        <CardContent className={cn('flex flex-col', spacing.items)}>
          {['Experience', 'Education', 'Skills'].map(section => (
            <Card key={section} variant="tinted">
              <CardTitle>{section}</CardTitle>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  ),
};
