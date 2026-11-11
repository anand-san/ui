import { describe, expect, test } from 'bun:test';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { contrast, over, toSrgb, type Rgb } from './lib/oklch';
import {
  color,
  environment,
  type Mode,
  type ThemeInputs,
  TOKENS_DIR,
} from './lib/tokens';

const AA = 4.5;
const NON_TEXT = 3;

/** The worst content a translucent material can sit over */
const black: Rgb = [0, 0, 0];
const white: Rgb = [1, 1, 1];

interface Pair {
  text: string;
  on: string;
  /** A translucent layer between the text and `on`, like a fill or material */
  layer?: string;
  min: number;
}

const surfaces = ['--canvas', '--surface', '--surface-inset', '--overlay'];
const fills = ['--fill', '--fill-hover', '--fill-strong'];
/** Colored text sits on these: a plain button's hover and pressed fills */
const hoverFills = ['--fill', '--fill-hover'];

const neutralPairs: Pair[] = [
  ...['--ink', '--ink-secondary'].flatMap(text => [
    ...surfaces.map(on => ({ text, on, min: AA })),
    ...fills.flatMap(layer =>
      ['--canvas', '--surface'].map(on => ({ text, on, layer, min: AA })),
    ),
  ]),
  ...surfaces.map(on => ({ text: '--border-control', on, min: NON_TEXT })),
  ...surfaces.map(on => ({ text: '--focus', on, min: NON_TEXT })),
];

const accentPairs: Pair[] = [
  { text: '--accent-foreground', on: '--accent', min: AA },
  { text: '--accent-foreground', on: '--accent-pressed', min: AA },
  ...[...surfaces, '--accent-soft', '--accent-soft-hover'].map(on => ({
    text: '--accent-text',
    on,
    min: AA,
  })),
  ...['--canvas', '--surface'].map(on => ({
    text: '--accent',
    on,
    min: NON_TEXT,
  })),
  ...hoverFills.flatMap(layer =>
    ['--surface', '--overlay'].map(on => ({
      text: '--accent-text',
      on,
      layer,
      min: AA,
    })),
  ),
  ...['--ink', '--ink-secondary'].map(text => ({
    text,
    on: '--accent-soft',
    min: AA,
  })),
];

const statusPairs: Pair[] = ['success', 'warning', 'danger', 'info'].flatMap(
  s => [
    { text: `--${s}-foreground`, on: `--${s}`, min: AA },
    ...[...surfaces, `--${s}-soft`].map(on => ({
      text: `--${s}-text`,
      on,
      min: AA,
    })),
    ...hoverFills.map(layer => ({
      text: `--${s}-text`,
      on: '--surface',
      layer,
      min: AA,
    })),
    ...['--ink', '--ink-secondary'].map(text => ({
      text,
      on: `--${s}-soft`,
      min: AA,
    })),
  ],
);

const highlightPairs: Pair[] = [
  { text: '--highlight-foreground', on: '--highlight', min: AA },
];

const accentSurfacePairs: Pair[] = [
  { text: '--ink', on: '--surface', min: AA },
  { text: '--ink-secondary', on: '--surface', min: AA },
  { text: '--ink', on: '--surface', layer: '--fill-strong', min: AA },
  { text: '--accent-foreground', on: '--accent', min: AA },
  { text: '--focus', on: '--surface', min: NON_TEXT },
];

function check(
  pairs: Pair[],
  mode: Mode,
  theme: ThemeInputs,
  extra: string[] = [],
) {
  const env = environment(mode, theme, extra);
  const failures: string[] = [];
  for (const { text, on, layer, min } of pairs) {
    let bg = toSrgb(color(on, env));
    if (layer) bg = over(color(layer, env), bg);
    const fg = over(color(text, env), bg);
    const ratio = contrast(fg, bg);
    if (ratio < min) {
      failures.push(
        `${mode} ${text} on ${layer ? `${layer} over ` : ''}${on}: ${ratio.toFixed(2)} < ${min} (hue ${theme.accentHue}, chroma ${theme.accentChroma}, neutral ${theme.neutralHue}/${theme.neutralChroma})`,
      );
    }
  }
  return failures;
}

const accentHues = Array.from({ length: 360 }, (_, h) => h);
const accentChromas = [0, 0.05, 0.1, 0.15, 0.2, 0.35];
const neutrals = [0, 90, 180, 270].flatMap(neutralHue =>
  [0, 0.015, 0.03, 0.08].map(neutralChroma => ({ neutralHue, neutralChroma })),
);
const modes: Mode[] = ['light', 'dark'];

describe('tokens meet WCAG AA for any theme', () => {
  test('neutral text, lines and focus on every surface and fill', () => {
    const failures = modes.flatMap(mode =>
      neutrals.flatMap(n =>
        check(neutralPairs, mode, { accentHue: 250, accentChroma: 0.2, ...n }),
      ),
    );
    expect(failures).toEqual([]);
  });

  test('accent fills and accent text, at every hue and chroma', () => {
    const failures = modes.flatMap(mode =>
      accentHues.flatMap(accentHue =>
        accentChromas.flatMap(accentChroma =>
          [neutrals[0], neutrals[neutrals.length - 1]].flatMap(n =>
            check(accentPairs, mode, { accentHue, accentChroma, ...n }),
          ),
        ),
      ),
    );
    expect(failures.slice(0, 20)).toEqual([]);
  });

  test('status colors and the highlighter', () => {
    const failures = modes.flatMap(mode =>
      neutrals.flatMap(n =>
        check([...statusPairs, ...highlightPairs], mode, {
          accentHue: 250,
          accentChroma: 0.2,
          ...n,
        }),
      ),
    );
    expect(failures).toEqual([]);
  });

  test('an accent surface keeps its text and controls legible', () => {
    const failures = modes.flatMap(mode =>
      accentHues.flatMap(accentHue =>
        accentChromas.flatMap(accentChroma =>
          check(
            accentSurfacePairs,
            mode,
            { accentHue, accentChroma, neutralHue: 0, neutralChroma: 0 },
            ['.surface-accent'],
          ),
        ),
      ),
    );
    expect(failures.slice(0, 20)).toEqual([]);
  });

  test('materials keep secondary text legible over any content', () => {
    // Mirrors the `material-thin` opacity in theme.css: the lightest one
    const theme = readFileSync(join(TOKENS_DIR, 'theme.css'), 'utf8');
    const thinness =
      /@utility material-thin \{[^}]*var\(--overlay\) (\d+)%/.exec(theme);
    expect(thinness).not.toBeNull();
    const alpha = Number(thinness![1]) / 100;
    const failures: string[] = [];
    for (const mode of modes) {
      const env = environment(mode, {
        accentHue: 250,
        accentChroma: 0.2,
        neutralHue: 250,
        neutralChroma: 0.008,
      });
      for (const behind of [black, white]) {
        const bg = over({ ...color('--overlay', env), alpha }, behind);
        for (const text of ['--ink', '--ink-secondary']) {
          const ratio = contrast(over(color(text, env), bg), bg);
          if (ratio < AA) {
            failures.push(
              `${mode} ${text} on material-thin: ${ratio.toFixed(2)}`,
            );
          }
        }
      }
    }
    expect(failures).toEqual([]);
  });
});

describe('the shipped themes', () => {
  const themes = readdirSync(join(TOKENS_DIR, 'themes')).filter(f =>
    f.endsWith('.css'),
  );

  test.each(themes)('%s sets only theme inputs', file => {
    const css = readFileSync(join(TOKENS_DIR, 'themes', file), 'utf8').replace(
      /\/\*[\s\S]*?\*\//g,
      '',
    );
    const names = [...css.matchAll(/(--[\w-]+)\s*:/g)].map(m => m[1]);
    const inputs = [
      '--accent-hue',
      '--accent-chroma',
      '--neutral-hue',
      '--neutral-chroma',
      '--radius-scale',
      '--font-sans',
      '--font-display',
      '--font-rounded',
      '--font-mono',
    ];
    expect(names.filter(n => !inputs.includes(n))).toEqual([]);
  });
});
