"use client";

import { MaterialIcon } from "../icons/MaterialIcon";
import { catMeta, plannerCopy } from "./plannerCopy";
import type { Stop } from "@/lib/planner/types";
import type { Language } from "../types";

const tugrik = (n: number) => (n === 0 ? "" : new Intl.NumberFormat("en-US").format(n) + "₮");

/** One itinerary stop: time, coloured category, name, price and duration. */
export function StopCard({ stop, language }: { stop: Stop; language: Language }) {
  const meta = catMeta[stop.category];
  const name = language === "mn" ? stop.nameMn : stop.nameEn;
  const free = language === "mn" ? "Үнэгүй" : "Free";

  return (
    <div className="glass-panel animate-fade-up flex items-center gap-3 rounded-2xl p-3.5">
      <div className="flex flex-col items-center">
        <span className="text-sm font-black tabular-nums">{stop.arrive}</span>
        <span className="mt-0.5 text-[10px] font-bold text-black/40 dark:text-white/40">{stop.durationMin}{language === "mn" ? "м" : "m"}</span>
      </div>

      <span className="grid size-10 shrink-0 place-items-center rounded-xl text-white" style={{ backgroundColor: meta.color }}>
        <MaterialIcon name={meta.icon} className="size-5" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-black tracking-tight">{name}</p>
        <p className="text-[11px] font-bold uppercase tracking-tight" style={{ color: meta.color }}>
          {language === "mn" ? meta.mn : meta.en}
        </p>
      </div>

      <span className="shrink-0 text-sm font-black tabular-nums text-[#00658b] dark:text-[#7dd0ff]">
        {tugrik(stop.price) || free}
      </span>
    </div>
  );
}

/** Walking connector shown between two stops. */
export function WalkLeg({ min, language }: { min: number; language: Language }) {
  const t = plannerCopy[language];
  return (
    <div className="flex items-center gap-2 py-1.5 pl-7 text-[11px] font-bold text-black/40 dark:text-white/40">
      <MaterialIcon name="directions_walk" className="size-3.5" />
      {min} {t.walk}
    </div>
  );
}
