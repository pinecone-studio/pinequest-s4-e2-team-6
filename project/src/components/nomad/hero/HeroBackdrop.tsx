"use client";

import { useEffect, useState } from "react";

/**
 * Full-bleed cinematic hero backdrop.
 *
 * Plays the 12s steppe clip (/hero.mp4) muted on loop, fading in from its
 * poster so there is never a black flash. Falls back to the still poster when
 * the visitor prefers reduced motion. Golden-hour + readability gradients keep
 * the headline legible while letting the footage breathe.
 */
export function HeroBackdrop() {
  const [motion, setMotion] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // One-time client read of the motion preference (window isn't available
    // during SSR, so it can't be a lazy initial state).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMotion(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#08111c]">
      {/* Poster underlay — visible until the video can play, and as the
          reduced-motion fallback. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
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

      {/* golden-hour wash */}
      <div className="absolute inset-0 bg-linear-to-tr from-[#ef7d3a]/20 via-transparent to-[#6bcbff]/15 mix-blend-soft-light" />
      {/* center scrim for headline legibility */}
      <div className="absolute inset-0 bg-[#08111c]/30" />
      {/* top + bottom gradients (header legibility + blend into the page) */}
      <div className="absolute inset-0 bg-linear-to-b from-[#08111c]/55 via-transparent to-[#f4eede] dark:to-[#08111c]" />
      {/* cinematic vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_140px_40px_rgba(8,17,28,0.5)]" />
    </div>
  );
}
