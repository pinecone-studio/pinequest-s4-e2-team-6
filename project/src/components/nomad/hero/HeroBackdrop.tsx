"use client";

import { useEffect, useState } from "react";

export function HeroBackdrop() {
  const [motion, setMotion] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setMotion(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#08111c]">
      <img src="/hero-poster.jpg" alt="" className="absolute inset-0 size-full scale-105 object-cover" />

      {motion && (
        <video
          className={`absolute inset-0 size-full scale-105 object-cover transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
          onCanPlay={() => setReady(true)}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-linear-to-tr from-[#ef7d3a]/20 via-transparent to-[#6bcbff]/15 mix-blend-soft-light" />
      <div className="absolute inset-0 bg-[#08111c]/30" />
      <div className="absolute inset-0 bg-linear-to-b from-[#08111c]/55 via-transparent to-[#f4eede] dark:to-[#08111c]" />
      <div className="absolute inset-0 shadow-[inset_0_0_140px_40px_rgba(8,17,28,0.5)]" />
    </div>
  );
}
