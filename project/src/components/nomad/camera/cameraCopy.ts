import type { Language, ScannerError } from "@/lib/camera/types";

type CameraStrings = {
  title: string;
  subtitle: string;
  start: string;
  starting: string;
  capture: string;
  switchCamera: string;
  capturing: string;
  recognizing: string;
  saving: string;
  retake: string;
  scanAgain: string;
  confidence: string;
  foundedOrBuilt: string;
  historicalPeriod: string;
  significance: string;
  history: string;
  architectureOrNature: string;
  facts: string;
  visitorTips: string;
  deleteScan: string;
  historyTitle: string;
  historyEmpty: string;
  hint: string;
  errors: Record<ScannerError, string>;
};

export const cameraCopy: Record<Language, CameraStrings> = {
  mn: {
    title: "AI камер",
    subtitle: "Дурсгалт газар, байгаль, соёлыг камераар таниулаарай.",
    start: "Камер нээх",
    starting: "Камер ачааллаж байна…",
    capture: "Таних",
    switchCamera: "Камер солих",
    capturing: "Зураг авч байна…",
    recognizing: "AI таньж байна…",
    saving: "Хадгалж байна…",
    retake: "Дахин авах",
    scanAgain: "Дахин таних",
    confidence: "Итгэлцэл",
    foundedOrBuilt: "Үүссэн / баригдсан",
    historicalPeriod: "Түүхэн үе",
    significance: "Утга учир",
    history: "Түүхэн мэдээлэл",
    architectureOrNature: "Онцлог шинж",
    facts: "Сонирхолтой баримт",
    visitorTips: "Аялагчийн зөвлөгөө",
    deleteScan: "Устгах",
    historyTitle: "Таны таньсан газрууд",
    historyEmpty: "Одоохондоо таньсан зүйл алга. Эхний зургаа аваарай.",
    hint: "Объектыг хүрээнд багтаан тогтоож барина уу.",
    errors: {
      permission: "Камерын зөвшөөрөл хэрэгтэй. Хөтчийн тохиргооноос зөвшөөрнө үү.",
      "no-camera": "Камер олдсонгүй. Утсаар нээж үзээрэй.",
      ai: "AI таних боломжгүй боллоо. Дахин оролдоно уу.",
      upload: "Хадгалахад алдаа гарлаа. Үр дүн харагдсан ч түүхэнд орохгүй.",
      network: "Сүлжээний алдаа. Холболтоо шалгана уу.",
      "rate-limit": "Хэт олон хүсэлт. Хэсэг хүлээгээд дахин оролдоно уу.",
      unknown: "Алдаа гарлаа. Дахин оролдоно уу.",
    },
  },
  en: {
    title: "AI camera",
    subtitle: "Point your camera at a landmark, nature, or culture to identify it.",
    start: "Open camera",
    starting: "Starting camera…",
    capture: "Identify",
    switchCamera: "Switch camera",
    capturing: "Capturing…",
    recognizing: "AI is recognising…",
    saving: "Saving…",
    retake: "Retake",
    scanAgain: "Scan again",
    confidence: "Confidence",
    foundedOrBuilt: "Founded / built",
    historicalPeriod: "Historical period",
    significance: "Why it matters",
    history: "Historical background",
    architectureOrNature: "Visible features",
    facts: "Notable facts",
    visitorTips: "Visitor tips",
    deleteScan: "Delete",
    historyTitle: "Places you have scanned",
    historyEmpty: "Nothing scanned yet. Capture your first photo.",
    hint: "Frame the subject and hold steady.",
    errors: {
      permission: "Camera permission is required. Allow it in your browser settings.",
      "no-camera": "No camera found. Try opening on a phone.",
      ai: "Recognition failed. Please try again.",
      upload: "Saving failed. The result still shows but won't be in history.",
      network: "Network error. Check your connection.",
      "rate-limit": "Too many requests. Wait a moment and try again.",
      unknown: "Something went wrong. Please try again.",
    },
  },
};
