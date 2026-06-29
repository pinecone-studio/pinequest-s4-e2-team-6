/** Pure camera/world projection math for the AR overlay. No DOM, no network. */

export const HFOV = 70; // horizontal field of view (deg) the overlay maps across
export const VFOV = 52; // vertical field of view

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Signed smallest angle from `heading` to `target`, in (-180, 180]. */
export function angularDiff(target: number, heading: number): number {
  return ((target - heading + 540) % 360) - 180;
}

/** Horizontal screen position (%) for a bearing offset; 50% = dead centre. */
export function projectX(diff: number): number {
  return 50 + (diff / (HFOV / 2)) * 50;
}

/** Vertical screen position (%) from a point's elevation angle and device pitch. */
export function projectY(elevAngle: number, pitch: number): number {
  return clamp(50 - ((elevAngle - pitch) / (VFOV / 2)) * 50, 4, 96);
}

/** Is a bearing offset within (just past) the visible cone? */
export function onScreen(diff: number): boolean {
  return Math.abs(diff) <= HFOV / 2 + 8;
}

/** Depth cues: nearer = bigger/brighter/sharper, farther = smaller/dim/blurred. */
export function depth(distanceKm: number): { scale: number; opacity: number; blur: number } {
  const t = clamp((distanceKm - 0.1) / (3.4 - 0.1), 0, 1);
  return { scale: lerp(1, 0.55, t), opacity: lerp(1, 0.5, t), blur: lerp(0, 2.4, t) };
}

/** True when a marker sits close enough to the centre reticle to "lock on". */
export function isLocked(xPct: number, yPct: number): boolean {
  return Math.abs(xPct - 50) < 7 && Math.abs(yPct - 50) < 13;
}
