"use client";

import { getDistance } from "@/lib/places/geo";
import { GemCard } from "./GemCard";
import type { Coords, Gem } from "@/lib/gems/types";
import type { Language } from "../types";

type Props = { gems: Gem[]; coords: Coords; language: Language; onOpen: (g: Gem) => void };

/** Responsive grid of cinematic gem cards with live, GPS-based distances. */
export function GemGrid({ gems, coords, language, onOpen }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {gems.map((g, i) => {
        const d = coords ? getDistance(coords.lat, coords.lng, g.lat, g.lng) / 1000 : null;
        return (
          <div key={g.id} className={`animate-fade-up delay-${Math.min((i % 3) + 1, 3)}`}>
            <GemCard gem={g} distanceKm={d} language={language} onOpen={onOpen} />
          </div>
        );
      })}
    </div>
  );
}
