import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bell, CreditCard, KeyRound, Mail, Wifi } from 'lucide-react';

import { Avatar } from '@/design-system/components/Avatar/Avatar';
import { Badge } from '@/design-system/components/Badge/Badge';
import { Switch } from '@/design-system/components/Switch/Switch';

import { List, ListItem, ListSection } from './List';

const meta = {
  title: 'Components/List',
  component: List,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "Grouped rows, as in a settings screen. Separators start where the text starts, so an icon column reads as one. A row with `asChild` is the link or button itself, with a pressed state; rows are at least the density's row height, 44px on a desk.",
      },
    },
  },
  decorators: [
    Story => (
      <div className="max-w-md rounded-sheet bg-canvas p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Settings: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <ListSection title="Connection" footer="Wi-Fi turns on again tomorrow.">
        <List>
          <ListItem
            leading={<Wifi />}
            title="Wi-Fi"
            trailing={<Switch defaultChecked aria-label="Wi-Fi" />}
          />
          <ListItem
            leading={<Bell />}
            title="Notifications"
            trailing="Banners"
            chevron
            asChild
          >
            <button type="button" />
          </ListItem>
        </List>
      </ListSection>
      <ListSection title="Account">
        <List>
          <ListItem
            leading={<Mail />}
            title="Email"
            trailing="ada@example.com"
          />
          <ListItem leading={<KeyRound />} title="Password" chevron asChild>
            <a href="#password" />
          </ListItem>
          <ListItem
            leading={<CreditCard />}
            title="Plan"
            trailing={<Badge tone="accent">Pro</Badge>}
            chevron
            asChild
          >
            <a href="#plan" />
          </ListItem>
        </List>
      </ListSection>
    </div>
  ),
};

export const People: Story = {
  render: () => (
    <List>
      {[
        ['Ada Lovelace', 'Owner'],
        ['Grace Hopper', 'Editor'],
        ['Katherine Johnson', 'Viewer'],
      ].map(([name, role]) => (
        <ListItem
          key={name}
          leading={<Avatar name={name} />}
          title={name}
          description={role}
          chevron
          asChild
        >
          <a href={`#${name}`} />
        </ListItem>
      ))}
    </List>
  ),
};

export const WithoutIcons: Story = {
  name: 'Without icons',
  render: () => (
    <List>
      <ListItem title="Version" trailing="4.0.2" />
      <ListItem title="Build" trailing="2026.11.11" />
      <ListItem title="Licenses" chevron asChild>
        <a href="#licenses" />
      </ListItem>
    </List>
  ),
};
