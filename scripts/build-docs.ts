/**
 * Copies the READMEs into the Claude Code skill's references, and writes
 * llms.txt for the site, so the AI docs never drift from the human ones.
 *
 *   bun scripts/build-docs.ts           write references/ and dist/llms.txt
 *   bun scripts/build-docs.ts --check   fail if references/ is out of date
 *
 * Relative links become GitHub links, since the copies live elsewhere.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, posix } from 'node:path';

const ROOT = join(import.meta.dir, '..');
const REPO = 'https://github.com/anand-san/ui/blob/main';
const SKILL = join(ROOT, 'plugins/san-ui/skills/san-ui');

const sources = [
  { from: 'README.md', to: 'references/setup.md' },
  { from: 'src/design-system/README.md', to: 'references/design-system.md' },
];

const absolutize = (markdown: string, from: string) =>
  markdown.replace(/\]\((?!https?:|#|mailto:)([^)]+)\)/g, (_, link: string) => {
    const path = posix.normalize(posix.join(posix.dirname(from), link));
    return `](${REPO}/${path})`;
  });

const generated = (from: string) =>
  `<!-- Generated from ${from} by scripts/build-docs.ts. Edit the source. -->\n\n`;

const check = process.argv.includes('--check');
let stale = 0;

for (const { from, to } of sources) {
  const content =
    generated(from) + absolutize(readFileSync(join(ROOT, from), 'utf8'), from);
  const target = join(SKILL, to);
  if (check) {
    if (!existsSync(target) || readFileSync(target, 'utf8') !== content) {
      console.error(`${to} is out of date: run bun scripts/build-docs.ts`);
      stale++;
    }
    continue;
  }
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, content);
}

if (check) process.exit(stale ? 1 : 0);

// llms.txt: the skill (minus its front matter) and the full guides
const skill = readFileSync(join(SKILL, 'SKILL.md'), 'utf8').replace(
  /^---\n[\s\S]*?\n---\n/,
  '',
);
const llms = [
  absolutize(skill, 'plugins/san-ui/skills/san-ui/SKILL.md'),
  ...sources.map(
    ({ from }) =>
      `\n---\n\n<!-- ${from} -->\n\n` +
      absolutize(readFileSync(join(ROOT, from), 'utf8'), from),
  ),
].join('\n');
mkdirSync(join(ROOT, 'dist'), { recursive: true });
writeFileSync(join(ROOT, 'dist/llms.txt'), llms);

console.log('docs: skill references and dist/llms.txt written');
