"use client";

import { MaterialIcon } from "../icons/MaterialIcon";
import { cultureCopy } from "./cultureCopy";
import type { Language } from "../types";

type Props = { language: Language; onClose: () => void };

/** Compact gradient header for the floating culture chat panel. */
export function WidgetHeader({ language, onClose }: Props) {
  const t = cultureCopy[language];

  return (
    <div className="relative flex items-center gap-3 overflow-hidden bg-linear-to-br from-[#00658b] via-[#0a86b8] to-[#e0a32e] px-4 py-3 text-white">
      <span className="pulse-ring relative grid size-10 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur">
        <MaterialIcon name="auto_awesome" className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-black tracking-tight">{t.title}</p>
        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-white/75">
          <span className="size-1.5 rounded-full bg-[#34e0a1]" />
          {t.badge}
        </p>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Хаах"
        className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15 transition hover:bg-white/25"
      >
        <MaterialIcon name="close" className="size-[18px]" />
      </button>
    </div>
  );
}
