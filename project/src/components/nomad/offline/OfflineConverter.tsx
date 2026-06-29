"use client";

import { useState } from "react";
import { currencies, findCurrency } from "@/lib/currency/currencies";
import { useRates } from "@/lib/currency/useRates";
import { currencyCopy, formatMnt, timeAgo } from "../currency/currencyCopy";
import { offlineCopy } from "./offlineCopy";
import type { Language } from "../types";

/** Working currency converter that survives offline using cached rates. */
export function OfflineConverter({ language }: { language: Language }) {
  const ct = currencyCopy[language];
  const ot = offlineCopy[language];
  const { updated, loading, stale, convert } = useRates();
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");

  const cur = findCurrency(from);
  const n = parseFloat(amount.replace(/,/g, ""));
  const result = !isNaN(n) ? convert(n, from) : null;

  return (
    <div className="glass-panel rounded-[28px] p-6">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-xs font-black uppercase tracking-tight text-black/50 dark:text-white/50">
          {ot.converterTitle}
        </h3>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-tight ${
            stale ? "bg-[#ff8a5b]/15 text-[#b5531f] dark:text-[#ff8a5b]" : "bg-[#34e0a1]/15 text-[#0a7a52] dark:text-[#34e0a1]"
          }`}
        >
          <span className={`size-1.5 rounded-full ${stale ? "bg-[#ff8a5b]" : "bg-[#34e0a1]"}`} />
          {stale ? ct.cached : ct.live} · {timeAgo(updated, language)}
        </span>
      </div>

      <div className="flex items-center gap-2 rounded-2xl border border-white/30 bg-white/45 px-3 py-2.5 dark:bg-white/8">
        <span className="text-xl">{cur.flag}</span>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
          inputMode="decimal"
          aria-label={ct.amountLabel}
          className="w-full min-w-0 bg-transparent text-xl font-black tabular-nums outline-none"
        />
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          aria-label={ct.fromLabel}
          className="shrink-0 rounded-lg bg-transparent text-sm font-black outline-none dark:bg-[#101312]"
        >
          {currencies.map((c) => (
            <option key={c.code} value={c.code}>
              {c.code}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-3 text-[10px] font-black uppercase tracking-tight text-[#00658b] dark:text-[#7dd0ff]">
        {ct.resultLabel}
      </p>
      <p className="break-words text-3xl font-black tabular-nums tracking-tight">
        {loading && result == null ? (
          <span className="animate-pulse text-black/30 dark:text-white/30">…</span>
        ) : result != null ? (
          <>
            {formatMnt(result)} <span className="text-xl text-black/45 dark:text-white/45">₮</span>
          </>
        ) : (
          <span className="text-black/30 dark:text-white/30">—</span>
        )}
      </p>
    </div>
  );
}
