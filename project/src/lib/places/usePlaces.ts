"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { readCache, writeCache } from "./cache";
import { curatedPlaces } from "./curated";
import { getBearing, getDistance } from "./geo";
import { fetchGoogle, fetchSupabase } from "./sources";
import { RADIUS_M, type NearbyPlace, type Place } from "./types";

export type Coords = { lat: number; lng: number } | null;

/**
 * Merges bundled curated places, the Supabase PostGIS RPC and Google results,
 * resolves each against the user's live position (distance + bearing), and
 * keeps only those within 300 km — sorted nearest first. Works offline / without
 * Google on the bundled curated data alone.
 */
export function usePlaces(coords: Coords) {
  const [raw, setRaw] = useState<Place[]>(() => readCache() ?? curatedPlaces);
  const [loading, setLoading] = useState(false);
  const lastFetch = useRef<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!coords) return;
    const moved = lastFetch.current
      ? getDistance(lastFetch.current.lat, lastFetch.current.lng, coords.lat, coords.lng)
      : Infinity;
    if (moved < 200) return; // don't re-query the network for tiny moves
    lastFetch.current = coords;
    let alive = true;
    setLoading(true);
    Promise.all([fetchSupabase(coords.lat, coords.lng), fetchGoogle(coords.lat, coords.lng)]).then(
      ([sb, gg]) => {
        if (!alive) return;
        const merged = dedupe([...curatedPlaces, ...sb, ...gg]);
        setRaw(merged);
        writeCache(merged);
        setLoading(false);
      },
    );
    return () => {
      alive = false;
    };
  }, [coords]);

  const nearby: NearbyPlace[] = useMemo(() => {
    if (!coords) return [];
    return raw
      .map((p) => ({
        ...p,
        distance: getDistance(coords.lat, coords.lng, p.lat, p.lng),
        bearing: getBearing(coords.lat, coords.lng, p.lat, p.lng),
      }))
      .filter((p) => p.distance <= RADIUS_M)
      .sort((a, b) => a.distance - b.distance);
  }, [raw, coords]);

  return { nearby, loading };
}

function dedupe(list: Place[]): Place[] {
  const seen = new Set<string>();
  return list.filter((p) => {
    const k = `${p.nameEn.toLowerCase()}-${p.lat.toFixed(3)}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}
