import { getSupabase, SCANS_BUCKET } from "@/lib/supabase/client";

/**
 * Upload one captured JPEG to Supabase Storage and return its public URL.
 *
 * Files are namespaced by device id so a single bucket can hold scans from
 * thousands of devices without collisions. Direct browser → Storage uploads
 * keep this load off our Next server entirely.
 */
export async function uploadScanImage(
  deviceId: string,
  blob: Blob,
): Promise<string> {
  const supabase = getSupabase();
  const name = `${deviceId}/${fileStamp()}.jpg`;

  const { error } = await supabase.storage
    .from(SCANS_BUCKET)
    .upload(name, blob, {
      contentType: "image/jpeg",
      cacheControl: "31536000",
      upsert: false,
    });

  if (error) throw new Error(`upload-failed: ${error.message}`);

  const { data } = supabase.storage.from(SCANS_BUCKET).getPublicUrl(name);
  return data.publicUrl;
}

function fileStamp(): string {
  const rand =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2);
  return `${Date.now()}-${rand}`;
}
