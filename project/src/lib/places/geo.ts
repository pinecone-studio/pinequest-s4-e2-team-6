/** Geo + depth math for AR placement. Pure functions, no DOM. */

const rad = (d: number) => (d * Math.PI) / 180;

/** Haversine distance in metres. */
export function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000;
  const dLat = rad(lat2 - lat1);
  const dLon = rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Initial bearing from point 1 → point 2, degrees clockwise from north. */
export function getBearing(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const dLon = rad(lon2 - lon1);
  const y = Math.sin(dLon) * Math.cos(rad(lat2));
  const x =
    Math.cos(rad(lat1)) * Math.sin(rad(lat2)) -
    Math.sin(rad(lat1)) * Math.cos(rad(lat2)) * Math.cos(dLon);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

/** Distance-based depth cues — nearer = bigger, brighter, sharper. */
export function scaleFor(d: number): number {
  return Math.max(0.5, Math.min(1, 1 - (d - 100) / 2000));
}
export function opacityFor(d: number): number {
  return Math.max(0.4, 1 - d / 3000);
}
export function blurFor(d: number): number {
  return d > 1500 ? Math.min(2.4, (d - 1500) / 1800) : 0;
}

/** Elevation angle (deg): near points sit lower, far points rise to the horizon. */
export function elevationFor(d: number): number {
  return -6 + Math.min(1, d / 10000) * 8;
}

/** Rough walking time in minutes at ~5 km/h. */
export function walkMinutes(d: number): number {
  return Math.max(1, Math.round(d / (5000 / 60)));
}

/** Human distance label. */
export function formatDistance(d: number): string {
  return d < 1000 ? `${Math.round(d)} m` : `${(d / 1000).toFixed(1)} km`;
}
