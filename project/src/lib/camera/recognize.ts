import type { Coords, Language, Recognition } from "./types";

type RecognizeArgs = {
  dataUrl: string;
  language: Language;
  coords: Coords;
  signal?: AbortSignal;
};

export class RecognizeError extends Error {
  constructor(public code: "rate-limit" | "ai" | "network") {
    super(code);
  }
}

/**
 * Send a captured frame to our server route, which runs the OpenAI vision
 * model. The API key never reaches the browser — only this thin fetch does.
 */
export async function recognize({
  dataUrl,
  language,
  coords,
  signal,
}: RecognizeArgs): Promise<Recognition> {
  let res: Response;
  try {
    res = await fetch("/api/scan", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ image: dataUrl, language, coords }),
      signal,
    });
  } catch {
    throw new RecognizeError("network");
  }

  if (res.status === 429) throw new RecognizeError("rate-limit");
  if (!res.ok) throw new RecognizeError("ai");

  const data = (await res.json()) as { recognition?: Recognition };
  if (!data.recognition) throw new RecognizeError("ai");
  return data.recognition;
}

/** Best-effort current position; resolves to null if denied/unavailable. */
export function getCoords(): Promise<Coords> {
  return new Promise((resolve) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      return resolve(null);
    }
    navigator.geolocation.getCurrentPosition(
      (p) => resolve({ lat: p.coords.latitude, lng: p.coords.longitude }),
      () => resolve(null),
      { enableHighAccuracy: false, timeout: 4000, maximumAge: 60000 },
    );
  });
}
