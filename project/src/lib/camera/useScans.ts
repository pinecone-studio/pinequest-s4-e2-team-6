"use client";

import { useCallback, useEffect, useState } from "react";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { getDeviceId } from "./deviceId";
import type { Coords, Recognition, Scan } from "./types";

const PAGE = 24;

/**
 * Loads and persists the current device's scan history from Supabase.
 *
 * Returns the latest scans plus a `save` helper used by the scanner once a
 * photo has been recognised and its image uploaded.
 */
export function useScans() {
  const [scans, setScans] = useState<Scan[]>([]);
  // Start "not loading" when there's no backend so we never setState in the
  // effect synchronously (keeps the React compiler happy and avoids a flash).
  const [loading, setLoading] = useState(() => isSupabaseConfigured());

  const refresh = useCallback(async () => {
    if (!isSupabaseConfigured()) return;
    const supabase = getSupabase();
    const { data } = await supabase
      .from("scans")
      .select("*")
      .eq("device_id", getDeviceId())
      .order("created_at", { ascending: false })
      .limit(PAGE);
    setScans((data as Scan[] | null) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Mount-time data fetch. `refresh` only calls setState after awaiting the
    // network, so the cascading-render concern the rule guards against does not
    // apply here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, [refresh]);

  const save = useCallback(
    async (rec: Recognition, imageUrl: string, coords: Coords) => {
      const supabase = getSupabase();
      const row = {
        device_id: getDeviceId(),
        image_url: imageUrl,
        name: rec.name,
        location: rec.location,
        category: rec.category,
        description: rec.description,
        confidence: rec.confidence,
        tags: rec.tags,
        lat: coords?.lat ?? null,
        lng: coords?.lng ?? null,
      };
      const { data, error } = await supabase
        .from("scans")
        .insert(row)
        .select("*")
        .single();
      if (error) throw new Error(`save-failed: ${error.message}`);

      const saved = data as Scan;
      setScans((prev) => [saved, ...prev]);
      return saved;
    },
    [],
  );

  return { scans, loading, refresh, save };
}
