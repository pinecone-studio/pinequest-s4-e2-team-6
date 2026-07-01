import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { RADIUS_M, type Place, type PlaceCategory } from "./types";

type Row = {
  id: string;
  name_mn: string;
  name_en: string;
  category: PlaceCategory;
  lat: number;
  lng: number;
};

/** Curated places near the user from the Supabase PostGIS RPC (if configured). */
export async function fetchSupabase(lat: number, lng: number): Promise<Place[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const { data, error } = await getSupabase().rpc("nearby_places", {
      user_lat: lat,
      user_lng: lng,
      radius_m: RADIUS_M,
    });
    if (error || !data) return [];
    return (data as Row[]).map((r) => ({
      id: `sb-${r.id}`,
      nameMn: r.name_mn,
      nameEn: r.name_en,
      category: r.category,
      lat: r.lat,
      lng: r.lng,
      source: "SUPABASE" as const,
    }));
  } catch {
    return [];
  }
}

/** City POIs (restaurants, grocery, museums) via our Google proxy route. */
export async function fetchGoogle(lat: number, lng: number): Promise<Place[]> {
  try {
    const res = await fetch("/api/places/nearby", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ lat, lng }),
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { places?: Place[] };
    return Array.isArray(data.places) ? data.places : [];
  } catch {
    return [];
  }
}
