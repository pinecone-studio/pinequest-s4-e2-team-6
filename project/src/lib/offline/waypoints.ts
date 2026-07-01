import type { Language } from "@/components/nomad/types";
import type { LatLng } from "./geo";

export type Waypoint = {
  id: string;
  icon: string;
  coord: LatLng;
  name: Record<Language, string>;
  region: Record<Language, string>;
};

/**
 * Notable Mongolian destinations. Static data → available fully offline so the
 * GPS screen can show live distance + bearing to each without any network.
 */
export const waypoints: Waypoint[] = [
  {
    id: "ub",
    icon: "account_balance",
    coord: { lat: 47.9184, lng: 106.9177 },
    name: { mn: "Улаанбаатар", en: "Ulaanbaatar", zh: "乌兰巴托", ru: "Улан-Батор", es: "Ulaanbaatar" },
    region: { mn: "Нийслэл", en: "Capital", zh: "首都", ru: "Столица", es: "Capital" },
  },
  {
    id: "terelj",
    icon: "landscape",
    coord: { lat: 47.9889, lng: 107.4636 },
    name: { mn: "Горхи-Тэрэлж", en: "Gorkhi-Terelj", zh: "戈尔希-特勒吉", ru: "Горхи-Тэрэлж", es: "Gorkhi-Terelj" },
    region: { mn: "Төв аймаг", en: "Tuv province", zh: "中央省", ru: "Тув аймак", es: "Provincia de Tuv" },
  },
  {
    id: "kharkhorin",
    icon: "temple_buddhist",
    coord: { lat: 47.1974, lng: 102.8414 },
    name: { mn: "Хархорин", en: "Kharkhorin", zh: "哈拉和林", ru: "Хархорин", es: "Kharkhorin" },
    region: { mn: "Эрдэнэ Зуу", en: "Erdene Zuu", zh: "额尔德尼昭", ru: "Эрдэнэ-Зуу", es: "Erdene Zuu" },
  },
  {
    id: "khuvsgul",
    icon: "navigation",
    coord: { lat: 51.0353, lng: 100.4514 },
    name: { mn: "Хөвсгөл нуур", en: "Lake Khuvsgul", zh: "库苏古尔湖", ru: "Озеро Хубсугул", es: "Lago Khuvsgul" },
    region: { mn: "Хөвсгөл аймаг", en: "Khuvsgul province", zh: "库苏古尔省", ru: "Хубсугул аймак", es: "Provincia de Khuvsgul" },
  },
  {
    id: "gobi",
    icon: "hiking",
    coord: { lat: 43.79, lng: 102.25 },
    name: { mn: "Хонгорын элс", en: "Khongoryn Els", zh: "洪戈尔沙丘", ru: "Хонгорын Элс", es: "Khongoryn Els" },
    region: { mn: "Говь", en: "Gobi desert", zh: "戈壁沙漠", ru: "Пустыня Гоби", es: "Desierto del Gobi" },
  },
  {
    id: "altai",
    icon: "landscape",
    coord: { lat: 49.1, lng: 87.8333 },
    name: { mn: "Таван богд", en: "Tavan Bogd", zh: "塔万博格德", ru: "Таван-Богд", es: "Tavan Bogd" },
    region: { mn: "Алтай", en: "Altai mountains", zh: "阿尔泰山", ru: "Алтайские горы", es: "Montanas Altai" },
  },
];
