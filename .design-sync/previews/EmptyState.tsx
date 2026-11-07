import * as React from 'react';
import * as S from "@ds-stories/src/design-system/components/EmptyState/EmptyState.stories";
import { Brain, RefreshCw } from 'lucide-react';
import { Button, EmptyState, Text } from '@eloovor/design-system';
// Storybook serves public/ at /, which previews don't have, so the
// illustrations are imported (inlined as data URLs) instead of /images/... paths
import drawing from '@ds-stories/public/images/drawing.png';
import documents from '@ds-stories/public/images/documents.png';

function compose(S: any, key: string) {
  const meta: any = S.default ?? {};
  const st: any = S[key];
  const args: any = { ...(meta.args ?? {}), ...(st && st.args ? st.args : {}) };
  // Storybook resolves argTypes.mapping (control value -> real arg) before
  // rendering; mirror that so mapped args don't render raw.
  const at: any = { ...(meta.argTypes ?? {}), ...(st && st.argTypes ? st.argTypes : {}) };
  for (const k of Object.keys(args)) {
    const m = at[k] && at[k].mapping;
    if (m && typeof m === 'object' && args[k] in m) args[k] = m[args[k]];
  }
  const title: string = typeof meta.title === 'string' ? meta.title : '';
  const ctx: any = {
    args, name: key, title, kind: title, id: '', componentId: '',
    globals: {}, viewMode: 'story',
    parameters: (st && st.parameters) ?? meta.parameters ?? {},
  };
  let render: (() => any) | null = null;
  if (st && typeof st.render === 'function') render = () => st.render(args, ctx);
  else if (typeof st === 'function') render = () => st(args, ctx);
  else if (typeof meta.render === 'function') render = () => meta.render(args, ctx);
  else {
    const C = (st && st.component) || meta.component;
    if (C) render = () => React.createElement(C, args);
  }
  if (!render) return () => null;
  // [].concat: a single function is legal CSF decorator shorthand. A
  // decorator returning undefined (stubbed addon) falls through to the inner
  // render — otherwise one unrecognized addon blanks the cell silently.
  const decorators: any[] = ([] as any[]).concat((st && st.decorators) ?? []).concat(meta.decorators ?? []);
  return decorators.reduce((inner: any, dec: any) => () => {
    const out = dec(inner, ctx);
    return out === undefined ? inner() : out;
  }, render);
}

export const Playground = /* Playground */ compose(S, "Playground");
export const InACard = /* In a card (sm) */ compose(S, "InACard");
// Mirrors EmptyState.stories.tsx WithIllustration and WithANote with the images inlined
export const WithIllustration = /* With an illustration (lg) */ () => (
  <EmptyState
    image={drawing}
    title="Your report can be generated again"
    description="Last time the report stopped because you reached your monthly limit. You have some of it back now. Would you like to generate the report again?"
    action={
      <Button size="lg">
        <Brain />
        Generate report
      </Button>
    }
  />
);
export const WithANote = /* With a note */ () => (
  <EmptyState
    image={documents}
    imageAlt="Outdated documents"
    title="This report is out of date"
    description="The data changed since this report was generated. Generate it again to include the latest numbers."
    action={
      <Button size="lg">
        <RefreshCw />
        Update report
      </Button>
    }
  >
    <Text variant="caption" tone="default">
      <strong className="font-medium">Important:</strong> Updating uses one
      report from your monthly limit.
    </Text>
  </EmptyState>
);
export const PageLevelWithoutImage = /* Page level without an image */ compose(S, "PageLevelWithoutImage");
