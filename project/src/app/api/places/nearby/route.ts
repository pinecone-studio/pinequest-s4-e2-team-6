import { NextResponse } from "next/server";
import { RADIUS_M, type PlaceCategory } from "@/lib/places/types";

export const runtime = "nodejs";

const ENDPOINT = "https://places.googleapis.com/v1/places:searchNearby";
const GOOGLE_RADIUS_M = Math.min(RADIUS_M, 50_000);
const TYPE_CATEGORY: Record<string, PlaceCategory> = {
  restaurant: "RESTAURANT",
  supermarket: "GROCERY",
  convenience_store: "GROCERY",
  museum: "PALACE",
  tourist_attraction: "PALACE",
};

type GPlace = {
  displayName?: { text?: string };
  location?: { latitude?: number; longitude?: number };
  types?: string[];
  rating?: number;
};

/**
 * POST /api/places/nearby — city POIs from Google Places API (New).
 *
 * The key stays server-side. With no key it returns an empty list, so the app
 * runs entirely on the bundled + Supabase curated data.
 */
export async function POST(req: Request) {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return NextResponse.json({ places: [] });

  let lat: number, lng: number;
  try {
    ({ lat, lng } = (await req.json()) as { lat: number; lng: number });
  } catch {
    return NextResponse.json({ places: [] }, { status: 400 });
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "places.displayName,places.location,places.types,places.rating",
      },
      body: JSON.stringify({
        includedTypes: Object.keys(TYPE_CATEGORY),
        maxResultCount: 20,
        locationRestriction: { circle: { center: { latitude: lat, longitude: lng }, radius: GOOGLE_RADIUS_M } },
      }),
    });
    if (!res.ok) return NextResponse.json({ places: [] });
    const data = (await res.json()) as { places?: GPlace[] };
    return NextResponse.json({ places: (data.places ?? []).map(toPlace).filter(Boolean) });
  } catch {
    return NextResponse.json({ places: [] });
  }
}

function toPlace(g: GPlace) {
  const name = g.displayName?.text;
  const lat = g.location?.latitude;
  const lng = g.location?.longitude;
  if (!name || lat == null || lng == null) return null;
  const category = g.types?.map((t) => TYPE_CATEGORY[t]).find(Boolean) ?? "PALACE";
  return { id: `g-${name}-${lat.toFixed(4)}`, nameMn: name, nameEn: name, category, lat, lng, source: "GOOGLE", rating: g.rating };
}
