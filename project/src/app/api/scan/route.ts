import { NextResponse } from "next/server";
import { identify } from "@/lib/ai/vision";
import { clientIp, rateLimit } from "@/lib/ai/rateLimit";
import { isLanguage, type Language } from "@/components/nomad/types";
import type { Coords } from "@/lib/camera/types";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_IMAGE_CHARS = 9_000_000; // ~6.5MB base64 guard against oversized posts

type Body = { image?: string; language?: Language; coords?: Coords };

/**
 * POST /api/scan — recognise a captured photo.
 *
 * Keeps the OpenAI key server-side, rate-limits per IP, and returns a typed
 * `recognition` object the client persists to Supabase.
 */
export async function POST(req: Request) {
  const { ok, retryAfter } = rateLimit(clientIp(req.headers));
  if (!ok) {
    return NextResponse.json(
      { error: "rate-limited" },
      { status: 429, headers: { "retry-after": String(retryAfter) } },
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "bad-json" }, { status: 400 });
  }

  const image = body.image;
  if (!image || !image.startsWith("data:image/")) {
    return NextResponse.json({ error: "no-image" }, { status: 400 });
  }
  if (image.length > MAX_IMAGE_CHARS) {
    return NextResponse.json({ error: "image-too-large" }, { status: 413 });
  }

  const language: Language = isLanguage(body.language) ? body.language : "mn";

  try {
    const recognition = await identify(image, language, body.coords ?? null);
    return NextResponse.json({ recognition });
  } catch (err) {
    console.error("[scan] vision failed:", (err as Error).message);
    return NextResponse.json({ error: "vision-failed" }, { status: 502 });
  }
}
