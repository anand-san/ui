import type { Meta, StoryObj } from '@storybook/react-vite';

import { ScrollArea } from '@/design-system/components/ScrollArea/ScrollArea';
import { Text } from '@/design-system/components/Text/Text';

import { Separator } from './Separator';

const meta = {
  title: 'Components/Layout',
  parameters: {
    docs: {
      description: {
        component:
          'Separator is a hairline in the border token, horizontal or vertical. It is decorative by default; pass `decorative={false}` when it separates content for screen readers. ScrollArea gives a scrolling region a thin scrollbar that matches both themes.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SeparatorStory: Story = {
  name: 'Separator',
  render: () => (
    <div className="flex max-w-sm flex-col gap-3 rounded-xl bg-surface p-4">
      <div>
        <Text variant="body-strong">Senior Product Designer</Text>
        <Text tone="muted">Northwind</Text>
      </div>
      <Separator />
      <div className="flex h-5 items-center gap-3">
        <Text tone="muted">Remote</Text>
        <Separator orientation="vertical" />
        <Text tone="muted">Full time</Text>
        <Separator orientation="vertical" />
        <Text tone="muted">Applied 3 days ago</Text>
      </div>
    </div>
  ),
};

const NOTES = Array.from({ length: 20 }, (_, i) => `Follow-up note ${i + 1}`);

export const ScrollAreaStory: Story = {
  name: 'Scroll area',
  render: () => (
    <ScrollArea className="h-64 w-64 rounded-xl border">
      <div className="flex flex-col p-4">
        {NOTES.map((note, index) => (
          <div key={note}>
            {index > 0 && <Separator className="my-2" />}
            <Text>{note}</Text>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
