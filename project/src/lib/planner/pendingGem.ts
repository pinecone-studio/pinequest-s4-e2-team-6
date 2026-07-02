import type { Gem } from "@/lib/gems/types";

export type PendingPlanGem = Pick<Gem, "id" | "nameMn" | "nameEn" | "category" | "lat" | "lng">;

const PENDING_GEM_KEY = "pinequest.planner.pendingGem";

export function storePendingPlanGem(gem: PendingPlanGem) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PENDING_GEM_KEY, JSON.stringify(gem));
}

export function takePendingPlanGem(): PendingPlanGem | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(PENDING_GEM_KEY);
  if (!raw) return null;
  window.localStorage.removeItem(PENDING_GEM_KEY);
  try {
    return JSON.parse(raw) as PendingPlanGem;
  } catch {
    return null;
  }
}
