import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@/design-system/components/Button/Button';
import { Input } from '@/design-system/components/Input/Input';
import { List, ListItem } from '@/design-system/components/List/List';
import { Switch } from '@/design-system/components/Switch/Switch';
import { Text } from '@/design-system/components/Text/Text';
import {
  densityScale,
  radiusScale,
  spacing,
  spacingScale,
} from '@/design-system/foundations/spacing';

import { Code, DocPage, DocSection } from './DocBlocks';

const meta = {
  title: 'Foundations/Spacing',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  name: 'Spacing and shape',
  render: () => (
    <DocPage
      title="Spacing and shape"
      intro={
        <>
          Spacing is Tailwind&apos;s 4px grid. Sizes that change with the
          density are tokens: <Code>h-control-md</Code>, <Code>min-h-row</Code>,{' '}
          <Code>p-inset</Code>, <Code>rounded-card</Code>.
        </>
      }
    >
      <DocSection title="Steps">
        <div className="flex flex-col gap-3 rounded-card bg-surface p-inset">
          {spacingScale.map(step => (
            <div
              key={step.step}
              className="grid grid-cols-[4rem_1fr] items-center gap-4 sm:grid-cols-[4rem_8rem_1fr]"
            >
              <Code>{step.step}</Code>
              <div
                className="h-3 rounded-full bg-accent"
                style={{ width: step.px * 2 }}
              />
              <Text
                variant="caption"
                className="col-span-2 sm:col-span-1"
              >{`${step.px}px · ${step.usage}`}</Text>
            </div>
          ))}
        </div>
      </DocSection>
      <DocSection
        title="Named spacing"
        description="Roles for the page frame and the gaps between its parts, from foundations/spacing."
      >
        <div className="grid gap-2 rounded-card bg-surface p-inset sm:grid-cols-2">
          {Object.entries(spacing).map(([name, value]) => (
            <div key={name} className="flex flex-col gap-0.5">
              <Text variant="headline" className="text-subhead">
                spacing.{name}
              </Text>
              <Text variant="code" tone="secondary" className="text-caption">
                {value}
              </Text>
            </div>
          ))}
        </div>
      </DocSection>
      <DocSection
        title="Corners"
        description="Corners are set by role and scale with the theme's radius. A menu row is concentric with its panel: its radius is the panel's minus the padding between them."
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {radiusScale.map(radius => (
            <div key={radius.name} className="flex flex-col gap-2">
              <div
                className={`h-16 border border-control bg-surface ${radius.name}`}
              />
              <Code>{radius.name}</Code>
              <Text variant="caption">{radius.usage}</Text>
            </div>
          ))}
        </div>
      </DocSection>
    </DocPage>
  ),
};

function DensitySample({ density }: { density: string }) {
  return (
    <div
      data-density={density}
      className="flex flex-col gap-3 rounded-card bg-canvas p-3"
    >
      <List>
        <ListItem title="Notifications" trailing={<Switch defaultChecked />} />
        <ListItem title="Language" trailing="English" chevron />
      </List>
      <div className="flex gap-2">
        <Input placeholder="Search" />
        <Button>Save</Button>
      </div>
    </div>
  );
}

export const Density: Story = {
  render: () => (
    <DocPage
      title="Density"
      intro={
        <>
          Set <Code>data-density</Code> on any element to size the type,
          controls and rows inside it. Without it, a mouse gets{' '}
          <Code>regular</Code> and a touch screen <Code>comfortable</Code>, so
          every target is at least 44px. The toolbar sets it for the whole page.
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {densityScale.map(row => (
          <div key={row.density} className="flex flex-col gap-2">
            <div className="flex flex-col gap-0.5">
              <Text variant="headline">{row.density}</Text>
              <Text variant="caption">
                Body {row.body} · controls {row.control} · rows {row.row}
              </Text>
              <Text variant="caption">{row.usage}</Text>
            </div>
            <DensitySample density={row.density} />
          </div>
        ))}
      </div>
    </DocPage>
  ),
};
