import {
  type DragControls,
  type HTMLMotionProps,
  motion,
  type PanInfo,
  type TargetAndTransition,
  type Transition,
  useDragControls,
  useReducedMotion,
} from 'motion/react';
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  type Ref,
  use,
  useMemo,
  useRef,
} from 'react';

import {
  modalBodyVariants,
  modalHeaderClass,
  type ModalPlacement,
  modalSurfaceVariants,
  scrimClass,
} from '@/design-system/foundations/controls';
import { projectMomentum, springs } from '@/design-system/foundations/motion';
import { cn } from '@/design-system/lib/cn';
import { mergeRefs } from '@/design-system/lib/mergeRefs';
import { useControllableState } from '@/design-system/lib/useControllableState';
import { useMediaQuery } from '@/design-system/lib/useMediaQuery';

/**
 * The parts Dialog, AlertDialog and Sheet share: open state that survives
 * the exit animation, the spring motion, and the bottom sheet's drag to
 * dismiss. Radix handles focus, Escape and outside clicks.
 */

interface ModalState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const ModalStateContext = createContext<ModalState | null>(null);

export interface ModalRootProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

export function useModalRoot({
  open,
  defaultOpen = false,
  onOpenChange,
}: ModalRootProps): ModalState {
  const [current, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  return { open: current, setOpen };
}

export function useModalState() {
  const state = use(ModalStateContext);
  if (!state) {
    throw new Error('Modal content must be inside its root, like <Dialog>');
  }
  return state;
}

/** Dialogs are a bottom sheet on phones and centred from 768px */
export function useModalPlacement(): 'center' | 'bottom' {
  return useMediaQuery('(max-width: 767px)') ? 'bottom' : 'center';
}

type ModalMotion = Pick<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'exit'>;

const quickExit: Transition = { duration: 0.18, ease: [0.22, 1, 0.36, 1] };

const offscreen: Record<
  Exclude<ModalPlacement, 'center'>,
  TargetAndTransition
> = {
  bottom: { y: '100%' },
  left: { x: '-110%' },
  right: { x: '110%' },
};

/**
 * Centred dialogs grow in and fade out quickly; sheets slide in from their
 * edge and leave the way they came. Reduced motion cross-fades instead.
 */
export function modalMotion(
  placement: ModalPlacement,
  reducedMotion: boolean,
): ModalMotion {
  if (reducedMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.2 } },
      exit: { opacity: 0, transition: quickExit },
    };
  }
  if (placement === 'center') {
    return {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1, transition: springs.default },
      exit: { opacity: 0, scale: 0.97, transition: quickExit },
    };
  }
  return {
    initial: offscreen[placement],
    animate: { x: 0, y: 0, transition: springs.default },
    exit: { ...offscreen[placement], transition: springs.default },
  };
}

export const scrimMotion: ModalMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, transition: quickExit },
};

export function ModalScrim({ className, ...props }: HTMLMotionProps<'div'>) {
  return (
    <motion.div
      className={cn(scrimClass, className)}
      {...scrimMotion}
      {...props}
    />
  );
}

const ModalDragContext = createContext<DragControls | null>(null);

/** How far down a flick has to project, as a share of the sheet's height */
const DISMISS_AT = 0.4;

export interface ModalSurfaceProps extends HTMLMotionProps<'div'> {
  ref?: Ref<HTMLDivElement>;
  placement: ModalPlacement;
  onDismiss: () => void;
  /** The close button, made from the primitive in use */
  close?: ReactNode;
  children?: ReactNode;
}

/**
 * The panel itself. A bottom sheet can be dragged down by its grabber or
 * header: it follows the finger, resists being pulled up, and closes when
 * the release would carry it far enough, keeping the finger's speed.
 */
export function ModalSurface({
  ref,
  placement,
  onDismiss,
  close,
  className,
  children,
  ...props
}: ModalSurfaceProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const controls = useDragControls();
  const surface = useRef<HTMLDivElement>(null);
  const setRef = useMemo(() => mergeRefs(ref, surface), [ref]);
  const draggable = placement === 'bottom';

  const drag: HTMLMotionProps<'div'> = draggable
    ? {
        drag: 'y',
        dragListener: false,
        dragControls: controls,
        dragConstraints: { top: 0, bottom: 0 },
        dragElastic: { top: 0.04, bottom: 1 },
        dragTransition: { bounceStiffness: 400, bounceDamping: 40 },
        onDragEnd: (_event, info: PanInfo) => {
          const height = surface.current?.offsetHeight ?? 0;
          const resting = info.offset.y + projectMomentum(info.velocity.y);
          if (resting > height * DISMISS_AT) onDismiss();
        },
      }
    : {};

  return (
    <motion.div
      ref={setRef}
      data-close={close ? '' : undefined}
      className={cn(modalSurfaceVariants({ placement }), className)}
      {...modalMotion(placement, reducedMotion)}
      {...drag}
      {...props}
    >
      <ModalDragContext value={draggable ? controls : null}>
        {draggable && <ModalGrabber />}
        <div className={modalBodyVariants({ placement })}>{children}</div>
        {close}
      </ModalDragContext>
    </motion.div>
  );
}

function ModalGrabber() {
  const controls = use(ModalDragContext);
  return (
    <div
      aria-hidden
      onPointerDown={event => controls?.start(event)}
      className="flex h-5 shrink-0 cursor-grab touch-none items-center justify-center active:cursor-grabbing"
    >
      <div className="h-1.25 w-9 rounded-full bg-fill-strong" />
    </div>
  );
}

/** A modal's title block; in a bottom sheet it is a drag handle too */
export function ModalHeader({
  className,
  onPointerDown,
  ...props
}: ComponentProps<'div'>) {
  const controls = use(ModalDragContext);
  return (
    <div
      className={cn(
        modalHeaderClass,
        controls && 'touch-none select-none',
        className,
      )}
      onPointerDown={event => {
        onPointerDown?.(event);
        controls?.start(event);
      }}
      {...props}
    />
  );
}
