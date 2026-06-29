import type { Coords, Language, Recognition } from "@/lib/camera/types";
import { buildPrompt, recognitionSchema } from "./prompt";

const ENDPOINT = "https://api.openai.com/v1/chat/completions";
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini"; // overrideable from .env

/**
 * Run one image through the OpenAI vision model and return a typed result.
 *
 * Uses structured outputs (json_schema) so the response is always shaped like
 * `Recognition` — no brittle string parsing. Runs server-side only; the API
 * key is read from the environment and never leaves the server.
 */
export async function identify(
  image: string,
  language: Language,
  coords: Coords,
): Promise<Recognition> {
  const key = process.env.OPENAI_KEY;
  if (!key) throw new Error("OPENAI_KEY missing");

  const userText = [
    "Identify the landmark/place/cultural subject shown in the image.",
    "If the camera is pointed at a phone, monitor, poster, printed photo, map, or sign, identify the place shown inside that displayed image/text instead of the physical device or room.",
    "Base the answer on visible evidence. Do not guess a famous place from coordinates alone.",
    coords
      ? `Scanner-device coordinates: ${coords.lat.toFixed(3)}, ${coords.lng.toFixed(3)}. These may be the user's current location, not the landmark's location.`
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1200,
      messages: [
        { role: "system", content: buildPrompt(language, Boolean(coords)) },
        {
          role: "user",
          content: [
            { type: "text", text: userText },
            { type: "image_url", image_url: { url: image, detail: "high" } },
          ],
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: { name: "recognition", strict: true, schema: recognitionSchema },
      },
    }),
  });

  if (!res.ok) {
    throw new Error(`openai-${res.status}: ${await res.text().catch(() => "")}`);
  }

  const data = await res.json();
  const raw = data?.choices?.[0]?.message?.content;
  if (!raw) throw new Error("openai-empty");

  return normalize(JSON.parse(raw) as Recognition);
}

function normalize(r: Recognition): Recognition {
  const category = r.category || "unknown";

  return {
    name: r.name?.trim() || "Unknown",
    location: r.location?.trim() || "",
    category,
    description: r.description?.trim() || "",
    foundedOrBuilt: normalizeFounded(r.foundedOrBuilt, category),
    historicalPeriod: r.historicalPeriod?.trim() || "Unknown",
    significance: r.significance?.trim() || "",
    history: r.history?.trim() || "",
    architectureOrNature: r.architectureOrNature?.trim() || "",
    facts: cleanList(r.facts, 5),
    visitorTips: cleanList(r.visitorTips, 4),
    confidence: clamp(r.confidence),
    tags: Array.isArray(r.tags) ? r.tags.slice(0, 6) : [],
    distanceKm: typeof r.distanceKm === "number" ? r.distanceKm : null,
  };
}

const clamp = (n: number) => Math.max(0, Math.min(1, Number(n) || 0));

function normalizeFounded(value: string | null | undefined, category: string): string | null {
  if (!shouldShowFounded(category)) return null;

  const cleaned = value?.trim();
  if (!cleaned) return null;

  const unknown = ["unknown", "тодорхойгүй", "n/a", "na", "-"];
  return unknown.includes(cleaned.toLowerCase()) ? null : cleaned;
}

function shouldShowFounded(category: string): boolean {
  return ["building", "museum", "monument", "temple", "historic_site"].includes(category);
}

function cleanList(items: string[] | undefined, max: number): string[] {
  return Array.isArray(items)
    ? items.map((item) => item.trim()).filter(Boolean).slice(0, max)
    : [];
}
