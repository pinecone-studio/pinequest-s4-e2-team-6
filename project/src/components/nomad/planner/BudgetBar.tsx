"use client";

import { MaterialIcon } from "../icons/MaterialIcon";
import { plannerCopy } from "./plannerCopy";
import type { Itinerary, PlanParams } from "@/lib/planner/types";
import type { Language } from "../types";

type Props = { itinerary: Itinerary; params: PlanParams; language: Language };

const tugrik = (n: number) => new Intl.NumberFormat("en-US").format(n) + "₮";
const hours = (min: number, mn: boolean) =>
  `${Math.floor(min / 60)}${mn ? "ц" : "h"} ${min % 60}${mn ? "м" : "m"}`;

/** Budget progress + total time summary for the itinerary. */
export function BudgetBar({ itinerary, params, language }: Props) {
  const t = plannerCopy[language];
  const pct = Math.min(100, Math.round((itinerary.totalCost / Math.max(1, params.budget)) * 100));
  const over = itinerary.totalCost > params.budget;

  return (
    <div className="glass-panel rounded-[24px] p-5">
      <div className="flex items-center justify-between text-sm font-black tracking-tight">
        <span className="flex items-center gap-1.5">
          <MaterialIcon name="payments" className="size-4 text-[#00658b] dark:text-[#7dd0ff]" />
          {tugrik(itinerary.totalCost)}
          <span className="text-black/45 dark:text-white/45">/ {tugrik(params.budget)}</span>
        </span>
        <span className="flex items-center gap-1.5 text-black/55 dark:text-white/55">
          <MaterialIcon name="schedule" className="size-4" />
          {hours(itinerary.totalMin, language === "mn")}
        </span>
      </div>

      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
        <div
          className={`h-full rounded-full transition-all ${over ? "bg-[#ef7d3a]" : "bg-linear-to-r from-[#00658b] to-[#34e0a1]"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-1.5 text-[11px] font-bold uppercase tracking-tight text-black/45 dark:text-white/45">
        {pct}% {t.spent} · {itinerary.stops.length} {language === "mn" ? "зогсоол" : "stops"}
      </p>
    </div>
  );
}
