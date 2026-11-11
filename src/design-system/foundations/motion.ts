import type { Transition } from 'motion/react';

/**
 * Springs, after Apple's defaults. A spring has no fixed duration: it starts
 * from wherever the element is, keeps the velocity it is given and can be
 * redirected mid-flight, so motion can always be interrupted.
 *
 * - `default`: critically damped, no overshoot. Anything that appears.
 * - `momentum`: a little bounce, only after a gesture threw something.
 * - `sheet`: Apple's drawer spring, for sheets settling after a drag.
 *
 * The CSS equivalent of `default` is `ease-spring` (`--ease-spring`).
 */
export const springs = {
  default: { type: 'spring', bounce: 0, visualDuration: 0.35 },
  momentum: { type: 'spring', bounce: 0.2, visualDuration: 0.35 },
  sheet: { type: 'spring', bounce: 0.15, visualDuration: 0.3 },
} satisfies Record<string, Transition>;

/**
 * Where a flick would come to rest, using the scroll deceleration curve
 * Apple uses to choose a target from a gesture's release velocity.
 */
export function projectMomentum(velocity: number, decelerationRate = 0.998) {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}
