"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type ArView = { heading: number; pitch: number; roll: number };
export type ArMode = "idle" | "sensor" | "pointer";

type IOSOrientation = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};
type OrientEvent = DeviceOrientationEvent & { webkitCompassHeading?: number };

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
function smoothAngle(cur: number, target: number, t: number) {
  const diff = ((target - cur + 540) % 360) - 180; // shortest signed delta
  return (cur + diff * t + 360) % 360;
}

/**
 * Look direction for the AR scene. Uses the device compass + tilt when
 * available (true direction lock); on desktop or when sensors are blocked it
 * falls back to drag-to-look so everyone gets the experience. Values are
 * smoothed each animation frame for fluid, non-jittery motion.
 */
export function useArView() {
  const [view, setView] = useState<ArView>({ heading: 0, pitch: 0, roll: 0 });
  const [mode, setMode] = useState<ArMode>("idle");
  const [active, setActive] = useState(false);
  const target = useRef<ArView>({ heading: 0, pitch: 0, roll: 0 });
  const sensor = useRef(false);
  const drag = useRef<{ x: number; y: number } | null>(null);

  const onOrient = useCallback((e: OrientEvent) => {
    const h = e.webkitCompassHeading ?? (e.alpha != null ? 360 - e.alpha : null);
    if (h == null) return;
    sensor.current = true;
    setMode("sensor");
    target.current.heading = h;
    if (e.beta != null) target.current.pitch = clamp(e.beta - 90, -35, 35);
    if (e.gamma != null) target.current.roll = clamp(e.gamma, -22, 22);
  }, []);

  // Smoothing loop driven by rAF — setState inside the frame callback is an
  // external-system update, which is the intended use of an effect.
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let last = 0;
    const frame = (ts: number) => {
      raf = requestAnimationFrame(frame);
      if (ts - last < 33) return; // ~30fps commit
      last = ts;
      setView((v) => ({
        heading: smoothAngle(v.heading, target.current.heading, 0.22),
        pitch: lerp(v.pitch, target.current.pitch, 0.22),
        roll: lerp(v.roll, target.current.roll, 0.22),
      }));
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  useEffect(() => {
    return () => window.removeEventListener("deviceorientation", onOrient as EventListener, true);
  }, [onOrient]);

  const start = useCallback(async () => {
    setActive(true);
    setMode("pointer"); // until the sensor proves itself
    const DOE = (typeof window !== "undefined" ? window.DeviceOrientationEvent : undefined) as
      | IOSOrientation
      | undefined;
    if (!DOE) return;
    if (typeof DOE.requestPermission === "function") {
      try {
        if ((await DOE.requestPermission()) !== "granted") return;
      } catch {
        return;
      }
    }
    window.addEventListener("deviceorientation", onOrient as EventListener, true);
  }, [onOrient]);

  const bind = {
    onPointerDown: (e: React.PointerEvent) => {
      if (sensor.current) return;
      drag.current = { x: e.clientX, y: e.clientY };
    },
    onPointerMove: (e: React.PointerEvent) => {
      if (!drag.current || sensor.current) return;
      const dx = e.clientX - drag.current.x;
      const dy = e.clientY - drag.current.y;
      drag.current = { x: e.clientX, y: e.clientY };
      target.current.heading = (target.current.heading + dx * 0.26 + 360) % 360;
      target.current.pitch = clamp(target.current.pitch - dy * 0.16, -35, 35);
    },
    onPointerUp: () => {
      drag.current = null;
    },
  };

  return { ...view, mode, start, bind };
}
