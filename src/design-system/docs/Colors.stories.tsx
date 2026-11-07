import type { Meta, StoryObj } from '@storybook/react-vite';

import { Text } from '@/design-system/components/Text/Text';
import {
  rampMigrations,
  rampSteps,
  semanticColors,
  supportedRamps,
  tintScale,
} from '@/design-system/foundations/colors';
import { cn } from '@/design-system/lib/cn';

import { Code, DocPage, DocSection, TokenSwatch } from './DocBlocks';

const meta = {
  title: 'Foundations/Colors',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SemanticTokens: Story = {
  name: 'Semantic tokens',
  render: () => (
    <DocPage
      title="Colors"
      intro={
        <>
          Use semantic tokens in components and screens. Each one names a job
          and has a light and a dark value. Switch the theme in the toolbar to
          see both. Every token lives in{' '}
          <Code>packages/tokens/tokens.css</Code>, with Tailwind names in{' '}
          <Code>packages/tokens/theme.css</Code>.
        </>
      }
    >
      {semanticColors.map(group => (
        <DocSection
          key={group.title}
          title={group.title}
          description={group.description}
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {group.tokens.map(token => (
              <TokenSwatch key={token.name} {...token} />
            ))}
          </div>
        </DocSection>
      ))}
    </DocPage>
  ),
};

const tintColors = [
  { name: 'primary', bg: ['bg-primary/5', 'bg-primary/10', 'bg-primary/20'] },
  { name: 'brand', bg: ['bg-brand/5', 'bg-brand/10', 'bg-brand/20'] },
  {
    name: 'highlight',
    bg: ['bg-highlight/20', 'bg-highlight/40', 'bg-highlight/70'],
  },
  { name: 'success', bg: ['bg-success/5', 'bg-success/10', 'bg-success/20'] },
  { name: 'warning', bg: ['bg-warning/5', 'bg-warning/10', 'bg-warning/20'] },
  { name: 'info', bg: ['bg-info/5', 'bg-info/10', 'bg-info/20'] },
  {
    name: 'destructive',
    bg: ['bg-destructive/5', 'bg-destructive/10', 'bg-destructive/20'],
  },
];

const tintText: Record<string, string> = {
  primary: 'text-primary',
  brand: 'text-brand',
  highlight: 'text-highlight-foreground',
  success: 'text-success',
  warning: 'text-warning',
  info: 'text-info',
  destructive: 'text-destructive',
};

export const Tints: Story = {
  render: () => (
    <DocPage
      title="Tints"
      intro="Tints are a token at low opacity over the surface below. They let child cards and pills follow whatever they sit on, in both themes. Only three steps are used."
    >
      <DocSection title="Tint steps">
        <div className="flex flex-col gap-2">
          {tintScale.map(step => (
            <div key={step.opacity} className="flex items-baseline gap-3">
              <Code>/{step.opacity}</Code>
              <Text>{step.usage}</Text>
            </div>
          ))}
        </div>
      </DocSection>
      <DocSection
        title="On a soft card"
        description="How each tint looks on the surface token, where most of them are used."
      >
        <div className="flex flex-col gap-4 rounded-xl bg-surface p-4 md:p-6">
          {tintColors.map(color => (
            <div
              key={color.name}
              className="grid grid-cols-[6rem_repeat(3,1fr)] items-center gap-2"
            >
              <Text variant="body-strong">{color.name}</Text>
              {color.bg.map(bg => (
                <div
                  key={bg}
                  className={cn(
                    'flex h-12 items-center justify-center rounded-xl',
                    bg,
                  )}
                >
                  <span
                    className={cn('text-xs font-medium', tintText[color.name])}
                  >
                    {bg.split('/')[1]}%
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </DocSection>
    </DocPage>
  ),
};

// Written out in full so Tailwind's JIT generates every class
const rampClasses: Record<(typeof supportedRamps)[number], string[]> = {
  neutral: [
    'bg-neutral-50',
    'bg-neutral-100',
    'bg-neutral-200',
    'bg-neutral-300',
    'bg-neutral-400',
    'bg-neutral-500',
    'bg-neutral-600',
    'bg-neutral-700',
    'bg-neutral-800',
    'bg-neutral-900',
    'bg-neutral-950',
  ],
  highlight: [
    'bg-highlight-50',
    'bg-highlight-100',
    'bg-highlight-200',
    'bg-highlight-300',
    'bg-highlight-400',
    'bg-highlight-500',
    'bg-highlight-600',
    'bg-highlight-700',
    'bg-highlight-800',
    'bg-highlight-900',
    'bg-highlight-950',
  ],
  brand: [
    'bg-brand-50',
    'bg-brand-100',
    'bg-brand-200',
    'bg-brand-300',
    'bg-brand-400',
    'bg-brand-500',
    'bg-brand-600',
    'bg-brand-700',
    'bg-brand-800',
    'bg-brand-900',
    'bg-brand-950',
  ],
  red: [
    'bg-red-50',
    'bg-red-100',
    'bg-red-200',
    'bg-red-300',
    'bg-red-400',
    'bg-red-500',
    'bg-red-600',
    'bg-red-700',
    'bg-red-800',
    'bg-red-900',
    'bg-red-950',
  ],
  orange: [
    'bg-orange-50',
    'bg-orange-100',
    'bg-orange-200',
    'bg-orange-300',
    'bg-orange-400',
    'bg-orange-500',
    'bg-orange-600',
    'bg-orange-700',
    'bg-orange-800',
    'bg-orange-900',
    'bg-orange-950',
  ],
  amber: [
    'bg-amber-50',
    'bg-amber-100',
    'bg-amber-200',
    'bg-amber-300',
    'bg-amber-400',
    'bg-amber-500',
    'bg-amber-600',
    'bg-amber-700',
    'bg-amber-800',
    'bg-amber-900',
    'bg-amber-950',
  ],
  yellow: [
    'bg-yellow-50',
    'bg-yellow-100',
    'bg-yellow-200',
    'bg-yellow-300',
    'bg-yellow-400',
    'bg-yellow-500',
    'bg-yellow-600',
    'bg-yellow-700',
    'bg-yellow-800',
    'bg-yellow-900',
    'bg-yellow-950',
  ],
  green: [
    'bg-green-50',
    'bg-green-100',
    'bg-green-200',
    'bg-green-300',
    'bg-green-400',
    'bg-green-500',
    'bg-green-600',
    'bg-green-700',
    'bg-green-800',
    'bg-green-900',
    'bg-green-950',
  ],
  blue: [
    'bg-blue-50',
    'bg-blue-100',
    'bg-blue-200',
    'bg-blue-300',
    'bg-blue-400',
    'bg-blue-500',
    'bg-blue-600',
    'bg-blue-700',
    'bg-blue-800',
    'bg-blue-900',
    'bg-blue-950',
  ],
  purple: [
    'bg-purple-50',
    'bg-purple-100',
    'bg-purple-200',
    'bg-purple-300',
    'bg-purple-400',
    'bg-purple-500',
    'bg-purple-600',
    'bg-purple-700',
    'bg-purple-800',
    'bg-purple-900',
    'bg-purple-950',
  ],
  fuchsia: [
    'bg-fuchsia-50',
    'bg-fuchsia-100',
    'bg-fuchsia-200',
    'bg-fuchsia-300',
    'bg-fuchsia-400',
    'bg-fuchsia-500',
    'bg-fuchsia-600',
    'bg-fuchsia-700',
    'bg-fuchsia-800',
    'bg-fuchsia-900',
    'bg-fuchsia-950',
  ],
};

export const Ramps: Story = {
  render: () => (
    <DocPage
      title="Ramps"
      intro={
        <>
          The primitive palettes behind the tokens. Reach for these only when no
          semantic token fits. Neutral is the only gray; brand is built around
          the logo purple, <Code>#574a7d</Code> at step 600.
        </>
      }
    >
      <DocSection title="Supported ramps">
        <div className="flex flex-col gap-3 overflow-x-auto">
          <div className="grid min-w-[40rem] grid-cols-[5rem_repeat(11,1fr)] gap-1">
            <span />
            {rampSteps.map(step => (
              <Text key={step} variant="caption" className="text-center">
                {step}
              </Text>
            ))}
            {supportedRamps.map(ramp => (
              <div key={ramp} className="contents">
                <Text variant="body-strong" className="self-center">
                  {ramp}
                </Text>
                {rampClasses[ramp].map(className => (
                  <div
                    key={className}
                    title={className.replace('bg-', '')}
                    className={cn(
                      'h-10 rounded-md ring-1 ring-inset ring-border',
                      className,
                    )}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </DocSection>
      <DocSection
        title="Moving off other ramps"
        description="The app also uses slate, gray, zinc, emerald and others. Map them onto the supported set when migrating a screen."
      >
        <div className="flex flex-col divide-y rounded-xl bg-surface px-4">
          {rampMigrations.map(row => (
            <div key={row.from} className="grid grid-cols-2 gap-4 py-3 text-sm">
              <Code>{row.from}</Code>
              <span>→ {row.to}</span>
            </div>
          ))}
        </div>
      </DocSection>
    </DocPage>
  ),
};
