import type { Language } from "../types";

type CurrencyStrings = {
  eyebrow: string;
  title: string;
  subtitle: string;
  amountLabel: string;
  fromLabel: string;
  resultLabel: string;
  tableTitle: string;
  tableHint: string;
  live: string;
  cached: string;
  updated: string;
  refresh: string;
  loading: string;
  error: string;
};

export const currencyCopy: Record<Language, CurrencyStrings> = {
  mn: {
    eyebrow: "Валют хөрвүүлэгч",
    title: "Шууд ханшаар төгрөг рүү",
    subtitle: "Доллар, евро, юань, иен, вон зэрэг бүх валютыг бодит ханшаар MNT руу хөрвүүлнэ.",
    amountLabel: "Дүн",
    fromLabel: "Эх валют",
    resultLabel: "Монгол төгрөг",
    tableTitle: "1 нэгжийн ханш",
    tableHint: "MNT-ээр",
    live: "Шууд ханш",
    cached: "Хадгалсан ханш",
    updated: "Шинэчилсэн",
    refresh: "Шинэчлэх",
    loading: "Ханш татаж байна…",
    error: "Ханш татаж чадсангүй. Дахин оролдоно уу.",
  },
  en: {
    eyebrow: "Currency converter",
    title: "Live rates into tögrög",
    subtitle: "Convert any currency — dollar, euro, yuan, yen, won and more — into MNT at real exchange rates.",
    amountLabel: "Amount",
    fromLabel: "From currency",
    resultLabel: "Mongolian tögrög",
    tableTitle: "Rate per unit",
    tableHint: "in MNT",
    live: "Live rate",
    cached: "Cached rate",
    updated: "Updated",
    refresh: "Refresh",
    loading: "Fetching rates…",
    error: "Couldn't load rates. Please try again.",
  },
  zh: {
    eyebrow: "货币转换器",
    title: "实时汇率换算为图格里克",
    subtitle: "把美元、欧元、人民币、日元、韩元等货币按实时汇率转换为 MNT。",
    amountLabel: "金额",
    fromLabel: "原货币",
    resultLabel: "蒙古图格里克",
    tableTitle: "每 1 单位汇率",
    tableHint: "以 MNT 计",
    live: "实时汇率",
    cached: "缓存汇率",
    updated: "已更新",
    refresh: "刷新",
    loading: "正在获取汇率…",
    error: "无法加载汇率。请重试。",
  },
  ru: {
    eyebrow: "Конвертер валют",
    title: "Курс в тугрики онлайн",
    subtitle: "Конвертируйте доллары, евро, юани, иены, воны и другие валюты в MNT по реальному курсу.",
    amountLabel: "Сумма",
    fromLabel: "Из валюты",
    resultLabel: "Монгольский тугрик",
    tableTitle: "Курс за единицу",
    tableHint: "в MNT",
    live: "Живой курс",
    cached: "Сохраненный курс",
    updated: "Обновлено",
    refresh: "Обновить",
    loading: "Загрузка курсов…",
    error: "Не удалось загрузить курсы. Попробуйте снова.",
  },
  es: {
    eyebrow: "Convertidor de moneda",
    title: "Tasas en vivo a tugrik",
    subtitle: "Convierte dolar, euro, yuan, yen, won y mas a MNT con tasas reales.",
    amountLabel: "Cantidad",
    fromLabel: "Moneda origen",
    resultLabel: "Tugrik mongol",
    tableTitle: "Tasa por unidad",
    tableHint: "en MNT",
    live: "Tasa en vivo",
    cached: "Tasa guardada",
    updated: "Actualizado",
    refresh: "Actualizar",
    loading: "Cargando tasas…",
    error: "No se pudieron cargar las tasas. Intenta de nuevo.",
  },
};

/** Format a tögrög value with thousands separators, no decimals. */
export function formatMnt(value: number): string {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Math.round(value));
}

/** Relative-ish "time ago" label from a unix-seconds timestamp. */
export function timeAgo(unix: number | null, language: Language): string {
  if (!unix) return "—";
  const mins = Math.max(0, Math.round((nowSeconds() - unix) / 60));
  if (mins < 1) return { mn: "дөнгөж сая", en: "just now", zh: "刚刚", ru: "только что", es: "ahora" }[language];
  if (mins < 60) return `${mins}${language === "mn" || language === "ru" ? " мин" : "m"}`;
  const hrs = Math.round(mins / 60);
  return `${hrs}${language === "mn" ? " цаг" : language === "ru" ? " ч" : "h"}`;
}

function nowSeconds(): number {
  return Math.floor(Date.now() / 1000);
}
