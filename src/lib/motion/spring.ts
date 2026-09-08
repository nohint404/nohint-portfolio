export interface SpringState { position: number; velocity: number }
/** Bounded substeps keep a resumed/backgrounded frame numerically stable. */
export function stepSpring(state: SpringState, target: number, elapsed: number): SpringState {
  let { position, velocity } = state;
  let remaining = Math.min(Math.max(elapsed, 0), .064);
  while (remaining > 0) {
    const dt = Math.min(remaining, 1 / 120);
    velocity += ((target - position) * 190 - velocity * 23) * dt;
    position += velocity * dt;
    remaining -= dt;
  }
  return Math.abs(target - position) < .025 && Math.abs(velocity) < .025
    ? { position: target, velocity: 0 } : { position, velocity };
}
