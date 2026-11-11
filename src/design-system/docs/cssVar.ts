import { useEffect, useState } from 'react';

/**
 * The color a token resolves to right now, as the browser computes it. The
 * raw custom property is an unevaluated calc(), so a probe element paints
 * the token and reports its computed color.
 */
function resolveColor(name: string) {
  const probe = document.createElement('span');
  probe.style.color = `var(--${name})`;
  probe.style.display = 'none';
  document.body.appendChild(probe);
  const value = getComputedStyle(probe).color;
  probe.remove();
  return value;
}

/** Re-reads the token when the mode, density or theme changes */
export function useTokenColor(name: string) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const update = () => setValue(resolveColor(name));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-density'],
    });
    observer.observe(document.head, {
      childList: true,
      characterData: true,
      subtree: true,
    });
    return () => observer.disconnect();
  }, [name]);

  return value;
}

/** "oklch(0.54 0.2 250)" → "oklch 0.540 0.200 250" */
export function formatColor(value: string) {
  const match = value.match(/oklch\(([^)]+)\)/);
  if (!match) return value;
  const [l, c, h, alpha] = match[1].split(/[\s/]+/);
  const parts = [
    Number(l).toFixed(3),
    Number(c).toFixed(3),
    Math.round(Number(h) || 0),
  ];
  return `oklch ${parts.join(' ')}${alpha ? ` / ${alpha}` : ''}`;
}
