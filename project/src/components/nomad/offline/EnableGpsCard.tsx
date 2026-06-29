"use client";

import { MaterialIcon } from "../icons/MaterialIcon";
import type { GpsStatus } from "@/lib/offline/useGeolocation";
import { offlineCopy } from "./offlineCopy";
import type { Language } from "../types";

type Props = { status: GpsStatus; language: Language; onEnable: () => void };

/** Pre-fix state: enable button, satellite-search spinner, or an error. */
export function EnableGpsCard({ status, language, onEnable }: Props) {
  const t = offlineCopy[language];
  const locating = status === "locating";
  const error = status === "denied" ? t.denied : status === "unsupported" ? t.unsupported : null;

  return (
    <div className="glass-panel mx-auto grid aspect-square w-full max-w-[280px] place-items-center rounded-full p-8 text-center">
      <div>
        <div
          className={`mx-auto grid size-20 place-items-center rounded-full text-white shadow-xl ${
            error ? "bg-red-500/80" : "bg-linear-to-br from-[#6bcbff] via-[#00658b] to-[#e0a32e]"
          } ${locating ? "pulse-ring relative animate-float" : ""}`}
        >
          <MaterialIcon name="satellite_alt" className="size-9" />
        </div>

        {error ? (
          <>
            <p className="mt-4 text-sm font-black text-red-600 dark:text-red-400">{error}</p>
            {status === "denied" && (
              <p className="mt-1 text-xs text-black/55 dark:text-white/55">{t.deniedHelp}</p>
            )}
          </>
        ) : locating ? (
          <p className="mt-4 animate-pulse text-sm font-black tracking-tight">{t.locating}</p>
        ) : (
          <button
            type="button"
            onClick={onEnable}
            className="ring-glow mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-linear-to-r from-[#00658b] to-[#0a86b8] px-6 text-sm font-black uppercase tracking-tight text-white transition hover:scale-105 dark:from-[#6bcbff] dark:to-[#e0a32e] dark:text-[#001e2d]"
          >
            <MaterialIcon name="satellite_alt" className="size-[18px]" />
            {t.enable}
          </button>
        )}
      </div>
    </div>
  );
}
