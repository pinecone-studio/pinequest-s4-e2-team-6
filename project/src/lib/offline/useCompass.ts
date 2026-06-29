"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type OrientationEvent = DeviceOrientationEvent & { webkitCompassHeading?: number };
type IOSOrientation = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

/**
 * Device compass heading (0–360°, 0 = north). Pure sensor data — works fully
 * offline. iOS needs a permission request triggered by a user gesture, which
 * `start()` handles.
 */
export function useCompass() {
  const [heading, setHeading] = useState<number | null>(null);
  const bound = useRef(false);

  const onOrient = useCallback((e: OrientationEvent) => {
    const h =
      typeof e.webkitCompassHeading === "number"
        ? e.webkitCompassHeading
        : e.alpha != null
          ? 360 - e.alpha
          : null;
    if (h != null) setHeading((h + 360) % 360);
  }, []);

  const start = useCallback(async () => {
    if (typeof window === "undefined" || bound.current) return;
    const DOE = window.DeviceOrientationEvent as IOSOrientation | undefined;
    if (!DOE) return;

    if (typeof DOE.requestPermission === "function") {
      try {
        if ((await DOE.requestPermission()) !== "granted") return;
      } catch {
        return;
      }
    }
    window.addEventListener("deviceorientation", onOrient as EventListener, true);
    bound.current = true;
  }, [onOrient]);

  useEffect(() => {
    return () => {
      if (bound.current) {
        window.removeEventListener("deviceorientation", onOrient as EventListener, true);
      }
    };
  }, [onOrient]);

  return { heading, start };
}
