"use client";

import { MaterialIcon } from "../icons/MaterialIcon";
import type { GpsFix } from "@/lib/offline/useGeolocation";
import { offlineCopy } from "./offlineCopy";
import type { Language } from "../types";

type Props = { online: boolean; fix: GpsFix | null; language: Language };

/** Connectivity + GPS signal banner. Turns the "offline" state into a feature. */
export function OfflineStatusBar({ online, fix, language }: Props) {
  const t = offlineCopy[language];
  const sig = !fix
    ? null
    : fix.accuracy <= 20
      ? { label: t.signal.strong, bars: 3 }
      : fix.accuracy <= 60
        ? { label: t.signal.good, bars: 2 }
        : { label: t.signal.weak, bars: 1 };

  return (
    <div
      className={`animate-fade-up flex flex-wrap items-center gap-3 rounded-2xl border px-4 py-3 ${
        online
          ? "border-[#34e0a1]/30 bg-[#34e0a1]/12"
          : "border-[#ff8a5b]/35 bg-[#ff8a5b]/12"
      }`}
    >
      <span className="flex items-center gap-2 text-sm font-black tracking-tight">
        <span className="relative flex size-2.5">
          <span className={`absolute inline-flex size-full animate-ping rounded-full opacity-70 ${online ? "bg-[#34e0a1]" : "bg-[#ff8a5b]"}`} />
          <span className={`relative inline-flex size-2.5 rounded-full ${online ? "bg-[#34e0a1]" : "bg-[#ff8a5b]"}`} />
        </span>
        {online ? t.online : t.offline}
      </span>

      {!online && <span className="text-xs text-black/60 dark:text-white/60">{t.offlineNote}</span>}

      {sig && (
        <span className="ml-auto flex items-center gap-2 text-xs font-bold text-black/60 dark:text-white/60">
          <MaterialIcon name="satellite_alt" className="size-4" />
          {sig.label}
          <span className="flex items-end gap-0.5">
            {[1, 2, 3].map((b) => (
              <span
                key={b}
                className={`w-1 rounded-full ${b <= sig.bars ? "bg-[#34e0a1]" : "bg-black/20 dark:bg-white/20"}`}
                style={{ height: `${b * 4 + 2}px` }}
              />
            ))}
          </span>
        </span>
      )}
    </div>
  );
}
