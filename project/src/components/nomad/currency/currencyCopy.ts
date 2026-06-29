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
};

/** Format a tögrög value with thousands separators, no decimals. */
export function formatMnt(value: number): string {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Math.round(value));
}

/** Relative-ish "time ago" label from a unix-seconds timestamp. */
export function timeAgo(unix: number | null, language: Language): string {
  if (!unix) return "—";
  const mins = Math.max(0, Math.round((nowSeconds() - unix) / 60));
  if (mins < 1) return language === "mn" ? "дөнгөж сая" : "just now";
  if (mins < 60) return `${mins}${language === "mn" ? " мин" : "m"}`;
  const hrs = Math.round(mins / 60);
  return `${hrs}${language === "mn" ? " цаг" : "h"}`;
}

function nowSeconds(): number {
  return Math.floor(Date.now() / 1000);
}
