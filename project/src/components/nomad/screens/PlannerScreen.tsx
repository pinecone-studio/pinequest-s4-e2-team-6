"use client";

import { useState } from "react";
import { images } from "../data/content";
import { ScreenFrame } from "../shared/ScreenFrame";
import { OrnamentDivider } from "../shared/Ornament";
import { MaterialIcon } from "../icons/MaterialIcon";
import { BudgetBar } from "../planner/BudgetBar";
import { PlannerHistory } from "../planner/PlannerHistory";
import { PlannerInput } from "../planner/PlannerInput";
import { RefineBar } from "../planner/RefineBar";
import { Timeline } from "../planner/Timeline";
import { plannerCopy } from "../planner/plannerCopy";
import { usePlanner } from "@/lib/planner/usePlanner";
import type { Language } from "../types";

type PlannerScreenProps = { language: Language };
const today = () => {
  const date = new Date();
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
};

/**
 * AI day planner: free-text request → AI extracts budget/time/interests →
 * picks a grounded route from ~120 curated UB places → validated timeline.
 */
export function PlannerScreen({ language }: PlannerScreenProps) {
  const t = plannerCopy[language];
  const [saveDate, setSaveDate] = useState(today);
  const { itinerary, params, history, loading, error, generate, adjust, saveCurrent, deleteSaved, loadSaved } = usePlanner(language);
  const hasRoute = itinerary && params && itinerary.stops.length > 0;
  const hasGemRoute = Boolean(itinerary?.stops.some((stop) => stop.id.startsWith("gem:")));

  return (
    <ScreenFrame bg={images.steppe}>
      <section className="mx-auto max-w-2xl space-y-5 py-6">
        <header className="animate-fade-up text-center">
          <p className="text-sm font-black uppercase tracking-tight text-[#00658b] dark:text-[#7dd0ff]">{t.eyebrow}</p>
          <h2 className="mt-1 text-3xl font-black tracking-tight sm:text-5xl">{t.title}</h2>
          <p className="mx-auto mt-2 max-w-md leading-7 text-black/60 dark:text-white/60">{t.subtitle}</p>
          <OrnamentDivider className="mt-5" />
        </header>

        <PlannerInput language={language} loading={loading} onGenerate={generate} />

        {error && (
          <p className="rounded-2xl bg-red-500/10 px-4 py-3 text-center text-sm font-bold text-red-600 dark:text-red-400">
            {error === "empty" ? t.empty : t.error}
          </p>
        )}

        {hasRoute && (
          <div className="animate-fade-up space-y-4">
            <BudgetBar itinerary={itinerary} params={params} language={language} />
            <Timeline itinerary={itinerary} language={language} />
            <div className="glass-panel flex flex-wrap items-center justify-between gap-3 rounded-[24px] p-4">
              <label className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/45 px-3 py-2 text-xs font-bold dark:border-white/10 dark:bg-white/5">
                <span className="text-black/50 dark:text-white/50">{t.planDate}</span>
                <input
                  type="date"
                  value={saveDate}
                  onChange={(event) => setSaveDate(event.target.value)}
                  className="bg-transparent font-black outline-none"
                />
              </label>
              <button
                type="button"
                onClick={() => saveCurrent(saveDate)}
                className="inline-flex items-center gap-2 rounded-full bg-[#00658b] px-4 py-2.5 text-sm font-black tracking-tight text-white transition hover:scale-[1.03] dark:bg-[#7dd0ff] dark:text-[#001e2d]"
              >
                <MaterialIcon name="bookmark_add" className="size-4" />
                {t.save}
              </button>
            </div>
            {!hasGemRoute && <RefineBar language={language} params={params} loading={loading} onAdjust={adjust} />}
          </div>
        )}

        <PlannerHistory language={language} history={history} onLoad={loadSaved} onDelete={deleteSaved} />
      </section>
    </ScreenFrame>
  );
}
