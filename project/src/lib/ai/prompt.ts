import type { Language } from "@/components/nomad/types";

/** JSON schema the model must fill — guarantees a parseable, typed result. */
export const recognitionSchema = {
  type: "object",
  additionalProperties: false,
  required: ["name", "location", "category", "description", "confidence", "tags"],
  properties: {
    name: { type: "string", description: "Name of the landmark/place/subject" },
    location: { type: "string", description: "Region or area, e.g. 'Terelj, Mongolia'" },
    category: {
      type: "string",
      enum: ["landmark", "nature", "temple", "wildlife", "food", "object", "unknown"],
    },
    description: { type: "string", description: "2-3 sentence travel description" },
    confidence: { type: "number", minimum: 0, maximum: 1 },
    tags: { type: "array", items: { type: "string" }, maxItems: 6 },
    distanceKm: { type: ["number", "null"] },
  },
} as const;

const RULES = [
  "You are the vision guide for AI Nomad, a Mongolia travel app.",
  "Identify the main subject of the photo: a landmark, natural formation, temple, wildlife, traditional food, or notable object.",
  "Prefer Mongolian context (e.g. Terelj, Gobi, ovoo, ger, khuushuur) when plausible.",
  "If you are unsure, set category to 'unknown', give your best guess in name, and lower the confidence.",
  "Never invent precise facts; keep the description grounded and useful for a traveler.",
];

export function buildPrompt(language: Language, hasCoords: boolean): string {
  const lang =
    language === "mn"
      ? "Respond with all text fields written in Mongolian (Cyrillic)."
      : "Respond with all text fields written in English.";
  const geo = hasCoords
    ? "Approximate GPS coordinates are provided; use them to refine the region."
    : "";
  return [...RULES, lang, geo].filter(Boolean).join(" ");
}
