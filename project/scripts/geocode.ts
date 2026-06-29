/**
 * Geocode gem names → coordinates via Nominatim (OSM, keyless, free).
 * Run with Bun:  bun run scripts/geocode.ts
 *
 * Input: an array of { nameEn, aimag } below (extend with AI-listed places).
 * Rules followed: a descriptive User-Agent, ≤1 request/second throttle, and a
 * Mongolia bounding-box sanity check so wrong hits are flagged for review.
 */
const UA = "AI-Nomad/1.0 (hidden-gems geocoder; contact: dev@ainomad.example)";
const MN_BBOX = { minLng: 87.5, maxLng: 120.0, minLat: 41.5, maxLat: 52.3 };

// Add { nameEn, aimag } rows here — e.g. from an AI-generated per-aimag list.
const PLACES: { nameEn: string; aimag: string }[] = [
  { nameEn: "Khongoryn Els", aimag: "umnugovi" },
  { nameEn: "Yolyn Am", aimag: "umnugovi" },
  { nameEn: "Orkhon Waterfall", aimag: "uvurkhangai" },
  { nameEn: "Lake Khovsgol", aimag: "khuvsgul" },
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function geocode(name: string) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(`${name}, Mongolia`)}&format=json&limit=1`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return null;
  const data = (await res.json()) as { lat: string; lon: string }[];
  if (!data.length) return null;
  return { lat: Number(data[0].lat), lng: Number(data[0].lon) };
}

function inBbox(lat: number, lng: number) {
  return lat >= MN_BBOX.minLat && lat <= MN_BBOX.maxLat && lng >= MN_BBOX.minLng && lng <= MN_BBOX.maxLng;
}

async function main() {
  const out: Record<string, unknown>[] = [];
  for (const p of PLACES) {
    const hit = await geocode(p.nameEn);
    const flag = !hit ? "NOT_FOUND" : !inBbox(hit.lat, hit.lng) ? "OUT_OF_BBOX" : "OK";
    out.push({ ...p, ...(hit ?? {}), status: flag });
    console.error(`${flag.padEnd(11)} ${p.nameEn}`);
    await sleep(1100); // ≤1 req/sec
  }
  console.log(JSON.stringify(out, null, 2));
}

main();
