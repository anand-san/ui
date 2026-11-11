import { useCallback, useState } from 'react';

/**
 * State that a parent can own. Pass `value` to control it; leave it out and
 * the component keeps its own, starting at `defaultValue`. `onChange` fires
 * either way.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const controlled = value !== undefined;

  const setValue = useCallback(
    (next: T) => {
      if (!controlled) setUncontrolled(next);
      onChange?.(next);
    },
    [controlled, onChange],
  );

  return [controlled ? value : uncontrolled, setValue] as const;
}
