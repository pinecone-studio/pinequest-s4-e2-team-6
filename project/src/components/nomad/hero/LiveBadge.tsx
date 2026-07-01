"use client";

import type { ReactNode } from "react";
import { MaterialIcon } from "../icons/MaterialIcon";
import { featuredGem, seasonNow } from "@/lib/hero/featured";
import { useWeather } from "@/lib/hero/useWeather";
import type { Language } from "../types";

/**
 * Small live strip that makes the hero feel alive: real-time Ulaanbaatar
 * weather, the current season + whether it's a good time to visit, and a
 * daily-rotating featured hidden gem.
 */
export function LiveBadge({ language, now }: { language: Language; now: Date }) {
  const weather = useWeather();
  const season = seasonNow(language, now);
  const gem = featuredGem(language, now);
  const todayLabel = language === "mn" ? "Координат" : "Coordinates";

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Pill icon={weather?.icon ?? "schedule"}>
        <b className="tabular-nums">{weather ? `${weather.temp}°` : "—"}</b>
        <span className="opacity-70">{language === "mn" ? "УБ" : "Ulaanbaatar"}</span>
      </Pill>

      <Pill icon="auto_awesome" glow={season.good}>
        <b>{season.season}</b>
        <span className="opacity-70">· {season.note}</span>
      </Pill>

      <Pill icon="landscape">
        <span className="opacity-70">{todayLabel}:</span>
        <b className="max-w-[40vw] truncate">{gem.title}</b>
      </Pill>
    </div>
  );
}

function Pill({
  icon,
  glow = false,
  children,
}: {
  icon: string;
  glow?: boolean;
  children: ReactNode;
}) {
  return (
    <span
      className={`glass-dark inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold tracking-tight text-white ${
        glow ? "ring-1 ring-[#e0a32e]/60" : ""
      }`}
    >
      <MaterialIcon name={icon} className="size-3.5 text-[#e0a32e]" />
      {children}
    </span>
  );
}
