import type { Language } from "../types";

type OfflineStrings = {
  eyebrow: string;
  title: string;
  subtitle: string;
  online: string;
  offline: string;
  offlineNote: string;
  enable: string;
  locating: string;
  denied: string;
  deniedHelp: string;
  unsupported: string;
  youAreHere: string;
  fields: { lat: string; lng: string; alt: string; speed: string; accuracy: string; heading: string };
  na: string;
  signal: { strong: string; good: string; weak: string };
  waypointsTitle: string;
  waypointsHint: string;
  readyTitle: string;
  readyDesc: string;
  converterTitle: string;
  phrasebookTitle: string;
  phrasebookHint: string;
};

export const offlineCopy: Record<Language, OfflineStrings> = {
  mn: {
    eyebrow: "Офлайн төв",
    title: "Сүлжээгүй ч замаа алдахгүй",
    subtitle: "GPS хиймэл дагуулаар ажилладаг тул интернэтгүй үед ч таны байршил, чиглэл, зай шууд харагдана.",
    online: "Онлайн",
    offline: "Офлайн горим",
    offlineNote: "Интернэт алга — гэхдээ GPS, луужин, газрын зураг ажилласаар.",
    enable: "GPS асаах",
    locating: "Хиймэл дагуул хайж байна…",
    denied: "Байршлын зөвшөөрөл хаалттай",
    deniedHelp: "Хөтчийн тохиргооноос байршлыг зөвшөөрнө үү.",
    unsupported: "Энэ төхөөрөмж GPS дэмжихгүй байна.",
    youAreHere: "Таны байршил",
    fields: {
      lat: "Өргөрөг",
      lng: "Уртраг",
      alt: "Өндөр",
      speed: "Хурд",
      accuracy: "Нарийвчлал",
      heading: "Чиглэл",
    },
    na: "—",
    signal: { strong: "Хүчтэй дохио", good: "Дунд зэрэг", weak: "Сул дохио" },
    waypointsTitle: "Ойролцоох газрууд",
    waypointsHint: "Шууд тооцсон зай ба чиглэл",
    readyTitle: "Офлайнд бэлэн",
    readyDesc: "Газрын зураг, валют, хэлний багц татагдсан тул сүлжээгүй аялалд бэлэн.",
    converterTitle: "Валют хөрвүүлэгч",
    phrasebookTitle: "Офлайн хэлц",
    phrasebookHint: "Аяллын хэрэгцээт үгс",
  },
  en: {
    eyebrow: "Offline hub",
    title: "Never lose your way offline",
    subtitle: "GPS runs on satellites, so your position, heading and distances keep working with no internet at all.",
    online: "Online",
    offline: "Offline mode",
    offlineNote: "No internet — but GPS, compass and maps keep running.",
    enable: "Enable GPS",
    locating: "Searching for satellites…",
    denied: "Location permission blocked",
    deniedHelp: "Allow location access in your browser settings.",
    unsupported: "This device does not support GPS.",
    youAreHere: "Your position",
    fields: {
      lat: "Latitude",
      lng: "Longitude",
      alt: "Altitude",
      speed: "Speed",
      accuracy: "Accuracy",
      heading: "Heading",
    },
    na: "—",
    signal: { strong: "Strong signal", good: "Moderate", weak: "Weak signal" },
    waypointsTitle: "Nearby destinations",
    waypointsHint: "Live distance and bearing",
    readyTitle: "Offline ready",
    readyDesc: "Maps, currency and language packs are downloaded, so you're set for trips without signal.",
    converterTitle: "Currency converter",
    phrasebookTitle: "Offline phrasebook",
    phrasebookHint: "Essential travel phrases",
  },
};
