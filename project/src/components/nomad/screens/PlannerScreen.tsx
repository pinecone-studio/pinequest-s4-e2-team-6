"use client";

import { images } from "../data/content";
import { ScreenFrame } from "../shared/ScreenFrame";
import { OrnamentDivider } from "../shared/Ornament";
import { BudgetBar } from "../planner/BudgetBar";
import { PlannerInput } from "../planner/PlannerInput";
import { RefineBar } from "../planner/RefineBar";
import { Timeline } from "../planner/Timeline";
import { plannerCopy } from "../planner/plannerCopy";
import { usePlanner } from "@/lib/planner/usePlanner";
import type { Language } from "../types";

type PlannerScreenProps = { language: Language };

/**
 * AI day planner: free-text request → AI extracts budget/time/interests →
 * picks a grounded route from ~120 curated UB places → validated timeline.
 */
export function PlannerScreen({ language }: PlannerScreenProps) {
  const t = plannerCopy[language];
  const { itinerary, params, loading, error, generate, adjust } = usePlanner(language);
  const hasRoute = itinerary && params && itinerary.stops.length > 0;

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
            <RefineBar language={language} params={params} loading={loading} onAdjust={adjust} />
          </div>
        )}
      </section>
    </ScreenFrame>
  );
}
