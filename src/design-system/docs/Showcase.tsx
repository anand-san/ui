import { Bell, Globe, Lock, Moon, Smartphone } from 'lucide-react';
import { useState } from 'react';

import { Avatar } from '@/design-system/components/Avatar/Avatar';
import { Button } from '@/design-system/components/Button/Button';
import {
  List,
  ListItem,
  ListSection,
} from '@/design-system/components/List/List';
import { PageHeader } from '@/design-system/components/PageHeader/PageHeader';
import { Switch } from '@/design-system/components/Switch/Switch';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/design-system/components/Tabs/Tabs';
import { Text } from '@/design-system/components/Text/Text';

/**
 * A settings screen made only of library parts: a large title, a segmented
 * control, grouped lists and one filled action. The introduction opens on
 * it, and it doubles as a pattern story.
 */
export function SettingsScreen() {
  const [digest, setDigest] = useState(true);
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6 rounded-sheet bg-canvas p-4 sm:p-6">
      <PageHeader
        title="Settings"
        description="How the app looks, and when it should reach you."
      />
      <Tabs defaultValue="general">
        <TabsList className="w-full">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="flex flex-col gap-6">
          <List>
            <ListItem
              leading={<Avatar name="Ada Lovelace" size="lg" />}
              title={
                <Text as="span" variant="headline">
                  Ada Lovelace
                </Text>
              }
              description="ada@example.com"
              chevron
              asChild
            >
              <a href="#account" />
            </ListItem>
          </List>
          <ListSection
            title="Appearance"
            footer="Dark follows your device unless you choose here."
          >
            <List>
              <ListItem
                leading={<Moon />}
                title="Dark mode"
                trailing="Automatic"
                chevron
                asChild
              >
                <button type="button" />
              </ListItem>
              <ListItem
                leading={<Globe />}
                title="Language"
                trailing="English"
                chevron
                asChild
              >
                <button type="button" />
              </ListItem>
            </List>
          </ListSection>
          <ListSection title="Updates">
            <List>
              <ListItem
                leading={<Bell />}
                title="Weekly summary"
                description="Every Monday at 9:00"
                trailing={
                  <Switch
                    checked={digest}
                    onCheckedChange={setDigest}
                    aria-label="Weekly summary"
                  />
                }
              />
              <ListItem
                leading={<Smartphone />}
                title="Push on this device"
                trailing={
                  <Switch defaultChecked aria-label="Push on this device" />
                }
              />
            </List>
          </ListSection>
          <div className="flex justify-end">
            <Button>Save changes</Button>
          </div>
        </TabsContent>
        <TabsContent value="notifications">
          <List>
            <ListItem
              leading={<Bell />}
              title="Mentions"
              trailing={<Switch defaultChecked aria-label="Mentions" />}
            />
            <ListItem
              leading={<Bell />}
              title="Replies"
              trailing={<Switch aria-label="Replies" />}
            />
          </List>
        </TabsContent>
        <TabsContent value="privacy">
          <List>
            <ListItem
              leading={<Lock />}
              title="Two-step sign in"
              trailing="On"
              chevron
              asChild
            >
              <button type="button" />
            </ListItem>
          </List>
        </TabsContent>
      </Tabs>
    </div>
  );
}
