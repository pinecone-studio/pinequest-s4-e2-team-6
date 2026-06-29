"use client";

import type { ReactNode } from "react";
import { MaterialIcon } from "../icons/MaterialIcon";
import { catMeta, lbl } from "./gemsCopy";
import { formatDistance } from "@/lib/places/geo";
import { gemImage } from "@/lib/gems/images";
import type { Gem } from "@/lib/gems/types";
import type { Language } from "../types";

type Props = { gem: Gem; distanceKm: number | null; language: Language; onOpen: (g: Gem) => void };

/** Cinematic gem card: big image, deep gradient, hover zoom, live distance. */
export function GemCard({ gem, distanceKm, language, onOpen }: Props) {
  const meta = catMeta[gem.category];
  const img = gemImage(gem.id);
  const name = language === "mn" ? gem.nameMn : gem.nameEn;

  return (
    <button
      type="button"
      onClick={() => onOpen(gem)}
      className="group relative h-56 w-full overflow-hidden rounded-[26px] border border-white/15 text-left shadow-xl"
    >
      {img ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={img} alt={name} className="absolute inset-0 size-full object-cover transition duration-700 ease-out group-hover:scale-110" />
      ) : (
        <div
          className="absolute inset-0 grid place-items-center transition duration-700 ease-out group-hover:scale-110"
          style={{ background: `linear-gradient(135deg, ${meta.color}, #08111c)` }}
        >
          <MaterialIcon name={meta.icon} className="size-16 text-white/15" />
        </div>
      )}
      <div className="absolute inset-0 bg-linear-to-t from-[#08111c]/92 via-[#08111c]/25 to-transparent" />

      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-tight text-white" style={{ backgroundColor: meta.color }}>
        <MaterialIcon name={meta.icon} className="size-3.5" />
        {lbl.cat(gem.category, language)}
      </span>

      <span className="glass-dark absolute right-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-black text-white">
        <MaterialIcon name="navigation" className="size-3" />
        {distanceKm != null ? formatDistance(distanceKm * 1000) : "···"}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <h3 className="text-lg font-black leading-tight tracking-tight drop-shadow">{name}</h3>
        <div className="mt-1.5 flex flex-wrap gap-1.5 text-[10px] font-bold uppercase tracking-tight text-white/80">
          <Chip>{lbl.season(gem.season, language)}</Chip>
          <Chip>{lbl.reach(gem.reach, language)}</Chip>
          <Chip>{lbl.diff(gem.difficulty, language)}</Chip>
        </div>
      </div>
    </button>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return <span className="rounded-full bg-white/15 px-2 py-0.5 backdrop-blur">{children}</span>;
}
