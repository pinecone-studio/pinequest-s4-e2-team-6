"use client";

import type { ReactNode } from "react";
import { MaterialIcon } from "../icons/MaterialIcon";
import { catMeta, gemsCopy, lbl } from "./gemsCopy";
import { RouteMap } from "./RouteMap";
import { gemImage } from "@/lib/gems/images";
import { formatDistance } from "@/lib/places/geo";
import { useRoute } from "@/lib/gems/useRoute";
import { useArStory } from "@/lib/ar/useArStory";
import type { Coords, Gem } from "@/lib/gems/types";
import type { Language, ScreenId } from "../types";

type Props = { gem: Gem; coords: Coords; language: Language; onClose: () => void; onNavigate: (s: ScreenId) => void };

const dur = (m: number, mn: boolean) => `${Math.floor(m / 60)}${mn ? "ц" : "h"} ${m % 60}${mn ? "м" : "m"}`;

/** Shared-element-style detail: hero image, staggered facts, a live Leaflet
 *  route with a travelling dot, and actions wired to the other features. */
export function GemDetail({ gem, coords, language, onClose, onNavigate }: Props) {
  const t = gemsCopy[language];
  const meta = catMeta[gem.category];
  const img = gemImage(gem.id);
  const mn = language === "mn";
  const name = mn ? gem.nameMn : gem.nameEn;
  const { straightKm, road, line, loading } = useRoute(coords, gem);
  const story = useArStory(language);
  const guided = story.activeId === gem.id;

  const ask = () =>
    story.run(gem.id, mn
      ? `Аялагчид зориулж Монгол дахь "${name}" газрын тухай 3-4 өгүүлбэрээр сонирхолтой танилцуул.`
      : `Tell a traveler about "${name}" in Mongolia in 3-4 engaging sentences.`);

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-[#08111c]/80 backdrop-blur-sm" onClick={onClose}>
      <div className="glass-panel animate-fade-up mx-auto my-6 w-[min(94%,40rem)] overflow-hidden rounded-[28px]" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-52 overflow-hidden">
          {img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={img} alt={name} className="animate-kenburns size-full object-cover" />
          ) : (
            <div className="grid size-full place-items-center" style={{ background: `linear-gradient(135deg, ${meta.color}, #08111c)` }}>
              <MaterialIcon name={meta.icon} className="size-20 text-white/15" />
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-[#08111c]/92 to-transparent" />
          <button type="button" onClick={onClose} className="glass-dark absolute right-3 top-3 grid size-9 place-items-center rounded-full text-white">
            <MaterialIcon name="close" className="size-[18px]" />
          </button>
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-tight" style={{ backgroundColor: meta.color }}>
              <MaterialIcon name={meta.icon} className="size-3.5" />
              {lbl.cat(gem.category, language)}
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight drop-shadow">{name}</h2>
          </div>
        </div>

        <div className="space-y-4 p-5">
          <div className="animate-fade-up flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-tight">
            <Fact icon="schedule">{lbl.season(gem.season, language)}</Fact>
            <Fact icon="directions_walk">{lbl.reach(gem.reach, language)}</Fact>
            <Fact icon="hiking">{lbl.diff(gem.difficulty, language)}</Fact>
          </div>

          <p className="animate-fade-up delay-1 text-sm font-bold text-black/70 dark:text-white/70">
            {!coords ? t.locating : (
              <>
                {t.straight} {formatDistance((straightKm ?? 0) * 1000)}
                {road ? ` · ${t.road} ${road.roadKm.toFixed(0)}км · ~${dur(road.durationMin, mn)}` : loading ? ` · ${t.routing}` : ""}
              </>
            )}
          </p>

          <div className="animate-fade-up delay-2">
            <RouteMap from={coords} to={gem} line={line} />
          </div>

          <div className="animate-fade-up delay-3 grid grid-cols-2 gap-2">
            <Action icon="event_note" label={t.addPlan} onClick={() => onNavigate("planner")} />
            <Action icon="view_in_ar" label={t.viewAr} onClick={() => onNavigate("ar")} />
            <Action icon="cloud_download" label={t.offline} onClick={() => onNavigate("offline")} />
            <Action icon="auto_awesome" label={t.guide} onClick={ask} highlight />
          </div>

          {guided && (
            <p className="whitespace-pre-wrap rounded-2xl bg-black/5 p-3 text-sm leading-6 dark:bg-white/5">
              {story.text || (story.loading ? "…" : "")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Fact({ icon, children }: { icon: string; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1.5 dark:bg-white/8">
      <MaterialIcon name={icon} className="size-3.5 text-[#00658b] dark:text-[#7dd0ff]" />
      {children}
    </span>
  );
}

function Action({ icon, label, onClick, highlight }: { icon: string; label: string; onClick: () => void; highlight?: boolean }) {
  return (
    <button type="button" onClick={onClick}
      className={`inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2.5 text-xs font-black uppercase tracking-tight transition hover:scale-[1.03] ${
        highlight ? "bg-linear-to-r from-[#00658b] to-[#0a86b8] text-white dark:from-[#6bcbff] dark:to-[#e0a32e] dark:text-[#001e2d]" : "glass-panel"
      }`}>
      <MaterialIcon name={icon} className="size-4" />
      {label}
    </button>
  );
}
