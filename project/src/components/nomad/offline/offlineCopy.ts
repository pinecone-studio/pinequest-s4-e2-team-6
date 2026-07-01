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
  zh: {
    eyebrow: "离线中心",
    title: "离线也不会迷路",
    subtitle: "GPS 依靠卫星运行，所以没有网络时也能显示位置、方向和距离。",
    online: "在线",
    offline: "离线模式",
    offlineNote: "没有网络，但 GPS、指南针和地图仍可运行。",
    enable: "开启 GPS",
    locating: "正在搜索卫星…",
    denied: "位置权限被阻止",
    deniedHelp: "请在浏览器设置中允许位置访问。",
    unsupported: "此设备不支持 GPS。",
    youAreHere: "你的位置",
    fields: { lat: "纬度", lng: "经度", alt: "海拔", speed: "速度", accuracy: "精度", heading: "方向" },
    na: "—",
    signal: { strong: "信号强", good: "中等", weak: "信号弱" },
    waypointsTitle: "附近目的地",
    waypointsHint: "实时距离和方位",
    readyTitle: "离线已就绪",
    readyDesc: "地图、货币和语言包已下载，适合无信号旅行。",
    converterTitle: "货币转换器",
    phrasebookTitle: "离线常用语",
    phrasebookHint: "旅行必备短语",
  },
  ru: {
    eyebrow: "Офлайн-центр",
    title: "Не потеряйтесь без интернета",
    subtitle: "GPS работает через спутники, поэтому позиция, направление и расстояния доступны без сети.",
    online: "Онлайн",
    offline: "Офлайн-режим",
    offlineNote: "Интернета нет, но GPS, компас и карты работают.",
    enable: "Включить GPS",
    locating: "Поиск спутников…",
    denied: "Доступ к геолокации заблокирован",
    deniedHelp: "Разрешите геолокацию в настройках браузера.",
    unsupported: "Это устройство не поддерживает GPS.",
    youAreHere: "Ваше местоположение",
    fields: { lat: "Широта", lng: "Долгота", alt: "Высота", speed: "Скорость", accuracy: "Точность", heading: "Курс" },
    na: "—",
    signal: { strong: "Сильный сигнал", good: "Средний", weak: "Слабый сигнал" },
    waypointsTitle: "Ближайшие места",
    waypointsHint: "Живое расстояние и азимут",
    readyTitle: "Готово офлайн",
    readyDesc: "Карты, валюта и языковые пакеты загружены для поездок без сигнала.",
    converterTitle: "Конвертер валют",
    phrasebookTitle: "Офлайн-разговорник",
    phrasebookHint: "Важные фразы для путешествий",
  },
  es: {
    eyebrow: "Centro offline",
    title: "No pierdas el rumbo sin conexion",
    subtitle: "El GPS funciona con satelites, asi que tu posicion, rumbo y distancias siguen disponibles sin internet.",
    online: "Online",
    offline: "Modo offline",
    offlineNote: "Sin internet, pero GPS, brujula y mapas siguen funcionando.",
    enable: "Activar GPS",
    locating: "Buscando satelites…",
    denied: "Permiso de ubicacion bloqueado",
    deniedHelp: "Permite acceso a ubicacion en el navegador.",
    unsupported: "Este dispositivo no soporta GPS.",
    youAreHere: "Tu posicion",
    fields: { lat: "Latitud", lng: "Longitud", alt: "Altitud", speed: "Velocidad", accuracy: "Precision", heading: "Rumbo" },
    na: "—",
    signal: { strong: "Senal fuerte", good: "Moderada", weak: "Senal debil" },
    waypointsTitle: "Destinos cercanos",
    waypointsHint: "Distancia y direccion en vivo",
    readyTitle: "Listo offline",
    readyDesc: "Mapas, moneda e idiomas descargados para viajar sin senal.",
    converterTitle: "Convertidor de moneda",
    phrasebookTitle: "Frases offline",
    phrasebookHint: "Frases esenciales de viaje",
  },
};
