import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';

import { Badge } from '@/design-system/components/Badge/Badge';
import { Button } from '@/design-system/components/Button/Button';
import { Card } from '@/design-system/components/Card/Card';
import { Text } from '@/design-system/components/Text/Text';
import { colorGroups, themeInputs } from '@/design-system/foundations/colors';

import { Code, DocPage, DocSection, TokenSwatch } from './DocBlocks';

const meta = {
  title: 'Foundations/Colors',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Roles: Story = {
  render: () => (
    <DocPage
      title="Colors"
      intro={
        <>
          Colors are roles, not ramps: pick the one that names the job, like{' '}
          <Code>bg-surface</Code> or <Code>text-ink-secondary</Code>. A theme
          sets an accent hue and how vivid it is; every role is derived from
          that, in OKLCH, at a lightness that keeps WCAG AA contrast for any
          hue. A test sweeps all 360 hues in both modes to prove it.
        </>
      }
    >
      {colorGroups.map(group => (
        <DocSection
          key={group.title}
          title={group.title}
          description={group.description}
        >
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
            {group.tokens.map(token => (
              <TokenSwatch key={token.name} {...token} />
            ))}
          </div>
        </DocSection>
      ))}
    </DocPage>
  ),
};

export const ThemeInputs: Story = {
  name: 'Theme inputs',
  render: () => (
    <DocPage
      title="Theme inputs"
      intro={
        <>
          A theme sets these and nothing else. Copy{' '}
          <Code>@sandilya/ui/themes/template.css</Code> to start one; the
          shipped themes are forest, ember and graphite.
        </>
      }
    >
      <div className="overflow-hidden rounded-card bg-surface">
        <table className="w-full text-left text-subhead">
          <thead className="text-ink-secondary">
            <tr className="border-b border-separator">
              <th className="px-4 py-2 font-medium">Variable</th>
              <th className="px-4 py-2 font-medium">Default</th>
              <th className="px-4 py-2 font-medium">What it does</th>
            </tr>
          </thead>
          <tbody>
            {themeInputs.map(input => (
              <tr
                key={input.name}
                className="border-b border-separator last:border-0"
              >
                <td className="px-4 py-2.5">
                  <Code>--{input.name}</Code>
                </td>
                <td className="px-4 py-2.5 font-mono text-caption text-ink-secondary">
                  {input.example}
                </td>
                <td className="px-4 py-2.5">{input.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DocPage>
  ),
};

function HuePlayground() {
  const [hue, setHue] = useState(250);
  const [chroma, setChroma] = useState(0.2);

  // The roles are derived on the root, so the inputs have to be set there
  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty('--accent-hue', String(hue));
    root.setProperty('--accent-chroma', String(chroma));
    return () => {
      root.removeProperty('--accent-hue');
      root.removeProperty('--accent-chroma');
    };
  }, [hue, chroma]);

  return (
    <DocPage
      title="Any hue"
      intro="Drag the hue or the chroma. The accent fill, the text shade, the soft fill and the accent surface all move together, and every pair stays at 4.5:1."
    >
      <div className="grid gap-6 md:grid-cols-[16rem_1fr]">
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-subhead font-medium">
            Hue {hue}°
            <input
              type="range"
              min={0}
              max={359}
              value={hue}
              onChange={event => setHue(Number(event.target.value))}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-subhead font-medium">
            Chroma {chroma.toFixed(2)}
            <input
              type="range"
              min={0}
              max={0.2}
              step={0.01}
              value={chroma}
              onChange={event => setChroma(Number(event.target.value))}
            />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <Text variant="title-3">On a surface</Text>
            <Text tone="secondary">
              A link reads as{' '}
              <a href="#hue" className="text-accent underline">
                accent text
              </a>
              .
            </Text>
            <div className="flex flex-wrap gap-2">
              <Button>Filled</Button>
              <Button variant="tinted">Tinted</Button>
              <Badge tone="accent">Soft badge</Badge>
            </div>
          </Card>
          <Card variant="accent">
            <Text variant="title-3">On the accent</Text>
            <Text tone="secondary">Every role turns white in here.</Text>
            <div className="flex flex-wrap gap-2">
              <Button>Filled</Button>
              <Button variant="tinted">Tinted</Button>
            </div>
          </Card>
        </div>
      </div>
    </DocPage>
  );
}

export const AnyHue: Story = {
  name: 'Any hue',
  render: () => <HuePlayground />,
};
