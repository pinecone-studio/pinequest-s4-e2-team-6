import type { Language } from "../types";

type CultureStrings = {
  badge: string;
  title: string;
  subtitle: string;
  greeting: string;
  placeholder: string;
  send: string;
  suggestionsLabel: string;
  suggestions: string[];
  disclaimer: string;
  errorRate: string;
  errorFail: string;
};

export const cultureCopy: Record<Language, CultureStrings> = {
  mn: {
    badge: "Соёлын AI зөвлөх",
    title: "Монголын соёлын хөтөч",
    subtitle: "Ёс заншил, түүх, шашин, хоол, нүүдэлчдийн амьдралын талаар чөлөөтэй асуу.",
    greeting:
      "Тавтай морилно уу! 🌿 Та Монголд аялж байна уу? Би таны соёлын AI хөтөч. Гэрт хэрхэн зочлох, овоо тахих ёс, Наадам, Цагаан сар, хоол хүнс — юу ч асуугаарай. Холбогдох зургийг нь хамт үзүүлнэ. 📷",
    placeholder: "Асуултаа бичнэ үү…",
    send: "Илгээх",
    suggestionsLabel: "Жишээ асуултууд",
    suggestions: [
      "Гэрт зочлохдоо юу анхаарах вэ?",
      "Овоог хэрхэн тахих вэ?",
      "Цагаан сарын ёс заншил юу вэ?",
      "Монгол хоолноос юу амтлах вэ?",
    ],
    disclaimer: "AI хариулт алдаатай байж болзошгүй. Чухал зүйлийг шалгаарай.",
    errorRate: "Хэт олон хүсэлт. Хэсэг хүлээгээд дахин оролдоно уу.",
    errorFail: "Хариулт авахад алдаа гарлаа. Дахин оролдоно уу.",
  },
  en: {
    badge: "Cultural AI advisor",
    title: "Mongolian culture guide",
    subtitle: "Ask anything about etiquette, history, religion, food, and nomadic life.",
    greeting:
      "Welcome to Mongolia! 🌿 Traveling here soon? I'm your AI culture guide. Ask me how to enter a ger, ovoo etiquette, Naadam, Tsagaan Sar, food — anything. I'll show you photos too. 📷",
    placeholder: "Type your question…",
    send: "Send",
    suggestionsLabel: "Try asking",
    suggestions: [
      "What should I know before entering a ger?",
      "How do I honour an ovoo?",
      "What are Tsagaan Sar customs?",
      "Which Mongolian dishes should I try?",
    ],
    disclaimer: "AI answers may be imperfect — verify anything important.",
    errorRate: "Too many requests. Wait a moment and try again.",
    errorFail: "Couldn't get a reply. Please try again.",
  },
};
