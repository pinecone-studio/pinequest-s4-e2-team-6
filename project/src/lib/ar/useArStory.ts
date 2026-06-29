"use client";

import { useCallback, useRef, useState } from "react";
import type { Language } from "@/components/nomad/types";

/**
 * Streams a short AI story for a locked POI via the existing /api/culture
 * endpoint (gpt-4o-mini). One story at a time; switching POIs aborts the last.
 */
export function useArStory(language: Language) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const ctrl = useRef<AbortController | null>(null);

  const run = useCallback(
    async (id: string, prompt: string) => {
      ctrl.current?.abort();
      const c = new AbortController();
      ctrl.current = c;
      setActiveId(id);
      setText("");
      setLoading(true);
      try {
        const res = await fetch("/api/culture", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ messages: [{ role: "user", content: prompt }], language }),
          signal: c.signal,
        });
        if (!res.ok || !res.body) throw new Error("failed");
        const reader = res.body.getReader();
        const dec = new TextDecoder();
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          setText((t) => t + dec.decode(value, { stream: true }));
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setText(language === "mn" ? "Түүх ачаалж чадсангүй." : "Couldn't load the story.");
      } finally {
        setLoading(false);
      }
    },
    [language],
  );

  const reset = useCallback(() => {
    ctrl.current?.abort();
    setActiveId(null);
    setText("");
    setLoading(false);
  }, []);

  return { text, loading, activeId, run, reset };
}
