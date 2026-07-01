import type { Language } from "../types";
import type { Difficulty, GemCategory, Reach, Season } from "@/lib/gems/types";

export const catMeta: Record<GemCategory, { icon: string; mn: string; en: string; zh: string; ru: string; es: string; color: string }> = {
  NATURE: { icon: "park", mn: "Байгаль", en: "Nature", zh: "自然", ru: "Природа", es: "Naturaleza", color: "#52b788" },
  MOUNTAIN: { icon: "landscape", mn: "Уул", en: "Mountain", zh: "山", ru: "Горы", es: "Montana", color: "#7b9acc" },
  LAKE: { icon: "navigation", mn: "Нуур", en: "Lake", zh: "湖泊", ru: "Озеро", es: "Lago", color: "#34a0a4" },
  DESERT: { icon: "hiking", mn: "Цөл", en: "Desert", zh: "沙漠", ru: "Пустыня", es: "Desierto", color: "#e0a32e" },
  HISTORY: { icon: "account_balance", mn: "Түүх", en: "History", zh: "历史", ru: "История", es: "Historia", color: "#b07d62" },
  MONASTERY: { icon: "temple_buddhist", mn: "Хийд", en: "Monastery", zh: "寺庙", ru: "Монастырь", es: "Monasterio", color: "#c97b3c" },
  WILDLIFE: { icon: "park", mn: "Амьтан", en: "Wildlife", zh: "野生动物", ru: "Дикая природа", es: "Fauna", color: "#9b7ede" },
  HOTSPRING: { icon: "auto_awesome", mn: "Рашаан", en: "Hot spring", zh: "温泉", ru: "Горячий источник", es: "Termas", color: "#ef7d3a" },
};

const reachMap: Record<Reach, Record<Language, string>> = {
  car: { mn: "Машинаар", en: "By car", zh: "驾车", ru: "На машине", es: "En coche" },
  horse: { mn: "Морьтой", en: "On horse", zh: "骑马", ru: "Верхом", es: "A caballo" },
  hike: { mn: "Явганаар", en: "On foot", zh: "步行", ru: "Пешком", es: "A pie" },
  flight: { mn: "Нислэгтэй", en: "By flight", zh: "乘飞机", ru: "Самолетом", es: "En avion" },
};
const seasonMap: Record<Season, Record<Language, string>> = {
  summer: { mn: "Зун", en: "Summer", zh: "夏季", ru: "Лето", es: "Verano" },
  autumn: { mn: "Намар", en: "Autumn", zh: "秋季", ru: "Осень", es: "Otono" },
  winter: { mn: "Өвөл", en: "Winter", zh: "冬季", ru: "Зима", es: "Invierno" },
  spring: { mn: "Хавар", en: "Spring", zh: "春季", ru: "Весна", es: "Primavera" },
  all: { mn: "Бүх улирал", en: "All year", zh: "全年", ru: "Круглый год", es: "Todo el ano" },
};
const diffMap: Record<Difficulty, Record<Language, string>> = {
  easy: { mn: "Хялбар", en: "Easy", zh: "容易", ru: "Легко", es: "Facil" },
  moderate: { mn: "Дунд", en: "Moderate", zh: "中等", ru: "Средне", es: "Moderado" },
  hard: { mn: "Хүнд", en: "Hard", zh: "困难", ru: "Сложно", es: "Dificil" },
};

export const lbl = {
  reach: (r: Reach, l: Language) => reachMap[r][l],
  season: (s: Season, l: Language) => seasonMap[s][l],
  diff: (d: Difficulty, l: Language) => diffMap[d][l],
  cat: (c: GemCategory, l: Language) => catMeta[c][l],
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
  zh: {
    eyebrow: "隐藏秘境", title: "21 个省的秘密地点", subtitle: "选择一个省，发现附近的隐藏秘境。",
    pick: "选择省份", places: "个地点", straight: "直线", road: "公路", locating: "正在定位…",
    addPlan: "加入计划", viewAr: "AR 查看", offline: "离线保存", guide: "AI 向导", routing: "正在绘制路线…", back: "返回",
  },
  ru: {
    eyebrow: "Скрытые места", title: "Тайные места 21 аймака", subtitle: "Выберите аймак и откройте его скрытые места.",
    pick: "Выберите аймак", places: "мест", straight: "Прямо", road: "По дороге", locating: "Определяем местоположение…",
    addPlan: "В план", viewAr: "В AR", offline: "Сохранить офлайн", guide: "AI гид", routing: "Рисуем маршрут…", back: "Назад",
  },
  es: {
    eyebrow: "Joyas ocultas", title: "Lugares secretos de 21 aimags", subtitle: "Elige una provincia y descubre sus joyas ocultas.",
    pick: "Elige provincia", places: "lugares", straight: "Directo", road: "Por carretera", locating: "Buscando ubicacion…",
    addPlan: "Anadir al plan", viewAr: "Ver en AR", offline: "Guardar offline", guide: "Guia AI", routing: "Dibujando ruta…", back: "Volver",
  },
};
