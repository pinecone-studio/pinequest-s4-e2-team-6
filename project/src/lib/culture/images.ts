/** Keyword → Wikimedia search query for SPECIFIC Mongolian places / subjects.
 *  Returns null for greetings, thanks and general chat so no images are sent —
 *  photos appear only when the user asks about a concrete place or thing. */
const TOPICS: { match: string[]; query: string }[] = [
  // Named places
  { match: ["terelj", "тэрэлж"], query: "Gorkhi Terelj National Park Mongolia" },
  { match: ["khuvsgul", "khovsgol", "хөвсгөл"], query: "Lake Khuvsgul Mongolia" },
  { match: ["erdene zuu", "kharkhorin", "karakorum", "хархорин", "эрдэнэ зуу"], query: "Erdene Zuu monastery Mongolia" },
  { match: ["gobi", "говь", "khongor", "хонгор", "dune"], query: "Gobi desert Khongoryn Els Mongolia" },
  { match: ["genghis", "chinggis statue", "чингис", "tsonjin"], query: "Genghis Khan Equestrian Statue Mongolia" },
  { match: ["sukhbaatar square", "сүхбаатарын талбай"], query: "Sukhbaatar Square Ulaanbaatar" },
  { match: ["gandan", "гандан"], query: "Gandantegchinlen Monastery Ulaanbaatar" },
  { match: ["yolyn", "ёлын"], query: "Yolyn Am Gobi Gurvansaikhan" },
  { match: ["amarbayasgalant", "амарбаясгалант"], query: "Amarbayasgalant Monastery Mongolia" },
  { match: ["turtle rock", "мэлхий хад"], query: "Turtle Rock Terelj Mongolia" },
  // Cultural subjects
  { match: ["ger", "yurt", "гэр"], query: "Mongolian ger yurt interior" },
  { match: ["ovoo", "овоо"], query: "Ovoo cairn Mongolia" },
  { match: ["naadam", "наадам", "wrestl", "бөх"], query: "Naadam festival Mongolia" },
  { match: ["tsagaan sar", "цагаан сар", "lunar new year"], query: "Tsagaan Sar Mongolia" },
  { match: ["buuz", "khuushuur", "бууз", "хуушуур", "mongolian food", "монгол хоол"], query: "Mongolian food buuz khuushuur" },
  { match: ["temple", "monaster", "хийд", "сүм"], query: "Mongolian Buddhist monastery" },
  { match: ["eagle hunt", "бүргэдч", "eagle festival"], query: "Mongolian eagle hunter" },
  { match: ["morin khuur", "морин хуур", "throat sing", "хөөмий"], query: "Morin khuur Mongolian throat singing" },
  { match: ["deel", "дээл", "costume", "хувцас"], query: "Mongolian deel traditional clothing" },
  { match: ["camel", "тэмээ"], query: "Bactrian camel Mongolia" },
];

/** Best image query for a message, or null when nothing specific is asked. */
export function imageQueryFor(text: string): string | null {
  const t = text.toLowerCase();
  for (const topic of TOPICS) {
    if (topic.match.some((k) => t.includes(k))) return topic.query;
  }
  return null;
}

/** Fetch up to 3 photos only for a specific place/subject. Never throws. */
export async function fetchCultureImages(text: string, signal?: AbortSignal): Promise<string[]> {
  const query = imageQueryFor(text);
  if (!query) return []; // greetings / general chat → no images
  try {
    const res = await fetch(`/api/culture/images?q=${encodeURIComponent(query)}`, { signal });
    if (!res.ok) return [];
    const data = (await res.json()) as { images?: string[] };
    return Array.isArray(data.images) ? data.images : [];
  } catch {
    return [];
  }
}
