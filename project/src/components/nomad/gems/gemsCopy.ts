import type { Language } from "../types";
import type { Difficulty, GemCategory, Reach, Season } from "@/lib/gems/types";

export const catMeta: Record<GemCategory, { icon: string; mn: string; en: string; color: string }> = {
  NATURE: { icon: "park", mn: "Байгаль", en: "Nature", color: "#52b788" },
  MOUNTAIN: { icon: "landscape", mn: "Уул", en: "Mountain", color: "#7b9acc" },
  LAKE: { icon: "navigation", mn: "Нуур", en: "Lake", color: "#34a0a4" },
  DESERT: { icon: "hiking", mn: "Цөл", en: "Desert", color: "#e0a32e" },
  HISTORY: { icon: "account_balance", mn: "Түүх", en: "History", color: "#b07d62" },
  MONASTERY: { icon: "temple_buddhist", mn: "Хийд", en: "Monastery", color: "#c97b3c" },
  WILDLIFE: { icon: "park", mn: "Амьтан", en: "Wildlife", color: "#9b7ede" },
  HOTSPRING: { icon: "auto_awesome", mn: "Рашаан", en: "Hot spring", color: "#ef7d3a" },
};

const reachMap: Record<Reach, { mn: string; en: string }> = {
  car: { mn: "Машинаар", en: "By car" },
  horse: { mn: "Морьтой", en: "On horse" },
  hike: { mn: "Явганаар", en: "On foot" },
  flight: { mn: "Нислэгтэй", en: "By flight" },
};
const seasonMap: Record<Season, { mn: string; en: string }> = {
  summer: { mn: "Зун", en: "Summer" },
  autumn: { mn: "Намар", en: "Autumn" },
  winter: { mn: "Өвөл", en: "Winter" },
  spring: { mn: "Хавар", en: "Spring" },
  all: { mn: "Бүх улирал", en: "All year" },
};
const diffMap: Record<Difficulty, { mn: string; en: string }> = {
  easy: { mn: "Хялбар", en: "Easy" },
  moderate: { mn: "Дунд", en: "Moderate" },
  hard: { mn: "Хүнд", en: "Hard" },
};

export const lbl = {
  reach: (r: Reach, l: Language) => reachMap[r][l],
  season: (s: Season, l: Language) => seasonMap[s][l],
  diff: (d: Difficulty, l: Language) => diffMap[d][l],
  cat: (c: GemCategory, l: Language) => (l === "mn" ? catMeta[c].mn : catMeta[c].en),
};

export const gemsCopy: Record<Language, { eyebrow: string; title: string; subtitle: string; pick: string; places: string; straight: string; road: string; locating: string; addPlan: string; viewAr: string; offline: string; guide: string; routing: string; back: string }> = {
  mn: {
    eyebrow: "Далд эрдэнэс", title: "21 аймгийн нууц газрууд", subtitle: "Аймгаа сонгоод ойролцоох далд газруудыг нээ.",
    pick: "Аймаг сонгоно уу", places: "газар", straight: "Шулуунаар", road: "Замаар", locating: "Байршил тогтоож байна…",
    addPlan: "Төлөвлөгчид", viewAr: "AR-аар", offline: "Офлайн татах", guide: "Соёлын хөтөч", routing: "Маршрут зурж байна…", back: "Буцах",
  },
  en: {
    eyebrow: "Hidden gems", title: "Secret places of 21 aimags", subtitle: "Pick a province and uncover its hidden gems.",
    pick: "Pick a province", places: "places", straight: "Straight", road: "By road", locating: "Finding your location…",
    addPlan: "Add to plan", viewAr: "View in AR", offline: "Save offline", guide: "AI guide", routing: "Drawing route…", back: "Back",
  },
};
