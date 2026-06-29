import type { Language } from "@/components/nomad/types";

/** JSON schema the model must fill — guarantees a parseable, typed result. */
export const recognitionSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "name",
    "location",
    "category",
    "description",
    "foundedOrBuilt",
    "historicalPeriod",
    "significance",
    "history",
    "architectureOrNature",
    "facts",
    "visitorTips",
    "confidence",
    "tags",
    "distanceKm",
  ],
  properties: {
    name: { type: "string", description: "Name of the landmark/place/subject" },
    location: { type: "string", description: "City, district, region, or area" },
    category: {
      type: "string",
      enum: [
        "landmark",
        "monument",
        "historic_site",
        "building",
        "temple",
        "museum",
        "city",
        "nature",
        "wildlife",
        "food",
        "object",
        "unknown",
      ],
    },
    description: { type: "string", description: "Short overview of what the image likely shows" },
    foundedOrBuilt: {
      type: ["string", "null"],
      description: "Year/date built, founded, opened, created, or unveiled only for human-made buildings, museums, monuments, temples, statues, and historic sites. Use null for natural places, countryside, rocks, mountains, landscapes, wildlife, food, generic objects, cities with no specific structure, and unknown dates.",
    },
    historicalPeriod: {
      type: "string",
      description: "Historical era, dynasty, century, or modern period if known",
    },
    significance: {
      type: "string",
      description: "Why this place or object matters culturally, historically, politically, religiously, or naturally",
    },
    history: {
      type: "string",
      description: "Grounded historical background in 3-5 sentences",
    },
    architectureOrNature: {
      type: "string",
      description: "Visible architectural, artistic, urban, landscape, or natural features",
    },
    facts: {
      type: "array",
      items: { type: "string" },
      maxItems: 5,
      description: "Notable facts, dates, meanings, or context",
    },
    visitorTips: {
      type: "array",
      items: { type: "string" },
      maxItems: 4,
      description: "Useful tips for a traveler visiting or photographing the place",
    },
    confidence: { type: "number", minimum: 0, maximum: 1 },
    tags: { type: "array", items: { type: "string" }, maxItems: 6 },
    distanceKm: { type: ["number", "null"] },
  },
} as const;

const RULES = [
  "You are the vision guide for AI Nomad, a Mongolia travel app.",
  "Identify the main subject of the photo: a place, city view, building, monument, historic site, temple, museum, natural formation, wildlife, traditional food, or notable object.",
  "If the photo contains another photo, phone screen, monitor, poster, book, map, or sign, identify the landmark or place shown inside that inner image/text; ignore the surrounding room, device, hand, desk, or current indoor setting.",
  "Use visible clues first. Use coordinates only as weak supporting context when the image appears to be a live outdoor scene at the same location.",
  "Do not let scanner-device coordinates override what is visibly shown in a screen/photo/poster.",
  "Do not guess a famous Mongolian place unless the visual evidence strongly supports it. If uncertain, say the identity is uncertain and lower confidence.",
  "For Mongolia rock formations, pay attention to shape-based names. A large turtle-shaped granite rock in a green valley is likely Melkhii Khad / Turtle Rock in Gorkhi-Terelj National Park, not Khustai National Park.",
  "Only fill foundedOrBuilt for human-made subjects: building, museum, monument, statue, temple, or clearly named historic site. For natural places such as rocks, mountains, countryside, valleys, rivers, parks, and landscapes, set foundedOrBuilt to null.",
  "For buildings and museums, foundedOrBuilt should be the opening, construction, establishment, or inauguration year only when you are confident. If the year is uncertain, set foundedOrBuilt to null instead of guessing.",
  "Give rich historical and cultural context: origin, year or century if reliably known, who built or founded it when known, why it matters, and what symbols or design choices mean.",
  "Prefer Mongolian context only when the image clearly supports it (e.g. Ulaanbaatar, Sukhbaatar Square, Gandan, Terelj, Gobi, ovoo, ger, khuushuur).",
  "If the exact identity is uncertain, say so in the text fields, use approximate language, set category to 'unknown' if needed, and lower the confidence.",
  "Never invent exact dates, builders, or events. If a date is not reliably known from the image/context, use null for foundedOrBuilt and explain uncertainty in normal text only when useful.",
  "Keep the answer useful for a traveler who just pointed a phone camera at the scene.",
];

export function buildPrompt(language: Language, hasCoords: boolean): string {
  const lang =
    language === "mn"
      ? "Respond with all text fields written in Mongolian (Cyrillic). Use 'Тодорхойгүй' for unknown facts."
      : "Respond with all text fields written in English.";
  const geo = hasCoords
    ? "Approximate scanner-device GPS coordinates are provided, but they may be where the user is standing rather than where the landmark in the image is located. Treat them as weak context."
    : "";
  return [...RULES, lang, geo].filter(Boolean).join(" ");
}
