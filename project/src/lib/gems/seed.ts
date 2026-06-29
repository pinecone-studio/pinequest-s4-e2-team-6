import { centralGems } from "./data/central";
import { gobiGems } from "./data/gobi";
import { westEastGems } from "./data/westEast";
import type { Gem } from "./types";

/** All curated hidden gems across the 21 aimags. */
export const gems: Gem[] = [...gobiGems, ...centralGems, ...westEastGems];

export function gemsByAimag(aimagId: string): Gem[] {
  return gems.filter((g) => g.aimag === aimagId);
}

export function aimagCounts(): Record<string, number> {
  const out: Record<string, number> = {};
  for (const g of gems) out[g.aimag] = (out[g.aimag] ?? 0) + 1;
  return out;
}

export function gemById(id: string): Gem | undefined {
  return gems.find((g) => g.id === id);
}
