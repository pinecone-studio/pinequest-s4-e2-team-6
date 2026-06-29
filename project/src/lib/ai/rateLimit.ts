type Bucket = { tokens: number; updated: number };

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 12; // scans per IP per minute
const buckets = new Map<string, Bucket>();

/**
 * Lightweight per-IP token bucket to protect the (paid) vision endpoint from
 * abuse and runaway cost. In-memory, so it is per server instance.
 *
 * For a horizontally scaled deployment serving many thousands of users, back
 * this with a shared store (e.g. Upstash Redis / Vercel KV) so limits hold
 * across instances. The interface here stays the same.
 */
export function rateLimit(ip: string): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const refill = (MAX_PER_WINDOW / WINDOW_MS) * 1; // tokens per ms
  const b = buckets.get(ip) ?? { tokens: MAX_PER_WINDOW, updated: now };

  b.tokens = Math.min(MAX_PER_WINDOW, b.tokens + (now - b.updated) * refill);
  b.updated = now;

  if (b.tokens < 1) {
    buckets.set(ip, b);
    return { ok: false, retryAfter: Math.ceil((1 - b.tokens) / refill / 1000) };
  }

  b.tokens -= 1;
  buckets.set(ip, b);
  sweep(now);
  return { ok: true, retryAfter: 0 };
}

/** Drop idle buckets occasionally so the map can't grow unbounded. */
function sweep(now: number) {
  if (buckets.size < 5000) return;
  for (const [ip, b] of buckets) {
    if (now - b.updated > WINDOW_MS * 5) buckets.delete(ip);
  }
}

export function clientIp(headers: Headers): string {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "anonymous";
}
