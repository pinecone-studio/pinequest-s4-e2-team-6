"use client";

import { useAmbient } from "@/lib/audio/useAmbient";
import { KnotMark } from "./Ornament";
import type { Language } from "../types";

/**
 * Floating ambient-sound control, docked bottom-left (opposite the culture
 * chat). Plays a generative steppe drone; the ölzii knot turns while it sounds.
 */
export function AmbientToggle({ language }: { language: Language }) {
  const { playing, toggle } = useAmbient();
  const label =
    language === "mn"
      ? playing
        ? "Дууг унтраах"
        : "Уртын дуу"
      : playing
        ? "Mute ambience"
        : "Steppe ambience";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={label}
      className={`fixed bottom-24 left-4 z-50 flex items-center gap-2 rounded-full border px-3 py-3 backdrop-blur-xl transition hover:scale-105 lg:bottom-6 lg:left-6 ${
        playing
          ? "border-[#e0a32e]/50 bg-[#e0a32e]/20 text-[#7a5212] shadow-lg shadow-[#e0a32e]/30 dark:text-[#e0a32e]"
          : "border-white/25 bg-white/40 text-[#00658b] dark:bg-white/10 dark:text-[#6bcbff]"
      }`}
    >
      <span className={`relative grid size-7 place-items-center ${playing ? "pulse-ring rounded-full" : ""}`}>
        <KnotMark className="size-6" spin={playing} />
      </span>
      <span className="hidden text-xs font-black uppercase tracking-tight sm:block">{label}</span>
    </button>
  );
}
