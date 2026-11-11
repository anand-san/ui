import type { Meta, StoryObj } from '@storybook/react-vite';
import { motion } from 'motion/react';
import { useState } from 'react';

import { Button } from '@/design-system/components/Button/Button';
import { Card } from '@/design-system/components/Card/Card';
import { Text } from '@/design-system/components/Text/Text';
import { springs } from '@/design-system/foundations/motion';

import { Code, DocPage, DocSection } from './DocBlocks';

const meta = {
  title: 'Foundations/Motion',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Interruptible() {
  const [right, setRight] = useState(false);
  return (
    <Card>
      <div className="relative h-14 rounded-control bg-surface-inset">
        <motion.div
          className="absolute top-2 size-10 rounded-full bg-accent"
          animate={{ left: right ? 'calc(100% - 3rem)' : '0.5rem' }}
          transition={springs.default}
        />
      </div>
      <div className="flex items-center gap-3">
        <Button onClick={() => setRight(value => !value)}>Move</Button>
        <Text variant="subhead" tone="secondary">
          Click again mid-flight: the spring turns around from where it is,
          keeping its speed.
        </Text>
      </div>
    </Card>
  );
}

function Throw() {
  return (
    <Card>
      <div className="relative h-40 overflow-hidden rounded-control bg-surface-inset">
        <motion.div
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.35}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 22 }}
          className="absolute left-[calc(50%-2rem)] top-[calc(50%-2rem)] size-16 cursor-grab touch-none rounded-card bg-accent shadow-floating active:cursor-grabbing"
        />
      </div>
      <Text variant="subhead" tone="secondary">
        Drag and throw it. Past the edge it resists, and it springs home with a
        little bounce, because a gesture gave it momentum.
      </Text>
    </Card>
  );
}

export const Springs: Story = {
  render: () => (
    <DocPage
      title="Motion"
      intro={
        <>
          Motion uses springs, after Apple&apos;s: they start from wherever an
          element is, keep the speed they are given and can be redirected at any
          moment. Things that appear use the critically damped{' '}
          <Code>springs.default</Code>; bounce is only for motion a gesture
          started. In CSS the same curve is <Code>ease-spring</Code>.
        </>
      }
    >
      <DocSection title="Interruptible">
        <Interruptible />
      </DocSection>
      <DocSection title="Momentum">
        <Throw />
      </DocSection>
      <DocSection
        title="Reduced motion"
        description="With reduced motion on, dialogs and sheets cross-fade instead of moving, menus fade without scaling, and the press scale is off. The state change is always kept."
      >
        <div className="grid gap-2 rounded-card bg-surface p-inset text-subhead sm:grid-cols-2">
          <div>
            <Code>springs.default</Code> bounce 0, 0.35s: appearing things
          </div>
          <div>
            <Code>springs.momentum</Code> bounce 0.2: after a throw
          </div>
          <div>
            <Code>springs.sheet</Code> bounce 0.15, 0.3s: sheets after a drag
          </div>
          <div>
            <Code>projectMomentum(v)</Code> where a flick would come to rest
          </div>
        </div>
      </DocSection>
    </DocPage>
  ),
};
