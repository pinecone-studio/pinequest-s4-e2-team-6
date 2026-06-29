import type { Gem, GemCategory, Reach, Season, Difficulty } from "../types";

const g = (
  id: string, mn: string, en: string, aimag: string, cat: GemCategory,
  lat: number, lng: number, reach: Reach, season: Season, diff: Difficulty,
): Gem => ({ id, nameMn: mn, nameEn: en, aimag, category: cat, lat, lng, reach, season, difficulty: diff });

/** Central aimags. */
export const centralGems: Gem[] = [
  g("terelj", "Горхи-Тэрэлж", "Gorkhi-Terelj", "tuv", "NATURE", 47.9889, 107.4636, "car", "summer", "easy"),
  g("khustai", "Хустайн нуруу", "Khustai NP", "tuv", "WILDLIFE", 47.7, 105.9, "car", "summer", "easy"),
  g("chinggis-statue", "Чингисийн хөшөө", "Chinggis Statue", "tuv", "HISTORY", 47.8083, 107.5306, "car", "all", "easy"),
  g("manzushir", "Манзушир хийд", "Manzushir Monastery", "tuv", "MONASTERY", 47.74, 106.99, "car", "all", "moderate"),
  g("turtle-rock", "Мэлхий хад", "Turtle Rock", "tuv", "NATURE", 47.91, 107.42, "car", "summer", "easy"),
  g("orkhon-fall", "Орхоны хүрхрээ", "Orkhon Waterfall", "uvurkhangai", "NATURE", 46.7894, 101.9606, "car", "summer", "moderate"),
  g("erdene-zuu", "Эрдэнэ Зуу", "Erdene Zuu", "uvurkhangai", "MONASTERY", 47.2017, 102.8425, "car", "all", "easy"),
  g("tuvkhun", "Төвхөн хийд", "Tövkhön Monastery", "uvurkhangai", "MONASTERY", 46.9333, 102.25, "hike", "summer", "moderate"),
  g("naiman-nuur", "Найман нуур", "Naiman Lakes", "uvurkhangai", "LAKE", 46.55, 101.5167, "horse", "summer", "hard"),
  g("tsenkher", "Цэнхэрийн рашаан", "Tsenkher Hot Springs", "arkhangai", "HOTSPRING", 47.3167, 101.65, "car", "all", "easy"),
  g("terkhiin", "Тэрхийн цагаан нуур", "Terkhiin Tsagaan Lake", "arkhangai", "LAKE", 48.16, 99.7, "car", "summer", "moderate"),
  g("khorgo", "Хорго галт уул", "Khorgo Volcano", "arkhangai", "MOUNTAIN", 48.18, 99.86, "hike", "summer", "moderate"),
  g("taikhar", "Тайхар чулуу", "Taikhar Chuluu", "arkhangai", "HISTORY", 47.6, 101.3, "car", "all", "easy"),
  g("uran-togoo", "Уран-Тогоо", "Uran-Togoo Volcano", "bulgan", "MOUNTAIN", 49.0, 102.74, "car", "summer", "easy"),
  g("khugnu-khan", "Хөгнө хан", "Khögnö Khan", "bulgan", "NATURE", 47.4, 103.6, "car", "summer", "moderate"),
  g("elsen-tasarkhai", "Элсэн тасархай", "Elsen Tasarkhai", "bulgan", "DESERT", 47.2, 103.75, "car", "summer", "easy"),
  g("amarbayasgalant", "Амарбаясгалант", "Amarbayasgalant", "selenge", "MONASTERY", 49.4783, 105.0875, "car", "all", "easy"),
  g("eg-selenge", "Эг-Сэлэнгийн бэлчир", "Eg-Selenge Confluence", "selenge", "NATURE", 49.3, 103.8, "car", "summer", "moderate"),
  g("kharagiin", "Харагийн хийд", "Kharagiin Monastery", "darkhan", "MONASTERY", 49.49, 105.92, "car", "all", "easy"),
  g("erdenet-mine", "Эрдэнэт", "Erdenet Mining City", "orkhon", "HISTORY", 49.03, 104.04, "car", "all", "easy"),
];
