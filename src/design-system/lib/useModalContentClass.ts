import { useMediaQuery } from '@/design-system/lib/useMediaQuery';

/**
 * Layout shared by Dialog and AlertDialog content, chosen by screen width: a
 * bottom sheet that slides up on phones, a centered dialog that fades and
 * zooms from md. The centered one has no slide, because its centering
 * `translate` and tw-animate-css's `transform` add up in Tailwind 4.
 */
export function useModalContentClass() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  return isMobile
    ? 'fixed inset-x-0 bottom-0 z-50 grid max-h-[90dvh] gap-4 overflow-y-auto rounded-t-2xl border-t bg-popover p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-lg duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom'
    : 'fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl border bg-popover p-6 shadow-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95';
}
