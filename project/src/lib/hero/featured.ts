import { copy } from "@/components/nomad/data/content";
import type { Language } from "@/components/nomad/types";
import { gems } from "@/lib/gems/seed";

/** Day-of-year so the featured gem rotates once per day — the site feels alive. */
function dayOfYear(d: Date): number {
  const start = Date.UTC(d.getFullYear(), 0, 0);
  return Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - start) / 86400000);
}

/** Today's featured hidden gem: a deterministic daily pick from the gems list. */
export function featuredGem(language: Language, now: Date) {
  const items = copy[language].gems.items;
  const [title, region] = items[dayOfYear(now) % items.length];
  const normalizedTitle = title.toLowerCase();
  const gem = gems.find((g) => {
    const name = language === "mn" ? g.nameMn : g.nameEn;
    const normalizedName = name.toLowerCase();
    return normalizedName === normalizedTitle || normalizedTitle.includes(normalizedName);
  });
  const displayTitle = gem ? `${gem.lat.toFixed(5)}, ${gem.lng.toFixed(5)}` : title;
  return { title: displayTitle, region };
}

const SEASONS = {
  mn: ["Өвөл", "Хавар", "Зун", "Намар"],
  en: ["Winter", "Spring", "Summer", "Autumn"],
  zh: ["冬季", "春季", "夏季", "秋季"],
  ru: ["Зима", "Весна", "Лето", "Осень"],
  es: ["Invierno", "Primavera", "Verano", "Otono"],
} satisfies Record<Language, string[]>;

// Travel desirability per month (1–10) — peak summer + golden autumn rank highest.
const SCORE = [4, 4, 5, 6, 8, 9, 10, 10, 9, 7, 5, 4];

/** Current season label + whether it's a great time to visit Mongolia now. */
export function seasonNow(language: Language, now: Date) {
  const m = now.getMonth();
  const season = SEASONS[language][Math.floor(((m + 1) % 12) / 3)];
  const good = SCORE[m] >= 8;
  const notes = {
    mn: good ? "Аялахад хамгийн тохиромжтой" : "Аялал боломжтой",
    en: good ? "Prime season to visit" : "Open for travel",
    zh: good ? "最佳旅行季" : "适合旅行",
    ru: good ? "Лучший сезон для поездки" : "Можно путешествовать",
    es: good ? "Temporada ideal para visitar" : "Abierto para viajar",
  };
  const note = notes[language];
  return { season, note, good };
}
