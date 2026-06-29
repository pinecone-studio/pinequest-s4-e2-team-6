"use client";

type Blip = { id: string; bearing: number; radius: number };

type Props = {
  heading: number | null;
  blips: Blip[];
  label: string;
};

const C = 100;
const R = 88;

/** Animated radar/compass. Sweep, heading needle, and waypoint blips — all SVG,
 *  so it renders beautifully with zero network (works offline). */
export function GpsRadar({ heading, blips, label }: Props) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[280px]">
      <svg viewBox="0 0 200 200" className="size-full">
        <defs>
          <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6bcbff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#00658b" stopOpacity="0.04" />
          </radialGradient>
          <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#34e0a1" stopOpacity="0" />
            <stop offset="100%" stopColor="#34e0a1" stopOpacity="0.55" />
          </linearGradient>
        </defs>

        <circle cx={C} cy={C} r={R} fill="url(#radarFill)" stroke="currentColor" strokeOpacity="0.18" />
        {[0.66, 0.33].map((f) => (
          <circle key={f} cx={C} cy={C} r={R * f} fill="none" stroke="currentColor" strokeOpacity="0.12" />
        ))}
        <line x1={C - R} y1={C} x2={C + R} y2={C} stroke="currentColor" strokeOpacity="0.12" />
        <line x1={C} y1={C - R} x2={C} y2={C + R} stroke="currentColor" strokeOpacity="0.12" />

        {/* Rotating sweep beam */}
        <g className="animate-radar">
          <path d={`M${C} ${C} L${C} ${C - R} A${R} ${R} 0 0 1 ${C + R * 0.5} ${C - R * 0.87} Z`} fill="url(#beam)" />
          <line x1={C} y1={C} x2={C} y2={C - R} stroke="#34e0a1" strokeWidth="1.5" strokeOpacity="0.8" />
        </g>

        {/* Waypoint blips */}
        {blips.map((b, i) => {
          const a = (b.bearing * Math.PI) / 180;
          const x = C + R * b.radius * Math.sin(a);
          const y = C - R * b.radius * Math.cos(a);
          return (
            <g key={b.id}>
              <circle cx={x} cy={y} r="6" fill="#6bcbff" opacity="0.35" className="animate-ping" style={{ animationDelay: `${i * 0.3}s` }} />
              <circle cx={x} cy={y} r="3.2" fill="#00658b" className="dark:fill-[#7dd0ff]" />
            </g>
          );
        })}

        {/* Heading needle */}
        {heading != null && (
          <g transform={`rotate(${heading} ${C} ${C})`}>
            <path d={`M${C} ${C - 30} L${C - 7} ${C + 8} L${C + 7} ${C + 8} Z`} fill="#ff8a5b" />
          </g>
        )}
        <circle cx={C} cy={C} r="4.5" fill="#ff8a5b" stroke="#fff" strokeWidth="1.5" />

        {["N", "E", "S", "W"].map((d, i) => {
          const a = (i * 90 * Math.PI) / 180;
          return (
            <text key={d} x={C + (R + 9) * Math.sin(a)} y={C - (R + 9) * Math.cos(a) + 4} textAnchor="middle" fontSize="11" fontWeight="800" fill="currentColor" fillOpacity="0.5">
              {d}
            </text>
          );
        })}
      </svg>

      <span className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-tight text-black/45 dark:text-white/45">
        {label}
      </span>
    </div>
  );
}
