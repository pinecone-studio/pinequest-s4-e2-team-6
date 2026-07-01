import type { Language } from "../types";

type ArStrings = {
  eyebrow: string;
  enterTitle: string;
  enterDesc: string;
  enter: string;
  starting: string;
  denied: string;
  deniedHelp: string;
  noCamera: string;
  dragHint: string;
  sensorHint: string;
  align: string;
  askAi: string;
  storyLoading: string;
  exit: string;
};

export const arCopy: Record<Language, ArStrings> = {
  mn: {
    eyebrow: "Жинхэнэ AR",
    enterTitle: "Монгол орныг AR-аар нээ",
    enterDesc: "Утсаа эргүүлэн бодит чиглэлд нь дурсгалт газруудыг олж, голд нь түгжиж, AI түүхийг нь сонс.",
    enter: "AR эхлүүлэх",
    starting: "Камер ба чиглэл тааруулж байна…",
    denied: "Камерын зөвшөөрөл хаалттай",
    deniedHelp: "Хөтчийн тохиргооноос камер, байршлыг зөвшөөрнө үү.",
    noCamera: "Камер олдсонгүй — чирж тойрон харна уу.",
    dragHint: "Чирж тойрон хар",
    sensorHint: "Утсаа эргүүлж хар",
    align: "Голд нь чиглүүлж түгжээрэй",
    askAi: "AI түүх",
    storyLoading: "AI ярьж байна…",
    exit: "Гарах",
  },
  en: {
    eyebrow: "Live AR",
    enterTitle: "Explore Mongolia in AR",
    enterDesc: "Turn your phone to find landmarks in their real direction, lock them in the centre, and hear their AI story.",
    enter: "Start AR",
    starting: "Aligning camera and heading…",
    denied: "Camera permission blocked",
    deniedHelp: "Allow camera and location in your browser settings.",
    noCamera: "No camera found — drag to look around.",
    dragHint: "Drag to look around",
    sensorHint: "Turn your phone to look",
    align: "Aim at the centre to lock on",
    askAi: "AI story",
    storyLoading: "AI is speaking…",
    exit: "Exit",
  },
  zh: {
    eyebrow: "实时 AR",
    enterTitle: "用 AR 探索蒙古",
    enterDesc: "转动手机，在真实方向找到地标，锁定在中心，并聆听 AI 故事。",
    enter: "启动 AR",
    starting: "正在对齐相机和方向…",
    denied: "相机权限被阻止",
    deniedHelp: "请在浏览器设置中允许相机和位置。",
    noCamera: "未找到相机，请拖动查看周围。",
    dragHint: "拖动查看周围",
    sensorHint: "转动手机查看",
    align: "对准中心以锁定",
    askAi: "AI 故事",
    storyLoading: "AI 正在讲述…",
    exit: "退出",
  },
  ru: {
    eyebrow: "Live AR",
    enterTitle: "Исследуйте Монголию в AR",
    enterDesc: "Поворачивайте телефон, находите места по реальному направлению, фиксируйте в центре и слушайте AI-историю.",
    enter: "Запустить AR",
    starting: "Выравниваем камеру и направление…",
    denied: "Доступ к камере заблокирован",
    deniedHelp: "Разрешите камеру и геолокацию в настройках браузера.",
    noCamera: "Камера не найдена — перетаскивайте, чтобы смотреть вокруг.",
    dragHint: "Перетащите для обзора",
    sensorHint: "Поверните телефон",
    align: "Наведите в центр для фиксации",
    askAi: "AI история",
    storyLoading: "AI рассказывает…",
    exit: "Выход",
  },
  es: {
    eyebrow: "AR en vivo",
    enterTitle: "Explora Mongolia en AR",
    enterDesc: "Gira el telefono para encontrar lugares en su direccion real, fijalos al centro y escucha su historia AI.",
    enter: "Iniciar AR",
    starting: "Alineando camara y rumbo…",
    denied: "Permiso de camara bloqueado",
    deniedHelp: "Permite camara y ubicacion en el navegador.",
    noCamera: "No se encontro camara; arrastra para mirar alrededor.",
    dragHint: "Arrastra para mirar",
    sensorHint: "Gira el telefono",
    align: "Apunta al centro para fijar",
    askAi: "Historia AI",
    storyLoading: "AI esta hablando…",
    exit: "Salir",
  },
};
