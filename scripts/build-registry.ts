/**
 * Writes registry.json, the shadcn registry for san-ui, from the
 * source tree. `shadcn build` then turns it into dist/r/<item>.json.
 *
 * Items:
 *   foundations     foundations/ and lib/: tokens metadata, cn, hooks
 *   <component>     one per components/<Name>/ folder
 *   san-ui  everything, plus the index.ts barrel
 *
 * Every file installs at the same path it has here (src/design-system/...),
 * so the `@/design-system/...` imports between files keep working in an app
 * whose `@/` alias points at src/. npm dependencies and links between items
 * are read from the imports.
 *
 * REGISTRY_URL sets the base URL items link to (default: the live site).
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = join(import.meta.dir, '..');
const DS = join(ROOT, 'src/design-system');
const BASE = (process.env.REGISTRY_URL ?? 'https://ui.sandilya.dev').replace(
  /\/$/,
  '',
);

const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
const tokensPkg = JSON.parse(
  readFileSync(join(ROOT, 'packages/tokens/package.json'), 'utf8'),
);
const versions: Record<string, string> = pkg.dependencies;

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap(f => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

// Stories, tests and docs stay here; apps get the components only
const isShipped = (file: string) =>
  /\.(ts|tsx)$/.test(file) && !/\.(stories|test)\.tsx?$/.test(file);

const importsOf = (file: string) =>
  [
    ...readFileSync(file, 'utf8').matchAll(
      /(?:import|export)[^'"]*?from\s+['"]([^'"]+)['"]/g,
    ),
  ].map(m => m[1]);

/** The npm package name of a bare import, or null for local imports */
const packageOf = (spec: string) => {
  if (spec.startsWith('.') || spec.startsWith('@/')) return null;
  const parts = spec.split('/');
  return spec.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0];
};

const rel = (file: string) => relative(ROOT, file);

interface Group {
  name: string;
  title: string;
  description: string;
  files: string[];
}

const groups: Group[] = [
  {
    name: 'foundations',
    title: 'Foundations',
    description:
      'Type scale, spacing, control styles, color metadata, cn and the shared hooks. Every component needs it.',
    files: ['foundations', 'lib'].flatMap(d => walk(join(DS, d))),
  },
  ...readdirSync(join(DS, 'components'))
    .filter(name => statSync(join(DS, 'components', name)).isDirectory())
    .sort()
    .map(name => ({
      name: name.toLowerCase(),
      title: name,
      description: `The ${name} component from san-ui.`,
      files: walk(join(DS, 'components', name)),
    })),
].map(g => ({ ...g, files: g.files.filter(isShipped).sort() }));

/** Which item a source file belongs to */
const ownerOf = new Map<string, string>();
for (const g of groups) for (const f of g.files) ownerOf.set(rel(f), g.name);

const resolveLocal = (from: string, spec: string) => {
  const base = spec.startsWith('@/')
    ? join(ROOT, 'src', spec.slice(2))
    : join(from, '..', spec);
  for (const ext of ['', '.ts', '.tsx', '/index.ts']) {
    const candidate = rel(base + ext);
    if (ownerOf.has(candidate)) return candidate;
  }
  return null;
};

const itemUrl = (name: string) => `${BASE}/r/${name}.json`;

const items = groups.map(g => {
  const npm = new Set<string>();
  const linked = new Set<string>();
  for (const file of g.files) {
    for (const spec of importsOf(file)) {
      if (spec === '@/design-system') {
        throw new Error(
          `${rel(file)} imports the barrel; import the component's file instead`,
        );
      }
      const name = packageOf(spec);
      if (name) {
        if (name === 'react' || name === 'react-dom') continue;
        if (!versions[name]) {
          throw new Error(`${rel(file)} imports ${name}, not in dependencies`);
        }
        npm.add(`${name}@${versions[name]}`);
        continue;
      }
      const target = resolveLocal(file, spec);
      if (!target) throw new Error(`${rel(file)}: cannot resolve ${spec}`);
      const owner = ownerOf.get(target)!;
      if (owner !== g.name) linked.add(owner);
    }
  }
  if (g.name === 'foundations') {
    npm.add(`${tokensPkg.name}@^${tokensPkg.version}`);
  }
  return {
    name: g.name,
    type: g.name === 'foundations' ? 'registry:lib' : 'registry:ui',
    title: g.title,
    description: g.description,
    dependencies: [...npm].sort(),
    registryDependencies: [...linked].sort().map(itemUrl),
    files: g.files.map(f => ({
      path: rel(f),
      type: 'registry:file',
      target: `~/${rel(f)}`,
    })),
  };
});

items.push({
  name: 'san-ui',
  type: 'registry:lib',
  title: 'san-ui',
  description:
    'Every component and foundation, plus the index.ts barrel, so apps import from @/design-system.',
  dependencies: [],
  registryDependencies: groups.map(g => itemUrl(g.name)),
  files: [
    {
      path: 'src/design-system/index.ts',
      type: 'registry:file',
      target: '~/src/design-system/index.ts',
    },
  ],
});

writeFileSync(
  join(ROOT, 'registry.json'),
  JSON.stringify(
    {
      $schema: 'https://ui.shadcn.com/schema/registry.json',
      name: 'san-ui',
      homepage: BASE,
      items,
    },
    null,
    2,
  ) + '\n',
);

console.log(`registry.json: ${items.length} items, base ${BASE}`);
