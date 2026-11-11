import type { Meta, StoryObj } from '@storybook/react-vite';
import { Calendar, LayoutGrid, List as ListIcon } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/design-system/components/Accordion/Accordion';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/design-system/components/NavigationMenu/NavigationMenu';
import {
  navigationMenuItemClass,
  navigationMenuLinkClass,
} from '@/design-system/components/NavigationMenu/navigationMenuStyles';
import { Text } from '@/design-system/components/Text/Text';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';

const meta = {
  title: 'Components/Navigation',
  parameters: {
    docs: {
      description: {
        component:
          'Tabs are a segmented control: a few views of the same content, with a thumb that springs to the chosen one. Accordions hold optional detail. NavigationMenu is the bar of a desktop app or site; hover is grey and the current page is the accent, so they never look alike.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TabsStory: Story = {
  name: 'Tabs',
  render: () => (
    <Tabs defaultValue="list" className="max-w-md">
      <TabsList>
        <TabsTrigger value="list">
          <ListIcon />
          List
        </TabsTrigger>
        <TabsTrigger value="board">
          <LayoutGrid />
          Board
        </TabsTrigger>
        <TabsTrigger value="calendar">
          <Calendar />
          Calendar
        </TabsTrigger>
      </TabsList>
      <TabsContent value="list">
        <Text tone="secondary">Tasks in a list, newest first.</Text>
      </TabsContent>
      <TabsContent value="board">
        <Text tone="secondary">Tasks in columns by status.</Text>
      </TabsContent>
      <TabsContent value="calendar">
        <Text tone="secondary">Tasks on the days they are due.</Text>
      </TabsContent>
    </Tabs>
  ),
};

export const FullWidthTabs: Story = {
  name: 'Full width',
  render: () => (
    <Tabs defaultValue="week" className="max-w-sm">
      <TabsList className="w-full">
        <TabsTrigger value="day">Day</TabsTrigger>
        <TabsTrigger value="week">Week</TabsTrigger>
        <TabsTrigger value="month">Month</TabsTrigger>
        <TabsTrigger value="year">Year</TabsTrigger>
      </TabsList>
    </Tabs>
  ),
};

export const AccordionStory: Story = {
  name: 'Accordion',
  render: () => (
    <Accordion type="single" collapsible className="max-w-md">
      <AccordionItem value="accuracy">
        <AccordionTrigger>Advanced settings</AccordionTrigger>
        <AccordionContent>
          <Text tone="secondary">
            Set a custom domain and the time zone used for due dates.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="more">
        <AccordionTrigger>More options</AccordionTrigger>
        <AccordionContent>
          <Text tone="secondary">Anything else that is rarely needed.</Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

const TOOLS = [
  {
    title: 'Reports',
    description: 'Weekly progress for every project, ready to share',
  },
  {
    title: 'Roadmap',
    description: 'Plan milestones across teams on one timeline',
  },
  {
    title: 'Automations',
    description: 'Move tasks and notify people when something changes',
  },
  {
    title: 'Integrations',
    description: 'Connect your calendar, chat and code hosting',
  },
];

export const HeaderNavigation: Story = {
  name: 'Navigation menu (header)',
  parameters: {
    docs: {
      description: {
        story:
          'Style links in the bar with `navigationMenuItemClass` and pass `active` to the current one; Radix sets `aria-current="page"`. Links in a panel use `navigationMenuLinkClass`.',
      },
    },
  },
  render: () => (
    <div className="min-h-80">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#"
              active
              className={navigationMenuItemClass}
            >
              Overview
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[520px] gap-1 md:grid-cols-2">
                {TOOLS.map(tool => (
                  <li key={tool.title}>
                    <NavigationMenuLink
                      href="#"
                      className={navigationMenuLinkClass}
                    >
                      <Text variant="headline">{tool.title}</Text>
                      <Text
                        variant="subhead"
                        tone="secondary"
                        className="mt-0.5 line-clamp-2"
                      >
                        {tool.description}
                      </Text>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className={navigationMenuItemClass}>
              Pricing
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
};
