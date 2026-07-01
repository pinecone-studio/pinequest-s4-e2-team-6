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
  zh: {
    badge: "文化 AI 顾问",
    title: "蒙古文化指南",
    subtitle: "询问礼仪、历史、宗教、食物和游牧生活。",
    greeting: "欢迎来到蒙古！🌿 我是你的 AI 文化向导。可以问我如何进入蒙古包、敖包礼仪、那达慕、白月、食物等问题，我也会展示相关照片。📷",
    placeholder: "输入你的问题…",
    send: "发送",
    suggestionsLabel: "试着提问",
    suggestions: ["进入蒙古包前要注意什么？", "怎样尊重敖包？", "白月有哪些习俗？", "应该尝试哪些蒙古菜？"],
    disclaimer: "AI 回答可能不完美，请核实重要信息。",
    errorRate: "请求过多。请稍等后再试。",
    errorFail: "无法获取回复。请重试。",
  },
  ru: {
    badge: "Культурный AI-советник",
    title: "Гид по культуре Монголии",
    subtitle: "Спрашивайте об этикете, истории, религии, еде и кочевой жизни.",
    greeting: "Добро пожаловать в Монголию! 🌿 Я ваш AI-гид по культуре. Спросите, как входить в гэр, как вести себя у обо, о Наадаме, Цагаан саре, еде и традициях. Я также покажу подходящие фото. 📷",
    placeholder: "Введите вопрос…",
    send: "Отправить",
    suggestionsLabel: "Попробуйте спросить",
    suggestions: ["Что знать перед входом в гэр?", "Как уважить обо?", "Какие обычаи у Цагаан сара?", "Какие монгольские блюда попробовать?"],
    disclaimer: "Ответы AI могут быть неточными — проверяйте важное.",
    errorRate: "Слишком много запросов. Подождите и попробуйте снова.",
    errorFail: "Не удалось получить ответ. Попробуйте снова.",
  },
  es: {
    badge: "Asesor cultural AI",
    title: "Guia de cultura mongola",
    subtitle: "Pregunta sobre etiqueta, historia, religion, comida y vida nomada.",
    greeting: "Bienvenido a Mongolia! 🌿 Soy tu guia cultural AI. Preguntame como entrar en un ger, etiqueta de ovoo, Naadam, Tsagaan Sar, comida y tradiciones. Tambien mostrare fotos relacionadas. 📷",
    placeholder: "Escribe tu pregunta…",
    send: "Enviar",
    suggestionsLabel: "Prueba preguntar",
    suggestions: ["Que debo saber antes de entrar en un ger?", "Como honro un ovoo?", "Cuales son las costumbres de Tsagaan Sar?", "Que platos mongoles deberia probar?"],
    disclaimer: "Las respuestas de AI pueden ser imperfectas; verifica lo importante.",
    errorRate: "Demasiadas solicitudes. Espera un momento e intenta de nuevo.",
    errorFail: "No se pudo obtener respuesta. Intenta de nuevo.",
  },
};
