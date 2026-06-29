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

const ho = mk("HOTEL");
const pk = mk("PARK");
const ot = mk("OTHER");

/** Hotels, parks and a few extras. */
export const stayPark: PlannerPlace[] = [
  ho("ho-shangri", "Шангри-Ла", "Shangri-La Hotel", 47.9128, 106.9221, 450000, 30, "00:00-24:00"),
  ho("ho-bluesky", "Цэнхэр тэнгэр", "Blue Sky Hotel", 47.9163, 106.9171, 380000, 30, "00:00-24:00"),
  ho("ho-kempinski", "Кемпински", "Kempinski Khan Palace", 47.9156, 106.9248, 360000, 30, "00:00-24:00"),
  ho("ho-ramada", "Рамада", "Ramada Ulaanbaatar", 47.9171, 106.9213, 280000, 30, "00:00-24:00"),
  ho("ho-bayangol", "Баянгол", "Bayangol Hotel", 47.9112, 106.9152, 240000, 30, "00:00-24:00"),
  ho("ho-ub", "УБ зочид буудал", "Ulaanbaatar Hotel", 47.9182, 106.9189, 260000, 30, "00:00-24:00"),
  ho("ho-corporate", "Корпорейт", "Corporate Hotel", 47.9148, 106.9201, 300000, 30, "00:00-24:00"),
  ho("ho-springs", "Springs", "Springs Hotel", 47.9135, 106.9088, 180000, 30, "00:00-24:00"),
  ho("ho-zaya", "Зая зочид буудал", "Zaya Hostel", 47.9159, 106.9121, 60000, 30, "00:00-24:00"),
  ho("ho-lotus", "Лотус гэст", "Lotus Guesthouse", 47.9201, 106.9098, 55000, 30, "00:00-24:00"),
  pk("pk-national", "Үндэсний цэцэрлэгт хүрээлэн", "National Park", 47.9043, 106.9201, 5000, 70, "08:00-22:00"),
  pk("pk-children", "Хүүхдийн парк", "Children's Park", 47.9148, 106.9229, 6000, 60, "09:00-21:00"),
  pk("pk-buddha", "Будда парк", "Buddha Park", 47.8921, 106.9148, 0, 50, "08:00-20:00"),
  pk("pk-amusement", "Their World парк", "Amusement Park", 47.9121, 106.9241, 15000, 90, "11:00-21:00"),
  pk("pk-river", "Сэлбэ голын зүүлэг", "Selbe Riverwalk", 47.9211, 106.9181, 0, 45, "00:00-24:00"),
  pk("pk-botanic", "Ботаник цэцэрлэг", "Botanical Garden", 47.8956, 106.9089, 4000, 60, "09:00-19:00"),
  pk("pk-friendship", "Найрамдал цэцэрлэг", "Friendship Park", 47.9078, 106.8951, 0, 50, "08:00-21:00"),
  ot("ot-spa", "Sasha спа", "Sasha Spa", 47.9143, 106.9176, 90000, 90, "10:00-22:00"),
  ot("ot-cinema", "Тэнгис кино театр", "Tengis Cinema", 47.9172, 106.9221, 18000, 130, "10:00-23:00"),
  ot("ot-circus", "Улсын цирк", "State Circus", 47.9134, 106.9061, 25000, 90, "16:00-20:00"),
];
