import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { Oklch } from './oklch';

/**
 * Reads the custom properties in tokens.css and evaluates them the way a
 * browser would, for a given theme and mode. It understands the subset the
 * tokens use: oklch(), calc(), min(), max(), cos(), sin() and var().
 */

export const TOKENS_DIR = join(import.meta.dir, '../../packages/tokens');

type Decls = Map<string, string>;

/** Top-level rules only; @media blocks are dropped */
function topLevelRules(css: string) {
  const rules: { selector: string; body: string }[] = [];
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, '');
  let depth = 0;
  let start = 0;
  let selectorStart = 0;
  let skip = false;
  for (let i = 0; i < clean.length; i++) {
    const ch = clean[i];
    if (ch === '{') {
      if (depth === 0) {
        const selector = clean.slice(selectorStart, i).trim();
        skip = selector.startsWith('@');
        rules.push({ selector, body: '' });
        start = i + 1;
      }
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0) {
        if (skip) rules.pop();
        else rules[rules.length - 1].body = clean.slice(start, i);
        selectorStart = i + 1;
      }
    }
  }
  return rules;
}

function declarations(body: string): Decls {
  const decls: Decls = new Map();
  let depth = 0;
  let current = '';
  for (const ch of body) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ';' && depth === 0) {
      const at = current.indexOf(':');
      const name = current.slice(0, at).trim();
      if (name.startsWith('--')) {
        decls.set(
          name,
          current
            .slice(at + 1)
            .trim()
            .replace(/\s+/g, ' '),
        );
      }
      current = '';
    } else current += ch;
  }
  return decls;
}

export function readRules(file = 'tokens.css') {
  return topLevelRules(readFileSync(join(TOKENS_DIR, file), 'utf8')).map(r => ({
    selectors: r.selector.split(',').map(s => s.trim()),
    decls: declarations(r.body),
  }));
}

const rules = readRules();

/** The declarations that apply on an element matching `selector` */
export function declsFor(selector: string): Decls {
  const merged: Decls = new Map();
  for (const rule of rules) {
    if (rule.selectors.includes(selector)) {
      for (const [k, v] of rule.decls) merged.set(k, v);
    }
  }
  return merged;
}

export type Mode = 'light' | 'dark';

export interface ThemeInputs {
  accentHue: number;
  accentChroma: number;
  neutralHue: number;
  neutralChroma: number;
}

export function environment(
  mode: Mode,
  theme: ThemeInputs,
  extra: string[] = [],
): Decls {
  const env: Decls = new Map([
    ...declsFor(':root'),
    ...(mode === 'dark' ? declsFor('.dark') : []),
  ]);
  for (const selector of extra)
    for (const [k, v] of declsFor(selector)) env.set(k, v);
  env.set('--accent-hue', String(theme.accentHue));
  env.set('--accent-chroma', String(theme.accentChroma));
  env.set('--neutral-hue', String(theme.neutralHue));
  env.set('--neutral-chroma', String(theme.neutralChroma));
  return env;
}

function substitute(
  value: string,
  env: Decls,
  seen = new Set<string>(),
): string {
  return value.replace(/var\((--[\w-]+)\)/g, (_, name: string) => {
    if (seen.has(name)) throw new Error(`cycle at ${name}`);
    const v = env.get(name);
    if (v === undefined) throw new Error(`undefined ${name}`);
    return `(${substitute(v, env, new Set([...seen, name]))})`;
  });
}

/** Evaluates a numeric CSS expression; angles come out in radians */
function evaluate(src: string): number {
  let i = 0;
  const peek = () => src[i];
  const ws = () => {
    while (src[i] === ' ') i++;
  };
  const expr = (): number => {
    let v = term();
    for (;;) {
      ws();
      if (peek() === '+' || (peek() === '-' && src[i + 1] === ' ')) {
        const op = src[i++];
        const r = term();
        v = op === '+' ? v + r : v - r;
      } else return v;
    }
  };
  const term = (): number => {
    let v = factor();
    for (;;) {
      ws();
      if (peek() === '*' || peek() === '/') {
        const op = src[i++];
        const r = factor();
        v = op === '*' ? v * r : v / r;
      } else return v;
    }
  };
  const args = () => {
    const out: number[] = [];
    i++;
    for (;;) {
      out.push(expr());
      ws();
      if (src[i] === ',') i++;
      else if (src[i] === ')') {
        i++;
        return out;
      }
    }
  };
  const factor = (): number => {
    ws();
    if (peek() === '(') {
      i++;
      const v = expr();
      ws();
      i++;
      return v;
    }
    if (peek() === '-') {
      i++;
      return -factor();
    }
    const fn = /^(calc|min|max|cos|sin)\(/.exec(src.slice(i));
    if (fn) {
      i += fn[1].length;
      const a = args();
      if (fn[1] === 'calc') return a[0];
      if (fn[1] === 'min') return Math.min(...a);
      if (fn[1] === 'max') return Math.max(...a);
      return fn[1] === 'cos' ? Math.cos(a[0]) : Math.sin(a[0]);
    }
    const num = /^(\d*\.?\d+)(deg)?/.exec(src.slice(i));
    if (!num) throw new Error(`cannot parse "${src.slice(i)}" in "${src}"`);
    i += num[0].length;
    const n = Number(num[1]);
    return num[2] ? (n * Math.PI) / 180 : n;
  };
  const v = expr();
  ws();
  if (i < src.length) throw new Error(`trailing "${src.slice(i)}" in "${src}"`);
  return v;
}

/** Splits oklch() arguments on top-level spaces and the alpha slash */
function oklchArgs(inner: string) {
  const parts: string[] = [];
  let depth = 0;
  let current = '';
  for (const ch of inner) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if ((ch === ' ' || ch === '/') && depth === 0) {
      if (current) parts.push(current);
      current = '';
    } else current += ch;
  }
  if (current) parts.push(current);
  return parts;
}

/** The color a token resolves to, e.g. color('--accent', env) */
export function color(name: string, env: Decls): Oklch {
  let value = substitute(`var(${name})`, env).trim();
  while (value.startsWith('(') && value.endsWith(')'))
    value = value.slice(1, -1);
  const match = /^oklch\((.*)\)$/.exec(value);
  if (!match) throw new Error(`${name} is not an oklch() color: ${value}`);
  const [l, c, h, alpha] = oklchArgs(match[1]).map(evaluate);
  return { l, c, h, alpha };
}
