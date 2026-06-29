"use client";

import { useEffect, useState } from "react";

export type Weather = { temp: number; icon: string; codeGroup: WeatherKind };
type WeatherKind = "clear" | "cloud" | "rain" | "snow" | "storm" | "fog";

// Ulaanbaatar — the "land of eternal blue sky" capital.
const URL =
  "https://api.open-meteo.com/v1/forecast?latitude=47.92&longitude=106.92&current=temperature_2m,weather_code";

/** Live Ulaanbaatar weather from the keyless open-meteo API. */
export function useWeather() {
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(URL)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (!alive) return;
        const temp = Math.round(d?.current?.temperature_2m);
        const code = Number(d?.current?.weather_code ?? 0);
        if (!Number.isNaN(temp)) setWeather({ temp, ...describe(code) });
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, []);

  return weather;
}

function describe(code: number): { icon: string; codeGroup: WeatherKind } {
  if (code === 0 || code === 1) return { icon: "auto_awesome", codeGroup: "clear" };
  if (code <= 3) return { icon: "explore", codeGroup: "cloud" };
  if (code <= 48) return { icon: "cloud_download", codeGroup: "fog" };
  if (code <= 67 || (code >= 80 && code <= 82)) return { icon: "navigation", codeGroup: "rain" };
  if (code <= 77 || (code >= 85 && code <= 86)) return { icon: "landscape", codeGroup: "snow" };
  return { icon: "security", codeGroup: "storm" };
}
