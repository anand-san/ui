import { afterEach, describe, expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';

import { modalSurfaceVariants } from '@/design-system/foundations/controls';

import { useModalPlacement } from './useModalPlacement';

function Modal() {
  return (
    <div className={modalSurfaceVariants({ placement: useModalPlacement() })} />
  );
}

function renderWithViewport(isMobile: boolean) {
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: { matchMedia: () => ({ matches: isMobile }) },
  });
  return renderToStaticMarkup(<Modal />);
}

afterEach(() => {
  Reflect.deleteProperty(globalThis, 'window');
});

describe('useModalPlacement', () => {
  test('centers the desktop dialog and only fades and zooms it in', () => {
    const html = renderWithViewport(false);

    for (const centering of [
      'left-1/2',
      'top-1/2',
      '-translate-x-1/2',
      '-translate-y-1/2',
    ]) {
      expect(html).toContain(centering);
    }
    expect(html).toContain('data-[state=open]:zoom-in-95');
    expect(html).not.toMatch(/slide-(in|out)-/);
  });

  test('keeps a tall desktop dialog scrollable inside the viewport', () => {
    const html = renderWithViewport(false);

    expect(html).toContain('max-h-[calc(100dvh-2rem)]');
    expect(html).toContain('overflow-y-auto');
  });

  test('slides the mobile bottom sheet in and out from the bottom', () => {
    const html = renderWithViewport(true);

    expect(html).toContain('bottom-0');
    expect(html).toContain('data-[state=open]:slide-in-from-bottom');
    expect(html).toContain('data-[state=closed]:slide-out-to-bottom');
  });
});
