"use client";

import { MaterialIcon } from "../icons/MaterialIcon";
import { formatDistance, walkMinutes } from "@/lib/places/geo";
import { categoryIcon, categoryLabel, placeCopy } from "@/lib/places/placeCopy";
import type { NearbyPlace } from "@/lib/places/types";
import type { Language } from "../types";

type Story = { text: string; loading: boolean; activeId: string | null };
type Props = { place: NearbyPlace | null; story: Story; language: Language; onAsk: (p: NearbyPlace) => void };

/** Slide-up detail for the locked place: distance, walk time, directions, AI. */
export function PlaceDetail({ place, story, language, onAsk }: Props) {
  const t = placeCopy[language];
  if (!place) return null;
  const name = language === "mn" ? place.nameMn : place.nameEn;
  const active = story.activeId === place.id;
  const dir = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;

  return (
    <div className="glass-dark animate-fade-up absolute inset-x-3 bottom-3 z-30 rounded-3xl p-4 text-white sm:inset-x-auto sm:left-1/2 sm:w-[27rem] sm:-translate-x-1/2">
      <div className="flex items-center gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#34e0a1]/25 text-[#34e0a1]">
          <MaterialIcon name={categoryIcon(place.category)} className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-black tracking-tight">{name}</p>
          <p className="truncate text-xs text-white/65">
            {categoryLabel(place.category, language)} · {formatDistance(place.distance)} {t.away} · {walkMinutes(place.distance)} {t.walk}
          </p>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <a
          href={dir}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white/15 px-3 py-2.5 text-xs font-black uppercase tracking-tight transition hover:bg-white/25"
        >
          <MaterialIcon name="navigation" className="size-4" />
          {t.directions}
        </a>
        {!active && (
          <button
            type="button"
            onClick={() => onAsk(place)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-linear-to-r from-[#00658b] to-[#0a86b8] px-3 py-2.5 text-xs font-black uppercase tracking-tight transition hover:scale-105"
          >
            <MaterialIcon name="auto_awesome" className="size-4" />
            {t.aiGuide}
          </button>
        )}
      </div>

      {active && (
        <p className="mt-3 max-h-28 overflow-y-auto whitespace-pre-wrap text-sm leading-6 text-white/85">
          {story.text || (story.loading ? t.aiLoading : "")}
          {story.loading && <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-[#34e0a1] align-middle" />}
        </p>
      )}
    </div>
  );
}
