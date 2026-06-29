import { getDistance, walkMinutes } from "@/lib/places/geo";
import { placeById } from "./seed";
import type { Itinerary, PlanParams, PlannerPlace, Stop } from "./types";

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
};
const fromMin = (min: number) => {
  const m = ((min % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
};

/**
 * Turns the AI's chosen ids into a validated itinerary. Walking time between
 * stops is computed with Haversine (not trusted to the AI), and stops are
 * dropped once the running budget or available time would be exceeded.
 */
export function buildItinerary(ids: string[], startTime: string, params: PlanParams): Itinerary {
  const start = /^\d{1,2}:\d{2}$/.test(startTime) ? startTime : "10:00";
  const limit = Math.round(params.durationHours * 60);
  const places = ids.map(placeById).filter((p): p is PlannerPlace => Boolean(p));

  const stops: Stop[] = [];
  let cost = 0;
  let clock = toMin(start);
  let prev: PlannerPlace | null = null;

  for (const place of places) {
    const walk = prev ? walkMinutes(getDistance(prev.lat, prev.lng, place.lat, place.lng)) : 0;
    const arrive = clock + walk;
    if (cost + place.price > params.budget) continue; // over budget — skip this stop
    if (stops.length > 0 && arrive + place.durationMin - toMin(start) > limit) break; // out of time
    stops.push({ ...place, arrive: fromMin(arrive), walkMin: walk });
    cost += place.price;
    clock = arrive + place.durationMin;
    prev = place;
  }

  return { startTime: start, stops, totalCost: cost, totalMin: stops.length ? clock - toMin(start) : 0 };
}
