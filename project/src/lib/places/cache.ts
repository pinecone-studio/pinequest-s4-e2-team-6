import type { Place } from "./types";

const KEY = "ai-nomad-places";

/** Last merged place list, for instant offline display. */
export function readCache(): Place[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Place[]) : null;
  } catch {
    return null;
  }
}

export function writeCache(places: Place[]): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(places.slice(0, 300)));
  } catch {
    // storage unavailable — bundled curated data still works offline
  }
}
