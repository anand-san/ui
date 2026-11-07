import { describe, expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';

import { useModalContentClass } from './useModalContentClass';

function DesktopModal() {
  return <div className={useModalContentClass()} />;
}

describe('useModalContentClass', () => {
  test('centers the desktop dialog and only fades and zooms it in', () => {
    // No window on the server, so this is the desktop layout
    const html = renderToStaticMarkup(<DesktopModal />);

    expect(html).toContain('-translate-x-1/2');
    expect(html).toContain('data-[state=open]:zoom-in-95');
    // In Tailwind 4 the centering `translate` and tw-animate-css's slide
    // `transform` add up, so a slide would start the dialog off screen
    expect(html).not.toMatch(/slide-(in|out)-/);
  });
});
