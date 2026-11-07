#!/usr/bin/env node
// Builds the design system as a package the design-sync converter can read.
//
// san-ui's components are source (src/design-system), shipped through the
// shadcn registry rather than a built package, with no dist/ of its own, so this writes a throwaway package to
// .design-sync/.cache/ds-pkg/ (gitignored, rebuilt on every sync):
//
//   index.ts      re-exports the design system barrel; the converter bundles it
//                 with esbuild, resolving @/ through tsconfig.json
//   types/        tsc declarations for the barrel's import graph, with @/
//                 aliases rewritten to relative paths so ts-morph resolves them
//   package.json  the package name and its types entry
//
// Run from the repo root: node .design-sync/build-ds.mjs
import { spawnSync } from 'node:child_process';
import { mkdirSync, readdirSync, readFileSync, rmSync, statSync, symlinkSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

const PKG_DIR = resolve('.design-sync/.cache/ds-pkg');
const TYPES = join(PKG_DIR, 'types');
const SRC = resolve('src');

rmSync(PKG_DIR, { recursive: true, force: true });
mkdirSync(PKG_DIR, { recursive: true });

// Declarations still emit when the app has unrelated type errors, so report
// them but only fail when the barrel's declaration is missing.
const tsc = spawnSync('node_modules/.bin/tsc', ['-p', '.design-sync/tsconfig.ds.json'], { encoding: 'utf8' });
if (tsc.status !== 0) console.error(`tsc reported errors (declarations still emitted):\n${(tsc.stdout + tsc.stderr).slice(0, 4000)}`);

const walk = (d) => readdirSync(d).flatMap((f) => {
  const p = join(d, f);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
let rewritten = 0;
for (const file of walk(TYPES).filter((f) => f.endsWith('.d.ts'))) {
  const text = readFileSync(file, 'utf8');
  const next = text.replace(/(from\s+|import\()(['"])@\/([^'"]+)\2/g, (_, lead, q, rest) => {
    let rel = relative(dirname(file), join(TYPES, rest));
    if (!rel.startsWith('.')) rel = `./${rel}`;
    rewritten++;
    return `${lead}${q}${rel}${q}`;
  });
  if (next !== text) writeFileSync(file, next);
}

const barrel = join(TYPES, 'design-system', 'index.d.ts');
try { statSync(barrel); } catch {
  console.error(`missing ${relative(process.cwd(), barrel)}: tsc did not emit the barrel declaration`);
  process.exit(1);
}

// Link the repo's node_modules (react, @types/react) for the converter's type resolution
symlinkSync(relative(PKG_DIR, resolve('node_modules')), join(PKG_DIR, 'node_modules'));

writeFileSync(join(PKG_DIR, 'index.ts'),
  `export * from ${JSON.stringify(relative(PKG_DIR, join(SRC, 'design-system', 'index.ts')))};\n`);
writeFileSync(join(PKG_DIR, 'package.json'), JSON.stringify({
  name: '@eloovor/design-system',
  version: JSON.parse(readFileSync('packages/tokens/package.json', 'utf8')).version,
  private: true,
  type: 'module',
  module: 'index.ts',
  types: 'types/design-system/index.d.ts',
}, null, 2) + '\n');

console.error(`ds-pkg: ${walk(TYPES).length} declaration files, ${rewritten} @/ imports rewritten -> ${relative(process.cwd(), PKG_DIR)}`);
