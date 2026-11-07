import { cva } from 'class-variance-authority';

/** A top-level item in the navigation bar: a link or a menu trigger */
export const navigationMenuItemVariants = cva(
  'group inline-flex h-9 w-max items-center justify-center gap-2 rounded-full px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-primary/5 data-[state=open]:text-foreground [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      active: {
        true: 'bg-primary/5 text-foreground',
        false: '',
      },
    },
    defaultVariants: { active: false },
  },
);

/** A link inside a navigation menu panel */
export const navigationMenuLinkClass =
  'block select-none rounded-xl p-3 no-underline outline-hidden transition-colors hover:bg-primary/5 focus-visible:bg-primary/5 data-[active=true]:bg-primary/5';
