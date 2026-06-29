import type { Gem, GemCategory, Reach, Season, Difficulty } from "../types";

const g = (
  id: string, mn: string, en: string, aimag: string, cat: GemCategory,
  lat: number, lng: number, reach: Reach, season: Season, diff: Difficulty,
): Gem => ({ id, nameMn: mn, nameEn: en, aimag, category: cat, lat, lng, reach, season, difficulty: diff });

/** Southern / Gobi aimags. */
export const gobiGems: Gem[] = [
  g("khongor", "Хонгорын элс", "Khongoryn Els", "umnugovi", "DESERT", 43.79, 102.25, "car", "summer", "moderate"),
  g("yolyn-am", "Ёлын ам", "Yolyn Am", "umnugovi", "NATURE", 43.4847, 104.0717, "car", "summer", "easy"),
  g("bayanzag", "Баянзаг", "Bayanzag (Flaming Cliffs)", "umnugovi", "HISTORY", 44.1389, 103.7264, "car", "summer", "easy"),
  g("khermen-tsav", "Хэрмэн цав", "Khermen Tsav", "umnugovi", "DESERT", 43.47, 99.85, "car", "summer", "hard"),
  g("gurvansaikhan", "Гурвансайхан", "Gurvan Saikhan Mts", "umnugovi", "MOUNTAIN", 43.5, 104.0, "car", "summer", "moderate"),
  g("tsagaan-suvarga", "Цагаан суварга", "Tsagaan Suvarga", "dundgovi", "NATURE", 44.597, 105.735, "car", "summer", "easy"),
  g("baga-gazriin", "Бага газрын чулуу", "Baga Gazriin Chuluu", "dundgovi", "NATURE", 46.18, 106.02, "car", "all", "easy"),
  g("ikh-gazriin", "Их газрын чулуу", "Ikh Gazriin Chuluu", "dundgovi", "NATURE", 45.55, 107.7, "car", "all", "moderate"),
  g("khamar", "Хамарын хийд", "Khamar Monastery", "dornogovi", "MONASTERY", 44.6, 110.27, "car", "all", "easy"),
  g("ikh-nart", "Их нарт", "Ikh Nart Reserve", "dornogovi", "WILDLIFE", 45.7, 108.6, "car", "summer", "moderate"),
  g("senjit", "Сэнжит хад", "Senjit Khad", "dornogovi", "NATURE", 44.0, 110.2, "car", "summer", "easy"),
  g("shargaljuut", "Шаргалжуутын рашаан", "Shargaljuut Springs", "bayankhongor", "HOTSPRING", 46.32, 100.92, "car", "all", "easy"),
  g("orog-nuur", "Орог нуур", "Orog Lake", "bayankhongor", "LAKE", 45.05, 100.7, "car", "summer", "moderate"),
  g("bichigt", "Биткт хад", "Bichigt Rock Art", "bayankhongor", "HISTORY", 45.2, 99.9, "car", "summer", "moderate"),
  g("choir-lus", "Лусын хийд", "Lus Monastery", "govisumber", "MONASTERY", 46.36, 108.36, "car", "all", "easy"),
];
