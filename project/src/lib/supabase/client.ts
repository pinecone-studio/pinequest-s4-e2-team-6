import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client (singleton).
 *
 * Uses the public URL + publishable key from the environment. These are safe
 * to expose to the browser; row level security on the database is what keeps
 * data access controlled. Reused across the app so we never open more
 * connections than necessary even with thousands of concurrent users.
 */
let cached: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabase() {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase env missing: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env",
    );
  }

  cached = createBrowserClient(url, key);
  return cached;
}

/** True when Supabase env vars are present, so the UI can degrade gracefully. */
export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}

/** Storage bucket that holds captured scan photos. Must exist in Supabase. */
export const SCANS_BUCKET = "scans";
