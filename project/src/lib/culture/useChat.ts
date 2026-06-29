"use client";

import { useCallback, useRef, useState } from "react";
import type { Language } from "@/components/nomad/types";
import { fetchCultureImages } from "./images";
import { newId, type ChatMessage, type WireMessage } from "./types";

/**
 * Client controller for the culture advisor chat.
 *
 * Streams the assistant reply token-by-token from `/api/culture`, updating the
 * last message in place so the UI renders a live typewriter effect.
 */
export function useChat(language: Language, greeting: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: newId(), role: "assistant", content: greeting },
  ]);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      abortRef.current?.abort(); // interrupt any in-flight reply so chat never blocks
      setError(null);

      const userMsg: ChatMessage = { id: newId(), role: "user", content: trimmed };
      const botId = newId();
      const wire: WireMessage[] = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      setMessages((prev) => [
        ...prev,
        userMsg,
        { id: botId, role: "assistant", content: "" },
      ]);
      setStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      // Fetch relevant photos in parallel so they can appear alongside the
      // streamed answer. Independent of the text — a failure just shows no image.
      fetchCultureImages(trimmed, controller.signal).then((imgs) => {
        if (imgs.length) {
          setMessages((prev) =>
            prev.map((m) => (m.id === botId ? { ...m, images: imgs } : m)),
          );
        }
      });

      try {
        const res = await fetch("/api/culture", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ messages: wire, language }),
          signal: controller.signal,
        });

        if (res.status === 429) throw new Error("rate-limit");
        if (!res.ok || !res.body) throw new Error("failed");

        await readStream(res.body, (chunk) =>
          setMessages((prev) => appendTo(prev, botId, chunk)),
        );
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        const code = (err as Error).message === "rate-limit" ? "rate-limit" : "failed";
        setError(code);
        setMessages((prev) =>
          prev.filter((m) => m.id !== botId || m.content || m.images?.length),
        );
      } finally {
        // Only the most recent request owns the streaming flag — a superseded
        // (aborted) request must not clear it out from under the new one.
        if (abortRef.current === controller) {
          setStreaming(false);
          abortRef.current = null;
        }
      }
    },
    [language, messages],
  );

  const stop = useCallback(() => abortRef.current?.abort(), []);

  return { messages, streaming, error, send, stop };
}

async function readStream(
  body: ReadableStream<Uint8Array>,
  onChunk: (text: string) => void,
) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    const text = decoder.decode(value, { stream: true });
    if (text) onChunk(text);
  }
}

function appendTo(list: ChatMessage[], id: string, chunk: string): ChatMessage[] {
  return list.map((m) => (m.id === id ? { ...m, content: m.content + chunk } : m));
}
