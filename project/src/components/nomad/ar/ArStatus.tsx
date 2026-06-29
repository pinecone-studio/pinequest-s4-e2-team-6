"use client";

import { MaterialIcon } from "../icons/MaterialIcon";
import { placeCopy } from "@/lib/places/placeCopy";
import type { Language } from "../types";

type Props = {
  hasCoords: boolean;
  denied: boolean;
  count: number;
  loading: boolean;
  accuracy?: number;
  language: Language;
  onDemo: () => void;
};

/** Permission / locating / empty / low-accuracy feedback over the AR scene. */
export function ArStatus({ hasCoords, denied, count, loading, accuracy, language, onDemo }: Props) {
  const t = placeCopy[language];

  if (!hasCoords || (count === 0 && !loading)) {
    const denyMode = !hasCoords && denied;
    return (
      <div className="absolute inset-0 z-30 grid place-items-center p-6">
        <div className="glass-dark max-w-xs rounded-3xl p-6 text-center text-white">
          <MaterialIcon
            name={denyMode ? "block" : !hasCoords ? "satellite_alt" : "explore"}
            className={`mx-auto size-9 ${!hasCoords && !denyMode ? "animate-pulse" : ""}`}
          />
          <p className="mt-3 text-sm font-black">
            {denyMode ? t.denied : !hasCoords ? t.locating : t.empty}
          </p>
          {denyMode && <p className="mt-1 text-xs text-white/65">{t.deniedHelp}</p>}
          {(denyMode || (hasCoords && count === 0)) && (
            <button
              type="button"
              onClick={onDemo}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-[#00658b] to-[#0a86b8] px-4 py-2 text-xs font-black uppercase tracking-tight transition hover:scale-105"
            >
              <MaterialIcon name="auto_awesome" className="size-4" />
              {t.demo}
            </button>
          )}
        </div>
      </div>
    );
  }

  if (accuracy != null && accuracy > 120) {
    return (
      <div className="glass-dark absolute bottom-24 left-1/2 z-20 -translate-x-1/2 rounded-full px-3 py-1.5 text-[11px] font-bold text-[#ff8a5b]">
        {t.lowAccuracy}
      </div>
    );
  }

  return null;
}
