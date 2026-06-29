export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  images?: string[]; // topic photos attached to an advisor reply
};

/** Shape sent to the OpenAI API (no client-only `id`). */
export type WireMessage = { role: ChatRole; content: string };

export function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `m-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}
