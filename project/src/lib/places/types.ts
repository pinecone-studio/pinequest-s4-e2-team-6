export type PlaceCategory =
  | "RESTAURANT"
  | "GROCERY"
  | "CAMP"
  | "PALACE"
  | "AIMAG_CENTER"
  | "SUM_CENTER"
  | "NATURE"
  | "HIDDEN_GEM";

export type PlaceSource = "CURATED" | "SUPABASE" | "GOOGLE";

/** A place as stored / fetched, before it is positioned relative to the user. */
export type Place = {
  id: string;
  nameMn: string;
  nameEn: string;
  category: PlaceCategory;
  lat: number;
  lng: number;
  source: PlaceSource;
  rating?: number;
};

/** A place resolved against the user's live position. */
export type NearbyPlace = Place & { distance: number; bearing: number };

export const CATEGORIES: PlaceCategory[] = [
  "RESTAURANT",
  "GROCERY",
  "CAMP",
  "PALACE",
  "AIMAG_CENTER",
  "SUM_CENTER",
  "NATURE",
  "HIDDEN_GEM",
];

export const RADIUS_M = 10_000; // 10 km search radius
