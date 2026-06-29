"use client";

import { useCallback, useState } from "react";
import type { Language } from "@/components/nomad/types";
import { candidateLines, candidatesFor } from "./seed";
import { buildItinerary } from "./validate";
import type { Itinerary, PlanParams } from "./types";

type Err = null | "error" | "empty";

/**
 * Drives the planner: free text → AI extraction → grounded route selection →
 * code-side validation. `adjust` re-plans from tweaked params for quick refines.
 */
export function usePlanner(language: Language) {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [params, setParams] = useState<PlanParams | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Err>(null);

  const replan = useCallback(
    async (p: PlanParams) => {
      const cands = candidatesFor(p);
      if (!cands.length) {
        setError("empty");
        return;
      }
      const res = await fetch("/api/planner", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ mode: "plan", language, params: p, candidates: candidateLines(cands, language) }),
      });
      if (!res.ok) throw new Error("plan");
      const plan = (await res.json()) as { startTime: string; stops: string[] };
      setItinerary(buildItinerary(plan.stops, plan.startTime, p));
      setParams(p);
    },
    [language],
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
        await replan((await res.json()) as PlanParams);
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

  return { itinerary, params, loading, error, generate, adjust };
}
