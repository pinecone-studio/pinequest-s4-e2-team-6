import type { Coords, Language, Recognition } from "@/lib/camera/types";
import { buildPrompt, recognitionSchema } from "./prompt";

const ENDPOINT = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-4o-mini"; // vision-capable and cheap enough for high volume

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

  const userText = coords
    ? `Identify this. Nearby coordinates: ${coords.lat.toFixed(3)}, ${coords.lng.toFixed(3)}.`
    : "Identify this.";

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 500,
      messages: [
        { role: "system", content: buildPrompt(language, Boolean(coords)) },
        {
          role: "user",
          content: [
            { type: "text", text: userText },
            { type: "image_url", image_url: { url: image, detail: "low" } },
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
  return {
    name: r.name?.trim() || "Unknown",
    location: r.location?.trim() || "",
    category: r.category || "unknown",
    description: r.description?.trim() || "",
    confidence: clamp(r.confidence),
    tags: Array.isArray(r.tags) ? r.tags.slice(0, 6) : [],
    distanceKm: typeof r.distanceKm === "number" ? r.distanceKm : null,
  };
}

const clamp = (n: number) => Math.max(0, Math.min(1, Number(n) || 0));
