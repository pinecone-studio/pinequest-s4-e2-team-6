import type { PlanParams } from "./types";

/** Schema for turning free text into structured plan parameters. */
export const extractSchema = {
  type: "object",
  additionalProperties: false,
  required: ["budget", "durationHours", "interests", "pace"],
  properties: {
    budget: { type: "number" },
    durationHours: { type: "number" },
    interests: {
      type: "array",
      items: { type: "string", enum: ["FOOD", "CAFE", "SHOP", "MUSEUM", "LANDMARK", "PARK"] },
    },
    pace: { type: "string", enum: ["relaxed", "balanced", "packed"] },
  },
} as const;

/** Schema for the chosen route: ordered place ids + a start time. */
export const planSchema = {
  type: "object",
  additionalProperties: false,
  required: ["startTime", "stops"],
  properties: {
    startTime: { type: "string" },
    stops: { type: "array", items: { type: "string" } },
  },
} as const;

export function extractPrompt(): string {
  return [
    "Extract a one-day-plan request into JSON. Understand Mongolian and English.",
    "budget = total spend in MNT (read amounts like '50,000₮'; default 60000 if none).",
    "durationHours = free hours (default 5).",
    "interests = categories the user mentions from the enum (empty array if none).",
    "pace = relaxed | balanced | packed (default balanced).",
    "If a 'Previous' params object is given, return it adjusted by the new instruction, keeping unmentioned fields.",
  ].join(" ");
}

export function planPrompt(params: PlanParams, candidates: string, requiredIds: string[] = []): string {
  const required = requiredIds.length ? `Required stops that must be included if present in CANDIDATES: ${requiredIds.join(", ")}.` : "";
  return [
    "You are a Ulaanbaatar day-trip planner.",
    "Build ONE ordered route using ONLY the candidate places below, by their exact id.",
    "Never invent places. Include 1-2 FOOD stops near meal times. Keep within budget and time.",
    required,
    `Target: ~${params.budget}MNT total, about ${params.durationHours} hours, ${params.pace} pace.`,
    "Pick 3-7 stops in a logical visiting order; set startTime like '10:00'.",
    "Return only the chosen ids in 'stops'.",
    "CANDIDATES (id | name | category | price | duration | hours):",
    candidates,
  ].join("\n");
}
