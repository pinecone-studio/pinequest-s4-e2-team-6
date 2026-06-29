"use client";

import { useState } from "react";
import { MaterialIcon } from "../icons/MaterialIcon";
import { phrases, type PhraseSource } from "@/lib/offline/phrases";
import { offlineCopy } from "./offlineCopy";
import type { Language } from "../types";

const SOURCES: { value: PhraseSource; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "ru", label: "RU" },
];

/** Offline phrasebook: read a phrase in your language, say it in Mongolian. */
export function Phrasebook({ language }: { language: Language }) {
  const t = offlineCopy[language];
  const [source, setSource] = useState<PhraseSource>("en");

  return (
    <div className="glass-panel rounded-[28px] p-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div>
          <h3 className="text-xs font-black uppercase tracking-tight text-black/50 dark:text-white/50">
            {t.phrasebookTitle}
          </h3>
          <p className="text-[11px] text-black/45 dark:text-white/45">{t.phrasebookHint}</p>
        </div>
        <div className="flex rounded-full border border-black/10 bg-white/50 p-0.5 dark:border-white/10 dark:bg-white/5">
          {SOURCES.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setSource(s.value)}
              aria-pressed={source === s.value}
              className={`rounded-full px-3 py-1.5 text-[11px] font-black uppercase transition ${
                source === s.value
                  ? "bg-[#00658b] text-white shadow-sm dark:bg-[#6bcbff] dark:text-[#001e2d]"
                  : "text-black/50 dark:text-white/50"
              }`}
            >
              {s.label}
            </button>
          ))}
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
              <p className="truncate text-[11px] font-bold text-black/50 dark:text-white/50">{p[source]}</p>
              <p className="truncate text-base font-black tracking-tight">{p.mn}</p>
              <p className="truncate text-[11px] italic text-[#00658b] dark:text-[#7dd0ff]">{p.pron}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
