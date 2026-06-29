import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/ai/rateLimit";

export const runtime = "nodejs";
export const revalidate = 86400; // topic imagery barely changes — cache a day

const API = "https://commons.wikimedia.org/w/api.php";
const UA = "AINomad/1.0 (travel culture demo)";

/**
 * GET /api/culture/images?q=... — relevant photos for a chat topic.
 *
 * Proxies Wikimedia Commons (keyless, public-domain / CC imagery) so the
 * advisor can illustrate its answers. Server-side keeps CORS + User-Agent
 * clean and lets the platform cache popular topics.
 */
export async function GET(req: Request) {
  const { ok } = rateLimit(clientIp(req.headers));
  if (!ok) return NextResponse.json({ images: [] }, { status: 429 });

  const q = new URL(req.url).searchParams.get("q")?.slice(0, 120).trim();
  if (!q) return NextResponse.json({ images: [] });

  const params = new URLSearchParams({
    action: "query",
    format: "json",
    generator: "search",
    gsrsearch: `filetype:bitmap ${q}`,
    gsrlimit: "8",
    gsrnamespace: "6",
    prop: "imageinfo",
    iiprop: "url",
    iiurlwidth: "640",
  });

  try {
    const res = await fetch(`${API}?${params}`, {
      headers: { "user-agent": UA },
      next: { revalidate },
    });
    if (!res.ok) return NextResponse.json({ images: [] });
    const data = await res.json();
    return NextResponse.json({ images: extract(data) });
  } catch {
    return NextResponse.json({ images: [] });
  }
}

type Page = { index: number; imageinfo?: { thumburl?: string }[] };

function extract(data: unknown): string[] {
  const pages = (data as { query?: { pages?: Record<string, Page> } })?.query?.pages;
  if (!pages) return [];
  return Object.values(pages)
    .sort((a, b) => (a.index ?? 99) - (b.index ?? 99))
    .map((p) => p.imageinfo?.[0]?.thumburl)
    .filter((u): u is string => Boolean(u && u.startsWith("https://")))
    .slice(0, 3);
}
