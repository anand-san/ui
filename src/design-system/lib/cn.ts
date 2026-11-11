import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: { theme: { radius: ['inset'], spacing: ['touch'] } },
});

/** Joins class names and lets later Tailwind classes win over earlier ones */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
