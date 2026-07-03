"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { copy } from "../data/content";
import { MaterialIcon } from "../icons/MaterialIcon";
import { HeroBackdrop } from "../hero/HeroBackdrop";
import { LiveBadge } from "../hero/LiveBadge";
import { OrnamentDivider } from "../shared/Ornament";
import type { Language, ScreenId } from "../types";

type DiscoverScreenProps = {
  setActive: (screen: ScreenId) => void;
  language: Language;
};

type FeatureCopy = {
  eyebrow: string;
  title: string;
  body: string;
  cameraTitle: string;
  cameraBody: string;
  arTitle: string;
  arBody: string;
  mongoliaTitle: string;
  mongoliaBody: string;
  cameraCta: string;
  arCta: string;
  scanLabel: string;
  liveLabel: string;
  recognizedLabel: string;
  landmarkName: string;
  scanSummary: string;
  arPlace: string;
  arDistance: string;
  mongoliaTags: [string, string][];
  insightKicker: string;
  insightTitle: string;
  insightBody: string;
  insightItems: [string, string, string][];
  insightStats: [string, string][];
  insightCtaKicker: string;
  insightCtaTitle: string;
  insightCtaButton: string;
};

const featureCopy: Record<Language, FeatureCopy> = {
  mn: {
    eyebrow: "Ухаалаг аяллын давхарга",
    title: "Камер, AR, соёл - бүгд нэг урсгалд.",
    body: "Доош гүйлгэх бүрд таних камер, AR чиглүүлэг, Монголын тухай хэрэгтэй тайлбарууд нэг дор амилна.",
    cameraTitle: "AI камер",
    cameraBody:
      "Дурсгалт газар руу камераа чиглүүлээд нэр, түүх, зай, сонсох тайлбар, хадгалах алхмуудыг шууд авна.",
    arTitle: "AR чиглүүлэг",
    arBody:
      "Ойролцоох хийд, зам, уул, үзмэрүүдийг камерын дүрсэн дээр давхар харуулж, дараагийн алхмыг ойлгомжтой болгоно.",
    mongoliaTitle: "Монголын тайлбар",
    mongoliaBody:
      "Тал нутаг, нүүдэлчин соёл, овоо, гэр, нутгийн ёс заншлыг аялагч хүнд ойлгомжтой тайлбарлана.",
    cameraCta: "Камер нээх",
    arCta: "AR турших",
    scanLabel: "AI танилт",
    liveLabel: "шууд",
    recognizedLabel: "танигдлаа",
    landmarkName: "Мэлхий хад",
    scanSummary: "Тэрэлжийн дурсгалт газар, түүх ба маршрут бэлэн.",
    arPlace: "Арьяабал хийд",
    arDistance: "450 м",
    mongoliaTags: [
      ["landscape", "байгаль"],
      ["cabin", "гэр"],
      ["auto_awesome", "соёл"],
    ],
    insightKicker: "Монголын тайлбар",
    insightTitle: "Тал нутгийн мэдрэмжийг аяллын хөтөч болгоно.",
    insightBody:
      "AI зөвхөн газар заахгүй. Түүх, ёс заншил, байгалийн онцлог, нутгийн хүмүүстэй хэрхэн хүндэтгэлтэй харилцахыг нэг дор ойлгуулна.",
    insightItems: [
      [
        "Тал нутгийн орчин",
        "Уул, тал, говь, нуур, салхи, нарыг аяллын бодит нөхцөлтэй холбож тайлбарлана.",
        "landscape",
      ],
      [
        "Нүүдэлчин соёл",
        "Гэр, малчин айл, цагаан идээ, айлд орох ёс зэрэг заншлыг ойлгомжтой болгоно.",
        "cabin",
      ],
      [
        "Нутгийн ёс",
        "Овоо, хийд, ариун газар, зураг авах үеийн хүндэтгэлийн алхмуудыг санал болгоно.",
        "verified_user",
      ],
    ],
    insightStats: [
      ["1.5 сая", "км²"],
      ["4", "улирал"],
      ["21", "аймаг"],
    ],
    insightCtaKicker: "аялалд бэлэн утга",
    insightCtaTitle:
      "Байгаль, түүх, хүндэтгэлтэй үйлдлийг нэг цэвэр харагдацад.",
    insightCtaButton: "Газрууд үзэх",
  },
  en: {
    eyebrow: "Smart discovery layer",
    title: "Camera, AR, culture - all in one flow.",
    body: "Every scroll reveals the tools behind the trip: live recognition, spatial guidance, and Mongolia-specific context.",
    cameraTitle: "AI camera",
    cameraBody:
      "Point at a landmark to identify it, hear the story, translate key details, and save the moment for later.",
    arTitle: "AR direction",
    arBody:
      "Nearby temples, trails, viewpoints, and routes appear over the camera view so the next step feels obvious.",
    mongoliaTitle: "Mongolia insight",
    mongoliaBody:
      "Steppe landscapes, nomadic traditions, ovoos, gers, and local etiquette are explained in traveler-friendly language.",
    cameraCta: "Open camera",
    arCta: "Try AR",
    scanLabel: "AI scan",
    liveLabel: "live",
    recognizedLabel: "recognized",
    landmarkName: "Turtle Rock",
    scanSummary: "Terelj landmark, story and route ready.",
    arPlace: "Aryabal temple",
    arDistance: "450 m",
    mongoliaTags: [
      ["landscape", "terrain"],
      ["cabin", "ger"],
      ["auto_awesome", "culture"],
    ],
    insightKicker: "Mongolia insight",
    insightTitle: "Turn the feeling of the steppe into a travel guide.",
    insightBody:
      "The assistant connects geography, history, etiquette, and local meaning so Mongolia feels readable while you move through it.",
    insightItems: [
      [
        "Steppe context",
        "Mountains, valleys, desert, lakes, wind, and weather are explained as practical travel context.",
        "landscape",
      ],
      [
        "Nomadic culture",
        "Gers, herder families, dairy foods, hospitality, and seasonal movement become easier to understand.",
        "cabin",
      ],
      [
        "Local etiquette",
        "Ovoos, temples, sacred places, and photo moments come with respectful next-step guidance.",
        "verified_user",
      ],
    ],
    insightStats: [
      ["1.5m", "km2"],
      ["4", "seasons"],
      ["21", "aimags"],
    ],
    insightCtaKicker: "travel-ready meaning",
    insightCtaTitle: "Nature, story, and respectful action in one clean view.",
    insightCtaButton: "Explore places",
  },
  zh: {
    eyebrow: "智能探索层",
    title: "相机、AR 与文化信息整合在一个流程中。",
    body: "向下滚动即可看到实时识别、AR 导航和蒙古旅行背景信息如何协同工作。",
    cameraTitle: "AI 相机",
    cameraBody:
      "扫描地点后可识别名称、了解故事、翻译重点信息，并保存到行程中。",
    arTitle: "AR 导航",
    arBody: "寺庙、步道、观景点和路线会叠加显示在相机画面上。",
    mongoliaTitle: "蒙古洞察",
    mongoliaBody:
      "草原、游牧文化、敖包、蒙古包和当地礼仪都会以清晰易懂的方式解释。",
    cameraCta: "打开相机",
    arCta: "体验 AR",
    scanLabel: "AI 扫描",
    liveLabel: "实时",
    recognizedLabel: "已识别",
    landmarkName: "龟石",
    scanSummary: "特勒吉地标，故事和路线已准备好。",
    arPlace: "阿日亚巴拉寺",
    arDistance: "450 米",
    mongoliaTags: [
      ["landscape", "地貌"],
      ["cabin", "蒙古包"],
      ["auto_awesome", "文化"],
    ],
    insightKicker: "蒙古洞察",
    insightTitle: "把草原的感受变成旅行向导。",
    insightBody:
      "助手会把地理、历史、礼仪和当地含义连接起来，让你在旅途中更容易读懂蒙古。",
    insightItems: [
      [
        "草原环境",
        "山脉、峡谷、戈壁、湖泊、风和天气都会转化为实用的旅行背景。",
        "landscape",
      ],
      [
        "游牧文化",
        "蒙古包、牧民家庭、乳制品、待客之道和季节迁徙会变得更容易理解。",
        "cabin",
      ],
      [
        "当地礼仪",
        "敖包、寺庙、圣地和拍照场景都会提供尊重当地文化的下一步建议。",
        "verified_user",
      ],
    ],
    insightStats: [
      ["150万", "平方公里"],
      ["4", "季节"],
      ["21", "省"],
    ],
    insightCtaKicker: "适合旅行的含义",
    insightCtaTitle: "把自然、故事和尊重当地文化的行动放在一个清晰视图中。",
    insightCtaButton: "探索地点",
  },
  ru: {
    eyebrow: "Умный слой исследования",
    title: "Камера, AR и культура в одном маршруте.",
    body: "Прокрутите вниз, чтобы увидеть, как распознавание, AR-навигация и контекст Монголии работают вместе.",
    cameraTitle: "AI-камера",
    cameraBody:
      "Наведите камеру на место, узнайте название и историю, переведите детали и сохраните их для поездки.",
    arTitle: "AR-навигация",
    arBody:
      "Храмы, тропы, смотровые точки и маршруты появляются поверх изображения с камеры.",
    mongoliaTitle: "Контекст Монголии",
    mongoliaBody:
      "Степные ландшафты, кочевые традиции, обо, гэр и местный этикет объясняются понятно для путешественника.",
    cameraCta: "Открыть камеру",
    arCta: "Попробовать AR",
    scanLabel: "AI-скан",
    liveLabel: "онлайн",
    recognizedLabel: "распознано",
    landmarkName: "Скала Черепаха",
    scanSummary: "Достопримечательность Тэрэлжа, история и маршрут готовы.",
    arPlace: "Храм Арьяабал",
    arDistance: "450 м",
    mongoliaTags: [
      ["landscape", "рельеф"],
      ["cabin", "гэр"],
      ["auto_awesome", "культура"],
    ],
    insightKicker: "Контекст Монголии",
    insightTitle: "Превратите ощущение степи в путеводитель.",
    insightBody:
      "Ассистент связывает географию, историю, этикет и местные смыслы, чтобы Монголия становилась понятнее во время пути.",
    insightItems: [
      [
        "Контекст степи",
        "Горы, долины, пустыня, озера, ветер и погода объясняются как практический контекст поездки.",
        "landscape",
      ],
      [
        "Кочевая культура",
        "Гэры, семьи скотоводов, молочные продукты, гостеприимство и сезонные кочевки становятся понятнее.",
        "cabin",
      ],
      [
        "Местный этикет",
        "Обо, храмы, священные места и моменты для фото сопровождаются уважительными подсказками.",
        "verified_user",
      ],
    ],
    insightStats: [
      ["1,5 млн", "км²"],
      ["4", "сезона"],
      ["21", "аймак"],
    ],
    insightCtaKicker: "смысл для поездки",
    insightCtaTitle:
      "Природа, история и уважительное действие в одном ясном виде.",
    insightCtaButton: "Смотреть места",
  },
  es: {
    eyebrow: "Capa inteligente de descubrimiento",
    title: "Camara, AR y cultura en un solo flujo.",
    body: "Desplazate para ver como el reconocimiento, la guia AR y el contexto de Mongolia trabajan juntos.",
    cameraTitle: "Camara AI",
    cameraBody:
      "Apunta a un lugar para identificarlo, escuchar su historia, traducir detalles y guardarlo para despues.",
    arTitle: "Direccion AR",
    arBody:
      "Templos, senderos, miradores y rutas aparecen sobre la vista de la camara.",
    mongoliaTitle: "Contexto de Mongolia",
    mongoliaBody:
      "Paisajes de estepa, tradiciones nomadas, ovoos, gers y etiqueta local explicados con claridad.",
    cameraCta: "Abrir camara",
    arCta: "Probar AR",
    scanLabel: "Escaneo AI",
    liveLabel: "en vivo",
    recognizedLabel: "reconocido",
    landmarkName: "Roca Tortuga",
    scanSummary: "Lugar destacado de Terelj, historia y ruta listas.",
    arPlace: "Templo Aryabal",
    arDistance: "450 m",
    mongoliaTags: [
      ["landscape", "terreno"],
      ["cabin", "ger"],
      ["auto_awesome", "cultura"],
    ],
    insightKicker: "Contexto de Mongolia",
    insightTitle: "Convierte la sensacion de la estepa en una guia de viaje.",
    insightBody:
      "El asistente conecta geografia, historia, etiqueta y significado local para que Mongolia sea mas facil de leer mientras viajas.",
    insightItems: [
      [
        "Contexto de estepa",
        "Montanas, valles, desierto, lagos, viento y clima se explican como contexto practico de viaje.",
        "landscape",
      ],
      [
        "Cultura nomada",
        "Gers, familias pastoras, lacteos, hospitalidad y movimiento estacional se vuelven mas faciles de entender.",
        "cabin",
      ],
      [
        "Etiqueta local",
        "Ovoos, templos, lugares sagrados y momentos para fotos incluyen una guia respetuosa.",
        "verified_user",
      ],
    ],
    insightStats: [
      ["1.5m", "km2"],
      ["4", "estaciones"],
      ["21", "aimags"],
    ],
    insightCtaKicker: "significado listo para viajar",
    insightCtaTitle:
      "Naturaleza, historia y accion respetuosa en una vista clara.",
    insightCtaButton: "Explorar lugares",
  },
};

function ScrollReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.22, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        visible
          ? "translate-y-0 opacity-100 blur-0"
          : "translate-y-10 opacity-0 blur-sm"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function DiscoverScreen({ setActive, language }: DiscoverScreenProps) {
  const text = copy[language].discover;
  const featureText = featureCopy[language];
  const now = new Date();
  const words = text.title.split(" ");
  const lead = words.slice(0, -1).join(" ");
  const last = words.slice(-1);

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#f4eede] text-[#102033] dark:bg-[#08111c] dark:text-white">
      <section className="relative min-h-[100svh] overflow-hidden text-white">
        <HeroBackdrop />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-3xl flex-col items-center justify-center px-5 pb-28 pt-24 text-center">
          <div className="animate-fade-up">
            <LiveBadge language={language} now={now} />
          </div>

          <h1 className="animate-fade-up delay-1 mt-7 text-balance text-5xl font-black leading-[1.02] tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.45)] sm:text-7xl md:text-8xl">
            {lead} <span className="text-gradient">{last}</span>
          </h1>

          <p className="animate-fade-up delay-2 mx-auto mt-6 max-w-xl text-pretty text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
            {text.description}
          </p>

          <OrnamentDivider className="animate-fade-up delay-2 mt-8" />

          <button
            type="button"
            onClick={() => setActive("gems")}
            className="ring-glow animate-fade-up delay-3 mt-8 inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-linear-to-r from-[#00658b] via-[#0a86b8] to-[#e0a32e] px-9 text-base font-black uppercase tracking-tight text-white shadow-2xl transition hover:scale-[1.04]"
          >
            {text.primaryCta}
            <MaterialIcon name="arrow_forward" className="size-5" />
          </button>

          <button
            type="button"
            onClick={() => setActive("planner")}
            className="animate-fade-up delay-3 mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-tight text-white/70 transition hover:text-white"
          >
            <MaterialIcon name="play_circle" className="size-4" />
            {text.secondaryCta}
          </button>
        </div>

        <div className="absolute bottom-24 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/50">
          <MaterialIcon name="chevron_right" className="size-7 rotate-90" />
        </div>
      </section>

      <section className="relative z-10 overflow-hidden bg-[#f4eede] px-5 py-20 text-[#102033] dark:bg-[#08111c] dark:text-white sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(0,101,139,0.16),transparent_28%),radial-gradient(circle_at_78%_22%,rgba(224,163,46,0.2),transparent_26%),linear-gradient(180deg,#f4eede_0%,#eaf5f6_48%,#f4eede_100%)] dark:bg-[radial-gradient(circle_at_18%_12%,rgba(107,203,255,0.18),transparent_28%),radial-gradient(circle_at_78%_22%,rgba(224,163,46,0.16),transparent_26%),linear-gradient(180deg,#08111c_0%,#102033_48%,#08111c_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-black/15 to-transparent dark:via-white/25" />

        <div className="relative mx-auto max-w-6xl">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#00658b] dark:text-[#6bcbff]">
              {featureText.eyebrow}
            </p>
            <h2 className="mt-4 text-balance text-4xl font-black leading-tight tracking-tight sm:text-6xl">
              {featureText.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-[#102033]/68 dark:text-white/72 sm:text-lg sm:leading-8">
              {featureText.body}
            </p>
          </ScrollReveal>

          <div className="mt-16 grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
            <ScrollReveal className="min-h-[34rem]">
              <div className="relative h-full overflow-hidden rounded-[2rem] border border-black/10 bg-white/70 p-5 shadow-2xl shadow-[#00658b]/10 backdrop-blur-2xl dark:border-white/12 dark:bg-white/[0.06] dark:shadow-black/30 sm:p-7">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,101,139,0.12),transparent_42%),radial-gradient(circle_at_80%_20%,rgba(224,163,46,0.22),transparent_28%)] dark:bg-[linear-gradient(135deg,rgba(107,203,255,0.16),transparent_42%),radial-gradient(circle_at_80%_20%,rgba(224,163,46,0.22),transparent_28%)]" />
                <div className="relative flex h-full flex-col justify-between gap-8">
                  <div>
                    <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-[#00658b]/12 text-[#00658b] dark:bg-[#6bcbff]/18 dark:text-[#6bcbff]">
                      <MaterialIcon name="photo_camera" className="size-7" />
                    </span>
                    <h3 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                      {featureText.cameraTitle}
                    </h3>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-[#102033]/68 dark:text-white/70 sm:text-base">
                      {featureText.cameraBody}
                    </p>
                  </div>

                  <div className="relative mx-auto aspect-[9/16] w-[min(78vw,18rem)] rounded-[2.25rem] border border-white/20 bg-[#050b12] p-3 shadow-[0_30px_80px_-30px_rgba(107,203,255,0.8)]">
                    <div className="relative h-full overflow-hidden rounded-[1.65rem] bg-[linear-gradient(180deg,rgba(2,12,20,0.12),rgba(2,12,20,0.82)),url('/hero-poster.jpg')] bg-cover bg-center">
                      <div className="absolute inset-x-6 top-6 flex items-center justify-between rounded-full border border-white/15 bg-black/28 px-3 py-2 text-[10px] font-black uppercase tracking-tight text-white/80 backdrop-blur">
                        <span>{featureText.scanLabel}</span>
                        <span className="flex items-center gap-1 text-[#34e0a1]">
                          <span className="size-1.5 rounded-full bg-current" />
                          {featureText.liveLabel}
                        </span>
                      </div>
                      <div className="absolute inset-10 rounded-[2rem] border-2 border-[#6bcbff]/70 shadow-[0_0_32px_rgba(107,203,255,0.5)]" />
                      <div className="absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e0a32e]/70 animate-breathe" />
                      <div className="absolute inset-x-5 bottom-5 rounded-3xl border border-white/15 bg-black/38 p-4 backdrop-blur-xl">
                        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#e0a32e]">
                          {featureText.recognizedLabel}
                        </p>
                        <p className="mt-1 text-lg font-black tracking-tight">
                          {featureText.landmarkName}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-white/68">
                          {featureText.scanSummary}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActive("camera")}
                    className="ring-glow inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#00658b] to-[#0a86b8] px-6 text-sm font-black uppercase tracking-tight text-white transition hover:scale-[1.02] sm:w-fit"
                  >
                    {featureText.cameraCta}
                    <MaterialIcon name="arrow_forward" className="size-5" />
                  </button>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid gap-5">
              <ScrollReveal>
                <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white/70 p-6 shadow-2xl shadow-[#00658b]/10 backdrop-blur-2xl dark:border-white/12 dark:bg-white/[0.06] dark:shadow-black/30">
                  <div className="absolute -right-16 -top-16 size-48 rounded-full border border-[#e0a32e]/30" />
                  <div className="absolute -right-7 -top-7 size-28 rounded-full border border-[#00658b]/25 dark:border-[#6bcbff]/30" />
                  <div className="relative">
                    <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-[#e0a32e]/18 text-[#a36d08] dark:text-[#f0c66a]">
                      <MaterialIcon name="view_in_ar" className="size-6" />
                    </span>
                    <h3 className="mt-5 text-2xl font-black tracking-tight sm:text-3xl">
                      {featureText.arTitle}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#102033]/68 dark:text-white/70">
                      {featureText.arBody}
                    </p>

                    <div className="mt-6 rounded-3xl border border-black/10 bg-white/45 p-4 dark:border-white/12 dark:bg-black/24">
                      <div className="relative h-44 overflow-hidden rounded-2xl bg-[linear-gradient(180deg,rgba(8,17,28,0.05),rgba(8,17,28,0.78)),url('/hero-poster.jpg')] bg-cover bg-center">
                        <div className="absolute left-7 top-8 rounded-2xl border border-[#6bcbff]/50 bg-black/35 px-3 py-2 text-xs font-black backdrop-blur-md">
                          {featureText.arPlace}
                        </div>
                        <div className="absolute bottom-7 right-6 rounded-2xl border border-[#e0a32e]/50 bg-black/35 px-3 py-2 text-xs font-black backdrop-blur-md">
                          {featureText.arDistance}
                        </div>
                        <div className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60" />
                        <div className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#34e0a1] shadow-[0_0_24px_8px_rgba(52,224,161,0.4)]" />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActive("ar")}
                      className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-black/15 px-5 text-sm font-black uppercase tracking-tight text-[#102033]/75 transition hover:border-black/30 hover:text-[#102033] dark:border-white/15 dark:text-white/82 dark:hover:border-white/35 dark:hover:text-white"
                    >
                      {featureText.arCta}
                      <MaterialIcon name="navigation" className="size-5" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          <ScrollReveal className="mt-20 sm:mt-28">
            <div className="relative overflow-hidden rounded-[2.25rem] border border-[#00658b]/16 bg-white shadow-[0_40px_120px_-55px_rgba(0,101,139,0.5)] dark:border-white/12 dark:bg-[#06101a] dark:shadow-[0_40px_120px_-55px_rgba(107,203,255,0.75)]">
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(244,238,222,0.55),rgba(255,255,255,0.94)_62%),url('/hero-poster.jpg')] bg-cover bg-center opacity-100 dark:bg-[linear-gradient(120deg,rgba(8,17,28,0.25),rgba(8,17,28,0.9)_62%),url('/hero-poster.jpg')] dark:opacity-90" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(0,101,139,0.14),transparent_25%),radial-gradient(circle_at_82%_26%,rgba(224,163,46,0.2),transparent_24%)] dark:bg-[radial-gradient(circle_at_18%_18%,rgba(107,203,255,0.24),transparent_25%),radial-gradient(circle_at_82%_26%,rgba(224,163,46,0.22),transparent_24%)]" />
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#00658b]/45 to-transparent dark:via-[#f0c66a]/80" />

              <div className="relative grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
                <div className="flex min-h-[30rem] flex-col justify-between overflow-hidden rounded-[1.75rem] border border-[#102033]/10 bg-white/64 p-5 text-[#102033] backdrop-blur-md dark:border-white/14 dark:bg-black/22 dark:text-white sm:p-7">
                  <div>
                    <p className="inline-flex items-center gap-2 rounded-full border border-[#00658b]/15 bg-[#00658b]/8 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#00658b] dark:border-white/15 dark:bg-white/10 dark:text-[#f0c66a]">
                      <MaterialIcon name="auto_awesome" className="size-4" />
                      {featureText.insightKicker}
                    </p>
                    <h2 className="mt-5 max-w-2xl text-balance text-4xl font-black leading-[1.04] tracking-tight sm:text-6xl">
                      {featureText.insightTitle}
                    </h2>
                    <p className="mt-5 max-w-xl text-pretty text-base leading-8 text-[#102033]/70 dark:text-white/76">
                      {featureText.insightBody}
                    </p>
                  </div>

                  <div className="mt-10 grid grid-cols-3 gap-2 text-[11px] font-black uppercase tracking-tight text-[#102033]/75 dark:text-white/82 sm:max-w-lg">
                    {featureText.insightStats.map(([value, label]) => (
                      <div
                        key={label}
                        className="rounded-2xl border border-[#102033]/10 bg-white/55 p-3 backdrop-blur-md dark:border-white/12 dark:bg-white/10"
                      >
                        <p className="text-xl text-[#102033] dark:text-white sm:text-2xl">
                          {value}
                        </p>
                        <p className="mt-1 text-[#102033]/48 dark:text-white/48">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4">
                  {featureText.insightItems.map(
                    ([title, body, icon], index) => (
                      <div
                        key={title}
                        className="group relative overflow-hidden rounded-[1.75rem] border border-[#102033]/10 bg-white/72 p-5 text-[#102033] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#00658b]/25 hover:bg-white/90 dark:border-white/12 dark:bg-white/[0.08] dark:text-white dark:hover:border-white/25 dark:hover:bg-white/[0.12] sm:p-6"
                      >
                        <div className="absolute inset-y-0 left-0 w-1 bg-linear-to-b from-[#6bcbff] via-[#f0c66a] to-[#ef7d3a]" />
                        <div className="relative flex gap-4">
                          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#00658b]/10 text-[#00658b] ring-1 ring-[#00658b]/12 transition group-hover:scale-105 group-hover:text-[#a36d08] dark:bg-white/10 dark:text-[#6bcbff] dark:ring-white/12 dark:group-hover:text-[#f0c66a]">
                            <MaterialIcon name={icon} className="size-6" />
                          </span>
                          <div>
                            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#102033]/42 dark:text-white/42">
                              0{index + 1}
                            </p>
                            <h3 className="mt-1 text-2xl font-black tracking-tight text-[#102033] dark:text-white">
                              {title}
                            </h3>
                            <p className="mt-2 text-sm leading-7 text-[#102033]/68 dark:text-white/68">
                              {body}
                            </p>
                          </div>
                        </div>
                      </div>
                    ),
                  )}

                  <div className="relative overflow-hidden rounded-[1.75rem] border border-[#f0c66a]/24 bg-[#f4eede] p-5 text-[#102033] shadow-2xl sm:p-6">
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(224,163,46,0.34),transparent_42%),linear-gradient(315deg,rgba(0,101,139,0.18),transparent_36%)]" />
                    <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#00658b]">
                          {featureText.insightCtaKicker}
                        </p>
                        <p className="mt-2 max-w-md text-lg font-black leading-snug">
                          {featureText.insightCtaTitle}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActive("gems")}
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#102033] px-6 text-sm font-black uppercase tracking-tight text-white transition hover:scale-[1.03]"
                      >
                        {featureText.insightCtaButton}
                        <MaterialIcon name="arrow_forward" className="size-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
