import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Briefcase,
  FileUser,
  Home,
  LineChart,
  Sparkles,
  User,
} from 'lucide-react';

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
  navigationMenuItemVariants,
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
          'Tabs are a pill segmented control on the child card tint; when they overflow, the list scrolls and shows arrow buttons. Accordions are for optional detail, like the advanced fields of a form. NavigationMenu is the desktop header: pill items, with a panel of links for Tools.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TabsStory: Story = {
  name: 'Tabs',
  render: () => (
    <Tabs defaultValue="summary" className="max-w-2xl">
      <TabsList>
        <TabsTrigger value="summary">
          <Sparkles />
          Summary
        </TabsTrigger>
        <TabsTrigger value="basic">
          <FileUser />
          Basic
        </TabsTrigger>
        <TabsTrigger value="experience">
          <Briefcase />
          Work
        </TabsTrigger>
      </TabsList>
      <TabsContent value="summary">
        <Text tone="muted">Profile summary.</Text>
      </TabsContent>
      <TabsContent value="basic">
        <Text tone="muted">Name, email and links.</Text>
      </TabsContent>
      <TabsContent value="experience">
        <Text tone="muted">Teams and projects.</Text>
      </TabsContent>
    </Tabs>
  ),
};

export const OverflowingTabs: Story = {
  render: () => (
    <Tabs defaultValue="t0" className="max-w-sm">
      <TabsList className="flex w-full">
        {Array.from({ length: 8 }, (_, i) => (
          <TabsTrigger key={i} value={`t${i}`}>
            Section {i + 1}
          </TabsTrigger>
        ))}
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
          <Text tone="muted">
            Set a custom domain and the time zone used for due dates.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="more">
        <AccordionTrigger>More options</AccordionTrigger>
        <AccordionContent>
          <Text tone="muted">Anything else that is rarely needed.</Text>
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
          'Style links with `navigationMenuItemVariants({ active })` and set `aria-current="page"` on the active one. Links in a panel use `navigationMenuLinkClass`.',
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
              aria-current="page"
              className={navigationMenuItemVariants({ active: true })}
            >
              <Home />
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={navigationMenuItemVariants()}>
              <LineChart />
              Tools
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[520px] gap-2 p-3 md:grid-cols-2">
                {TOOLS.map(tool => (
                  <li key={tool.title}>
                    <NavigationMenuLink
                      href="#"
                      className={navigationMenuLinkClass}
                    >
                      <Text variant="body-strong">{tool.title}</Text>
                      <Text tone="muted" className="mt-1 line-clamp-2">
                        {tool.description}
                      </Text>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#"
              className={navigationMenuItemVariants()}
            >
              <User />
              Profile
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
};
