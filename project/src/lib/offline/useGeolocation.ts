"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type GpsFix = {
  lat: number;
  lng: number;
  accuracy: number; // metres
  altitude: number | null;
  speed: number | null; // m/s
  heading: number | null; // degrees
};

export type GpsStatus = "idle" | "locating" | "active" | "denied" | "unsupported";

/**
 * Live GPS via `watchPosition`. GPS is satellite hardware, so this keeps
 * updating with NO internet connection — the heart of the offline screen.
 */
export function useGeolocation() {
  const [fix, setFix] = useState<GpsFix | null>(null);
  const [status, setStatus] = useState<GpsStatus>("idle");
  const watchId = useRef<number | null>(null);

  const start = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("unsupported");
      return;
    }
    if (watchId.current !== null) return;
    setStatus("locating");

    watchId.current = navigator.geolocation.watchPosition(
      (pos) => {
        const c = pos.coords;
        setFix({
          lat: c.latitude,
          lng: c.longitude,
          accuracy: c.accuracy,
          altitude: c.altitude,
          speed: c.speed,
          heading: c.heading,
        });
        setStatus("active");
      },
      (err) => setStatus(err.code === err.PERMISSION_DENIED ? "denied" : "locating"),
      { enableHighAccuracy: true, maximumAge: 1000, timeout: 20000 },
    );
  }, []);

  useEffect(() => {
    return () => {
      if (watchId.current !== null) navigator.geolocation.clearWatch(watchId.current);
    };
  }, []);

  return { fix, status, start };
}
