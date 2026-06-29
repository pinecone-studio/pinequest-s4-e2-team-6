import type { Language } from "@/components/nomad/types";

export type Currency = {
  code: string;
  symbol: string;
  flag: string;
  name: Record<Language, string>;
};

/** Source currencies the user can convert into Mongolian tögrög (MNT). */
export const currencies: Currency[] = [
  { code: "USD", symbol: "$", flag: "🇺🇸", name: { mn: "АНУ доллар", en: "US Dollar" } },
  { code: "EUR", symbol: "€", flag: "🇪🇺", name: { mn: "Евро", en: "Euro" } },
  { code: "CNY", symbol: "¥", flag: "🇨🇳", name: { mn: "Хятад юань", en: "Chinese Yuan" } },
  { code: "JPY", symbol: "¥", flag: "🇯🇵", name: { mn: "Япон иен", en: "Japanese Yen" } },
  { code: "KRW", symbol: "₩", flag: "🇰🇷", name: { mn: "Солонгос вон", en: "Korean Won" } },
  { code: "RUB", symbol: "₽", flag: "🇷🇺", name: { mn: "Орос рубль", en: "Russian Ruble" } },
  { code: "GBP", symbol: "£", flag: "🇬🇧", name: { mn: "Фунт стерлинг", en: "British Pound" } },
  { code: "KZT", symbol: "₸", flag: "🇰🇿", name: { mn: "Казах тэнгэ", en: "Kazakh Tenge" } },
  { code: "AUD", symbol: "A$", flag: "🇦🇺", name: { mn: "Австрали доллар", en: "Australian Dollar" } },
  { code: "TRY", symbol: "₺", flag: "🇹🇷", name: { mn: "Турк лира", en: "Turkish Lira" } },
];

export const MNT: Currency = {
  code: "MNT",
  symbol: "₮",
  flag: "🇲🇳",
  name: { mn: "Монгол төгрөг", en: "Mongolian Tögrög" },
};

export function findCurrency(code: string): Currency {
  return currencies.find((c) => c.code === code) ?? currencies[0];
}
