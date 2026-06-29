export type GemCategory =
  | "NATURE"
  | "MOUNTAIN"
  | "LAKE"
  | "DESERT"
  | "HISTORY"
  | "MONASTERY"
  | "WILDLIFE"
  | "HOTSPRING";

export type Reach = "car" | "horse" | "hike" | "flight";
export type Season = "summer" | "autumn" | "winter" | "spring" | "all";
export type Difficulty = "easy" | "moderate" | "hard";

export type Gem = {
  id: string;
  nameMn: string;
  nameEn: string;
  aimag: string; // aimag id
  category: GemCategory;
  lat: number;
  lng: number;
  reach: Reach;
  season: Season;
  difficulty: Difficulty;
};

export type Aimag = {
  id: string;
  nameMn: string;
  nameEn: string;
  lat: number; // centroid, for the interactive map
  lng: number;
};

export type Coords = { lat: number; lng: number } | null;
