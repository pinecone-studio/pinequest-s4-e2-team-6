"use client";

import { useCallback, useEffect, useState } from "react";
import type { Language } from "@/components/nomad/types";
import { takePendingPlanGem, type PendingPlanGem } from "./pendingGem";
import { candidateLines, candidatesFor, mentionedPlaceIds } from "./seed";
import { buildItinerary } from "./validate";
import type { Itinerary, PlanParams, PlannerCategory, PlannerPlace, SavedPlan } from "./types";

type Err = null | "error" | "empty";
const STORAGE_KEY = "pinequest.planner.history";

const today = () => {
  const date = new Date();
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
};
const unique = (values: string[]) => Array.from(new Set(values));

const readHistory = (): SavedPlan[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedPlan[]) : [];
  } catch {
    return [];
  }
};

const writeHistory = (plans: SavedPlan[]) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
};

const gemCategoryMap: Record<PendingPlanGem["category"], PlannerCategory> = {
  NATURE: "PARK",
  MOUNTAIN: "LANDMARK",
  LAKE: "PARK",
  DESERT: "LANDMARK",
  HISTORY: "LANDMARK",
  MONASTERY: "MUSEUM",
  WILDLIFE: "PARK",
  HOTSPRING: "PARK",
};

const gemToPlace = (gem: PendingPlanGem): PlannerPlace => ({
  id: `gem:${gem.id}`,
  nameMn: gem.nameMn,
  nameEn: gem.nameEn,
  category: gemCategoryMap[gem.category],
  lat: gem.lat,
  lng: gem.lng,
  price: 0,
  durationMin: 120,
  openHours: "00:00-24:00",
});

const buildGemItinerary = (gem: PendingPlanGem): { params: PlanParams; itinerary: Itinerary } => {
  const place = gemToPlace(gem);
  return {
    params: { budget: 0, durationHours: 2, interests: [place.category], pace: "relaxed" },
    itinerary: {
      startTime: "10:00",
      stops: [{ ...place, arrive: "10:00", walkMin: 0 }],
      totalCost: 0,
      totalMin: place.durationMin,
    },
  };
};

/**
 * Drives the planner: free text → AI extraction → grounded route selection →
 * code-side validation. `adjust` re-plans from tweaked params for quick refines.
 */
export function usePlanner(language: Language) {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [params, setParams] = useState<PlanParams | null>(null);
  const [requiredIds, setRequiredIds] = useState<string[]>([]);
  const [history, setHistory] = useState<SavedPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Err>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setHistory(readHistory());
      const pending = takePendingPlanGem();
      if (!pending) return;
      const plan = buildGemItinerary(pending);
      setItinerary(plan.itinerary);
      setParams(plan.params);
      setRequiredIds([]);
      setError(null);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const replan = useCallback(
    async (p: PlanParams, anchors = requiredIds) => {
      const anchoredInterests = anchors.length && !p.interests.includes("MUSEUM") ? [...p.interests, "MUSEUM" as const] : p.interests;
      const nextParams = { ...p, interests: anchoredInterests };
      const cands = candidatesFor(nextParams, anchors);
      if (!cands.length) {
        setError("empty");
        return;
      }
      const res = await fetch("/api/planner", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ mode: "plan", language, params: nextParams, candidates: candidateLines(cands, language), requiredIds: anchors }),
      });
      if (!res.ok) throw new Error("plan");
      const plan = (await res.json()) as { startTime: string; stops: string[] };
      const stops = unique([...anchors, ...plan.stops]);
      setItinerary(buildItinerary(stops, plan.startTime, nextParams));
      setParams(nextParams);
      setRequiredIds(anchors);
    },
    [language, requiredIds],
  );

  const generate = useCallback(
    async (text: string) => {
      if (!text.trim()) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/planner", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ mode: "extract", text, language }),
        });
        if (!res.ok) throw new Error("extract");
        const anchors = mentionedPlaceIds(text);
        await replan((await res.json()) as PlanParams, anchors);
      } catch {
        setError("error");
      } finally {
        setLoading(false);
      }
    },
    [language, replan],
  );

  const adjust = useCallback(
    async (patch: Partial<PlanParams>) => {
      if (!params) return;
      setLoading(true);
      setError(null);
      try {
        await replan({ ...params, ...patch });
      } catch {
        setError("error");
      } finally {
        setLoading(false);
      }
    },
    [params, replan],
  );

  const saveCurrent = useCallback(
    (date = today()) => {
      if (!itinerary || !params || itinerary.stops.length === 0) return;
      const title = itinerary.stops.map((stop) => (language === "mn" ? stop.nameMn : stop.nameEn)).join(" → ");
      const saved: SavedPlan = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        title,
        date,
        createdAt: new Date().toISOString(),
        params,
        itinerary,
      };
      const next = [saved, ...history].slice(0, 40);
      writeHistory(next);
      setHistory(next);
    },
    [history, itinerary, language, params],
  );

  const deleteSaved = useCallback(
    (id: string) => {
      const next = history.filter((plan) => plan.id !== id);
      writeHistory(next);
      setHistory(next);
    },
    [history],
  );

  const loadSaved = useCallback((plan: SavedPlan) => {
    setItinerary(plan.itinerary);
    setParams(plan.params);
    setRequiredIds([]);
    setError(null);
  }, []);

  return { itinerary, params, history, loading, error, generate, adjust, saveCurrent, deleteSaved, loadSaved };
}
