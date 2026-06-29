"use client";

import { useEffect, useState } from "react";

/**
 * Tracks connectivity. Starts optimistic (true) so SSR + first paint match,
 * then syncs to the real value and listens for online/offline events.
 */
export function useOnlineStatus(): boolean {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const sync = () => setOnline(navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  return online;
}
