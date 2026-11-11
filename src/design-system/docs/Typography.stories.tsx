import type { Meta, StoryObj } from '@storybook/react-vite';

import { Text } from '@/design-system/components/Text/Text';
import { typeScale } from '@/design-system/foundations/typography';

import { Code, DocPage, DocSection } from './DocBlocks';

const meta = {
  title: 'Foundations/Typography',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const samples: Partial<Record<(typeof typeScale)[number]['variant'], string>> =
  {
    display: 'Plan the week',
    'title-1': 'Settings',
    'title-2': 'Notifications',
    'title-3': 'Weekly summary',
    code: 'proj_2026_11',
  };

export const Scale: Story = {
  name: 'Type scale',
  render: () => (
    <DocPage
      title="Typography"
      intro={
        <>
          Nine roles cover every piece of text. Pick the role that says what the
          text is, and size, leading, tracking and weight follow as one set:
          tracking tightens as text grows, as in a native app. Use{' '}
          <Code>{'<Text variant>'}</Code> or <Code>textVariants()</Code>; raw
          sizes like <Code>text-sm</Code> don&apos;t exist.
        </>
      }
    >
      <DocSection
        title="Roles"
        description="Sizes are compact / regular / comfortable: they follow the density, so text is larger on a touch screen. The face is the system font, which is San Francisco on Apple devices."
      >
        <div className="flex flex-col divide-y divide-separator rounded-card bg-surface px-4 md:px-6">
          {typeScale.map(row => (
            <div
              key={row.variant}
              className="grid gap-3 py-5 md:grid-cols-[9rem_1fr_15rem] md:items-baseline md:gap-6"
            >
              <div className="flex flex-col gap-0.5">
                <Text variant="code">{row.variant}</Text>
                <Text variant="caption">{row.sizes}</Text>
              </div>
              <Text variant={row.variant} className="min-w-0">
                {samples[row.variant] ??
                  'Get a summary of what changed every Monday morning.'}
              </Text>
              <Text variant="caption">{row.usage}</Text>
            </div>
          ))}
        </div>
      </DocSection>
      <DocSection
        title="Tones"
        description="Secondary is for supporting text; it reads at 4.5:1 on every surface. Status tones are for short labels, not paragraphs."
      >
        <div className="flex flex-col gap-2 rounded-card bg-surface p-inset">
          {(
            [
              'default',
              'secondary',
              'accent',
              'success',
              'warning',
              'danger',
              'info',
            ] as const
          ).map(tone => (
            <Text key={tone} tone={tone}>
              {tone}: Your changes were saved.
            </Text>
          ))}
        </div>
      </DocSection>
      <DocSection
        title="Hierarchy by weight"
        description="Emphasis comes from weight before size. A row's title is a headline: body size, semibold."
      >
        <div className="flex flex-col gap-1 rounded-card bg-surface p-inset">
          <Text variant="headline">Weekly summary</Text>
          <Text variant="subhead" tone="secondary">
            Every Monday at 9:00, to you and two others
          </Text>
          <Text variant="caption" numeric>
            Last sent 3 Nov 2026 · 1,204 opens
          </Text>
        </div>
      </DocSection>
    </DocPage>
  ),
};
