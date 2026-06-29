import type { Language } from "../types";
import type { PlannerCategory } from "@/lib/planner/types";

export const catMeta: Record<PlannerCategory, { icon: string; mn: string; en: string; color: string }> = {
  FOOD: { icon: "restaurant", mn: "Хоол", en: "Food", color: "#ef7d3a" },
  CAFE: { icon: "restaurant", mn: "Кафе", en: "Café", color: "#d99a2b" },
  SHOP: { icon: "store", mn: "Дэлгүүр", en: "Shopping", color: "#7b9acc" },
  MUSEUM: { icon: "account_balance", mn: "Музей", en: "Museum", color: "#00658b" },
  LANDMARK: { icon: "landscape", mn: "Дурсгал", en: "Landmark", color: "#34a0a4" },
  HOTEL: { icon: "cabin", mn: "Буудал", en: "Hotel", color: "#9b7ede" },
  PARK: { icon: "park", mn: "Цэцэрлэг", en: "Park", color: "#52b788" },
  OTHER: { icon: "auto_awesome", mn: "Бусад", en: "Other", color: "#6bcbff" },
};

type Strings = {
  eyebrow: string;
  title: string;
  subtitle: string;
  placeholder: string;
  examples: string[];
  generate: string;
  generating: string;
  error: string;
  empty: string;
  spent: string;
  budget: string;
  duration: string;
  walk: string;
  refineTitle: string;
  refine: { cheaper: string; addHour: string; shorter: string; more: string };
};

export const plannerCopy: Record<Language, Strings> = {
  mn: {
    eyebrow: "AI төлөвлөгч",
    title: "Өдрөө чөлөөт үгээр төлөвлө",
    subtitle: "Төсөв, цаг, сонирхлоо бичээрэй — AI бодит газруудаас маршрут гаргана.",
    placeholder: "“Өнөөдөр 50,000₮ төсөвтэй, 6 цагийн завтай, музей хоол сонирхдог”",
    examples: ["50,000₮ • 6 цаг • музей, хоол", "30,000₮ • 3 цаг • дэлгүүр, кафе", "100,000₮ • бүтэн өдөр"],
    generate: "Маршрут гаргах",
    generating: "Төлөвлөж байна…",
    error: "Маршрут гаргаж чадсангүй. Дахин оролдоно уу.",
    empty: "Тохирох газар олдсонгүй — төсөв эсвэл сонирхлоо өргөтгөнө үү.",
    spent: "зарцуулсан",
    budget: "Төсөв",
    duration: "Хугацаа",
    walk: "мин алхах",
    refineTitle: "Тохируулах",
    refine: { cheaper: "Хямд болго", addHour: "1 цаг нэм", shorter: "Богино болго", more: "Газар нэм" },
  },
  en: {
    eyebrow: "AI planner",
    title: "Plan your day in plain words",
    subtitle: "Tell us your budget, time and interests — AI builds a route from real places.",
    placeholder: "“Today I have 50,000₮ and 6 hours, I like museums and food”",
    examples: ["50,000₮ • 6h • museums, food", "30,000₮ • 3h • shopping, cafés", "100,000₮ • full day"],
    generate: "Build route",
    generating: "Planning…",
    error: "Couldn't build a route. Please try again.",
    empty: "No matching places — widen your budget or interests.",
    spent: "spent",
    budget: "Budget",
    duration: "Time",
    walk: "min walk",
    refineTitle: "Refine",
    refine: { cheaper: "Cheaper", addHour: "+1 hour", shorter: "Shorter", more: "Add a stop" },
  },
};
