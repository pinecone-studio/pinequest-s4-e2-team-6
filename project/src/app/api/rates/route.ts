import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 1800; // FX feed updates ~daily; refresh every 30 min

const SOURCE = "https://open.er-api.com/v6/latest/USD";

/**
 * GET /api/rates — live exchange rates (per 1 USD) for converting to MNT.
 *
 * Proxies the keyless exchangerate-api open feed so the browser avoids CORS
 * and the platform can cache the response. Cross-rates are computed on the
 * client: MNT = amount * rates.MNT / rates.FROM.
 */
export async function GET() {
  try {
    const res = await fetch(SOURCE, { next: { revalidate } });
    if (!res.ok) throw new Error(`source-${res.status}`);

    const data = await res.json();
    if (data?.result !== "success" || !data?.rates?.MNT) {
      throw new Error("bad-payload");
    }

    return NextResponse.json(
      { rates: data.rates, updated: data.time_last_update_unix ?? null },
      { headers: { "cache-control": "public, max-age=900, s-maxage=1800" } },
    );
  } catch {
    return NextResponse.json({ error: "rates-unavailable" }, { status: 502 });
  }
}
