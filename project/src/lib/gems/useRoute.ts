"use client";

import { useEffect, useMemo, useState } from "react";
import { getDistance } from "@/lib/places/geo";
import type { Coords } from "./types";

export type LatLngLine = [number, number][];
type Road = { roadKm: number; durationMin: number; line: LatLngLine };

/**
 * Live distances from the user to a gem. Straight-line is Haversine (instant,
 * recomputes as GPS moves); the road distance + route geometry come from the
 * keyless public OSRM server, with a straight-line fallback. The returned
 * `line` is memoised so map consumers don't re-init every render.
 */
export function useRoute(from: Coords, to: { lat: number; lng: number }) {
  const fromLat = from?.lat;
  const fromLng = from?.lng;
  const straightKm = useMemo(
    () => (fromLat != null && fromLng != null ? getDistance(fromLat, fromLng, to.lat, to.lng) / 1000 : null),
    [fromLat, fromLng, to.lat, to.lng],
  );
  const [road, setRoad] = useState<Road | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRoad(null);
    if (fromLat == null || fromLng == null) return;
    let alive = true;
    setLoading(true);
    const url = `https://router.project-osrm.org/route/v1/driving/${fromLng},${fromLat};${to.lng},${to.lat}?overview=full&geometries=geojson`;
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error())))
      .then((d) => {
        const r0 = d?.routes?.[0];
        if (alive && r0) {
          const line: LatLngLine = r0.geometry.coordinates.map((c: number[]) => [c[1], c[0]]);
          setRoad({ roadKm: r0.distance / 1000, durationMin: Math.round(r0.duration / 60), line });
        }
      })
      .catch(() => undefined)
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [fromLat, fromLng, to.lat, to.lng]);

  const line = useMemo<LatLngLine>(
    () => road?.line ?? (fromLat != null && fromLng != null ? [[fromLat, fromLng], [to.lat, to.lng]] : [[to.lat, to.lng]]),
    [road, fromLat, fromLng, to.lat, to.lng],
  );

  return { straightKm, road, line, loading };
}
