import { copy } from "@/components/nomad/data/content";
import type { Language } from "@/components/nomad/types";

/** Day-of-year so the featured gem rotates once per day — the site feels alive. */
function dayOfYear(d: Date): number {
  const start = Date.UTC(d.getFullYear(), 0, 0);
  return Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - start) / 86400000);
}

/** Today's featured hidden gem: a deterministic daily pick from the gems list. */
export function featuredGem(language: Language, now: Date) {
  const items = copy[language].gems.items;
  const [title, region] = items[dayOfYear(now) % items.length];
  return { title, region };
}

const SEASONS = {
  mn: ["Өвөл", "Хавар", "Зун", "Намар"],
  en: ["Winter", "Spring", "Summer", "Autumn"],
};

// Travel desirability per month (1–10) — peak summer + golden autumn rank highest.
const SCORE = [4, 4, 5, 6, 8, 9, 10, 10, 9, 7, 5, 4];

/** Current season label + whether it's a great time to visit Mongolia now. */
export function seasonNow(language: Language, now: Date) {
  const m = now.getMonth();
  const season = SEASONS[language][Math.floor(((m + 1) % 12) / 3)];
  const good = SCORE[m] >= 8;
  const note =
    language === "mn"
      ? good
        ? "Аялахад хамгийн тохиромжтой"
        : "Аялал боломжтой"
      : good
        ? "Prime season to visit"
        : "Open for travel";
  return { season, note, good };
}
