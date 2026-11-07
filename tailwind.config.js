import preset from '@sandilya/ui';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [preset],
  content: ['./src/**/*.{ts,tsx,mdx}', './.storybook/**/*.{ts,tsx}'],
};
