import type { Place } from "./types";

const c = (
  id: string,
  nameMn: string,
  nameEn: string,
  category: Place["category"],
  lat: number,
  lng: number,
): Place => ({ id: `cur-${id}`, nameMn, nameEn, category, lat, lng, source: "CURATED" });

/** 21 aimag centres + Ulaanbaatar. */
const aimags: Place[] = [
  c("ub", "Улаанбаатар", "Ulaanbaatar", "AIMAG_CENTER", 47.9184, 106.9177),
  c("arkhangai", "Цэцэрлэг", "Tsetserleg", "AIMAG_CENTER", 47.4769, 101.4503),
  c("bayan-olgii", "Өлгий", "Ölgii", "AIMAG_CENTER", 48.9683, 89.9626),
  c("bayankhongor", "Баянхонгор", "Bayankhongor", "AIMAG_CENTER", 46.1944, 100.7181),
  c("bulgan", "Булган", "Bulgan", "AIMAG_CENTER", 48.8125, 103.5347),
  c("darkhan", "Дархан", "Darkhan", "AIMAG_CENTER", 49.486, 105.9228),
  c("dornod", "Чойбалсан", "Choibalsan", "AIMAG_CENTER", 48.0716, 114.5219),
  c("dornogovi", "Сайншанд", "Sainshand", "AIMAG_CENTER", 44.8917, 110.1364),
  c("dundgovi", "Мандалговь", "Mandalgovi", "AIMAG_CENTER", 45.7625, 106.2708),
  c("govi-altai", "Алтай", "Altai", "AIMAG_CENTER", 46.3727, 96.2566),
  c("govisumber", "Чойр", "Choir", "AIMAG_CENTER", 46.3611, 108.3631),
  c("khentii", "Чингис хот", "Chinggis City", "AIMAG_CENTER", 47.3194, 110.6556),
  c("khovd", "Ховд", "Khovd", "AIMAG_CENTER", 48.0056, 91.6419),
  c("khuvsgul", "Мөрөн", "Mörön", "AIMAG_CENTER", 49.6342, 100.1625),
  c("umnugovi", "Даланзадгад", "Dalanzadgad", "AIMAG_CENTER", 43.5708, 104.425),
  c("orkhon", "Эрдэнэт", "Erdenet", "AIMAG_CENTER", 49.0349, 104.0444),
  c("uvurkhangai", "Арвайхээр", "Arvaikheer", "AIMAG_CENTER", 46.2639, 102.775),
  c("selenge", "Сүхбаатар хот", "Sükhbaatar", "AIMAG_CENTER", 50.2364, 106.2069),
  c("sukhbaatar", "Баруун-Урт", "Baruun-Urt", "AIMAG_CENTER", 46.6806, 113.2792),
  c("tuv", "Зуунмод", "Zuunmod", "AIMAG_CENTER", 47.7064, 106.9525),
  c("uvs", "Улаангом", "Ulaangom", "AIMAG_CENTER", 49.9811, 92.0667),
  c("zavkhan", "Улиастай", "Uliastai", "AIMAG_CENTER", 47.7417, 96.8444),
];

/** Famous natural sites, monasteries, camps and hidden gems. */
const sites: Place[] = [
  c("terelj", "Горхи-Тэрэлж", "Gorkhi-Terelj", "NATURE", 47.9889, 107.4636),
  c("khustai", "Хустайн нуруу", "Khustai NP", "NATURE", 47.7, 105.9),
  c("khuvsgul-lake", "Хөвсгөл нуур", "Lake Khövsgöl", "NATURE", 51.0353, 100.4514),
  c("khongor", "Хонгорын элс", "Khongoryn Els", "NATURE", 43.79, 102.25),
  c("yolyn-am", "Ёлын ам", "Yolyn Am", "NATURE", 43.4847, 104.0717),
  c("orkhon-fall", "Орхоны хүрхрээ", "Orkhon Waterfall", "NATURE", 46.7894, 101.9606),
  c("tsenkher", "Цэнхэрийн рашаан", "Tsenkher Springs", "HIDDEN_GEM", 47.3167, 101.65),
  c("naiman", "Найман нуур", "Naiman Lake", "HIDDEN_GEM", 46.55, 101.5167),
  c("elsen", "Элсэн тасархай", "Elsen Tasarkhai", "NATURE", 47.2, 103.75),
  c("erdene-zuu", "Эрдэнэ Зуу", "Erdene Zuu", "PALACE", 47.2017, 102.8425),
  c("amarbayasgalant", "Амарбаясгалант", "Amarbayasgalant", "PALACE", 49.4783, 105.0875),
  c("chinggis-statue", "Чингисийн хөшөө", "Chinggis Statue", "PALACE", 47.8083, 107.5306),
  c("gandan", "Гандан хийд", "Gandan Monastery", "PALACE", 47.9211, 106.8944),
  c("bogd-palace", "Богд хааны ордон", "Bogd Khan Palace", "PALACE", 47.8869, 106.91),
  c("nat-museum", "Үндэсний музей", "National Museum", "PALACE", 47.9197, 106.9175),
  c("aryabal", "Арьяабал хийд", "Aryabal Temple", "PALACE", 47.93, 107.45),
  c("turtle", "Мэлхий хад", "Turtle Rock", "HIDDEN_GEM", 47.91, 107.42),
  c("terelj-camp", "Тэрэлж гэр буудал", "Terelj Ger Camp", "CAMP", 47.98, 107.45),
  c("khustai-camp", "Хустай гэр буудал", "Khustai Ger Camp", "CAMP", 47.71, 105.91),
];

export const curatedPlaces: Place[] = [...aimags, ...sites];

/** Demo anchor (Terelj) so the AR scene populates even outside Mongolia. */
export const DEMO_LOCATION = { lat: 47.985, lng: 107.46 };
