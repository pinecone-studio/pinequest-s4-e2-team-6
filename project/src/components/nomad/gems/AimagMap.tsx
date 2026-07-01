"use client";

import { aimags, projectToMap } from "@/lib/gems/aimags";
import type { Language } from "../types";

const W = 1000;
const H = 440;
const PERIMETER = ["bayan-olgii", "uvs", "khuvsgul", "selenge", "dornod", "sukhbaatar", "umnugovi", "bayankhongor", "govi-altai"];

type Props = { counts: Record<string, number>; selected: string | null; language: Language; onSelect: (id: string) => void };

export function AimagMap({ counts, selected, language, onSelect }: Props) {
  const pt = (id: string) => {
    const a = aimags.find((x) => x.id === id)!;
    return projectToMap(a.lat, a.lng, W, H);
  };
  const land = PERIMETER.map((id, i) => `${i === 0 ? "M" : "L"}${pt(id).x.toFixed(0)} ${pt(id).y.toFixed(0)}`).join(" ") + " Z";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full select-none">
      <defs>
        <radialGradient id="land" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="#6bcbff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#00658b" stopOpacity="0.05" />
        </radialGradient>
      </defs>
      <path d={land} fill="url(#land)" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" className="text-[#00658b] dark:text-[#7dd0ff]" />

      {aimags.map((a) => {
        const { x, y } = projectToMap(a.lat, a.lng, W, H);
        const n = counts[a.id] ?? 0;
        const on = selected === a.id;
        const r = 7 + Math.min(9, n * 1.2);
        return (
          <g key={a.id} className="group cursor-pointer" onClick={() => onSelect(a.id)}>
            {on && <circle cx={x} cy={y} r={r + 7} fill="#34e0a1" opacity="0.25" className="animate-ping" />}
            <circle
              cx={x}
              cy={y}
              r={r}
              className={`transition ${on ? "fill-[#34e0a1]" : "fill-[#00658b] group-hover:fill-[#6bcbff] dark:fill-[#6bcbff]"}`}
              stroke="#fff"
              strokeOpacity="0.5"
            />
            <text x={x} y={y - r - 6} textAnchor="middle" fontSize="16" fontWeight="800"
              className={`pointer-events-none fill-current text-[#16130f] transition dark:text-white ${on ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
              {a.nameMn === a.nameEn || language === "mn" ? a.nameMn : a.nameEn} · {n}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
