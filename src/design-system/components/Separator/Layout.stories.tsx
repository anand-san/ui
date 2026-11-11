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
          'Separator is a hairline in the separator role, horizontal or vertical. It is decorative by default; pass `decorative={false}` when it separates content for screen readers. ScrollArea gives a region thin overlay scroll bars, as on the desktop.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SeparatorStory: Story = {
  name: 'Separator',
  render: () => (
    <div className="flex max-w-sm flex-col gap-3 rounded-card bg-surface p-inset">
      <div>
        <Text variant="headline">Weekly summary</Text>
        <Text variant="subhead" tone="secondary">
          Every Monday at 9:00
        </Text>
      </div>
      <Separator />
      <div className="flex h-5 items-center gap-3 text-subhead">
        <span>Email</span>
        <Separator orientation="vertical" />
        <span>Push</span>
        <Separator orientation="vertical" />
        <span>In app</span>
      </div>
    </div>
  ),
};

export const ScrollAreaStory: Story = {
  name: 'ScrollArea',
  render: () => (
    <ScrollArea className="h-56 w-64 rounded-card bg-surface">
      <div className="flex flex-col p-inset">
        {Array.from({ length: 30 }, (_, index) => (
          <div
            key={index}
            className="border-b border-separator py-2 text-subhead last:border-0"
          >
            Release v1.{30 - index}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
