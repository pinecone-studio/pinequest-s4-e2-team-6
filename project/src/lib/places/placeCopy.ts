import type { Language } from "@/components/nomad/types";
import type { PlaceCategory } from "./types";

export const categoryMeta: Record<PlaceCategory, { icon: string; mn: string; en: string }> = {
  RESTAURANT: { icon: "restaurant", mn: "Хоол", en: "Restaurants" },
  GROCERY: { icon: "store", mn: "Дэлгүүр", en: "Grocery" },
  CAMP: { icon: "cabin", mn: "Гэр буудал", en: "Ger camps" },
  PALACE: { icon: "account_balance", mn: "Музей/Ордон", en: "Palaces & museums" },
  AIMAG_CENTER: { icon: "location_city", mn: "Аймгийн төв", en: "Aimag center" },
  SUM_CENTER: { icon: "navigation", mn: "Сумын төв", en: "Sum center" },
  NATURE: { icon: "park", mn: "Байгаль", en: "Natural sites" },
  HIDDEN_GEM: { icon: "auto_awesome", mn: "Нууц газар", en: "Hidden gems" },
};

export function categoryIcon(c: PlaceCategory): string {
  return categoryMeta[c].icon;
}
export function categoryLabel(c: PlaceCategory, lang: Language): string {
  return lang === "mn" ? categoryMeta[c].mn : categoryMeta[c].en;
}

type Strings = {
  all: string;
  locating: string;
  lowAccuracy: string;
  denied: string;
  deniedHelp: string;
  empty: string;
  demo: string;
  directions: string;
  aiGuide: string;
  aiLoading: string;
  away: string;
  walk: string;
  cached: string;
};

export const placeCopy: Record<Language, Strings> = {
  mn: {
    all: "Бүгд",
    locating: "Байршил тогтоож байна…",
    lowAccuracy: "GPS дохио сул — байршил ойролцоо",
    denied: "Байршлын зөвшөөрөл хэрэгтэй",
    deniedHelp: "Хөтчийн тохиргооноос байршлыг зөвшөөрнө үү.",
    empty: "10 км дотор бүртгэлтэй газар алга.",
    demo: "Тэрэлжээр демо үзэх",
    directions: "Чиглүүлэх",
    aiGuide: "AI хөтөч",
    aiLoading: "AI ярьж байна…",
    away: "зайтай",
    walk: "мин алхана",
    cached: "Хадгалсан",
  },
  en: {
    all: "All",
    locating: "Finding your location…",
    lowAccuracy: "Weak GPS — position approximate",
    denied: "Location permission needed",
    deniedHelp: "Allow location access in your browser settings.",
    empty: "No registered places within 10 km.",
    demo: "Preview around Terelj",
    directions: "Directions",
    aiGuide: "AI guide",
    aiLoading: "AI is speaking…",
    away: "away",
    walk: "min walk",
    cached: "Cached",
  },
};
