import { angularDiff, onScreen, projectX } from "@/lib/ar/projection";
import type { NearbyPlace } from "@/lib/places/types";
import type { Language } from "../types";

const TICKS = [
  { deg: 0, label: { mn: "Х", en: "N", zh: "北", ru: "С", es: "N" } },
  { deg: 45, label: { mn: "ЗХ", en: "NE", zh: "东北", ru: "СВ", es: "NE" } },
  { deg: 90, label: { mn: "З", en: "E", zh: "东", ru: "В", es: "E" } },
  { deg: 135, label: { mn: "ЗУ", en: "SE", zh: "东南", ru: "ЮВ", es: "SE" } },
  { deg: 180, label: { mn: "У", en: "S", zh: "南", ru: "Ю", es: "S" } },
  { deg: 225, label: { mn: "БУ", en: "SW", zh: "西南", ru: "ЮЗ", es: "SO" } },
  { deg: 270, label: { mn: "Б", en: "W", zh: "西", ru: "З", es: "O" } },
  { deg: 315, label: { mn: "БХ", en: "NW", zh: "西北", ru: "СЗ", es: "NO" } },
];

type Props = { heading: number; places: NearbyPlace[]; language: Language };

/** Top heading band: cardinal ticks + nearby-place markers slide as you turn. */
export function CompassStrip({ heading, places, language }: Props) {
  return (
    <div className="glass-dark absolute inset-x-0 top-16 z-20 h-10 overflow-hidden">
      <div className="relative mx-auto h-full max-w-3xl">
        {TICKS.map((t) => {
          const d = angularDiff(t.deg, heading);
          if (!onScreen(d)) return null;
          return (
            <span
              key={t.deg}
              className={`absolute top-1/2 -translate-y-1/2 text-[11px] font-black ${
                t.deg % 90 === 0 ? "text-white" : "text-white/55"
              }`}
              style={{ left: `${projectX(d)}%`, transform: "translateX(-50%)" }}
            >
              {t.label[language]}
            </span>
          );
        })}

        {places.slice(0, 24).map((p) => {
          const d = angularDiff(p.bearing, heading);
          if (!onScreen(d)) return null;
          return (
            <span
              key={p.id}
              className="absolute bottom-1 size-1.5 rounded-full bg-[#34e0a1] shadow-[0_0_8px_rgba(52,224,161,0.9)]"
              style={{ left: `${projectX(d)}%`, transform: "translateX(-50%)" }}
            />
          );
        })}

        <div className="absolute left-1/2 top-1 -translate-x-1/2 rounded-full bg-white/15 px-2 text-[10px] font-black tabular-nums text-white">
          {Math.round(heading)}°
        </div>
      </div>
    </div>
  );
}
