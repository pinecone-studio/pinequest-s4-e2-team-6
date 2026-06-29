/** Essential travel phrases. Static data → the phrasebook works fully offline.
 *  `mn` is the Mongolian phrase, `pron` a latin pronunciation hint, and the
 *  `en`/`ru` fields are the source language the traveler reads from. */
export type Phrase = {
  id: string;
  icon: string;
  mn: string;
  pron: string;
  en: string;
  ru: string;
};

export type PhraseSource = "en" | "ru";

export const phrases: Phrase[] = [
  { id: "hello", icon: "person", mn: "Сайн байна уу", pron: "Sain baina uu", en: "Hello", ru: "Здравствуйте" },
  { id: "thanks", icon: "check_circle", mn: "Баярлалаа", pron: "Bayarlalaa", en: "Thank you", ru: "Спасибо" },
  { id: "yes", icon: "check_circle", mn: "Тийм", pron: "Tiim", en: "Yes", ru: "Да" },
  { id: "no", icon: "block", mn: "Үгүй", pron: "Ügüi", en: "No", ru: "Нет" },
  { id: "please", icon: "auto_awesome", mn: "Гуйя", pron: "Guiya", en: "Please", ru: "Пожалуйста" },
  { id: "sorry", icon: "psychology", mn: "Уучлаарай", pron: "Uuchlaarai", en: "Sorry / Excuse me", ru: "Извините" },
  { id: "howmuch", icon: "payments", mn: "Үнэ хэд вэ?", pron: "Üne khed ve?", en: "How much is it?", ru: "Сколько стоит?" },
  { id: "where", icon: "navigation", mn: "... хаана байна?", pron: "... khaana baina?", en: "Where is ...?", ru: "Где находится ...?" },
  { id: "help", icon: "sos", mn: "Туслаач!", pron: "Tuslaach!", en: "Help!", ru: "Помогите!" },
  { id: "water", icon: "cloud_download", mn: "Ус", pron: "Us", en: "Water", ru: "Вода" },
  { id: "food", icon: "payments", mn: "Хоол", pron: "Khool", en: "Food", ru: "Еда" },
  { id: "toilet", icon: "route", mn: "Жорлон хаана байна?", pron: "Jorlon khaana baina?", en: "Where is the toilet?", ru: "Где туалет?" },
  { id: "nounderstand", icon: "translate", mn: "Би ойлгохгүй байна", pron: "Bi oilgokhgüi baina", en: "I don't understand", ru: "Я не понимаю" },
  { id: "bye", icon: "directions_walk", mn: "Баяртай", pron: "Bayartai", en: "Goodbye", ru: "До свидания" },
];
