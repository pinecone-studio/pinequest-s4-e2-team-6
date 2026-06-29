"use client";

import { currencies } from "@/lib/currency/currencies";
import { currencyCopy, formatMnt } from "./currencyCopy";
import type { Language } from "../types";

type Props = {
  convert: (amount: number, from: string) => number | null;
  active: string;
  language: Language;
  onPick: (code: string) => void;
};

/** Live table: 1 unit of each currency expressed in MNT. Tap a row to convert. */
export function RateTable({ convert, active, language, onPick }: Props) {
  const t = currencyCopy[language];

  return (
    <div className="glass-panel rounded-[28px] p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-tight text-black/55 dark:text-white/55">
          {t.tableTitle}
        </h3>
        <span className="text-[10px] font-bold text-black/40 dark:text-white/40">{t.tableHint}</span>
      </div>

      <div className="space-y-1">
        {currencies.map((c, i) => {
          const mnt = convert(1, c.code);
          const on = c.code === active;
          return (
            <button
              key={c.code}
              type="button"
              onClick={() => onPick(c.code)}
              className={`animate-fade-up flex w-full items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition delay-${Math.min(i + 1, 3)} ${
                on
                  ? "border-[#00658b]/40 bg-[#00658b]/10 dark:border-[#7dd0ff]/30 dark:bg-[#7dd0ff]/10"
                  : "border-white/25 bg-white/35 hover:bg-white/55 dark:bg-white/5 dark:hover:bg-white/10"
              }`}
            >
              <span className="text-xl">{c.flag}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-black tracking-tight">
                  1 {c.code}
                </p>
                <p className="truncate text-[11px] text-black/50 dark:text-white/50">{c.name[language]}</p>
              </div>
              <p className="shrink-0 text-sm font-black tabular-nums text-[#00658b] dark:text-[#7dd0ff]">
                {mnt != null ? `${formatMnt(mnt)} ₮` : "—"}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
