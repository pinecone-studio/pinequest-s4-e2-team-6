import type { Language, NavItem } from "../types";

export const navItems: Record<Language, NavItem[]> = {
  mn: [
    { id: "discover", label: "Нээх", icon: "explore" },
    { id: "camera", label: "AI камер", icon: "photo_camera" },
    { id: "ar", label: "AR", icon: "view_in_ar" },
    { id: "planner", label: "Төлөвлөгч", icon: "event_note" },
    { id: "gems", label: "Далд газрууд", icon: "landscape" },
    { id: "offline", label: "Офлайн", icon: "cloud_download" },
    { id: "currency", label: "Валют", icon: "payments" },
    { id: "safety", label: "Аюулгүй", icon: "security" },
  ],
  en: [
    { id: "discover", label: "Discover", icon: "explore" },
    { id: "camera", label: "AI camera", icon: "photo_camera" },
    { id: "ar", label: "AR", icon: "view_in_ar" },
    { id: "planner", label: "Planner", icon: "event_note" },
    { id: "gems", label: "Hidden gems", icon: "landscape" },
    { id: "offline", label: "Offline", icon: "cloud_download" },
    { id: "currency", label: "Currency", icon: "payments" },
    { id: "safety", label: "Safety", icon: "security" },
  ],
};

export const languageOptions: { value: Language; label: string }[] = [
  { value: "mn", label: "Монгол" },
  { value: "en", label: "English" },
];

export const images = {
  steppe:
    "https://images.unsplash.com/photo-1528543606781-2f6e6857f318?auto=format&fit=crop&w=1600&q=80",
  terelj:
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80",
  mountain:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
  map: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80",
};

export const copy = {
  mn: {
    appTagline: "Монгол аяллын AI хөтөч",
    discover: {
      badge: "AI баталгаажсан аяллын туршлага",
      title: "Монголыг AI-тай нээ.",
      description:
        "Камерын танилт, AR чиглүүлэг, офлайн газрын зураг, ухаалаг маршрут болон соёлын зөвлөхийг нэг дор багтаасан Монгол аяллын туслах.",
      primaryCta: "Аяллаа эхлүүлэх",
      secondaryCta: "Демо харах",
    },
    camera: {
      title: "Мэлхий хад",
      location: "Тэрэлж, Монгол",
      badge: "AI баталсан",
      description:
        "Монгол домогт гүн шингэсэн боржин чулуун тогтоц. Хөндийг хамгаалагч мэт сүндэрлэж, байгалийн үзэмж болон соёлын түүхийг нэг дор мэдрүүлнэ.",
      distance: "1.2 км",
      time: "15 мин",
      actions: ["Сонсох", "Орчуулах", "Хадгалах"],
    },
    ar: {
      status: "AR идэвхтэй",
      labels: [
        { title: "Арьяабал хийд", meta: "450 м • 12 мин алхана" },
        { title: "Өмнөд нурууны зам", meta: "1.1 км • өгсүүр" },
      ],
    },
    planner: {
      promptLabel: "Та",
      prompt: "“Өнөөдөр 50,000₮ төсөвтэй, 6 цагийн завтай.”",
      badge: "AI Nomad төлөвлөгөө",
      title: "Улаанбаатар экспресс: соёл ба хоол",
      description:
        "Алхалт болон нийтийн тээврийг ашиглан төсөв барьсан, 6 цагт багтах богино маршрут.",
      durationValue: "5.5 цаг",
      durationLabel: "тооцоолсон хугацаа",
      costValue: "42k ₮",
      costLabel: "тооцоолсон зардал",
      startRoute: "Маршрут эхлүүлэх",
      stops: [
        [
          "10:00",
          "Монголын Үндэсний музей",
          "Түүх, угсаатны үзмэрүүдийг богино хугацаанд үзнэ.",
          "1.5 цаг",
          "15,000₮",
        ],
        [
          "11:45",
          "Өдрийн хоол: Зочин кафе",
          "Хуушуур, сүүтэй цайтай ойрхон, төсөвт ээлтэй сонголт.",
          "1 цаг",
          "12,000₮",
        ],
        [
          "13:00",
          "Сүхбаатарын талбай",
          "Архитектур, хотын төвийн өргөн өнцгийн зураг авах цэг.",
          "45 мин",
          "Үнэгүй",
        ],
      ],
    },
    gems: {
      eyebrow: "Далд эрдэнэс",
      title: "Олны хөлөөс зайдуу газрууд",
      items: [
        [
          "Хагийн Хар нуур",
          "Төв аймаг",
          "Морь эсвэл явган аяллаар хүрэх нам гүм нуур.",
          "9.8",
        ],
        [
          "Найман нуур",
          "Өвөрхангай",
          "Галт уулын гаралтай нуурын бүс, од харахад тохиромжтой.",
          "9.5",
        ],
        [
          "Бага газрын чулуу",
          "Дундговь",
          "Боржин хад, богино road trip-д эвтэйхэн зогсоол.",
          "9.1",
        ],
        [
          "Тэрэлжийн Мэлхий хад",
          "Төв аймаг",
          "Домог, байгалийн тогтоц, зураг авалтын алдартай цэг.",
          "9.4",
        ],
      ],
    },
    culture: {
      question: "Ариун газар орохдоо яаж зөв мэндлэх вэ?",
      badge: "Соёлын AI зөвлөх",
      title: "Хүндэтгэлтэй зочлох дүрэм",
      ruleLabel: "Гол дүрэм",
      rule: "Овоо, хийд, айлын гэрт орохдоо тайван, баруун талаас нь хүндэтгэлтэй ойрт.",
      doTitle: "Зөв",
      doItems: [
        "Мэндэлж зөвшөөрөл ав",
        "Дуугаа намсга",
        "Зураг авахын өмнө асуу",
      ],
      dontTitle: "Болохгүй",
      dontItems: ["Овоон дээр гишгэх", "Хог үлдээх", "Шүтээнийг гараар заах"],
    },
    offline: {
      eyebrow: "Офлайн төв",
      title: "Сүлжээгүй үед ч бэлэн",
      ready: "Бэлэн",
      gpsValue: "Хүчтэй",
      gpsLabel: "GPS дохио",
      directionLabel: "чиглэл",
      downloaded: "Татсан",
      mapTitle: "Монголын үндсэн газрын зураг",
      currencyTitle: "Валют хөрвүүлэгч",
      languageTitle: "Офлайн хэл",
      languages: ["Англи", "Монгол", "Орос татах"],
    },

    safety: {
      badge: "Баталгаажсан аюулгүй бүс",
      title: "Аюулгүй байдлын төв",
      description:
        "Байршлаа шууд хуваалцах, офлайн зөвлөмж, хамгийн ойрхон эмнэлэг, цагдаагийн газар, мөн хамгийн чухал үед дарах нэг товч.",

      shareBtn: "Байршил хуваалцах",
      refreshBtn: "Шинэчлэх",
      locatingLabel: "Байршил тодорхойлж байна",
      liveLabel: "Таны байршил",
      fallbackLabel: "Байршил тодорхойгүй",

      guideTitle: "Офлайн заавар",
      guideMeta: "Анхны тусламж, хэллэгүүд",
      firstAidHeading: "Анхны тусламжийн үндэс",
      phrasesHeading: "Яаралтай тусламжийн хэллэгүүд",
      firstAidItems: [
        {
          title: "Цус алдалт",
          body: "Даавуугаар шахаж дарна; боломжтой бол шархыг зүрхнээс дээгүүр өргөнө; шархан дотор орсон зүйлийг бүү авч хая.",
        },
        {
          title: "Өндөрлөг / хээрийн нөлөө",
          body: "Монголын өндөрлөг нутаг 1,300м-с дээш өндөрт байрладаг тул толгой эргэх, дотор муухайрах, амьсгаадах бол амарч, ус уугаад доогуур газар шилжинэ.",
        },
        {
          title: "Даарах",
          body: "Салхинаас хамгаалагдсан газарт орж, нойтон хувцсаа сольж, эхлээд биеийн төвийг дулаацуулна.",
        },
        {
          title: "Ухаангүй ч амьсгалж байгаа бол",
          body: "Хажуу тийш нь тавьж, амьсгалын замыг нээлттэй байлгахын тулд толгойг нь бага зэрэг ухраана, дэргэд нь бай.",
        },
      ],
      phrases: [
        { mn: "Туслаарай!", en: "Tuslaarai! — Help!" },
        {
          mn: "Цагдаа дуудаарай!",
          en: "Tsagdaa duudaarai! — Call the police!",
        },
        {
          mn: "Надад эмч хэрэгтэй",
          en: "Nadad emch heregtei — I need a doctor",
        },
        { mn: "Би өвчтэй байна", en: "Bi uvchtei baina — I'm sick / in pain" },
        { mn: "Би гэмтсэн", en: "Bi gemtsen — I've been injured" },
      ],

      hospitalLabel: "Ойролцоох эмнэлэг",
      hospitalSearching: "Ойролцоох эмнэлэг хайж байна…",
      hospitalNone:
        "Ойролцоо олдсонгүй — 103 руу залгаж түргэн тусламж дуудна уу",

      policeTitle: "Цагдаагийн газар",
      policeSearching: "Хамгийн ойрхон газрыг хайж байна…",
      policeNone: "Ойролцоо олдсонгүй — 102 руу шууд залгана уу",
      policeLine: "Улсын шугам — 102",

      embassyTitle: "Таны элчин сайдын яам",
      embassyMeta:
        "Иргэншлээ сонгоно уу — ихэнх төлөөлөгчийн газрууд Улаанбаатарт байрладаг.",
      embassyDirections: "Чиглэл",
      embassyFindContact: "Холбоо барих",
      embassyVerified: "Баталгаажсан дугаар",

      sos: "SOS дарахын тулд удаан дар",
      sosHoldHint: "Идэвхжүүлэхийн тулд 1.5 секунд дараарай",
      sosHolding: "Дарсаар байгаарай…",
      sosModalTitle: "SOS идэвхжлээ",
      sosModalSub:
        "Таны байршил бэлэн боллоо. Юу хийхээ сонгоно уу — автоматаар юу ч илгээгдэхгүй.",
      sosCallGeneral: "105 — ерөнхий яаралтай тусламж",
      sosCallGeneralSub: "Гал түймэр, цагдаа, түргэн тусламж",
      sosCallAmbulance: "103 — түргэн тусламж",
      sosCallAmbulanceSub: "Шууд эмнэлгийн яаралтай шугам",
      sosShare: "Байршлаа шууд хуваалцах",
      sosCancel: "Цуцлах",

      toastCopied: "Байршлын линк хуулагдлаа",
      toastLocOff: "Байршил унтраалттай — Улаанбаатарыг лавлагаа болгож байна",
    },
  },
  en: {
    appTagline: "AI guide for travel in Mongolia",
    discover: {
      badge: "AI-verified travel experience",
      title: "Discover Mongolia with AI.",
      description:
        "A Mongolia travel assistant with camera recognition, AR guidance, offline maps, smart routes, and cultural advice in one place.",
      primaryCta: "Start exploring",
      secondaryCta: "View demo",
    },
    camera: {
      title: "Turtle Rock",
      location: "Terelj, Mongolia",
      badge: "AI verified",
      description:
        "A granite formation rooted in Mongolian legend. It rises like a guardian of the valley, blending natural scenery with cultural history.",
      distance: "1.2 km",
      time: "15 min",
      actions: ["Listen", "Translate", "Save"],
    },
    ar: {
      status: "AR active",
      labels: [
        { title: "Aryabal Temple", meta: "450 m • 12 min walk" },
        { title: "South ridge trail", meta: "1.1 km • uphill" },
      ],
    },
    planner: {
      promptLabel: "You",
      prompt: '"Today I have a 50,000₮ budget and 6 free hours."',
      badge: "AI Nomad plan",
      title: "Ulaanbaatar express: culture and food",
      description:
        "A short 6-hour route that uses walking and public transport to stay on budget.",
      durationValue: "5.5 hrs",
      durationLabel: "estimated time",
      costValue: "42k ₮",
      costLabel: "estimated cost",
      startRoute: "Start route",
      stops: [
        [
          "10:00",
          "National Museum of Mongolia",
          "A quick look through history and ethnographic exhibits.",
          "1.5 hrs",
          "15,000₮",
        ],
        [
          "11:45",
          "Lunch: Zochin cafe",
          "A nearby, budget-friendly option for khuushuur and milk tea.",
          "1 hr",
          "12,000₮",
        ],
        [
          "13:00",
          "Sukhbaatar Square",
          "Architecture and wide-angle photo spots in the city center.",
          "45 min",
          "Free",
        ],
      ],
    },
    gems: {
      eyebrow: "Hidden gems",
      title: "Places away from the crowds",
      items: [
        [
          "Khagiin Khar Lake",
          "Tuv province",
          "A quiet lake reached by horse or hiking.",
          "9.8",
        ],
        [
          "Naiman Lake",
          "Uvurkhangai",
          "A volcanic lake region that is excellent for stargazing.",
          "9.5",
        ],
        [
          "Baga Gazriin Chuluu",
          "Dundgovi",
          "Granite rocks and an easy stop for a short road trip.",
          "9.1",
        ],
        [
          "Terelj Turtle Rock",
          "Tuv province",
          "A famous spot for legends, natural formations, and photos.",
          "9.4",
        ],
      ],
    },
    culture: {
      question: "How should I greet respectfully when entering a sacred place?",
      badge: "Cultural AI advisor",
      title: "Rules for respectful visits",
      ruleLabel: "Key rule",
      rule: "Approach ovoos, temples, and family gers calmly and respectfully from the right side.",
      doTitle: "Do",
      doItems: [
        "Greet and ask permission",
        "Keep your voice low",
        "Ask before taking photos",
      ],
      dontTitle: "Do not",
      dontItems: [
        "Step on an ovoo",
        "Leave trash behind",
        "Point at sacred objects by hand",
      ],
    },
    offline: {
      eyebrow: "Offline hub",
      title: "Ready even without signal",
      ready: "Ready",
      gpsValue: "Strong",
      gpsLabel: "GPS signal",
      directionLabel: "direction",
      downloaded: "Downloaded",
      mapTitle: "Core Mongolia map",
      currencyTitle: "Currency converter",
      languageTitle: "Offline languages",
      languages: ["English", "Mongolian", "Download Russian"],
    },
    safety: {
      badge: "Verified safety zone",
      title: "Safety center",
      description:
        "Real-time location sharing, offline survival guidance, the nearest hospital and police station wherever you stand in Mongolia, and one button for when it matters most.",

      shareBtn: "Share location",
      refreshBtn: "Refresh",
      locatingLabel: "Locating you",
      liveLabel: "Your live position",
      fallbackLabel: "Location unavailable",

      guideTitle: "Offline guide",
      guideMeta: "First aid and phrases",
      firstAidHeading: "First aid basics",
      phrasesHeading: "Emergency phrases",
      firstAidItems: [
        {
          title: "Bleeding",
          body: "Apply firm, direct pressure with cloth; keep the wound raised above the heart if possible; don't remove embedded objects.",
        },
        {
          title: "Altitude / steppe exposure",
          body: "Mongolia's plateau sits 1,300m+; rest, hydrate, and descend if you feel dizzy, nauseated, or breathless.",
        },
        {
          title: "Cold exposure",
          body: "Get out of wind, replace wet layers, warm the body's core before extremities.",
        },
        {
          title: "Unresponsive & breathing",
          body: "Place on their side, tilt the head back slightly to keep the airway open, stay with them.",
        },
      ],
      phrases: [
        { mn: "Туслаарай!", en: "Tuslaarai! — Help!" },
        {
          mn: "Цагдаа дуудаарай!",
          en: "Tsagdaa duudaarai! — Call the police!",
        },
        {
          mn: "Надад эмч хэрэгтэй",
          en: "Nadad emch heregtei — I need a doctor",
        },
        { mn: "Би өвчтэй байна", en: "Bi uvchtei baina — I'm sick / in pain" },
        { mn: "Би гэмтсэн", en: "Bi gemtsen — I've been injured" },
      ],

      hospitalLabel: "Nearby hospital",
      hospitalSearching: "Searching nearby…",
      hospitalNone: "None mapped nearby — call 103 for ambulance dispatch",

      policeTitle: "Police station",
      policeSearching: "Searching for the nearest station…",
      policeNone: "None mapped nearby — call 102 directly",
      policeLine: "National line — 102",

      embassyTitle: "Your embassy",
      embassyMeta:
        "Select your nationality — most missions are based in Ulaanbaatar.",
      embassyDirections: "Directions",
      embassyFindContact: "Find contact",
      embassyVerified: "Verified contact",

      sos: "Hold for SOS help",
      sosHoldHint: "Hold for 1.5s to activate",
      sosHolding: "Keep holding…",
      sosModalTitle: "SOS activated",
      sosModalSub:
        "Your live coordinates are ready. Choose what to do next — nothing is sent automatically.",
      sosCallGeneral: "Call 105 — general emergency",
      sosCallGeneralSub: "Fire, police & ambulance dispatch",
      sosCallAmbulance: "Call 103 — ambulance",
      sosCallAmbulanceSub: "Direct medical emergency line",
      sosShare: "Share my live location",
      sosCancel: "Cancel",

      toastCopied: "Location link copied",
      toastLocOff: "Location off — using Ulaanbaatar as reference",
    },
  },
} satisfies Record<Language, Record<string, unknown>>;
