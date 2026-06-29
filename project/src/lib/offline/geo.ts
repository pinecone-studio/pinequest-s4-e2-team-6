/** Pure geo math + formatting. No network — everything here works offline. */

export type LatLng = { lat: number; lng: number };

const R = 6371; // earth radius, km
const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;

/** Great-circle distance between two points, in kilometres. */
export function distanceKm(a: LatLng, b: LatLng): number {
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(s)));
}

/** Initial bearing from a → b, degrees clockwise from north (0–360). */
export function bearing(a: LatLng, b: LatLng): number {
  const dLng = rad(b.lng - a.lng);
  const y = Math.sin(dLng) * Math.cos(rad(b.lat));
  const x =
    Math.cos(rad(a.lat)) * Math.sin(rad(b.lat)) -
    Math.sin(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.cos(dLng);
  return (deg(Math.atan2(y, x)) + 360) % 360;
}

const POINTS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
const POINTS_MN = ["Хойд", "ЗХ", "Зүүн", "ЗУ", "Урд", "БУ", "Баруун", "БХ"];

/** 8-point compass label for a heading. */
export function compass(deg: number, mn = false): string {
  const i = Math.round(((deg % 360) / 45)) % 8;
  return (mn ? POINTS_MN : POINTS)[i];
}

/** Human distance: metres under 1km, otherwise km with sensible precision. */
export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  if (km < 100) return `${km.toFixed(1)} km`;
  return `${Math.round(km)} km`;
}

/** Decimal degrees with hemisphere letters, e.g. "47.9184° N, 106.9177° E". */
export function formatCoord({ lat, lng }: LatLng): string {
  const ns = lat >= 0 ? "N" : "S";
  const ew = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(4)}° ${ns}, ${Math.abs(lng).toFixed(4)}° ${ew}`;
}
