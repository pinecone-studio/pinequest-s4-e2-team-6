"use client";

import { MaterialIcon } from "../icons/MaterialIcon";
import { categoryMeta, placeCopy } from "@/lib/places/placeCopy";
import { CATEGORIES, type PlaceCategory } from "@/lib/places/types";
import type { Language } from "../types";

type Props = {
  language: Language;
  selected: Set<PlaceCategory>;
  counts: Record<string, number>;
  onToggle: (c: PlaceCategory | null) => void;
};

/** Horizontal scrollable category filters. Empty selection = show all. */
export function FilterChips({ language, selected, counts, onToggle }: Props) {
  const t = placeCopy[language];

  return (
    <div className="absolute inset-x-0 top-28 z-20 flex gap-2 overflow-x-auto px-3 py-1 [scrollbar-width:none] sm:left-3 sm:right-auto sm:max-w-[60%]">
      <Chip active={selected.size === 0} onClick={() => onToggle(null)} icon="explore" label={t.all} />
      {CATEGORIES.map((c) => (
        <Chip
          key={c}
          active={selected.has(c)}
          onClick={() => onToggle(c)}
          icon={categoryMeta[c].icon}
          label={`${categoryMeta[c][language]}${counts[c] ? ` ${counts[c]}` : ""}`}
        />
      ))}
    </div>
  );
}

function Chip({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: string; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      onPointerDown={(e) => e.stopPropagation()}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-black uppercase tracking-tight transition ${
        active
          ? "border-[#34e0a1]/60 bg-[#34e0a1]/25 text-white"
          : "glass-dark border-white/15 text-white/75 hover:text-white"
      }`}
    >
      <MaterialIcon name={icon} className="size-3.5" />
      {label}
    </button>
  );
}
