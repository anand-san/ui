import type { Meta, StoryObj } from '@storybook/react-vite';

import { Text } from '@/design-system/components/Text/Text';
import {
  textVariants,
  typeScale,
} from '@/design-system/foundations/typography';

import { Code, DocPage, DocSection } from './DocBlocks';

const meta = {
  title: 'Foundations/Typography',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  name: 'Type scale',
  render: () => (
    <DocPage
      title="Typography"
      intro={
        <>
          Ten roles cover every piece of text in the app. Pick the role that
          describes the text, not a size. Use <Code>{'<Text variant>'}</Code> or{' '}
          <Code>textVariants()</Code>; avoid raw sizes like{' '}
          <Code>text-[10px]</Code> and uppercase labels.
        </>
      }
    >
      <DocSection
        title="Roles"
        description="Sizes step up at the md breakpoint where noted. The font is Inter with system fallbacks."
      >
        <div className="flex flex-col divide-y rounded-xl bg-surface px-4 md:px-6">
          {typeScale.map(row => (
            <div
              key={row.variant}
              className="grid gap-3 py-5 md:grid-cols-[10rem_1fr_16rem] md:items-baseline md:gap-6"
            >
              <div className="flex flex-col gap-0.5">
                <Text variant="code">{row.variant}</Text>
                <Text variant="caption">{row.size}</Text>
              </div>
              <Text variant={row.variant}>
                {row.variant === 'display'
                  ? '24'
                  : row.variant === 'code'
                    ? '#574a7d'
                    : 'Senior Product Designer at Linear'}
              </Text>
              <div className="flex flex-col gap-1">
                <Text variant="caption" tone="default">
                  {row.usage}
                </Text>
                <Text variant="caption">Replaces {row.replaces}</Text>
              </div>
            </div>
          ))}
        </div>
      </DocSection>
    </DocPage>
  ),
};

export const Tones: Story = {
  render: () => (
    <DocPage
      title="Tones"
      intro="Tone sets the text color from the semantic tokens. Default and muted cover almost everything; the rest are for status and feedback."
    >
      <DocSection title="Every tone at body size">
        <div className="flex flex-col gap-2 rounded-xl bg-surface p-4 md:p-6">
          {(
            [
              'default',
              'muted',
              'brand',
              'success',
              'warning',
              'info',
              'destructive',
            ] as const
          ).map(tone => (
            <div key={tone} className="flex items-baseline gap-4">
              <Text variant="code" tone="muted" className="w-24">
                {tone}
              </Text>
              <Text tone={tone}>Application sent to Linear two days ago</Text>
            </div>
          ))}
        </div>
      </DocSection>
    </DocPage>
  ),
};

export const InContext: Story = {
  name: 'In context',
  render: () => (
    <DocPage
      title="In context"
      intro="The roles together, the way a tracker screen uses them."
    >
      <div className="flex max-w-xl flex-col gap-4">
        <Text variant="title">Good morning, Anand</Text>
        <div className="flex flex-col gap-3 rounded-xl bg-surface p-4 md:p-6">
          <Text variant="heading">Your pipeline</Text>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Text variant="display" className="text-info">
                12
              </Text>
              <Text tone="muted">Applied</Text>
            </div>
            <div>
              <Text variant="display" className="text-warning">
                3
              </Text>
              <Text tone="muted">Interviewing</Text>
            </div>
            <div>
              <Text variant="display" className="text-success">
                1
              </Text>
              <Text tone="muted">Offer</Text>
            </div>
          </div>
          <div className="flex flex-col gap-1 rounded-xl bg-primary/5 px-3 py-3 md:px-4">
            <Text variant="caption">Senior Product Designer</Text>
            <Text variant="body-strong">Linear</Text>
            <Text variant="caption" className="line-clamp-2">
              Shape the planning tools used by thousands of product teams.
            </Text>
          </div>
          <label className="flex flex-col gap-1.5">
            <Text variant="label">Follow-up date</Text>
            <span className={textVariants({ variant: 'body' })}>
              Thursday, 16 October
            </span>
          </label>
        </div>
      </div>
    </DocPage>
  ),
};
