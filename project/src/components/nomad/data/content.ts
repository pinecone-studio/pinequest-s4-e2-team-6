import type { NavItem } from "../types";

export const navItems: NavItem[] = [
  { id: "discover", label: "Нээх", icon: "explore" },
  { id: "camera", label: "AI камер", icon: "photo_camera" },
  { id: "ar", label: "AR", icon: "view_in_ar" },
  { id: "planner", label: "Төлөвлөгч", icon: "event_note" },
  { id: "gems", label: "Далд газрууд", icon: "landscape" },
  { id: "culture", label: "Соёл", icon: "temple_buddhist" },
  { id: "offline", label: "Офлайн", icon: "cloud_download" },
  { id: "safety", label: "Аюулгүй", icon: "security" },
];

export const images = {
  steppe: "https://images.unsplash.com/photo-1528543606781-2f6e6857f318?auto=format&fit=crop&w=1600&q=80",
  terelj: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80",
  mountain: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
  map: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80",
};

export const hiddenGems = [
  ["Хагийн Хар нуур", "Төв аймаг", "Морь эсвэл явган аяллаар хүрэх нам гүм нуур.", "9.8"],
  ["Найман нуур", "Өвөрхангай", "Галт уулын гаралтай нуурын бүс, од харахад тохиромжтой.", "9.5"],
  ["Бага газрын чулуу", "Дундговь", "Боржин хад, богино road trip-д эвтэйхэн зогсоол.", "9.1"],
  ["Тэрэлжийн Мэлхий хад", "Төв аймаг", "Домог, байгалийн тогтоц, зураг авалтын алдартай цэг.", "9.4"],
];

export const planStops = [
  ["10:00", "Монголын Үндэсний музей", "Түүх, угсаатны үзмэрүүдийг богино хугацаанд үзнэ.", "1.5 цаг", "15,000₮"],
  ["11:45", "Өдрийн хоол: Зочин кафе", "Хуушуур, сүүтэй цайтай ойрхон, төсөвт ээлтэй сонголт.", "1 цаг", "12,000₮"],
  ["13:00", "Сүхбаатарын талбай", "Архитектур, хотын төвийн өргөн өнцгийн зураг авах цэг.", "45 мин", "Үнэгүй"],
];
