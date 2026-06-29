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

const cf = mk("CAFE");
const sh = mk("SHOP");

/** Cafés + shops across central Ulaanbaatar. */
export const cafeShop: PlannerPlace[] = [
  cf("cf-tomncat", "Tom n Toms", "Tom n Toms", 47.9162, 106.9173, 9000, 45, "08:00-22:00"),
  cf("cf-coffee", "Coffee Nation", "Coffee Nation", 47.9151, 106.9149, 8000, 40, "08:00-21:00"),
  cf("cf-revolution", "Revolution", "Revolution Cafe", 47.9176, 106.9203, 11000, 50, "09:00-22:00"),
  cf("cf-mona", "Мона", "Mona Coffee", 47.9128, 106.9112, 9000, 45, "08:00-20:00"),
  cf("cf-mole", "Mole Coffee", "Mole Coffee", 47.9194, 106.9131, 10000, 45, "08:30-21:00"),
  cf("cf-caffe", "Caffe Bene", "Caffe Bene", 47.9139, 106.9189, 9500, 45, "09:00-22:00"),
  cf("cf-toast", "Toast Bakery", "Toast Bakery", 47.9207, 106.9166, 12000, 50, "08:00-20:00"),
  cf("cf-blackwood", "Blackwood", "Blackwood Coffee", 47.9111, 106.9151, 11000, 50, "09:00-21:00"),
  cf("cf-choco", "Choco Coffee", "Choco Metro", 47.9221, 106.9109, 8500, 40, "08:00-21:00"),
  cf("cf-namuun", "Намуун цай", "Namuun Tea", 47.9099, 106.9119, 7000, 40, "09:00-20:00"),
  sh("sh-statedept", "Улсын Их Дэлгүүр", "State Department Store", 47.9148, 106.9166, 50000, 90, "09:00-22:00"),
  sh("sh-gobi", "Говь кашемир", "Gobi Cashmere", 47.9118, 106.9075, 120000, 60, "10:00-20:00"),
  sh("sh-goyo", "Goyo кашемир", "Goyo Cashmere", 47.9135, 106.9211, 110000, 60, "10:00-20:00"),
  sh("sh-narantuul", "Нарантуул зах", "Narantuul Market", 47.9069, 106.9332, 30000, 120, "09:00-19:00"),
  sh("sh-blackmarket", "Хар зах", "Black Market Souvenirs", 47.9159, 106.9098, 25000, 60, "10:00-18:00"),
  sh("sh-mary", "Mary & Martha", "Mary & Martha Crafts", 47.9166, 106.9143, 35000, 50, "10:00-19:00"),
  sh("sh-ubmall", "UB Дэлгүүр", "UB Mall", 47.9133, 106.9072, 40000, 90, "10:00-22:00"),
  sh("sh-shangri", "Shangri-La Mall", "Shangri-La Mall", 47.9128, 106.9219, 45000, 100, "10:00-22:00"),
  sh("sh-emart", "E-Mart", "E-Mart", 47.9085, 106.9081, 35000, 80, "10:00-22:00"),
  sh("sh-bookstore", "Интерном", "Internom Bookstore", 47.9181, 106.9157, 20000, 50, "10:00-20:00"),
  sh("sh-artgallery", "Урлан худалдаа", "Art Souvenir Shop", 47.9173, 106.9189, 28000, 45, "10:00-19:00"),
  sh("sh-felt", "Эсгий бэлэг", "Felt Craft Store", 47.9144, 106.9118, 22000, 45, "10:00-19:00"),
];
