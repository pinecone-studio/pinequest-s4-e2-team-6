import { RADIUS_M, type NearbyPlace } from "@/lib/places/types";

type Props = { heading: number; places: NearbyPlace[]; lockedId: string | null };

const C = 50;
const R = 42;

/** Heading-up corner radar: straight up is where you're facing. */
export function ArRadar({ heading, places, lockedId }: Props) {
  const nAng = ((0 - heading) * Math.PI) / 180; // where north sits on the rim

  return (
    <div className="glass-dark absolute right-3 top-28 z-20 size-24 rounded-full p-1 sm:size-28">
      <svg viewBox="0 0 100 100" className="size-full text-white">
        <circle cx={C} cy={C} r={R} fill="rgba(52,224,161,0.06)" stroke="currentColor" strokeOpacity="0.2" />
        <circle cx={C} cy={C} r={R * 0.5} fill="none" stroke="currentColor" strokeOpacity="0.12" />
        <path d={`M${C} ${C} L${C - 16} ${C - R} A${R} ${R} 0 0 1 ${C + 16} ${C - R} Z`} fill="rgba(107,203,255,0.18)" />

        {places.slice(0, 30).map((p) => {
          const ang = ((p.bearing - heading) * Math.PI) / 180;
          const r = Math.min(1, Math.max(0.18, Math.sqrt(p.distance / RADIUS_M)));
          const x = C + R * r * Math.sin(ang);
          const y = C - R * r * Math.cos(ang);
          const on = p.id === lockedId;
          return <circle key={p.id} cx={x} cy={y} r={on ? 4 : 2.4} fill={on ? "#34e0a1" : "#6bcbff"} />;
        })}

        <text x={C + (R + 5) * Math.sin(nAng)} y={C - (R + 5) * Math.cos(nAng) + 3} textAnchor="middle" fontSize="10" fontWeight="800" fill="#ff8a5b">
          N
        </text>
        <circle cx={C} cy={C} r="3" fill="#fff" />
      </svg>
    </div>
  );
}
