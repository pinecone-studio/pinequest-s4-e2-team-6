import { clientIp, rateLimit } from "@/lib/ai/rateLimit";
import { systemPrompt } from "@/lib/culture/prompt";
import type { WireMessage } from "@/lib/culture/types";
import { isLanguage, type Language } from "@/components/nomad/types";

export const runtime = "nodejs";
export const maxDuration = 30;

const ENDPOINT = "https://api.openai.com/v1/chat/completions";
const MAX_MESSAGES = 16;
const MAX_CHARS = 4000;

type Body = { messages?: WireMessage[]; language?: Language };

/**
 * POST /api/culture — streamed chat with the Mongolian culture advisor.
 * Returns a plain-text token stream so the client can render a live typewriter.
 */
export async function POST(req: Request) {
  const { ok, retryAfter } = rateLimit(clientIp(req.headers));
  if (!ok) {
    return new Response("rate-limited", {
      status: 429,
      headers: { "retry-after": String(retryAfter) },
    });
  }

  const key = process.env.OPENAI_KEY;
  if (!key) return new Response("missing-key", { status: 500 });

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return new Response("bad-json", { status: 400 });
  }

  const history = sanitize(body.messages);
  if (history.length === 0) return new Response("no-messages", { status: 400 });
  const language: Language = isLanguage(body.language) ? body.language : "mn";

  const upstream = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      stream: true,
      temperature: 0.6,
      max_tokens: 600,
      messages: [{ role: "system", content: systemPrompt(language) }, ...history],
    }),
  });

  if (!upstream.ok || !upstream.body) {
    return new Response("vision-failed", { status: 502 });
  }

  return new Response(toTextStream(upstream.body), {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
  });
}

function sanitize(messages?: WireMessage[]): WireMessage[] {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && m.content)
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: String(m.content).slice(0, MAX_CHARS) }));
}

/** Convert OpenAI's SSE stream into a stream of raw text tokens. */
function toTextStream(body: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const reader = body.getReader();
  let buffer = "";

  return new ReadableStream({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) return controller.close();

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const data = trimmed.slice(5).trim();
        if (data === "[DONE]") return controller.close();
        try {
          const token = JSON.parse(data)?.choices?.[0]?.delta?.content;
          if (token) controller.enqueue(encoder.encode(token));
        } catch {
          // partial JSON across chunk boundary — ignore, next pull continues
        }
      }
    },
    cancel() {
      reader.cancel().catch(() => undefined);
    },
  });
}
