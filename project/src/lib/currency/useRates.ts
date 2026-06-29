"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Rates = Record<string, number>; // value per 1 USD
type Cache = { rates: Rates; updated: number | null };

const REFRESH_MS = 5 * 60 * 1000; // pull fresh rates every 5 minutes
const CACHE_KEY = "ai-nomad-rates";

function readCache(): Cache | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as Cache) : null;
  } catch {
    return null;
  }
}

/**
 * Live FX rates from `/api/rates`, cached to localStorage so the converter keeps
 * working OFFLINE with the last known rates. Auto-refreshes when online; exposes
 * a `convert` helper (cross-rate to MNT) so typing stays instant.
 */
export function useRates() {
  const [rates, setRates] = useState<Rates | null>(() => readCache()?.rates ?? null);
  const [updated, setUpdated] = useState<number | null>(() => readCache()?.updated ?? null);
  const [loading, setLoading] = useState(() => !readCache());
  const [error, setError] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/rates");
      if (!res.ok) throw new Error("failed");
      const data = (await res.json()) as Cache;
      setRates(data.rates);
      setUpdated(data.updated);
      setError(false);
      try {
        window.localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      } catch {
        // storage full / disabled — in-memory rates still work this session
      }
    } catch {
      setError(true); // keep any cached rates; UI shows a "cached" badge
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
    timer.current = setInterval(load, REFRESH_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [load]);

  const convert = useCallback(
    (amount: number, from: string): number | null => {
      if (!rates) return null;
      const f = rates[from];
      const mnt = rates.MNT;
      if (!f || !mnt) return null;
      return (amount * mnt) / f;
    },
    [rates],
  );

  // `stale` = we have rates to use, but the latest refresh failed (offline).
  return { rates, updated, loading, error, stale: error && Boolean(rates), refresh: load, convert };
}
