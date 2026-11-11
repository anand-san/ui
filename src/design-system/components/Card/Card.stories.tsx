import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowUpRight, Ellipsis } from 'lucide-react';

import { Badge } from '@/design-system/components/Badge/Badge';
import { Button } from '@/design-system/components/Button/Button';
import { Gauge } from '@/design-system/components/Gauge/Gauge';
import { List, ListItem } from '@/design-system/components/List/List';
import { Text } from '@/design-system/components/Text/Text';

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
    layout: 'padded',
    docs: {
      description: {
        component:
          "A group of related content on the canvas. `surface` is a white card on the tinted canvas; `inset` is a well inside a card; `outline` sits where a fill would vanish; `accent` is a promo where every role turns white. Cards don't nest: inside a card use `inset`, a List or a Separator. Padding and corners follow the density.",
      },
    },
  },
  args: { variant: 'surface', interactive: false },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['surface', 'inset', 'outline', 'accent'],
    },
    asChild: { control: false },
  },
  decorators: [
    Story => (
      <div className="rounded-sheet bg-canvas p-4 sm:p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: args => (
    <Card {...args} className="max-w-sm">
      <CardHeader>
        <CardTitle>Storage</CardTitle>
        <CardDescription>18.4 GB of 50 GB used</CardDescription>
        <CardAction>
          <Button
            variant="plain"
            tone="neutral"
            size="sm"
            icon
            aria-label="More"
          >
            <Ellipsis />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <Gauge value={37} label="Storage used" size="md">
          37%
        </Gauge>
        <Text variant="subhead" tone="secondary">
          Photos take the most space. Old backups can go.
        </Text>
      </CardContent>
      <CardFooter>
        <Button variant="tinted" size="sm">
          Manage storage
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card>
        <CardTitle>Surface</CardTitle>
        <CardDescription>
          The default: a white group on the canvas.
        </CardDescription>
        <Card variant="inset">
          <Text variant="subhead">
            An inset well inside it, for a quote or code.
          </Text>
        </Card>
      </Card>
      <Card variant="outline">
        <CardTitle>Outline</CardTitle>
        <CardDescription>
          For a card on a surface, where a fill would vanish.
        </CardDescription>
      </Card>
      <Card variant="accent" className="sm:col-span-2">
        <CardHeader>
          <CardTitle>Invite your team</CardTitle>
          <CardDescription>
            Projects are better with people in them.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button>Invite</Button>
          <Button variant="plain">Not now</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const WithAList: Story = {
  name: 'With a list',
  render: () => (
    <Card className="max-w-md gap-3 p-0 pt-inset">
      <CardHeader className="px-inset">
        <CardTitle>Recent projects</CardTitle>
        <CardAction>
          <Button variant="link">See all</Button>
        </CardAction>
      </CardHeader>
      <List className="rounded-t-none">
        <ListItem
          title="Website redesign"
          trailing={<Badge tone="success">Live</Badge>}
          chevron
          asChild
        >
          <a href="#redesign" />
        </ListItem>
        <ListItem
          title="Mobile onboarding"
          trailing={<Badge tone="accent">In review</Badge>}
          chevron
          asChild
        >
          <a href="#onboarding" />
        </ListItem>
        <ListItem
          title="Pricing page"
          trailing={<Badge>Draft</Badge>}
          chevron
          asChild
        >
          <a href="#pricing" />
        </ListItem>
      </List>
    </Card>
  ),
};

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The whole card is the link: it highlights on hover, sinks when pressed and shows the focus ring.',
      },
    },
  },
  render: () => (
    <div className="grid max-w-xl gap-4 sm:grid-cols-2">
      {['Analytics', 'Billing'].map(name => (
        <Card key={name} interactive asChild>
          <a href={`#${name.toLowerCase()}`}>
            <CardHeader>
              <CardTitle>{name}</CardTitle>
              <CardDescription>
                Open the {name.toLowerCase()} settings
              </CardDescription>
              <CardAction>
                <ArrowUpRight className="size-4 text-ink-secondary" />
              </CardAction>
            </CardHeader>
          </a>
        </Card>
      ))}
    </div>
  ),
};
