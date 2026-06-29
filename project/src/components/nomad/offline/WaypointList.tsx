"use client";

import { MaterialIcon } from "../icons/MaterialIcon";
import { bearing, compass, distanceKm, formatDistance, type LatLng } from "@/lib/offline/geo";
import { waypoints } from "@/lib/offline/waypoints";
import { offlineCopy } from "./offlineCopy";
import type { Language } from "../types";

type Props = { here: LatLng; language: Language };

/** Live distance + bearing from the user to each saved destination. Offline. */
export function WaypointList({ here, language }: Props) {
  const t = offlineCopy[language];
  const rows = waypoints
    .map((w) => {
      const b = bearing(here, w.coord);
      return { w, km: distanceKm(here, w.coord), brg: b };
    })
    .sort((a, b) => a.km - b.km);

  return (
    <div className="glass-panel rounded-[24px] p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-tight text-black/55 dark:text-white/55">
          {t.waypointsTitle}
        </h3>
        <span className="text-[10px] font-bold text-black/40 dark:text-white/40">{t.waypointsHint}</span>
      </div>

      <div className="space-y-1.5">
        {rows.map(({ w, km, brg }, i) => (
          <div
            key={w.id}
            className={`animate-fade-up flex items-center gap-3 rounded-2xl border border-white/30 bg-white/40 p-3 dark:bg-white/8 delay-${Math.min(i + 1, 3)}`}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#00658b]/10 text-[#00658b] dark:text-[#7dd0ff]">
              <MaterialIcon name={w.icon} className="size-[18px]" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-black tracking-tight">{w.name[language]}</p>
              <p className="truncate text-[11px] text-black/50 dark:text-white/50">{w.region[language]}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-sm font-black tabular-nums">{formatDistance(km)}</p>
              <p className="flex items-center justify-end gap-1 text-[11px] font-bold text-[#00658b] dark:text-[#7dd0ff]">
                {/* arrow points along the real bearing to the destination */}
                <span className="inline-flex" style={{ transform: `rotate(${brg}deg)` }}>
                  <MaterialIcon name="navigation" className="size-3" />
                </span>
                {Math.round(brg)}° {compass(brg, language === "mn")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
