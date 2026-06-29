import type { Aimag } from "./types";


export const aimags: Aimag[] = [
  { id: "umnugovi", nameMn: "Өмнөговь", nameEn: "Ömnögovi", lat: 43.3, lng: 104.0 },
  { id: "dornogovi", nameMn: "Дорноговь", nameEn: "Dornogovi", lat: 44.5, lng: 110.2 },
  { id: "dundgovi", nameMn: "Дундговь", nameEn: "Dundgovi", lat: 45.6, lng: 106.5 },
  { id: "govisumber", nameMn: "Говьсүмбэр", nameEn: "Govisümber", lat: 46.4, lng: 108.4 },
  { id: "bayankhongor", nameMn: "Баянхонгор", nameEn: "Bayankhongor", lat: 45.2, lng: 100.4 },
  { id: "tuv", nameMn: "Төв", nameEn: "Töv", lat: 47.7, lng: 106.5 },
  { id: "uvurkhangai", nameMn: "Өвөрхангай", nameEn: "Övörkhangai", lat: 46.4, lng: 102.5 },
  { id: "arkhangai", nameMn: "Архангай", nameEn: "Arkhangai", lat: 47.8, lng: 100.8 },
  { id: "bulgan", nameMn: "Булган", nameEn: "Bulgan", lat: 48.8, lng: 103.2 },
  { id: "selenge", nameMn: "Сэлэнгэ", nameEn: "Selenge", lat: 49.8, lng: 106.2 },
  { id: "darkhan", nameMn: "Дархан-Уул", nameEn: "Darkhan-Uul", lat: 49.5, lng: 105.9 },
  { id: "orkhon", nameMn: "Орхон", nameEn: "Orkhon", lat: 49.0, lng: 104.0 },
  { id: "khuvsgul", nameMn: "Хөвсгөл", nameEn: "Khövsgöl", lat: 50.5, lng: 100.0 },
  { id: "zavkhan", nameMn: "Завхан", nameEn: "Zavkhan", lat: 47.8, lng: 96.5 },
  { id: "govi-altai", nameMn: "Говь-Алтай", nameEn: "Govi-Altai", lat: 45.5, lng: 95.5 },
  { id: "khovd", nameMn: "Ховд", nameEn: "Khovd", lat: 47.5, lng: 92.0 },
  { id: "uvs", nameMn: "Увс", nameEn: "Uvs", lat: 49.8, lng: 93.0 },
  { id: "bayan-olgii", nameMn: "Баян-Өлгий", nameEn: "Bayan-Ölgii", lat: 48.5, lng: 89.5 },
  { id: "khentii", nameMn: "Хэнтий", nameEn: "Khentii", lat: 47.9, lng: 110.3 },
  { id: "dornod", nameMn: "Дорнод", nameEn: "Dornod", lat: 47.8, lng: 115.5 },
  { id: "sukhbaatar", nameMn: "Сүхбаатар", nameEn: "Sükhbaatar", lat: 46.3, lng: 113.5 },
];

const byId = new Map(aimags.map((a) => [a.id, a]));
export const aimagById = (id: string) => byId.get(id);


export const MN_BBOX = { minLng: 87.5, maxLng: 120.0, minLat: 41.5, maxLat: 52.3 };

export function projectToMap(lat: number, lng: number, w: number, h: number) {
  const x = ((lng - MN_BBOX.minLng) / (MN_BBOX.maxLng - MN_BBOX.minLng)) * w;
  const y = ((MN_BBOX.maxLat - lat) / (MN_BBOX.maxLat - MN_BBOX.minLat)) * h;
  return { x, y };
}
