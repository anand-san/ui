import { useEffect, useState } from 'react';

function readCssVar(name: string) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--${name}`)
    .trim();
}

/** Reads a CSS variable from <html>, and again whenever the theme class changes. */
export function useCssVar(name: string) {
  const [value, setValue] = useState(() => readCssVar(name));

  useEffect(() => {
    setValue(readCssVar(name));
    const observer = new MutationObserver(() => setValue(readCssVar(name)));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, [name]);

  return value;
}

/** "255 26% 39%" → "#574a7d" */
export function hslChannelsToHex(channels: string) {
  const match = channels.match(/([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/);
  if (!match) return '';
  const h = Number(match[1]);
  const s = Number(match[2]) / 100;
  const l = Number(match[3]) / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const hex = (x: number) =>
    Math.round(x * 255)
      .toString(16)
      .padStart(2, '0');
  return `#${hex(f(0))}${hex(f(8))}${hex(f(4))}`;
}
