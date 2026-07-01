"use client";

import { useState } from "react";
import { MaterialIcon } from "../icons/MaterialIcon";
import { phrases, type PhraseSource } from "@/lib/offline/phrases";
import { offlineCopy } from "./offlineCopy";
import type { Language } from "../types";

const SOURCES: { value: PhraseSource; label: string }[] = [
  { value: "en", label: "English" },
  { value: "ru", label: "Русский" },
  { value: "zh", label: "中文" },
  { value: "es", label: "Español" },
];

function sourceFromLanguage(language: Language): PhraseSource {
  return language === "ru" || language === "zh" || language === "es" ? language : "en";
}

/** Offline phrasebook: read a phrase in your language, say it in Mongolian. */
export function Phrasebook({ language }: { language: Language }) {
  const t = offlineCopy[language];
  const [source, setSource] = useState<PhraseSource>(() => sourceFromLanguage(language));
  const [open, setOpen] = useState(false);
  const current = SOURCES.find((s) => s.value === source) ?? SOURCES[0];

  return (
    <div className="glass-panel rounded-[28px] p-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div>
          <h3 className="text-xs font-black uppercase tracking-tight text-black/50 dark:text-white/50">
            {t.phrasebookTitle}
          </h3>
          <p className="text-[11px] text-black/45 dark:text-white/45">{t.phrasebookHint}</p>
        </div>
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-haspopup="menu"
            className="flex h-9 items-center gap-1.5 rounded-full border border-black/10 bg-white/50 px-3 text-[11px] font-black uppercase text-black/65 backdrop-blur-xl transition hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
          >
            <span>{source.toUpperCase()}</span>
            <MaterialIcon name="chevron_right" className={`size-4 rotate-90 transition ${open ? "-rotate-90" : ""}`} />
          </button>

          <div
            className={`absolute right-0 top-full z-20 mt-2 w-40 overflow-hidden rounded-2xl border border-black/10 bg-white/90 p-1 shadow-2xl shadow-black/15 backdrop-blur-2xl transition dark:border-white/10 dark:bg-[#0b0f11]/90 ${
              open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
            }`}
            role="menu"
          >
            {SOURCES.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => {
                  setSource(s.value);
                  setOpen(false);
                }}
                role="menuitemradio"
                aria-checked={source === s.value}
                className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-xs font-black transition ${
                  source === s.value
                    ? "bg-[#00658b] text-white shadow-sm dark:bg-[#6bcbff] dark:text-[#001e2d]"
                    : "text-black/65 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10"
                }`}
              >
                <span className="truncate">{s.label}</span>
                <span className="text-[10px] uppercase opacity-70">{s.value}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {phrases.map((p, i) => (
          <div
            key={p.id}
            className={`animate-fade-up flex items-center gap-3 rounded-2xl border border-white/30 bg-white/40 p-3 dark:bg-white/8 delay-${Math.min((i % 3) + 1, 3)}`}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#00658b]/10 text-[#00658b] dark:text-[#7dd0ff]">
              <MaterialIcon name={p.icon} className="size-[18px]" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-bold text-black/50 dark:text-white/50">{current.label}: {p[source]}</p>
              <p className="truncate text-base font-black tracking-tight">{p.mn}</p>
              <p className="truncate text-[11px] italic text-[#00658b] dark:text-[#7dd0ff]">{p.pron}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
