"use client";

import { MaterialIcon } from "../icons/MaterialIcon";
import { plannerCopy } from "./plannerCopy";
import type { PlanParams } from "@/lib/planner/types";
import type { Language } from "../types";

type Props = {
  language: Language;
  params: PlanParams;
  loading: boolean;
  onAdjust: (patch: Partial<PlanParams>) => void;
};

/** Quick one-tap refinements ("cheaper", "+1 hour"…) that re-plan instantly. */
export function RefineBar({ language, params, loading, onAdjust }: Props) {
  const t = plannerCopy[language];

  const chips: { label: string; icon: string; patch: Partial<PlanParams> }[] = [
    { label: t.refine.cheaper, icon: "payments", patch: { budget: Math.round(params.budget * 0.7) } },
    { label: t.refine.addHour, icon: "schedule", patch: { durationHours: params.durationHours + 1 } },
    { label: t.refine.shorter, icon: "directions_walk", patch: { durationHours: Math.max(1, params.durationHours - 1) } },
    { label: t.refine.more, icon: "auto_awesome", patch: { pace: "packed" } },
  ];

  return (
    <div>
      <p className="mb-2 text-xs font-black uppercase tracking-tight text-black/45 dark:text-white/45">{t.refineTitle}</p>
      <div className="flex flex-wrap gap-2">
        {chips.map((c) => (
          <button
            key={c.label}
            type="button"
            disabled={loading}
            onClick={() => onAdjust(c.patch)}
            className="glass-panel inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold tracking-tight transition hover:scale-[1.03] disabled:opacity-50"
          >
            <MaterialIcon name={c.icon} className="size-3.5 text-[#00658b] dark:text-[#7dd0ff]" />
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
