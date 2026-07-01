/** Essential travel phrases. Static data → the phrasebook works fully offline.
 *  `mn` is the Mongolian phrase, `pron` a latin pronunciation hint, and the
 *  `en`/`ru`/`zh`/`es` fields are the source language the traveler reads from. */
export type Phrase = {
  id: string;
  icon: string;
  mn: string;
  pron: string;
  en: string;
  ru: string;
  zh: string;
  es: string;
};

export type PhraseSource = "en" | "ru" | "zh" | "es";

export const phrases: Phrase[] = [
  { id: "hello", icon: "person", mn: "Сайн байна уу", pron: "Sain baina uu", en: "Hello", ru: "Здравствуйте", zh: "你好", es: "Hola" },
  { id: "thanks", icon: "check_circle", mn: "Баярлалаа", pron: "Bayarlalaa", en: "Thank you", ru: "Спасибо", zh: "谢谢", es: "Gracias" },
  { id: "yes", icon: "check_circle", mn: "Тийм", pron: "Tiim", en: "Yes", ru: "Да", zh: "是", es: "Si" },
  { id: "no", icon: "block", mn: "Үгүй", pron: "Ügüi", en: "No", ru: "Нет", zh: "不是 / 不", es: "No" },
  { id: "please", icon: "auto_awesome", mn: "Гуйя", pron: "Guiya", en: "Please", ru: "Пожалуйста", zh: "请", es: "Por favor" },
  { id: "sorry", icon: "psychology", mn: "Уучлаарай", pron: "Uuchlaarai", en: "Sorry / Excuse me", ru: "Извините", zh: "对不起 / 打扰一下", es: "Perdon / Disculpe" },
  { id: "howmuch", icon: "payments", mn: "Үнэ хэд вэ?", pron: "Üne khed ve?", en: "How much is it?", ru: "Сколько стоит?", zh: "多少钱？", es: "Cuanto cuesta?" },
  { id: "where", icon: "navigation", mn: "... хаана байна?", pron: "... khaana baina?", en: "Where is ...?", ru: "Где находится ...?", zh: "... 在哪里？", es: "Donde esta ...?" },
  { id: "help", icon: "sos", mn: "Туслаач!", pron: "Tuslaach!", en: "Help!", ru: "Помогите!", zh: "救命 / 请帮忙！", es: "Ayuda!" },
  { id: "water", icon: "cloud_download", mn: "Ус", pron: "Us", en: "Water", ru: "Вода", zh: "水", es: "Agua" },
  { id: "food", icon: "payments", mn: "Хоол", pron: "Khool", en: "Food", ru: "Еда", zh: "食物", es: "Comida" },
  { id: "toilet", icon: "route", mn: "Жорлон хаана байна?", pron: "Jorlon khaana baina?", en: "Where is the toilet?", ru: "Где туалет?", zh: "厕所在哪里？", es: "Donde esta el bano?" },
  { id: "nounderstand", icon: "translate", mn: "Би ойлгохгүй байна", pron: "Bi oilgokhgüi baina", en: "I don't understand", ru: "Я не понимаю", zh: "我不明白", es: "No entiendo" },
  { id: "bye", icon: "directions_walk", mn: "Баяртай", pron: "Bayartai", en: "Goodbye", ru: "До свидания", zh: "再见", es: "Adios" },
];
