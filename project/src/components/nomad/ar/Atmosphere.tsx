/**
 * Spatial depth layers over the camera feed: a perspective ground grid that
 * fades to the horizon, a soft fog gradient, and drifting dust particles. All
 * CSS — cheap, and it stops the scene feeling flat.
 */
export function Atmosphere({ roll }: { roll: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {/* perspective ground grid */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 opacity-30"
        style={{
          transform: `perspective(320px) rotateX(72deg) rotateZ(${roll * 0.4}deg)`,
          transformOrigin: "bottom",
          backgroundImage:
            "linear-gradient(rgba(107,203,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(107,203,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "linear-gradient(to top, black, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black, transparent)",
        }}
      />
      {/* horizon fog */}
      <div className="absolute inset-x-0 top-1/3 h-1/3 bg-linear-to-b from-transparent via-[#08111c]/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#08111c]/70 to-transparent" />
      {/* dust particles */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="animate-float absolute rounded-full bg-white/40"
          style={{ left: p.left, top: p.top, width: p.s, height: p.s, animationDelay: p.d, animationDuration: p.dur }}
        />
      ))}
    </div>
  );
}

const PARTICLES = [
  { left: "12%", top: "30%", s: "3px", d: "0s", dur: "7s" },
  { left: "28%", top: "55%", s: "2px", d: "-2s", dur: "9s" },
  { left: "44%", top: "22%", s: "2px", d: "-4s", dur: "8s" },
  { left: "61%", top: "48%", s: "3px", d: "-1s", dur: "10s" },
  { left: "73%", top: "33%", s: "2px", d: "-3s", dur: "7.5s" },
  { left: "85%", top: "60%", s: "3px", d: "-5s", dur: "9.5s" },
  { left: "52%", top: "68%", s: "2px", d: "-2.5s", dur: "8.5s" },
  { left: "20%", top: "72%", s: "2px", d: "-6s", dur: "11s" },
];
