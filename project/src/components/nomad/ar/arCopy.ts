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
};
