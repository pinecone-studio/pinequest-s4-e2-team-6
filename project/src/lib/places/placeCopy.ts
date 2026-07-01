import type { Language } from "@/components/nomad/types";
import type { PlaceCategory } from "./types";

export const categoryMeta: Record<PlaceCategory, { icon: string; mn: string; en: string; zh: string; ru: string; es: string }> = {
  RESTAURANT: { icon: "restaurant", mn: "Хоол", en: "Restaurants", zh: "餐厅", ru: "Рестораны", es: "Restaurantes" },
  GROCERY: { icon: "store", mn: "Дэлгүүр", en: "Grocery", zh: "杂货", ru: "Магазины", es: "Tiendas" },
  CAMP: { icon: "cabin", mn: "Гэр буудал", en: "Ger camps", zh: "蒙古包营地", ru: "Гэр-кемпы", es: "Campamentos ger" },
  PALACE: { icon: "account_balance", mn: "Музей/Ордон", en: "Palaces & museums", zh: "宫殿和博物馆", ru: "Дворцы и музеи", es: "Palacios y museos" },
  AIMAG_CENTER: { icon: "location_city", mn: "Аймгийн төв", en: "Aimag center", zh: "省中心", ru: "Центр аймака", es: "Centro de aimag" },
  SUM_CENTER: { icon: "navigation", mn: "Сумын төв", en: "Sum center", zh: "苏木中心", ru: "Центр сума", es: "Centro de sum" },
  NATURE: { icon: "park", mn: "Байгаль", en: "Natural sites", zh: "自然景点", ru: "Природные места", es: "Sitios naturales" },
  HIDDEN_GEM: { icon: "auto_awesome", mn: "Нууц газар", en: "Hidden gems", zh: "隐藏秘境", ru: "Скрытые места", es: "Joyas ocultas" },
};

export function categoryIcon(c: PlaceCategory): string {
  return categoryMeta[c].icon;
}
export function categoryLabel(c: PlaceCategory, lang: Language): string {
  return categoryMeta[c][lang];
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
    empty: "300 км дотор бүртгэлтэй газар алга.",
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
    empty: "No registered places within 300 km.",
    demo: "Preview around Terelj",
    directions: "Directions",
    aiGuide: "AI guide",
    aiLoading: "AI is speaking…",
    away: "away",
    walk: "min walk",
    cached: "Cached",
  },
  zh: {
    all: "全部",
    locating: "正在定位…",
    lowAccuracy: "GPS 信号弱，位置为近似",
    denied: "需要位置权限",
    deniedHelp: "请在浏览器设置中允许位置访问。",
    empty: "300 公里内没有登记地点。",
    demo: "预览特勒吉周边",
    directions: "路线",
    aiGuide: "AI 向导",
    aiLoading: "AI 正在讲述…",
    away: "距离",
    walk: "分钟步行",
    cached: "已缓存",
  },
  ru: {
    all: "Все",
    locating: "Определяем местоположение…",
    lowAccuracy: "Слабый GPS — позиция примерная",
    denied: "Нужно разрешение геолокации",
    deniedHelp: "Разрешите геолокацию в настройках браузера.",
    empty: "Нет зарегистрированных мест в радиусе 300 км.",
    demo: "Демо вокруг Тэрэлжа",
    directions: "Маршрут",
    aiGuide: "AI гид",
    aiLoading: "AI рассказывает…",
    away: "от вас",
    walk: "мин пешком",
    cached: "Сохранено",
  },
  es: {
    all: "Todo",
    locating: "Buscando ubicacion…",
    lowAccuracy: "GPS debil; posicion aproximada",
    denied: "Se requiere ubicacion",
    deniedHelp: "Permite acceso a ubicacion en el navegador.",
    empty: "No hay lugares registrados en 300 km.",
    demo: "Vista previa en Terelj",
    directions: "Direcciones",
    aiGuide: "Guia AI",
    aiLoading: "AI esta hablando…",
    away: "de distancia",
    walk: "min caminando",
    cached: "Guardado",
  },
};
