export interface Oklch {
  l: number;
  c: number;
  h: number;
  alpha?: number;
}

export type Rgb = [number, number, number];

const toLinear = (v: number) =>
  v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;

const toGamma = (v: number) =>
  v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055;

const clip = (v: number) => Math.min(1, Math.max(0, v));

/** OKLCH to gamma-encoded sRGB, clipped per channel the way browsers paint it */
export function toSrgb({ l, c, h }: Oklch): Rgb {
  const rad = (h * Math.PI) / 180;
  const a = c * Math.cos(rad);
  const b = c * Math.sin(rad);
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const r = 4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_;
  const g = -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_;
  const bl = -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_;
  return [clip(toGamma(r)), clip(toGamma(g)), clip(toGamma(bl))];
}

/** Paints `top` (with its alpha) over an opaque `bottom` */
export function over(top: Oklch, bottom: Rgb): Rgb {
  const alpha = top.alpha ?? 1;
  const rgb = toSrgb(top);
  return rgb.map((v, i) => v * alpha + bottom[i] * (1 - alpha)) as Rgb;
}

export function luminance([r, g, b]: Rgb) {
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/** WCAG 2 contrast ratio between two opaque colors */
export function contrast(a: Rgb, b: Rgb) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export const hex = (rgb: Rgb) =>
  '#' +
  rgb
    .map(v =>
      Math.round(v * 255)
        .toString(16)
        .padStart(2, '0'),
    )
    .join('');
