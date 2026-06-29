/** Keyword → Wikimedia search query map for Mongolian culture topics. */
const TOPICS: { match: string[]; query: string }[] = [
  { match: ["ger", "yurt", "гэр", "гэрт"], query: "Mongolian ger yurt interior" },
  { match: ["ovoo", "овоо"], query: "Ovoo cairn Mongolia" },
  { match: ["naadam", "наадам", "wrestl", "бөх"], query: "Naadam festival Mongolia" },
  { match: ["tsagaan", "цагаан сар", "new year", "шинэ жил"], query: "Tsagaan Sar Mongolia" },
  { match: ["food", "eat", "dish", "хоол", "buuz", "бууз", "khuushuur", "хуушуур"], query: "Mongolian food buuz khuushuur" },
  { match: ["temple", "monaster", "buddh", "хийд", "сүм", "лам"], query: "Mongolian Buddhist monastery Erdene Zuu" },
  { match: ["eagle", "hunt", "бүргэд", "ан"], query: "Mongolian eagle hunter" },
  { match: ["horse", "морь", "ride", "унах"], query: "Mongolian horse steppe" },
  { match: ["throat", "khoomei", "хөөмий", "music", "morin", "морин хуур"], query: "Morin khuur Mongolian throat singing" },
  { match: ["deel", "дээл", "cloth", "хувцас", "costume"], query: "Mongolian deel traditional clothing" },
  { match: ["camel", "тэмээ", "gobi", "говь"], query: "Gobi desert camel Mongolia" },
  { match: ["tea", "цай", "milk", "сүү", "айраг", "airag"], query: "Mongolian milk tea airag" },
];

export function imageQueryFor(text: string): string {
  const t = text.toLowerCase();
  for (const topic of TOPICS) {
    if (topic.match.some((k) => t.includes(k))) return topic.query;
  }
  return "Mongolia nomadic culture";
}

/** Fetch up to 3 relevant photos for a question. Never throws. */
export async function fetchCultureImages(
  text: string,
  signal?: AbortSignal,
): Promise<string[]> {
  try {
    const q = encodeURIComponent(imageQueryFor(text));
    const res = await fetch(`/api/culture/images?q=${q}`, { signal });
    if (!res.ok) return [];
    const data = (await res.json()) as { images?: string[] };
    return Array.isArray(data.images) ? data.images : [];
  } catch {
    return [];
  }
}
