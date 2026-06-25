export type Gem = {
  id: number;
  title: string;
  region: string;
  description: string;
  crowdLevel: string;
  aesthetic: number;
  bestSeason: string;
  distance: string;
  image: string;
  tag: string;
};

export const gems: Gem[] = [
  {
    id: 1,
    title: "Хагийн Хар нуур",
    region: "Төв аймаг",
    description: "Ойн гүн дэх тунгалаг нуур, майхан аялал болон тайван зураг авалтад тохиромжтой.",
    crowdLevel: "Маш бага",
    aesthetic: 9.8,
    bestSeason: "VI-IX сар",
    distance: "УБ-аас 180 км",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    tag: "Нуур",
  },
  {
    id: 2,
    title: "Найман нуур",
    region: "Өвөрхангай",
    description: "Галт уулын гаралтай нуурын бүс, морин аялал, од харах аялалд онцгой.",
    crowdLevel: "Бага",
    aesthetic: 9.5,
    bestSeason: "VII-IX сар",
    distance: "УБ-аас 540 км",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    tag: "Морин аялал",
  },
  {
    id: 3,
    title: "Бага газрын чулуу",
    region: "Дундговь",
    description: "Боржин хад, нам гүм тал, богино хугацааны road trip-д хамгийн эвтэйхэн зогсоол.",
    crowdLevel: "Дунд",
    aesthetic: 9.1,
    bestSeason: "V-X сар",
    distance: "УБ-аас 250 км",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    tag: "Хад",
  },
];

export const gemFilters = ["Бүгд", "Нуур", "Хад", "Морин аялал"];
