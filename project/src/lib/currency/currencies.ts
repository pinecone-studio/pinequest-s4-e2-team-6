import type { Language } from "@/components/nomad/types";

export type Currency = {
  code: string;
  symbol: string;
  flag: string;
  name: Record<Language, string>;
};

/** Source currencies the user can convert into Mongolian tögrög (MNT). */
export const currencies: Currency[] = [
  { code: "USD", symbol: "$", flag: "🇺🇸", name: { mn: "АНУ доллар", en: "US Dollar", zh: "美元", ru: "Доллар США", es: "Dolar estadounidense" } },
  { code: "EUR", symbol: "€", flag: "🇪🇺", name: { mn: "Евро", en: "Euro", zh: "欧元", ru: "Евро", es: "Euro" } },
  { code: "CNY", symbol: "¥", flag: "🇨🇳", name: { mn: "Хятад юань", en: "Chinese Yuan", zh: "人民币", ru: "Китайский юань", es: "Yuan chino" } },
  { code: "JPY", symbol: "¥", flag: "🇯🇵", name: { mn: "Япон иен", en: "Japanese Yen", zh: "日元", ru: "Японская иена", es: "Yen japones" } },
  { code: "KRW", symbol: "₩", flag: "🇰🇷", name: { mn: "Солонгос вон", en: "Korean Won", zh: "韩元", ru: "Корейская вона", es: "Won coreano" } },
  { code: "RUB", symbol: "₽", flag: "🇷🇺", name: { mn: "Орос рубль", en: "Russian Ruble", zh: "俄罗斯卢布", ru: "Российский рубль", es: "Rublo ruso" } },
  { code: "GBP", symbol: "£", flag: "🇬🇧", name: { mn: "Фунт стерлинг", en: "British Pound", zh: "英镑", ru: "Британский фунт", es: "Libra esterlina" } },
  { code: "KZT", symbol: "₸", flag: "🇰🇿", name: { mn: "Казах тэнгэ", en: "Kazakh Tenge", zh: "哈萨克斯坦坚戈", ru: "Казахстанский тенге", es: "Tenge kazajo" } },
  { code: "AUD", symbol: "A$", flag: "🇦🇺", name: { mn: "Австрали доллар", en: "Australian Dollar", zh: "澳大利亚元", ru: "Австралийский доллар", es: "Dolar australiano" } },
  { code: "TRY", symbol: "₺", flag: "🇹🇷", name: { mn: "Турк лира", en: "Turkish Lira", zh: "土耳其里拉", ru: "Турецкая лира", es: "Lira turca" } },
];

export const MNT: Currency = {
  code: "MNT",
  symbol: "₮",
  flag: "🇲🇳",
  name: { mn: "Монгол төгрөг", en: "Mongolian Tögrög", zh: "蒙古图格里克", ru: "Монгольский тугрик", es: "Tugrik mongol" },
};

export function findCurrency(code: string): Currency {
  return currencies.find((c) => c.code === code) ?? currencies[0];
}
