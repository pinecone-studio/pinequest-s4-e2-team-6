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
  zh: {
    title: "AI 相机",
    subtitle: "把相机对准地标、自然景观或文化对象即可识别。",
    start: "打开相机",
    starting: "正在启动相机…",
    capture: "识别",
    switchCamera: "切换相机",
    capturing: "正在拍摄…",
    recognizing: "AI 正在识别…",
    saving: "正在保存…",
    retake: "重拍",
    scanAgain: "再次扫描",
    confidence: "置信度",
    foundedOrBuilt: "创建 / 建成",
    historicalPeriod: "历史时期",
    significance: "重要性",
    history: "历史背景",
    architectureOrNature: "可见特征",
    facts: "相关事实",
    visitorTips: "旅行建议",
    deleteScan: "删除",
    historyTitle: "你扫描过的地点",
    historyEmpty: "还没有扫描记录。拍摄第一张照片吧。",
    hint: "把主体放入画面并保持稳定。",
    errors: {
      permission: "需要相机权限。请在浏览器设置中允许。",
      "no-camera": "未找到相机。请尝试用手机打开。",
      ai: "识别失败。请重试。",
      upload: "保存失败。结果仍会显示，但不会进入历史记录。",
      network: "网络错误。请检查连接。",
      "rate-limit": "请求过多。请稍等后再试。",
      unknown: "出现错误。请重试。",
    },
  },
  ru: {
    title: "AI камера",
    subtitle: "Наведите камеру на достопримечательность, природу или культурный объект.",
    start: "Открыть камеру",
    starting: "Запуск камеры…",
    capture: "Распознать",
    switchCamera: "Сменить камеру",
    capturing: "Снимок…",
    recognizing: "AI распознает…",
    saving: "Сохранение…",
    retake: "Переснять",
    scanAgain: "Сканировать снова",
    confidence: "Уверенность",
    foundedOrBuilt: "Основано / построено",
    historicalPeriod: "Исторический период",
    significance: "Почему важно",
    history: "Историческая справка",
    architectureOrNature: "Видимые особенности",
    facts: "Факты",
    visitorTips: "Советы туристу",
    deleteScan: "Удалить",
    historyTitle: "Ваши сканы",
    historyEmpty: "Пока ничего нет. Сделайте первый снимок.",
    hint: "Поместите объект в кадр и держите ровно.",
    errors: {
      permission: "Нужно разрешение камеры. Разрешите его в настройках браузера.",
      "no-camera": "Камера не найдена. Попробуйте открыть на телефоне.",
      ai: "Распознавание не удалось. Попробуйте снова.",
      upload: "Сохранение не удалось. Результат виден, но не попадет в историю.",
      network: "Ошибка сети. Проверьте соединение.",
      "rate-limit": "Слишком много запросов. Подождите и попробуйте снова.",
      unknown: "Что-то пошло не так. Попробуйте снова.",
    },
  },
  es: {
    title: "Camara AI",
    subtitle: "Apunta la camara a un lugar, naturaleza o cultura para identificarlo.",
    start: "Abrir camara",
    starting: "Iniciando camara…",
    capture: "Identificar",
    switchCamera: "Cambiar camara",
    capturing: "Capturando…",
    recognizing: "AI esta reconociendo…",
    saving: "Guardando…",
    retake: "Repetir",
    scanAgain: "Escanear otra vez",
    confidence: "Confianza",
    foundedOrBuilt: "Fundado / construido",
    historicalPeriod: "Periodo historico",
    significance: "Por que importa",
    history: "Contexto historico",
    architectureOrNature: "Rasgos visibles",
    facts: "Datos destacados",
    visitorTips: "Consejos para visitantes",
    deleteScan: "Eliminar",
    historyTitle: "Lugares escaneados",
    historyEmpty: "Aun no hay escaneos. Captura tu primera foto.",
    hint: "Encuadra el sujeto y manten estable.",
    errors: {
      permission: "Se requiere permiso de camara. Activalo en el navegador.",
      "no-camera": "No se encontro camara. Prueba en un telefono.",
      ai: "Fallo el reconocimiento. Intenta de nuevo.",
      upload: "No se pudo guardar. El resultado se muestra, pero no estara en el historial.",
      network: "Error de red. Revisa tu conexion.",
      "rate-limit": "Demasiadas solicitudes. Espera un momento e intenta de nuevo.",
      unknown: "Algo salio mal. Intenta de nuevo.",
    },
  },
};
