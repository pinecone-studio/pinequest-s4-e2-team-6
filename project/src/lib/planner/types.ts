export type PlannerCategory =
  | "FOOD"
  | "CAFE"
  | "SHOP"
  | "MUSEUM"
  | "LANDMARK"
  | "HOTEL"
  | "PARK"
  | "OTHER";

export const PACES = ["relaxed", "balanced", "packed"] as const;
export type Pace = (typeof PACES)[number];

export type PlannerPlace = {
  id: string;
  nameMn: string;
  nameEn: string;
  category: PlannerCategory;
  lat: number;
  lng: number;
  price: number; // average spend, MNT
  durationMin: number; // typical visit length
  openHours: string;
};

/** What the AI extracts from the user's free-text request. */
export type PlanParams = {
  budget: number; // MNT
  durationHours: number;
  interests: PlannerCategory[];
  pace: Pace;
};

export type Stop = PlannerPlace & { arrive: string; walkMin: number };

export type Itinerary = {
  startTime: string;
  stops: Stop[];
  totalCost: number;
  totalMin: number;
};

export type SavedPlan = {
  id: string;
  title: string;
  date: string;
  createdAt: string;
  params: PlanParams;
  itinerary: Itinerary;
};

export const INTEREST_CATEGORIES: PlannerCategory[] = [
  "FOOD",
  "CAFE",
  "SHOP",
  "MUSEUM",
  "LANDMARK",
  "PARK",
];
