import * as React from 'react';

import type { ControlSize } from '@/design-system/foundations/controls';

export interface FieldContextValue {
  /** id of the control, which the label points at */
  controlId: string;
  /** id of the hint or error under the control, when there is one */
  messageId?: string;
  invalid: boolean;
  required: boolean;
  size: ControlSize;
}

export const FieldContext = React.createContext<FieldContextValue | null>(null);

interface ControlProps {
  id?: string;
  size?: ControlSize;
  'aria-describedby'?: string;
  'aria-invalid'?: React.AriaAttributes['aria-invalid'];
}

/**
 * Wires a control to the `Field` around it: the label's id, the message as its
 * description, the invalid and required states and the field size. Props
 * passed to the control win. Outside a Field it returns the props unchanged.
 */
export function useFieldControl(props: ControlProps) {
  const field = React.useContext(FieldContext);
  const describedBy =
    [props['aria-describedby'], field?.messageId].filter(Boolean).join(' ') ||
    undefined;
  return {
    id: props.id ?? field?.controlId,
    size: props.size ?? field?.size,
    'aria-describedby': describedBy,
    'aria-invalid':
      props['aria-invalid'] ?? (field?.invalid ? true : undefined),
    'aria-required': field?.required || undefined,
  };
}
