import type { Gem, GemCategory, Reach, Season, Difficulty } from "../types";

const g = (
  id: string, mn: string, en: string, aimag: string, cat: GemCategory,
  lat: number, lng: number, reach: Reach, season: Season, diff: Difficulty,
): Gem => ({ id, nameMn: mn, nameEn: en, aimag, category: cat, lat, lng, reach, season, difficulty: diff });


export const westEastGems: Gem[] = [
  g("khuvsgul-lake", "Хөвсгөл нуур", "Lake Khövsgöl", "khuvsgul", "LAKE", 51.0353, 100.4514, "car", "summer", "easy"),
  g("khoridol", "Хорьдол сарьдаг", "Khoridol Saridag", "khuvsgul", "MOUNTAIN", 51.0, 99.8, "hike", "summer", "hard"),
  g("uushgiin", "Уушгийн өвөр", "Uushgiin Deer Stones", "khuvsgul", "HISTORY", 49.65, 100.13, "car", "all", "easy"),
  g("jankhai", "Жанхайн даваа", "Jankhai Pass", "khuvsgul", "NATURE", 51.2, 100.5, "car", "summer", "moderate"),
  g("otgontenger", "Отгонтэнгэр", "Otgontenger Peak", "zavkhan", "MOUNTAIN", 46.76, 97.55, "hike", "summer", "hard"),
  g("khar-nuur", "Хар нуур", "Khar Lake", "zavkhan", "LAKE", 48.05, 93.25, "car", "summer", "moderate"),
  g("eej-khairkhan", "Ээж хайрхан", "Eej Khairkhan", "govi-altai", "MOUNTAIN", 46.3, 94.2, "car", "summer", "hard"),
  g("sutai", "Сутай хайрхан", "Sutai Mountain", "govi-altai", "MOUNTAIN", 46.5, 93.6, "hike", "summer", "hard"),
  g("khar-us", "Хар-Ус нуур", "Khar-Us Lake", "khovd", "LAKE", 48.0, 92.3, "car", "summer", "easy"),
  g("tsambagarav", "Цамбагарав", "Tsambagarav", "khovd", "MOUNTAIN", 48.65, 90.85, "hike", "summer", "hard"),
  g("uvs-nuur", "Увс нуур", "Uvs Lake", "uvs", "LAKE", 50.33, 92.78, "car", "summer", "moderate"),
  g("kharkhiraa", "Хархираа-Түргэн", "Kharkhiraa Turgen", "uvs", "MOUNTAIN", 49.7, 91.5, "horse", "summer", "hard"),
  g("tavan-bogd", "Таван богд", "Tavan Bogd", "bayan-olgii", "MOUNTAIN", 49.1, 87.83, "hike", "summer", "hard"),
  g("khoton", "Хотон-Хургал нуур", "Khoton-Khurgan Lakes", "bayan-olgii", "LAKE", 48.65, 88.3, "car", "summer", "moderate"),
  g("sagsai-eagle", "Сагсай бүргэдчид", "Sagsai Eagle Hunters", "bayan-olgii", "WILDLIFE", 48.9, 89.7, "car", "winter", "easy"),
  g("burkhan-khaldun", "Бурхан халдун", "Burkhan Khaldun", "khentii", "MOUNTAIN", 48.78, 108.65, "horse", "summer", "hard"),
  g("baldan-bereeven", "Балдан бэрээвэн", "Baldan Bereeven", "khentii", "MONASTERY", 48.18, 109.47, "car", "all", "moderate"),
  g("deluun-boldog", "Дэлүүн болдог", "Deluun Boldog", "khentii", "HISTORY", 48.55, 110.0, "car", "summer", "easy"),
  g("khalkhin-gol", "Халхын гол", "Khalkhin Gol", "dornod", "HISTORY", 47.7, 118.6, "car", "summer", "moderate"),
  g("buir-nuur", "Буйр нуур", "Buir Lake", "dornod", "LAKE", 47.8, 117.6, "car", "summer", "moderate"),
  g("shiliin-bogd", "Шилийн богд", "Shiliin Bogd Volcano", "sukhbaatar", "MOUNTAIN", 45.45, 114.6, "car", "summer", "moderate"),
  g("ganga-nuur", "Ганга нуур", "Ganga Lake", "sukhbaatar", "LAKE", 45.3, 114.0, "car", "summer", "easy"),
];
