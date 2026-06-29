"use client";

import { MaterialIcon } from "../icons/MaterialIcon";
import { compass } from "@/lib/offline/geo";
import type { GpsFix } from "@/lib/offline/useGeolocation";
import { offlineCopy } from "./offlineCopy";
import type { Language } from "../types";

type Props = { fix: GpsFix; language: Language };

/** Live grid of GPS telemetry — updates in real time as `watchPosition` fires. */
export function CoordReadout({ fix, language }: Props) {
  const t = offlineCopy[language];
  const na = t.na;
  const kmh = fix.speed != null ? (fix.speed * 3.6).toFixed(1) + " km/h" : na;
  const head =
    fix.heading != null
      ? `${Math.round(fix.heading)}° ${compass(fix.heading, language === "mn")}`
      : na;

  const tiles = [
    { icon: "navigation", label: t.fields.lat, value: `${fix.lat.toFixed(5)}°` },
    { icon: "navigation", label: t.fields.lng, value: `${fix.lng.toFixed(5)}°` },
    { icon: "landscape", label: t.fields.alt, value: fix.altitude != null ? `${Math.round(fix.altitude)} m` : na },
    { icon: "directions_walk", label: t.fields.speed, value: kmh },
    { icon: "explore", label: t.fields.heading, value: head },
    { icon: "satellite_alt", label: t.fields.accuracy, value: `±${Math.round(fix.accuracy)} m` },
  ];

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
      {tiles.map((tile, i) => (
        <div
          key={tile.label}
          className={`glass-panel animate-fade-up rounded-2xl p-3.5 delay-${Math.min(i + 1, 3)}`}
        >
          <MaterialIcon name={tile.icon} className="size-4 text-[#00658b] dark:text-[#7dd0ff]" />
          <p className="mt-2 truncate text-lg font-black tracking-tight tabular-nums">{tile.value}</p>
          <p className="text-[10px] font-black uppercase tracking-tight text-black/45 dark:text-white/45">
            {tile.label}
          </p>
        </div>
      ))}
    </div>
  );
}
