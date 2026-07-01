import { cafeShop } from "./seed/cafeShop";
import { culture } from "./seed/culture";
import { food } from "./seed/food";
import { stayPark } from "./seed/stayPark";
import type { Language } from "@/components/nomad/types";
import type { PlanParams, PlannerPlace } from "./types";

/** ~120 curated Ulaanbaatar places — the AI may only build routes from these. */
export const seedPlaces: PlannerPlace[] = [...food, ...cafeShop, ...culture, ...stayPark];

const byId = new Map(seedPlaces.map((p) => [p.id, p]));
export function placeById(id: string): PlannerPlace | undefined {
  return byId.get(id);
}

/**
 * Shortlist places to ground the AI: matches the user's interests (plus food &
 * free landmarks for any plan), drops anything pricier than the whole budget,
 * and caps the list so the prompt stays small and cheap.
 */
export function candidatesFor(params: PlanParams, limit = 34): PlannerPlace[] {
  const wants = new Set<string>(params.interests);
  return seedPlaces
    .filter((p) => p.category !== "HOTEL" || wants.has("HOTEL"))
    .filter((p) => p.price <= params.budget)
    .filter((p) => wants.size === 0 || wants.has(p.category) || p.category === "FOOD" || p.category === "LANDMARK")
    .slice(0, limit);
}

/** Compact lines fed to the AI so it can pick by id. */
export function candidateLines(places: PlannerPlace[], lang: Language): string {
  return places
    .map((p) => `${p.id} | ${lang === "mn" ? p.nameMn : p.nameEn} | ${p.category} | ${p.price}₮ | ${p.durationMin}min | ${p.openHours}`)
    .join("\n");
}
