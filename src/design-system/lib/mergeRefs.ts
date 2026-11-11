import type { Ref, RefCallback } from 'react';

/** One ref callback that sets every ref it is given */
export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> {
  return node => {
    const cleanups = refs.map(ref => {
      if (typeof ref === 'function') return ref(node);
      if (ref) ref.current = node;
    });
    return () => {
      refs.forEach((ref, index) => {
        const cleanup = cleanups[index];
        if (typeof cleanup === 'function') cleanup();
        else if (typeof ref === 'function') ref(null);
        else if (ref) ref.current = null;
      });
    };
  };
}
