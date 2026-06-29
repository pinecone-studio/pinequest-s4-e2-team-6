import type { Language } from "@/components/nomad/types";

/** Structured result returned by the AI vision model for one photo. */
export type Recognition = {
  name: string;
  location: string;
  category: string;
  description: string;
  foundedOrBuilt: string | null;
  historicalPeriod: string;
  significance: string;
  history: string;
  architectureOrNature: string;
  facts: string[];
  visitorTips: string[];
  confidence: number; // 0..1
  tags: string[];
  distanceKm?: number | null;
};

/** A persisted scan row as stored in / read from Supabase. */
export type Scan = {
  id: string;
  device_id: string;
  image_url: string;
  name: string;
  location: string | null;
  category: string | null;
  description: string | null;
  confidence: number | null;
  tags: string[] | null;
  lat: number | null;
  lng: number | null;
  created_at: string;
};

/** Optional device geolocation captured at the moment of the scan. */
export type Coords = { lat: number; lng: number } | null;

/** High level state machine for the scanner UI. */
export type ScanPhase =
  | "idle"
  | "starting"
  | "live"
  | "capturing"
  | "recognizing"
  | "saving"
  | "result"
  | "error";

export type ScannerError =
  | "permission"
  | "no-camera"
  | "ai"
  | "upload"
  | "network"
  | "rate-limit"
  | "unknown";

export type { Language };
