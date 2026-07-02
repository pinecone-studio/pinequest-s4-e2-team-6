"use client";

import { useMemo, useState } from "react";
import { MaterialIcon } from "../icons/MaterialIcon";
import { plannerCopy } from "./plannerCopy";
import type { SavedPlan } from "@/lib/planner/types";
import type { Language } from "../types";

type Props = {
  language: Language;
  history: SavedPlan[];
  onLoad: (plan: SavedPlan) => void;
  onDelete: (id: string) => void;
};

const today = () => {
  const date = new Date();
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
};
const tugrik = (n: number) => new Intl.NumberFormat("en-US").format(n) + "₮";

/** Saved itinerary list filtered by a calendar date. */
export function PlannerHistory({ language, history, onLoad, onDelete }: Props) {
  const t = plannerCopy[language];
  const [date, setDate] = useState(today());
  const plans = useMemo(() => history.filter((plan) => plan.date === date), [date, history]);

  return (
    <section className="glass-panel rounded-[24px] p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-tight">
          <MaterialIcon name="event_note" className="size-4 text-[#00658b] dark:text-[#7dd0ff]" />
          {t.savedPlans}
        </h3>
        <label className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/45 px-3 py-2 text-xs font-bold dark:border-white/10 dark:bg-white/5">
          <span className="text-black/50 dark:text-white/50">{t.planDate}</span>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="bg-transparent font-black outline-none"
          />
        </label>
      </div>

      <div className="mt-3 space-y-2">
        {plans.length === 0 ? (
          <p className="rounded-2xl bg-black/5 px-3 py-3 text-sm font-bold text-black/50 dark:bg-white/5 dark:text-white/50">{t.noHistory}</p>
        ) : (
          plans.map((plan) => (
            <article key={plan.id} className="rounded-2xl border border-black/10 bg-white/45 p-3 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-black tracking-tight">{plan.title}</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-tight text-black/45 dark:text-white/45">
                    {tugrik(plan.itinerary.totalCost)} · {plan.itinerary.stops.length} {language === "mn" ? "зогсоол" : "stops"}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onLoad(plan)}
                    aria-label={t.openPlan}
                    className="grid size-9 place-items-center rounded-full bg-[#00658b] text-white transition hover:scale-105 dark:bg-[#7dd0ff] dark:text-[#001e2d]"
                  >
                    <MaterialIcon name="route" className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(plan.id)}
                    aria-label={t.deletePlan}
                    className="grid size-9 place-items-center rounded-full bg-red-500/10 text-red-600 transition hover:scale-105 dark:text-red-300"
                  >
                    <MaterialIcon name="delete" className="size-4" />
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
