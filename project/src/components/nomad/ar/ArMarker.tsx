"use client";

import { MaterialIcon } from "../icons/MaterialIcon";
import { formatDistance, walkMinutes } from "@/lib/places/geo";
import { categoryIcon, placeCopy } from "@/lib/places/placeCopy";
import type { NearbyPlace } from "@/lib/places/types";
import type { Language } from "../types";

type Props = {
  place: NearbyPlace;
  x: number;
  y: number;
  scale: number;
  opacity: number;
  blur: number;
  locked: boolean;
  language: Language;
  onTap: (p: NearbyPlace) => void;
};

/** A floating world marker: dot anchor, drawn-in tether, and a depth-scaled
 *  card that brightens + grows when it locks onto the centre reticle. */
export function ArMarker({ place, x, y, scale, opacity, blur, locked, language, onTap }: Props) {
  const t = placeCopy[language];
  const name = language === "mn" ? place.nameMn : place.nameEn;

  return (
    <div
      className="absolute flex flex-col items-center"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -100%) scale(${scale})`,
        transformOrigin: "bottom center",
        opacity,
        filter: blur ? `blur(${blur}px)` : undefined,
        zIndex: Math.round(scale * 100),
      }}
    >
      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => onTap(place)}
        className={`glass-dark flex items-center gap-2.5 rounded-full px-3 py-2 text-left text-white transition-all duration-300 ${
          locked ? "scale-110 ring-2 ring-[#34e0a1] shadow-[0_0_30px_rgba(52,224,161,0.55)]" : "hover:scale-105"
        }`}
      >
        <span
          className={`grid size-7 shrink-0 place-items-center rounded-full ${
            locked ? "bg-[#34e0a1]/30 text-[#34e0a1]" : "bg-[#6bcbff]/20 text-[#6bcbff]"
          }`}
        >
          <MaterialIcon name={categoryIcon(place.category)} className="size-4" />
        </span>
        <span className="min-w-0">
          <span className="block max-w-[44vw] truncate text-sm font-black leading-tight drop-shadow">{name}</span>
          <span className="block text-[11px] font-semibold text-white/70">
            {formatDistance(place.distance)} • {walkMinutes(place.distance)} {t.walk}
          </span>
        </span>
        <MaterialIcon name={locked ? "auto_awesome" : "chevron_right"} className="size-4 text-white/60" />
      </button>

      <span className="animate-draw mt-1 h-12 w-px bg-linear-to-b from-white/70 to-transparent" />
      <span className="relative -mt-0.5 grid place-items-center">
        <span className={`absolute size-4 rounded-full ${locked ? "bg-[#34e0a1]" : "bg-[#34e0a1]/80"} animate-ping opacity-60`} />
        <span className="animate-breathe size-3 rounded-full bg-[#34e0a1] shadow-[0_0_14px_rgba(52,224,161,0.95)]" />
      </span>
    </div>
  );
}
