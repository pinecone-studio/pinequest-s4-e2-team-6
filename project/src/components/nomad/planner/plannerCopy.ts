import type { Language } from "../types";
import type { PlannerCategory } from "@/lib/planner/types";

export const catMeta: Record<PlannerCategory, { icon: string; mn: string; en: string; zh: string; ru: string; es: string; color: string }> = {
  FOOD: { icon: "restaurant", mn: "Хоол", en: "Food", zh: "美食", ru: "Еда", es: "Comida", color: "#ef7d3a" },
  CAFE: { icon: "restaurant", mn: "Кафе", en: "Café", zh: "咖啡", ru: "Кафе", es: "Cafe", color: "#d99a2b" },
  SHOP: { icon: "store", mn: "Дэлгүүр", en: "Shopping", zh: "购物", ru: "Магазины", es: "Compras", color: "#7b9acc" },
  MUSEUM: { icon: "account_balance", mn: "Музей", en: "Museum", zh: "博物馆", ru: "Музей", es: "Museo", color: "#00658b" },
  LANDMARK: { icon: "landscape", mn: "Дурсгал", en: "Landmark", zh: "地标", ru: "Памятник", es: "Lugar notable", color: "#34a0a4" },
  HOTEL: { icon: "cabin", mn: "Буудал", en: "Hotel", zh: "酒店", ru: "Отель", es: "Hotel", color: "#9b7ede" },
  PARK: { icon: "park", mn: "Цэцэрлэг", en: "Park", zh: "公园", ru: "Парк", es: "Parque", color: "#52b788" },
  OTHER: { icon: "auto_awesome", mn: "Бусад", en: "Other", zh: "其他", ru: "Другое", es: "Otro", color: "#6bcbff" },
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
  save: string;
  savedPlans: string;
  planDate: string;
  noHistory: string;
  openPlan: string;
  deletePlan: string;
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
    save: "Хадгалах",
    savedPlans: "Түүх",
    planDate: "Өдөр",
    noHistory: "Энэ өдөр хадгалсан төлөвлөгөө алга.",
    openPlan: "Нээх",
    deletePlan: "Устгах",
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
    save: "Save",
    savedPlans: "History",
    planDate: "Date",
    noHistory: "No saved plans for this date.",
    openPlan: "Open",
    deletePlan: "Delete",
    refineTitle: "Refine",
    refine: { cheaper: "Cheaper", addHour: "+1 hour", shorter: "Shorter", more: "Add a stop" },
  },
  zh: {
    eyebrow: "AI 行程",
    title: "用自然语言规划一天",
    subtitle: "写下预算、时间和兴趣，AI 会从真实地点生成路线。",
    placeholder: "“今天我有 50,000₮ 和 6 小时，喜欢博物馆和美食”",
    examples: ["50,000₮ • 6小时 • 博物馆、美食", "30,000₮ • 3小时 • 购物、咖啡", "100,000₮ • 全天"],
    generate: "生成路线",
    generating: "规划中…",
    error: "无法生成路线。请重试。",
    empty: "没有匹配地点，请扩大预算或兴趣。",
    spent: "已花费",
    budget: "预算",
    duration: "时间",
    walk: "分钟步行",
    save: "保存",
    savedPlans: "历史",
    planDate: "日期",
    noHistory: "这一天没有保存的行程。",
    openPlan: "打开",
    deletePlan: "删除",
    refineTitle: "调整",
    refine: { cheaper: "更便宜", addHour: "+1 小时", shorter: "更短", more: "加一站" },
  },
  ru: {
    eyebrow: "AI планер",
    title: "Планируйте день обычными словами",
    subtitle: "Укажите бюджет, время и интересы — AI построит маршрут из реальных мест.",
    placeholder: "“Сегодня у меня 50,000₮ и 6 часов, люблю музеи и еду”",
    examples: ["50,000₮ • 6 ч • музеи, еда", "30,000₮ • 3 ч • магазины, кафе", "100,000₮ • весь день"],
    generate: "Построить маршрут",
    generating: "Планирование…",
    error: "Не удалось построить маршрут. Попробуйте снова.",
    empty: "Нет подходящих мест — расширьте бюджет или интересы.",
    spent: "потрачено",
    budget: "Бюджет",
    duration: "Время",
    walk: "мин пешком",
    save: "Сохранить",
    savedPlans: "История",
    planDate: "Дата",
    noHistory: "На эту дату сохраненных планов нет.",
    openPlan: "Открыть",
    deletePlan: "Удалить",
    refineTitle: "Уточнить",
    refine: { cheaper: "Дешевле", addHour: "+1 час", shorter: "Короче", more: "Добавить место" },
  },
  es: {
    eyebrow: "Planificador AI",
    title: "Planifica tu dia con palabras simples",
    subtitle: "Indica presupuesto, tiempo e intereses; AI crea una ruta con lugares reales.",
    placeholder: "“Hoy tengo 50,000₮ y 6 horas, me gustan museos y comida”",
    examples: ["50,000₮ • 6 h • museos, comida", "30,000₮ • 3 h • compras, cafes", "100,000₮ • dia completo"],
    generate: "Crear ruta",
    generating: "Planificando…",
    error: "No se pudo crear la ruta. Intenta de nuevo.",
    empty: "No hay lugares compatibles; amplia presupuesto o intereses.",
    spent: "gastado",
    budget: "Presupuesto",
    duration: "Tiempo",
    walk: "min caminando",
    save: "Guardar",
    savedPlans: "Historial",
    planDate: "Fecha",
    noHistory: "No hay planes guardados para esta fecha.",
    openPlan: "Abrir",
    deletePlan: "Eliminar",
    refineTitle: "Ajustar",
    refine: { cheaper: "Mas barato", addHour: "+1 hora", shorter: "Mas corto", more: "Agregar parada" },
  },
};
