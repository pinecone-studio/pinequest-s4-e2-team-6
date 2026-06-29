"use client";

import { copy } from "../data/content";
import { MaterialIcon } from "../icons/MaterialIcon";
import { HeroBackdrop } from "../hero/HeroBackdrop";
import { LiveBadge } from "../hero/LiveBadge";
import { OrnamentDivider } from "../shared/Ornament";
import type { Language, ScreenId } from "../types";

type DiscoverScreenProps = {
  setActive: (screen: ScreenId) => void;
  language: Language;
};

export function DiscoverScreen({ setActive, language }: DiscoverScreenProps) {
  const text = copy[language].discover;
  const now = new Date();
  const words = text.title.split(" ");
  const lead = words.slice(0, -1).join(" ");
  const last = words.slice(-1);

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#08111c] text-white">
      <HeroBackdrop />

      <section className="relative z-10 mx-auto flex min-h-[100svh] max-w-3xl flex-col items-center justify-center px-5 pb-28 pt-24 text-center">
        <div className="animate-fade-up">
          <LiveBadge language={language} now={now} />
        </div>

        <h1 className="animate-fade-up delay-1 mt-7 text-balance text-5xl font-black leading-[1.02] tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.45)] sm:text-7xl md:text-8xl">
          {lead} <span className="text-gradient">{last}</span>
        </h1>

        <p className="animate-fade-up delay-2 mx-auto mt-6 max-w-xl text-pretty text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
          {text.description}
        </p>

        <OrnamentDivider className="animate-fade-up delay-2 mt-8" />

        <button
          type="button"
          onClick={() => setActive("camera")}
          className="ring-glow animate-fade-up delay-3 mt-8 inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-linear-to-r from-[#00658b] via-[#0a86b8] to-[#e0a32e] px-9 text-base font-black uppercase tracking-tight text-white shadow-2xl transition hover:scale-[1.04]"
        >
          {text.primaryCta}
          <MaterialIcon name="arrow_forward" className="size-5" />
        </button>

        <button
          type="button"
          onClick={() => setActive("planner")}
          className="animate-fade-up delay-3 mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-tight text-white/70 transition hover:text-white"
        >
          <MaterialIcon name="play_circle" className="size-4" />
          {text.secondaryCta}
        </button>
      </section>

      <div className="absolute bottom-24 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/50">
        <MaterialIcon name="chevron_right" className="size-7 rotate-90" />
      </div>
    </main>
  );
}
