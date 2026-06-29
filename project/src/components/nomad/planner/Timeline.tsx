"use client";

import { StopCard, WalkLeg } from "./StopCard";
import type { Itinerary } from "@/lib/planner/types";
import type { Language } from "../types";

/** Vertical itinerary timeline with walking legs between stops. */
export function Timeline({ itinerary, language }: { itinerary: Itinerary; language: Language }) {
  return (
    <div className="relative space-y-2 pl-3">
      <span className="absolute bottom-4 left-3 top-4 w-px bg-black/10 dark:bg-white/10" />
      {itinerary.stops.map((stop, i) => (
        <div key={stop.id} className="relative">
          {i > 0 && stop.walkMin > 0 && <WalkLeg min={stop.walkMin} language={language} />}
          <StopCard stop={stop} language={language} />
        </div>
      ))}
    </div>
  );
}
