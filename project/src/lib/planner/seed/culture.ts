import type { PlannerCategory, PlannerPlace } from "../types";

const mk =
  (category: PlannerCategory) =>
  (id: string, mn: string, en: string, lat: number, lng: number, price: number, durationMin: number, openHours: string): PlannerPlace => ({
    id,
    nameMn: mn,
    nameEn: en,
    category,
    lat,
    lng,
    price,
    durationMin,
    openHours,
  });

const mu = mk("MUSEUM");
const ld = mk("LANDMARK");

/** Museums + landmarks in central Ulaanbaatar. */
export const culture: PlannerPlace[] = [
  mu("mu-national", "Үндэсний музей", "National Museum", 47.9197, 106.9175, 12000, 90, "09:00-18:00"),
  mu("mu-fineart", "Дүрслэх урлагийн музей", "Zanabazar Fine Arts Museum", 47.9173, 106.9148, 10000, 75, "09:00-18:00"),
  mu("mu-bogd", "Богд хааны ордон", "Bogd Khan Palace Museum", 47.8869, 106.9100, 12000, 90, "10:00-17:00"),
  mu("mu-choijin", "Чойжин ламын сүм", "Choijin Lama Temple", 47.9148, 106.9183, 10000, 60, "09:00-17:00"),
  mu("mu-nathist", "Байгалийн түүхийн музей", "Natural History Museum", 47.9189, 106.9162, 9000, 70, "10:00-18:00"),
  mu("mu-intelmus", "Оюуны музей", "Intellectual Museum", 47.9226, 106.9213, 11000, 60, "10:00-18:00"),
  mu("mu-railway", "Төмөр замын музей", "Railway Museum", 47.9051, 106.9088, 5000, 45, "10:00-17:00"),
  mu("mu-theatre", "Дуурь бүжгийн театр", "Opera & Ballet Theatre", 47.9171, 106.9178, 30000, 120, "17:00-21:00"),
  mu("mu-mongolart", "Монгол урлагийн галерей", "Mongolian Art Gallery", 47.9159, 106.9202, 8000, 50, "10:00-18:00"),
  mu("mu-victims", "Улс төрийн хэлмэгдэгсэд", "Memorial Museum", 47.9165, 106.9094, 6000, 50, "10:00-17:00"),
  mu("mu-wax", "Чингис хаан музей", "Chinggis Khaan Museum", 47.9211, 106.9156, 15000, 100, "10:00-18:00"),
  mu("mu-puppet", "Хүүхэлдэйн театр", "Puppet Theatre", 47.9182, 106.9211, 12000, 70, "11:00-19:00"),
  ld("ld-sukhbaatar", "Сүхбаатарын талбай", "Sükhbaatar Square", 47.9186, 106.9177, 0, 40, "00:00-24:00"),
  ld("ld-gandan", "Гандан хийд", "Gandan Monastery", 47.9211, 106.8944, 8000, 70, "09:00-17:00"),
  ld("ld-zaisan", "Зайсан толгой", "Zaisan Memorial", 47.8932, 106.9156, 0, 60, "00:00-24:00"),
  ld("ld-bjg", "Их Засаг хаалга", "Government Palace", 47.9203, 106.9173, 0, 30, "09:00-18:00"),
  ld("ld-greench", "Ногоон ордон", "Green Palace Grounds", 47.8861, 106.9112, 0, 40, "09:00-18:00"),
  ld("ld-statue", "Сүхбаатарын хөшөө", "Sükhbaatar Statue", 47.9189, 106.9176, 0, 20, "00:00-24:00"),
  ld("ld-clock", "Цагийн цамхаг", "Central Tower Plaza", 47.9165, 106.9168, 0, 30, "00:00-24:00"),
  ld("ld-beatles", "Битлзийн талбай", "Beatles Square", 47.9156, 106.9159, 0, 25, "00:00-24:00"),
];
