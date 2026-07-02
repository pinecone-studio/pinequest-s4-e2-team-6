import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/ai/rateLimit";
import { extractPrompt, extractSchema, planPrompt, planSchema } from "@/lib/planner/prompts";
import type { PlanParams } from "@/lib/planner/types";

export const runtime = "nodejs";
export const maxDuration = 30;

const ENDPOINT = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-4o-mini";

type Body = {
  mode?: "extract" | "plan";
  text?: string;
  previous?: PlanParams | null;
  params?: PlanParams;
  candidates?: string;
  requiredIds?: string[];
};

/** POST /api/planner — extract plan params from text, or pick a grounded route. */
export async function POST(req: Request) {
  const { ok, retryAfter } = rateLimit(clientIp(req.headers));
  if (!ok) return NextResponse.json({ error: "rate" }, { status: 429, headers: { "retry-after": String(retryAfter) } });

  const key = process.env.OPENAI_KEY;
  if (!key) return NextResponse.json({ error: "no-key" }, { status: 500 });

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "bad-json" }, { status: 400 });
  }

  const { system, user, schema, name } = build(body);
  if (!system) return NextResponse.json({ error: "bad-mode" }, { status: 400 });

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 500,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        response_format: { type: "json_schema", json_schema: { name, strict: true, schema } },
      }),
    });
    if (!res.ok) throw new Error(`openai-${res.status}`);
    const data = await res.json();
    const raw = data?.choices?.[0]?.message?.content;
    if (!raw) throw new Error("empty");
    return NextResponse.json(JSON.parse(raw));
  } catch (err) {
    console.error("[planner]", (err as Error).message);
    return NextResponse.json({ error: "ai" }, { status: 502 });
  }
}

function build(body: Body) {
  if (body.mode === "extract") {
    const prev = body.previous ? `\nPrevious: ${JSON.stringify(body.previous)}` : "";
    return { system: extractPrompt(), user: `${body.text ?? ""}${prev}`, schema: extractSchema, name: "params" };
  }
  if (body.mode === "plan" && body.params && body.candidates) {
    return { system: planPrompt(body.params, body.candidates, body.requiredIds ?? []), user: "Build the route.", schema: planSchema, name: "route" };
  }
  return { system: "", user: "", schema: extractSchema, name: "params" };
}
