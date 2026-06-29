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
    name: { mn: "Улаанбаатар", en: "Ulaanbaatar" },
    region: { mn: "Нийслэл", en: "Capital" },
  },
  {
    id: "terelj",
    icon: "landscape",
    coord: { lat: 47.9889, lng: 107.4636 },
    name: { mn: "Горхи-Тэрэлж", en: "Gorkhi-Terelj" },
    region: { mn: "Төв аймаг", en: "Tuv province" },
  },
  {
    id: "kharkhorin",
    icon: "temple_buddhist",
    coord: { lat: 47.1974, lng: 102.8414 },
    name: { mn: "Хархорин", en: "Kharkhorin" },
    region: { mn: "Эрдэнэ Зуу", en: "Erdene Zuu" },
  },
  {
    id: "khuvsgul",
    icon: "navigation",
    coord: { lat: 51.0353, lng: 100.4514 },
    name: { mn: "Хөвсгөл нуур", en: "Lake Khuvsgul" },
    region: { mn: "Хөвсгөл аймаг", en: "Khuvsgul province" },
  },
  {
    id: "gobi",
    icon: "hiking",
    coord: { lat: 43.79, lng: 102.25 },
    name: { mn: "Хонгорын элс", en: "Khongoryn Els" },
    region: { mn: "Говь", en: "Gobi desert" },
  },
  {
    id: "altai",
    icon: "landscape",
    coord: { lat: 49.1, lng: 87.8333 },
    name: { mn: "Таван богд", en: "Tavan Bogd" },
    region: { mn: "Алтай", en: "Altai mountains" },
  },
];
