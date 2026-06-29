"use client";

import { useState } from "react";
import { images } from "../data/content";
import { MaterialIcon } from "../icons/MaterialIcon";
import { ScreenFrame } from "../shared/ScreenFrame";
import { RateTable } from "../currency/RateTable";
import { currencyCopy, formatMnt, timeAgo } from "../currency/currencyCopy";
import { findCurrency } from "@/lib/currency/currencies";
import { useRates } from "@/lib/currency/useRates";
import type { Language } from "../types";

type CurrencyScreenProps = { language: Language };

export function CurrencyScreen({ language }: CurrencyScreenProps) {
  const t = currencyCopy[language];
  const { updated, loading, error, refresh, convert } = useRates();
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");

  const cur = findCurrency(from);
  const n = parseFloat(amount.replace(/,/g, ""));
  const result = !isNaN(n) ? convert(n, from) : null;

  return (
    <ScreenFrame bg={images.steppe}>
      <section className="space-y-5 py-6">
        <header className="animate-fade-up flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-tight text-[#00658b] dark:text-[#7dd0ff]">{t.eyebrow}</p>
            <h2 className="mt-1 text-3xl font-black tracking-tight sm:text-5xl">{t.title}</h2>
            <p className="mt-2 max-w-xl leading-7 text-black/60 dark:text-white/60">{t.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={refresh}
            className="inline-flex items-center gap-2 rounded-full border border-[#34e0a1]/30 bg-[#34e0a1]/12 px-4 py-2 text-xs font-black uppercase tracking-tight text-[#0a7a52] transition hover:scale-105 dark:text-[#34e0a1]"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#34e0a1] opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-[#34e0a1]" />
            </span>
            {t.live} · {t.updated} {timeAgo(updated, language)}
          </button>
        </header>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="glass-panel animate-fade-up rounded-[28px] p-6">
            <label className="text-xs font-black uppercase tracking-tight text-black/50 dark:text-white/50">
              {t.amountLabel}
            </label>
            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/30 bg-white/45 px-4 py-3 dark:bg-white/8">
              <span className="text-2xl">{cur.flag}</span>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                inputMode="decimal"
                aria-label={t.amountLabel}
                className="w-full min-w-0 bg-transparent text-2xl font-black tabular-nums outline-none"
              />
              <span className="shrink-0 text-sm font-black text-black/50 dark:text-white/50">{cur.code}</span>
            </div>

            <div className="my-4 flex items-center gap-2 text-black/35 dark:text-white/35">
              <span className="h-px flex-1 bg-current opacity-30" />
              <MaterialIcon name="payments" className="size-5" />
              <span className="h-px flex-1 bg-current opacity-30" />
            </div>

            <p className="text-xs font-black uppercase tracking-tight text-[#00658b] dark:text-[#7dd0ff]">
              {t.resultLabel}
            </p>
            <p className="mt-1 break-words text-4xl font-black tabular-nums tracking-tight sm:text-5xl">
              {loading && result == null ? (
                <span className="animate-pulse text-black/30 dark:text-white/30">…</span>
              ) : result != null ? (
                <>
                  {formatMnt(result)} <span className="text-2xl text-black/45 dark:text-white/45">₮</span>
                </>
              ) : (
                <span className="text-black/30 dark:text-white/30">—</span>
              )}
            </p>

            {error && (
              <p className="mt-3 rounded-xl bg-red-500/10 px-3 py-2 text-xs font-bold text-red-600 dark:text-red-400">
                {t.error}
              </p>
            )}
          </div>

          <RateTable convert={convert} active={from} language={language} onPick={setFrom} />
        </div>
      </section>
    </ScreenFrame>
  );
}
