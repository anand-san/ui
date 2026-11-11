import type { ModalPlacement } from '@/design-system/foundations/controls';
import { useMediaQuery } from '@/design-system/lib/useMediaQuery';

/** Dialog and AlertDialog are a bottom sheet on phones and centred from 768px */
export function useModalPlacement(): Extract<
  ModalPlacement,
  'center' | 'bottom'
> {
  return useMediaQuery('(max-width: 767px)') ? 'bottom' : 'center';
}
