import { describe, expect, test } from 'bun:test';
import { createRef } from 'react';

import { projectMomentum } from '@/design-system/foundations/motion';

import { mergeRefs } from './mergeRefs';
import { modalMotion } from './modal';

describe('modalMotion', () => {
  test('grows a centred dialog in without moving it', () => {
    const { initial, animate } = modalMotion('center', false);
    expect(initial).toEqual({ opacity: 0, scale: 0.95 });
    expect(animate).toMatchObject({ opacity: 1, scale: 1 });
  });

  test('slides a sheet in from its edge and back out the same way', () => {
    for (const [placement, axis, offset] of [
      ['bottom', 'y', '100%'],
      ['left', 'x', '-110%'],
      ['right', 'x', '110%'],
    ] as const) {
      const { initial, exit } = modalMotion(placement, false);
      expect(initial).toEqual({ [axis]: offset });
      expect(exit).toMatchObject({ [axis]: offset });
    }
  });

  test('only fades with reduced motion', () => {
    for (const placement of ['center', 'bottom', 'left', 'right'] as const) {
      const { initial, exit } = modalMotion(placement, true);
      expect(initial).toEqual({ opacity: 0 });
      expect(Object.keys(exit ?? {}).sort()).toEqual(['opacity', 'transition']);
    }
  });

  test('uses springs, not durations, for movement', () => {
    const { animate } = modalMotion('bottom', false);
    expect(animate).toMatchObject({
      transition: { type: 'spring', bounce: 0 },
    });
  });
});

describe('projectMomentum', () => {
  test('a still release goes nowhere', () => {
    expect(projectMomentum(0)).toBe(0);
  });

  test('a flick at 1000px/s carries about 500px', () => {
    expect(projectMomentum(1000)).toBeCloseTo(499, 0);
  });
});

describe('mergeRefs', () => {
  test('sets object and callback refs, and clears them', () => {
    const object = createRef<string>();
    let called: string | null = 'unset';
    const cleanup = mergeRefs<string>(object, value => {
      called = value;
    })('node');

    expect(object.current).toBe('node');
    expect(called).toBe('node');

    if (typeof cleanup === 'function') cleanup();
    expect(object.current).toBeNull();
    expect(called).toBeNull();
  });
});
