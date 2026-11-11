import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { colorGroups, themeInputs } from './colors';

const tokensDir = join(import.meta.dir, '../../../packages/tokens');
const tokensCss = readFileSync(join(tokensDir, 'tokens.css'), 'utf8');
const themeCss = readFileSync(join(tokensDir, 'theme.css'), 'utf8');

const tokens = colorGroups.flatMap(group => group.tokens);

describe('color metadata', () => {
  test.each(tokens.map(token => [token.name, token]))(
    '%s is declared in tokens.css',
    (name, _token) => {
      expect(tokensCss).toContain(`--${name}:`);
    },
  );

  test.each(tokens.map(token => [token.className, token]))(
    '%s resolves to its role in theme.css',
    (className, token) => {
      const [, utility] = className.match(/^[a-z]+-(.+)$/) ?? [];
      const namespace = className.startsWith('text-')
        ? '(?:text-color|color)'
        : 'color';
      expect(themeCss).toMatch(
        new RegExp(`--${namespace}-${utility}: var\\(--${token.name}\\);`),
      );
    },
  );

  test('every role in theme.css is documented', () => {
    const documented = new Set(tokens.map(token => token.name));
    const mapped = [
      ...themeCss.matchAll(
        /--(?:text-color|color)-[a-z-]+: var\(--([a-z-]+)\)/g,
      ),
    ].map(match => match[1]);
    const missing = mapped.filter(name => !documented.has(name));
    expect(missing).toEqual([]);
  });

  test('every theme input is declared in tokens.css', () => {
    for (const input of themeInputs) {
      expect(tokensCss).toContain(`--${input.name}:`);
    }
  });
});
