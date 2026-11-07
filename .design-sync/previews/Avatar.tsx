import * as React from 'react';
import * as S from "@ds-stories/src/design-system/components/Avatar/Avatar.stories";
import { Avatar } from '@eloovor/design-system';
// Storybook serves public/ at /, which previews don't have, so the image is
// imported (inlined as a data URL) instead of referenced as /images/drawing.png
import drawing from '@ds-stories/public/images/drawing.png';

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
export const Sizes = /* Sizes */ compose(S, "Sizes");
export const Tones = /* Tones */ compose(S, "Tones");
// Mirrors Avatar.stories.tsx ImageAndFallback with the image inlined
export const ImageAndFallback = /* Image and fallback */ () => (
  <div className="flex items-center gap-3">
    <Avatar name="Sketchbook" src={drawing} size="lg" />
    <Avatar
      name="Broken Image"
      src="/does-not-exist.png"
      tone="brand"
      size="lg"
    />
  </div>
);
