const KEY = "ai-nomad-device-id";

/**
 * Stable anonymous identifier for the current browser/device.
 *
 * We don't have user accounts, so every scan is scoped to a device id kept in
 * localStorage. This lets a visitor see their own scan history without signing
 * in, while keeping rows separable on the server side.
 */
export function getDeviceId(): string {
  if (typeof window === "undefined") return "server";

  try {
    const existing = window.localStorage.getItem(KEY);
    if (existing) return existing;

    const id = generateId();
    window.localStorage.setItem(KEY, id);
    return id;
  } catch {
    // Private mode / storage disabled: fall back to an ephemeral id.
    return generateId();
  }
}

function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `dev-${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`;
}
