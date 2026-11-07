import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';

import { Text } from '@/design-system/components/Text/Text';
import {
  radiusScale,
  spacing,
  spacingScale,
} from '@/design-system/foundations/spacing';
import { cn } from '@/design-system/lib/cn';

import { Code, DocPage, DocSection } from './DocBlocks';

const meta = {
  title: 'Foundations/Spacing',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  name: 'Spacing scale',
  render: () => (
    <DocPage
      title="Spacing"
      intro={
        <>
          Spacing follows Tailwind’s 4px grid, limited to the ten steps below.
          Steps like <Code>2.5</Code>, <Code>5</Code> or <Code>7</Code> are left
          out on purpose, so neighbouring screens line up.
        </>
      }
    >
      <DocSection title="Steps">
        <div className="flex flex-col divide-y rounded-xl bg-surface px-4 md:px-6">
          {spacingScale.map(row => (
            <div
              key={row.step}
              className="grid grid-cols-[3.5rem_3.5rem_1fr] items-center gap-4 py-3 md:grid-cols-[4rem_4rem_10rem_1fr]"
            >
              <Code>{row.step}</Code>
              <Text variant="caption">{row.px}px</Text>
              <div
                className="hidden h-3 rounded-sm bg-brand md:block"
                style={{ width: row.px * 2 }}
              />
              <Text variant="caption" tone="default">
                {row.usage}
              </Text>
            </div>
          ))}
        </div>
      </DocSection>
    </DocPage>
  ),
};

function Outline({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        'relative rounded-xl outline-dashed outline-1 outline-brand/60',
        className,
      )}
    >
      <span className="absolute -top-2.5 left-3 rounded-full bg-brand px-2 text-xs font-medium leading-5 text-brand-foreground">
        {label}
      </span>
      {children}
    </div>
  );
}

export const Roles: Story = {
  render: () => (
    <DocPage
      title="Spacing roles"
      intro={
        <>
          The named jobs spacing does on a dashboard page, exported as{' '}
          <Code>spacing</Code> from the design system. Card uses these
          internally, so most screens get them for free.
        </>
      }
    >
      <DocSection title="Roles">
        <div className="flex flex-col divide-y rounded-xl bg-surface px-4 md:px-6">
          {[
            ['spacing.page', spacing.page, 'Page gutter and max width'],
            ['spacing.section', spacing.section, 'Between section cards'],
            [
              'spacing.card.lg',
              `${spacing.card.lg.inset} · ${spacing.card.lg.gap}`,
              'Section card padding and gap between its parts',
            ],
            [
              'spacing.card.md',
              `${spacing.card.md.inset} · ${spacing.card.md.gap}`,
              'Cards in sheets and dialogs',
            ],
            [
              'spacing.card.sm',
              `${spacing.card.sm.inset} · ${spacing.card.sm.gap}`,
              'Item cards inside a section',
            ],
            ['spacing.items', spacing.items, 'Between stacked item cards'],
            ['spacing.inline', spacing.inline, 'Icon to text, title to count'],
          ].map(([name, value, usage]) => (
            <div
              key={name}
              className="grid gap-1 py-3 md:grid-cols-[10rem_16rem_1fr] md:gap-4"
            >
              <Code>{name}</Code>
              <Text variant="code" tone="muted">
                {value}
              </Text>
              <Text variant="caption" tone="default">
                {usage}
              </Text>
            </div>
          ))}
        </div>
      </DocSection>
      <DocSection
        title="Anatomy"
        description="A section card with two item cards, with each spacing role outlined."
      >
        <Outline
          label="section gap-4"
          className={cn('flex flex-col px-3 pb-3 pt-6', spacing.section)}
        >
          <Outline
            label="card.lg  p-4 md:p-6 · gap-3"
            className={cn(
              'flex flex-col bg-surface',
              spacing.card.lg.inset,
              spacing.card.lg.gap,
            )}
          >
            <Text variant="heading">Recent</Text>
            <Outline
              label="items gap-2"
              className={cn('flex flex-col px-2 pb-2 pt-5', spacing.items)}
            >
              {['Website redesign', 'Billing migration'].map(project => (
                <div
                  key={project}
                  className={cn(
                    'flex flex-col rounded-xl bg-primary/5',
                    spacing.card.sm.inset,
                    spacing.card.sm.gap,
                  )}
                >
                  <Text variant="caption">Design</Text>
                  <Text variant="body-strong">{project}</Text>
                </div>
              ))}
            </Outline>
          </Outline>
        </Outline>
      </DocSection>
    </DocPage>
  ),
};

export const Radius: Story = {
  render: () => (
    <DocPage
      title="Radius"
      intro="Three radii. Cards are always rounded-xl, so nested cards share the same curve."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {radiusScale.map(row => (
          <div key={row.name} className="flex flex-col gap-2">
            <div
              className={cn(
                'h-20 bg-primary/10',
                row.name,
                row.name === 'rounded-full' && 'w-20',
              )}
            />
            <Code>{row.name}</Code>
            <Text variant="caption">{row.usage}</Text>
          </div>
        ))}
      </div>
    </DocPage>
  ),
};
