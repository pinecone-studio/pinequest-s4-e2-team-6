import { useEffect, useRef, useState, useCallback } from "react";
import { copy, images } from "../data/content";
import { MaterialIcon } from "../icons/MaterialIcon";
import { ScreenFrame } from "../shared/ScreenFrame";
import type { Language } from "../types";

type SafetyScreenProps = { language: Language };
type Coords = { lat: number; lon: number; accuracy: number };
type Place = { name: string | null; lat: number; lon: number; dist: number };
type TrailPoint = { lat: number; lon: number; time: number };

const UB_FALLBACK = { lat: 47.9184, lon: 106.9177 };
const EMBASSY_COUNTRIES = [
  "Japan",
  "United States",
  "United Kingdom",
  "Germany",
  "France",
];
const EMBASSY_DATA: Record<
  string,
  { phone: string; addressEn: string; addressMn: string }
> = {
  Japan: {
    phone: "+976 11 32 0777",
    addressEn: "Olympic Street 12, Ulaanbaatar",
    addressMn: "Улаанбаатар, Олимпын гудамж 12",
  },
  "United States": {
    phone: "+976 7007 6001",
    addressEn: "Denver Street 3, Ulaanbaatar",
    addressMn: "Улаанбаатар, Денверийн гудамж 3",
  },
  "United Kingdom": {
    phone: "+976 11 45 8133",
    addressEn: "Peace Avenue 30, Ulaanbaatar",
    addressMn: "Улаанбаатар, Энхтайваны өргөн чөлөө 30",
  },
  Germany: {
    phone: "+976 11 32 3325",
    addressEn: "United Nations Street 7, Ulaanbaatar",
    addressMn: "Улаанбаатар, НҮБ-ын гудамж 7",
  },
  France: {
    phone: "+976 11 32 4519",
    addressEn: "Elchin Street 3, Ulaanbaatar",
    addressMn: "Улаанбаатар, Элчингийн гудамж 3",
  },
};

function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function SafetyScreen({ language }: SafetyScreenProps) {
  const isEn = language === "en";

  const safetyMn = {
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
      { mn: "Цагдаа дуудаарай!", en: "Tsagdaa duudaarai! — Call the police!" },
      { mn: "Надад эмч хэрэгтэй", en: "Nadad emch heregtei — I need a doctor" },
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
  };

  const safetyEn = {
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
      { mn: "Цагдаа дуудаарай!", en: "Tsagdaa duudaarai! — Call the police!" },
      { mn: "Надад эмч хэрэгтэй", en: "Nadad emch heregtei — I need a doctor" },
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
  };

  const text: any = isEn ? safetyEn : safetyMn;

  const [coords, setCoords] = useState<Coords | null>(null);
  const [searchStatus, setSearchStatus] = useState<
    "idle" | "searching" | "done" | "error"
  >("idle");
  const [activeTab, setActiveTab] = useState<
    "hospital" | "pharmacy" | "police"
  >("hospital");
  const [places, setPlaces] = useState<Record<string, Place | null>>({
    hospital: null,
    pharmacy: null,
    police: null,
  });
  const [openAccordion, setOpenAccordion] = useState<"aid" | "phrases" | null>(
    null,
  );
  const [embassy, setEmbassy] = useState(EMBASSY_COUNTRIES[1]);

  const [sosOpen, setSosOpen] = useState(false);
  const [holdPct, setHoldPct] = useState(0);
  const [holding, setHolding] = useState(false);
  const [mapFocus, setMapFocus] = useState(0);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [strobe, setStrobe] = useState(false);
  const [siren, setSiren] = useState(false);
  const [aiModal, setAiModal] = useState(false);
  const [symptom, setSymptom] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const [isTracking, setIsTracking] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);

  const [timeLeftStr, setTimeLeftStr] = useState<string>("");

  const [audioLoadingKey, setAudioLoadingKey] = useState<number | null>(null);

  const holdStart = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);
  const audioCtx = useRef<AudioContext | null>(null);
  const oscillator = useRef<OscillatorNode | null>(null);
  const sirenInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const strobeInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaStreamTrack = useRef<MediaStreamTrack | null>(null);
  const trackingWatchId = useRef<number | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  }, []);

  const triggerVibrate = (pattern = [80]) => {
    if (navigator.vibrate) navigator.vibrate(pattern);
  };

  useEffect(() => {
    const calculateSunsetCountdown = () => {
      const now = new Date();
      const sunset = new Date();
      sunset.setHours(21, 40, 0, 0);

      let diffMs = sunset.getTime() - now.getTime();
      if (diffMs < 0) {
        sunset.setDate(sunset.getDate() + 1);
        diffMs = sunset.getTime() - now.getTime();
      }

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      if (isEn) {
        setTimeLeftStr(`~21:40 (${hours}h ${minutes}m ${seconds}s left)`);
      } else {
        setTimeLeftStr(`~21:40 (${hours}ц ${minutes}м ${seconds}с дутуу)`);
      }
    };

    calculateSunsetCountdown();
    const interval = setInterval(calculateSunsetCountdown, 1000);
    return () => clearInterval(interval);
  }, [isEn]);

  const speakPhraseWithChimege = async (phrase: string, index: number) => {
    setAudioLoadingKey(index);
    try {
      const res = await fetch("/api/chimege", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: phrase }),
      });

      const data = await res.json();
      if (data.audio) {
        const audio = new Audio(data.audio);
        audio.play();
      } else {
        throw new Error("Fallback to client TTS");
      }
    } catch {
      if (!window.speechSynthesis) return showToast("TTS not supported");
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = "mn-MN";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    } finally {
      setAudioLoadingKey(null);
    }
  };

  const toggleTracking = () => {
    triggerVibrate([100]);
    if (isTracking) {
      if (trackingWatchId.current !== null) {
        navigator.geolocation.clearWatch(trackingWatchId.current);
        trackingWatchId.current = null;
      }
      setIsTracking(false);
      showToast(
        isEn ? "Trail tracking paused." : "Зам тэмдэглэгээг зогсоолоо.",
      );
    } else {
      if (!navigator.geolocation) return showToast("GPS not supported");
      setIsTracking(true);
      showToast(
        isEn
          ? "Tracking started. Safe return path recording..."
          : "Тэмдэглэгээ эхэллээ. Буцах зам бичигдэж байна...",
      );

      trackingWatchId.current = navigator.geolocation.watchPosition(
        (pos) => {
          const newPoint = {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            time: Date.now(),
          };
          setTrail((prev) => {
            if (prev.length === 0) return [newPoint];
            const last = prev[prev.length - 1];
            const dist = haversine(
              last.lat,
              last.lon,
              newPoint.lat,
              newPoint.lon,
            );
            if (dist > 0.015) return [...prev, newPoint];
            return prev;
          });
        },
        () => {},
        { enableHighAccuracy: true, timeout: 5000 },
      );
    }
  };

  const clearTrail = () => {
    triggerVibrate([50]);
    setTrail([]);
    showToast(isEn ? "Trail history cleared." : "Түүхэн замбарыг устгалаа.");
  };

  const findNearby = useCallback(async (lat: number, lon: number) => {
    setSearchStatus("searching");
    const radius = 9000;
    const query = `[out:json][timeout:15];(node["amenity"="hospital"](around:${radius},${lat},${lon});node["amenity"="pharmacy"](around:${radius},${lat},${lon});node["amenity"="police"](around:${radius},${lat},${lon}););out center 15;`;
    try {
      const res = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: "data=" + encodeURIComponent(query),
      });
      const data = await res.json();
      const temp: Record<string, Place[]> = {
        hospital: [],
        pharmacy: [],
        police: [],
      };

      for (const el of data.elements ?? []) {
        const plat = el.lat ?? el.center?.lat;
        const plon = el.lon ?? el.center?.lon;
        if (!plat || !plon) continue;
        const type =
          el.tags?.amenity === "hospital"
            ? "hospital"
            : el.tags?.amenity === "pharmacy"
              ? "pharmacy"
              : "police";
        temp[type].push({
          name: el.tags?.["name:en"] ?? el.tags?.name ?? null,
          lat: plat,
          lon: plon,
          dist: haversine(lat, lon, plat, plon),
        });
      }
      setPlaces({
        hospital: temp.hospital.sort((a, b) => a.dist - b.dist)[0] ?? {
          name: "Chingeltei District Health Centre",
          lat: 47.925,
          lon: 106.915,
          dist: 1.3,
        },
        pharmacy: temp.pharmacy.sort((a, b) => a.dist - b.dist)[0] ?? {
          name: "Monos Pharmacy",
          lat: 47.921,
          lon: 106.912,
          dist: 0.8,
        },
        police: temp.police.sort((a, b) => a.dist - b.dist)[0] ?? {
          name: "District Police Department",
          lat: 47.93,
          lon: 106.92,
          dist: 1.9,
        },
      });
      setSearchStatus("done");
    } catch {
      setPlaces({
        hospital: {
          name: "Chingeltei District Health Centre",
          lat: 47.925,
          lon: 106.915,
          dist: 1.3,
        },
        pharmacy: {
          name: "Monos Pharmacy",
          lat: 47.921,
          lon: 106.912,
          dist: 0.8,
        },
        police: {
          name: "District Police Department",
          lat: 47.93,
          lon: 106.92,
          dist: 1.9,
        },
      });
      setSearchStatus("done");
    }
  }, []);

  const requestLocation = useCallback(() => {
    setSearchStatus("searching");
    if (!navigator.geolocation) {
      findNearby(UB_FALLBACK.lat, UB_FALLBACK.lon);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const c = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        };
        setCoords(c);
        findNearby(c.lat, c.lon);
      },
      () => {
        showToast(text.toastLocOff);
        findNearby(UB_FALLBACK.lat, UB_FALLBACK.lon);
      },
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }, [findNearby, showToast, text.toastLocOff]);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  const toggleSiren = () => {
    if (siren) {
      if (oscillator.current) {
        oscillator.current.stop();
        oscillator.current.disconnect();
      }
      sirenInterval.current && clearInterval(sirenInterval.current);
      setSiren(false);
    } else {
      triggerVibrate([200]);
      const ctx = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
      audioCtx.current = ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      oscillator.current = osc;
      let high = true;
      sirenInterval.current = setInterval(() => {
        osc.frequency.setValueAtTime(high ? 1200 : 700, ctx.currentTime);
        high = !high;
      }, 400);
      setSiren(true);
    }
  };

  const toggleStrobe = async () => {
    if (strobe) {
      if (strobeInterval.current) clearInterval(strobeInterval.current);
      if (mediaStreamTrack.current) {
        try {
          await (mediaStreamTrack.current as any).applyConstraints({
            advanced: [{ torch: false }],
          });
          mediaStreamTrack.current.stop();
        } catch {}
        mediaStreamTrack.current = null;
      }
      const body = document.getElementById("safety-root");
      if (body) body.style.backgroundColor = "transparent";
      setStrobe(false);
    } else {
      triggerVibrate([200]);
      setStrobe(true);
      let state = false;
      strobeInterval.current = setInterval(() => {
        state = !state;
        const body = document.getElementById("safety-root");
        if (body)
          body.style.backgroundColor = state ? "#ef4444" : "transparent";
      }, 150);
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
          });
          const track = stream.getVideoTracks()[0];
          mediaStreamTrack.current = track;
          const capabilities = (track as any).getCapabilities?.() || {};
          if (capabilities.torch) {
            await (track as any).applyConstraints({
              advanced: [{ torch: true }],
            });
          }
        }
      } catch (err) {
        console.warn("Flashlight torch constraint error or denied:", err);
      }
    }
  };

  const handleSymptomCheck = async () => {
    if (!symptom.trim()) return;
    setAiLoading(true);
    setAiResult("");
    try {
      const res = await fetch("/api/symptom-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptom, language }),
      });
      const data = await res.json();
      if (data.result) setAiResult(data.result);
      else
        setAiResult(
          isEn
            ? "⚠️ Unable to parse analysis."
            : "⚠️ Оношлогоо амжилтгүй боллоо.",
        );
    } catch {
      const sym = symptom.toLowerCase();
      if (
        sym.includes("fever") ||
        sym.includes("халуурах") ||
        sym.includes("tolgoi") ||
        sym.includes("headache")
      ) {
        setAiResult(
          isEn
            ? "⚠️ High probability of Cold Exposure / Steppe Fatigue. Hydrate and maintain core temperature."
            : "⚠️ Даарч зутарсан эсвэл хээрийн ядаргаанаас үүдэлтэй халууралт байх магадлал өндөр. Дулаан хувцаслаж, шингэн сайн ууна уу.",
        );
      } else {
        setAiResult(
          isEn
            ? "⚠️ Unknown baseline response. Please prioritize resting or utilize Directions to nearest clinic."
            : "⚠️ Тодорхойгүй шинж тэмдэг. Биеийн байдлыг тогтвортой байлгаж, Эмнэлэг цэсний чиглэл авах товчийг ашиглана уу.",
        );
      }
    } finally {
      setAiLoading(false);
    }
  };

  const shareLocation = useCallback(async () => {
    const lat = coords?.lat ?? UB_FALLBACK.lat;
    const lon = coords?.lon ?? UB_FALLBACK.lon;
    const url = `https://www.google.com/maps?q=${lat},${lon}`;
    triggerVibrate();
    if (navigator.share)
      await navigator.share({ title: "Emergency Location", url });
    else {
      navigator.clipboard.writeText(url);
      showToast(text.toastCopied);
    }
  }, [coords, showToast, text.toastCopied]);

  const cancelHold = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    holdStart.current = null;
    setHolding(false);
    setHoldPct(0);
  }, []);

  const step = useCallback(() => {
    if (!holdStart.current) return;
    const elapsed = Date.now() - holdStart.current;
    setHoldPct(Math.min(100, (elapsed / 1500) * 100));
    if (elapsed < 1500) rafId.current = requestAnimationFrame(step);
  }, []);

  const startHold = useCallback(() => {
    triggerVibrate([50]);
    setHolding(true);
    holdStart.current = Date.now();
    step();
    setTimeout(() => {
      if (holdStart.current) {
        cancelHold();
        triggerVibrate([300, 100, 300]);
        setSosOpen(true);
      }
    }, 1500);
  }, [cancelHold, step]);

  const mapLat = coords?.lat ?? UB_FALLBACK.lat;
  const mapLon = coords?.lon ?? UB_FALLBACK.lon;
  const targetPlace = places[activeTab];
  const directionUrl = targetPlace
    ? `https://www.google.com/maps/dir/?api=1&destination=${targetPlace.lat},${targetPlace.lon}`
    : "#";
  const trailUrl =
    trail.length > 0
      ? `https://www.google.com/maps/dir/${trail.map((p) => `${p.lat},${p.lon}`).join("/")}`
      : "#";

  return (
    <ScreenFrame bg={images.map}>
      <div
        id="safety-root"
        className="transition-colors duration-150 min-h-screen pb-36 mb-12"
      >
        <section className="py-6 max-w-7xl mx-auto px-4 text-white">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-1.5 text-xs font-black uppercase text-red-500 animate-pulse">
            <span className="size-2 rounded-full bg-red-500" />
            <MaterialIcon name="verified_user" />{" "}
            {isEn ? "VERIFIED SAFETY CENTER" : "БАТАЛГААЖСАН АЮУЛГҮЙ БҮС"}
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-4xl font-black md:text-5xl tracking-tight">
                {text.title}
              </h2>
              <p className="mt-2 max-w-2xl text-white/60 text-sm">
                {text.description}
              </p>
            </div>
            {/* <button
              onClick={() => setAiModal(true)}
              className="self-start md:self-center flex items-center gap-2 rounded-2xl bg-linear-to-r from-purple-600 to-indigo-600 px-5 py-3 text-xs font-black uppercase tracking-wider hover:from-purple-700 hover:to-indigo-700 shadow-xl transition-all active:scale-95"
            >
              <MaterialIcon name="psychology" />{" "}
              {isEn ? "AI Diagnosis" : "AI Оношлогоо"}
            </button> */}
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-12">
            <div className="relative overflow-hidden rounded-3xl p-6 text-center md:col-span-5 bg-white/5 border border-white/10 shadow-2xl flex flex-col items-center justify-center">
              <button
                onClick={() => {
                  setMapFocus((p) => p + 1);
                  requestLocation();
                }}
                className="absolute right-4 top-4 size-9 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all"
              >
                <MaterialIcon name="refresh" className="text-lg" />
              </button>
              <div className="relative mb-4 flex size-40 items-center justify-center">
                <div className="absolute size-40 rounded-full border border-sky-500/20" />
                <div
                  className="absolute size-40 rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, rgba(14,165,233,0.25), transparent 45%)",
                    animation: "safety-spin 3.5s linear infinite",
                  }}
                />
                <div className="absolute size-3.5 rounded-full bg-sky-500 shadow-[0_0_15px_#0ea5e9]" />
              </div>
              <p className="font-mono text-sm font-bold">
                <span className="mb-0.5 block text-[10px] uppercase tracking-widest text-white/40">
                  {coords ? text.liveLabel : text.locatingLabel}
                </span>
                {mapLat.toFixed(5)}, {mapLon.toFixed(5)}
              </p>
              <div className="mt-1 flex items-center gap-4 text-[11px] text-white/50 bg-black/20 px-3 py-1 rounded-full font-medium">
                <span>
                  {isEn
                    ? `Accuracy: ${Math.round(coords?.accuracy || 35)}m`
                    : `Нарийвчлал: ${Math.round(coords?.accuracy || 35)}м`}
                </span>
                <span className="w-px h-2.5 bg-white/20" />

                <span className="flex items-center gap-1">
                  <MaterialIcon
                    name="wb_twilight"
                    className="text-xs text-amber-400"
                  />{" "}
                  {isEn
                    ? `Sunset: ${timeLeftStr}`
                    : `Нар жаргах: ${timeLeftStr}`}
                </span>
              </div>
              <button
                onClick={shareLocation}
                className="mt-5 w-full max-w-xs inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 hover:bg-sky-700 text-white py-3.5 text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-sky-600/20 active:scale-95"
              >
                <MaterialIcon name="share" /> {text.shareBtn}
              </button>
            </div>

            <div className="overflow-hidden rounded-3xl md:col-span-7 flex flex-col justify-between bg-white/5 border border-white/10 shadow-2xl">
              <div className="relative h-56 w-full">
                <iframe
                  title="Safety Map"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapLon - 0.02},${mapLat - 0.01},${mapLon + 0.02},${mapLat + 0.01}&marker=${mapLat},${mapLon}&layer=mapnik&v=${mapFocus}`}
                  className="size-full border-0 opacity-85"
                />
                <div className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-sky-400 backdrop-blur-sm">
                  LIVE RADAR MAP
                </div>
              </div>
              <div className="p-5">
                <div className="flex gap-2 border-b border-white/10 pb-3 mb-4 overflow-x-auto">
                  {(["hospital", "pharmacy", "police"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`px-4 py-2 rounded-full text-xs font-black transition-all flex items-center gap-2 ${activeTab === t ? "bg-sky-600 text-white shadow-md shadow-sky-600/10" : "bg-white/5 text-white/60 hover:bg-white/10"}`}
                    >
                      <MaterialIcon
                        name={
                          t === "hospital"
                            ? "local_hospital"
                            : t === "pharmacy"
                              ? "local_pharmacy"
                              : "local_police"
                        }
                        className="text-sm"
                      />
                      {t === "hospital"
                        ? isEn
                          ? "Hospital"
                          : "Эмнэлэг"
                        : t === "pharmacy"
                          ? isEn
                            ? "Pharmacy"
                            : "Эмийн Сан"
                          : isEn
                            ? "Police"
                            : "Цагдаа"}
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="truncate">
                    <p className="text-[10px] font-black uppercase tracking-wider text-sky-400">
                      {isEn
                        ? `NEAREST ${activeTab.toUpperCase()}`
                        : `ОЙРОЛЦООХ ${activeTab === "hospital" ? "ЭМНЭЛЭГ" : activeTab === "pharmacy" ? "ЭМИЙН САН" : "ЦАГДАА"}`}
                    </p>
                    <h3 className="text-xl font-bold mt-0.5 truncate">
                      {targetPlace?.name ?? text.hospitalSearching}
                    </h3>
                    <p className="text-xs text-white/50 mt-0.5 font-medium">
                      {targetPlace
                        ? isEn
                          ? `${targetPlace.dist.toFixed(1)} km away`
                          : `${targetPlace.dist.toFixed(1)} км зайд байна`
                        : ""}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <a
                      href={directionUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-4 h-11 rounded-full bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all active:scale-90 text-xs font-black uppercase"
                    >
                      <MaterialIcon name="directions" />{" "}
                      <span>{isEn ? "Route" : "Чиэл"}</span>
                    </a>
                    <a
                      href={`tel:${activeTab === "police" ? "102" : "103"}`}
                      className="size-11 rounded-full bg-sky-500/10 text-sky-400 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all active:scale-90"
                    >
                      <MaterialIcon name="call" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl p-5 md:col-span-4 bg-linear-to-br from-neutral-900 to-neutral-950 border border-white/10 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div
                    className={`size-3 rounded-full ${isTracking ? "bg-red-500 animate-pulse" : "bg-neutral-600"}`}
                  />
                  <h3 className="text-lg font-bold">
                    {isEn ? "Breadcrumb Trail" : "Офлайн Зам Тэмдэглэгч"}
                  </h3>
                </div>
                <p className="text-[11px] text-white/50 mt-1.5 leading-relaxed">
                  {isEn
                    ? "Records your exact movement using local GPS without network cellular data. Safely retrace steps if lost."
                    : "Сүлжээгүй газар явахдаа асаавал таны явсан замыг утасны GPS-ээр тэмдэглэнэ. Төөрсөн үедээ ирсэн замаараа яг таг ухрах боломжтой."}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5">
                <div className="flex items-center justify-between mb-3 px-1 text-xs">
                  <span className="text-white/40">
                    {isEn ? "Recorded Points:" : "Тэмдэглэсэн цэг:"}
                  </span>
                  <span className="font-mono font-black text-sky-400">
                    {trail.length} pts
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={toggleTracking}
                    className={`flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${isTracking ? "bg-red-600 text-white animate-pulse" : "bg-sky-600 hover:bg-sky-700 text-white"}`}
                  >
                    <MaterialIcon
                      name={isTracking ? "pause_circle" : "play_circle"}
                    />
                    {isTracking
                      ? isEn
                        ? "Stop"
                        : "Зогсоох"
                      : isEn
                        ? "Start Trail"
                        : "Зам бичих"}
                  </button>
                  {trail.length > 0 ? (
                    <a
                      href={trailUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-center hover:bg-emerald-500 hover:text-white transition-all"
                    >
                      <MaterialIcon name="history" />{" "}
                      {isEn ? "Retrace" : "Буцах"}
                    </a>
                  ) : (
                    <button
                      disabled
                      className="flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-black uppercase tracking-wider bg-white/5 text-white/20 cursor-not-allowed"
                    >
                      <MaterialIcon name="history" />{" "}
                      {isEn ? "Retrace" : "Буцах"}
                    </button>
                  )}
                </div>
                {trail.length > 0 && (
                  <button
                    onClick={clearTrail}
                    className="w-full text-center text-[10px] text-white/30 hover:text-red-400 font-bold mt-2.5 transition-colors uppercase tracking-wide"
                  >
                    {isEn ? "Clear Trail History" : "Түүх устгах"}
                  </button>
                )}
              </div>
            </div>

            <div className="rounded-3xl p-5 md:col-span-4 bg-white/5 border border-white/10 shadow-2xl">
              <div className="flex items-center gap-3">
                <MaterialIcon
                  name="cloud_download"
                  className="text-sky-400 text-2xl"
                />
                <h3 className="text-lg font-bold">{text.guideTitle}</h3>
              </div>
              <div className="mt-4 space-y-2">
                {(["aid", "phrases"] as const).map((key) => (
                  <div
                    key={key}
                    className="border-b border-white/5 last:border-0 pb-1"
                  >
                    <button
                      onClick={() =>
                        setOpenAccordion(openAccordion === key ? null : key)
                      }
                      className="flex w-full items-center justify-between py-2 text-xs font-bold text-white/80 hover:text-white transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <MaterialIcon
                          name={
                            key === "aid" ? "medical_services" : "translate"
                          }
                          className="text-sm text-sky-400"
                        />
                        {key === "aid"
                          ? text.firstAidHeading
                          : text.phrasesHeading}
                      </span>
                      <MaterialIcon
                        name="expand_more"
                        className={`transition-transform duration-200 ${openAccordion === key ? "rotate-180 text-sky-400" : ""}`}
                      />
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-300 text-xs text-white/60"
                      style={{
                        maxHeight: openAccordion === key ? "240px" : "0px",
                      }}
                    >
                      <div className="pt-2 pb-1 max-h-48 overflow-y-auto space-y-2 scrollbar-none">
                        {key === "aid"
                          ? text.firstAidItems.map((item: any, idx: number) => (
                              <div
                                key={idx}
                                className="bg-white/5 p-2.5 rounded-xl border border-white/5"
                              >
                                <div className="font-black text-sky-400 text-[11px] uppercase tracking-wide">
                                  {item.title}
                                </div>
                                <div className="text-[11px] mt-0.5 leading-relaxed text-white/70">
                                  {item.body}
                                </div>
                              </div>
                            ))
                          : text.phrases.map((p: any, idx: number) => (
                              <div
                                key={idx}
                                className="flex justify-between items-center bg-white/5 p-2.5 rounded-xl border border-white/5 text-[11px] font-medium group"
                              >
                                <div className="flex flex-col">
                                  <span className="text-emerald-400 font-bold">
                                    {p.mn}
                                  </span>
                                  <span className="text-white/40 text-[10px]">
                                    {p.en.split("—")[1] ?? p.en}
                                  </span>
                                </div>

                                <button
                                  onClick={() =>
                                    speakPhraseWithChimege(p.mn, idx)
                                  }
                                  disabled={audioLoadingKey === idx}
                                  className="size-7 rounded-full bg-white/5 hover:bg-emerald-500/20 text-white flex items-center justify-center transition-all active:scale-90 disabled:opacity-40"
                                >
                                  <MaterialIcon
                                    name={
                                      audioLoadingKey === idx
                                        ? "hourglass_top"
                                        : "volume_up"
                                    }
                                    className={`text-sm ${audioLoadingKey === idx ? "animate-spin" : ""}`}
                                  />
                                </button>
                              </div>
                            ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl p-5 md:col-span-4 bg-white/5 border border-white/10 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <MaterialIcon
                    name="account_balance"
                    className="text-sky-400 text-2xl"
                  />
                  <h3 className="text-lg font-bold">{text.embassyTitle}</h3>
                </div>
                <p className="text-[11px] text-white/40 mt-1">
                  {text.embassyMeta}
                </p>
                <select
                  value={embassy}
                  onChange={(e) => setEmbassy(e.target.value)}
                  className="mt-4 w-full rounded-xl border border-white/10 bg-neutral-900 px-3 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-sky-500"
                >
                  {EMBASSY_COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 space-y-2">
                <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-sky-400">
                      {text.embassyFindContact}
                    </span>
                    <div className="font-mono text-sm font-black mt-0.5 text-white/90">
                      {EMBASSY_DATA[embassy]?.phone ?? "+976 11 32 0777"}
                    </div>
                  </div>
                  <a
                    href={`tel:${(EMBASSY_DATA[embassy]?.phone ?? "+97611320777").replace(/\s+/g, "")}`}
                    className="size-8 rounded-full bg-sky-600 text-white flex items-center justify-center hover:bg-sky-700 transition-all active:scale-90"
                  >
                    <MaterialIcon name="call" className="text-sm" />
                  </a>
                </div>
                <div className="text-[10px] text-white/40 flex items-center gap-1.5 px-1 truncate">
                  <MaterialIcon
                    name="place"
                    className="text-xs text-red-400 shrink-0"
                  />
                  <span className="truncate">
                    {isEn
                      ? EMBASSY_DATA[embassy]?.addressEn
                      : EMBASSY_DATA[embassy]?.addressMn}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl p-5 md:col-span-4 bg-white/5 border border-white/10 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <MaterialIcon
                    name="emergency"
                    className="text-red-500 text-2xl"
                  />
                  <h3 className="text-lg font-bold">
                    {isEn ? "Emergency Lines" : "Шуурхай дуудлага"}
                  </h3>
                </div>
                <p className="text-xs text-white/50 mt-2">
                  {isEn
                    ? "Direct toll-free lines operating nationwide without network cellular data."
                    : "Сүлжээ харгалзахгүй шууд үнэгүй холбогдох улсын дугаарууд."}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <a
                  href="tel:101"
                  className="flex items-center justify-between p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-bold hover:bg-red-500/20 transition-all"
                >
                  <span>{isEn ? "Emergency" : "Онцгой"}</span>
                  <span className="font-mono text-red-400">101</span>
                </a>
                <a
                  href="tel:102"
                  className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-bold hover:bg-amber-500/20 transition-all"
                >
                  <span>{isEn ? "Police" : "Цагдаа"}</span>
                  <span className="font-mono text-amber-400">102</span>
                </a>
              </div>
            </div>
          </div>

          <div className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center w-full px-4 max-w-sm">
            {holding && (
              <div className="mb-2 rounded-full bg-black/95 px-3 py-1 text-[10px] font-black text-white backdrop-blur-md animate-bounce tracking-wider">
                {text.sosHoldHint}
              </div>
            )}
            <button
              type="button"
              onMouseDown={startHold}
              onMouseUp={cancelHold}
              onMouseLeave={cancelHold}
              onTouchStart={(e) => {
                e.preventDefault();
                startHold();
              }}
              onTouchEnd={cancelHold}
              className="relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-red-600 hover:bg-red-700 py-4 text-base font-black text-white shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all transform active:scale-98 select-none"
            >
              <div
                className="absolute inset-y-0 left-0 bg-white/25 transition-[width] duration-75"
                style={{ width: `${holdPct}%` }}
              />
              <MaterialIcon name="sos" className="text-2xl animate-pulse" />{" "}
              <span>{holding ? text.sosHolding : text.sos}</span>
            </button>
          </div>

          {sosOpen && (
            <div
              className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 backdrop-blur-sm md:items-center p-4"
              onClick={(e) => e.target === e.currentTarget && setSosOpen(false)}
            >
              <div className="w-full max-w-md rounded-3xl bg-[#141a1f] p-6 shadow-2xl border border-white/10 text-white">
                <h2 className="text-2xl font-black text-red-500 flex items-center gap-2">
                  <MaterialIcon name="emergency_share" /> {text.sosModalTitle}
                </h2>
                <p className="text-xs text-white/50 mt-1 mb-4">
                  {text.sosModalSub}
                </p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <button
                    onClick={toggleStrobe}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black border transition-all ${strobe ? "bg-red-500 border-red-400 text-white" : "bg-white/5 border-white/10 text-white/80"}`}
                  >
                    <MaterialIcon name="flashlight_on" />{" "}
                    {strobe ? "STOP STROBE" : "STROBE LIGHT"}
                  </button>
                  <button
                    onClick={toggleSiren}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black border transition-all ${siren ? "bg-amber-500 border-amber-400 text-white" : "bg-white/5 border-white/10 text-white/80"}`}
                  >
                    <MaterialIcon name="volume_up" />{" "}
                    {siren ? "STOP SIREN" : "SIREN HORN"}
                  </button>
                </div>
                <div className="space-y-2">
                  <a
                    href="tel:105"
                    className="flex items-center gap-4 p-3.5 rounded-2xl border border-white/5 bg-white/5 hover:bg-red-500/10 transition-all"
                  >
                    <div className="size-9 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
                      <MaterialIcon name="call" />
                    </div>
                    <div>
                      <div className="text-sm font-bold">
                        {text.sosCallGeneral}
                      </div>
                      <div className="text-[10px] text-white/40">
                        {text.sosCallGeneralSub}
                      </div>
                    </div>
                  </a>
                  <button
                    onClick={() => {
                      shareLocation();
                      setSosOpen(false);
                    }}
                    className="w-full flex items-center gap-4 p-3.5 rounded-2xl border border-white/5 bg-white/5 hover:bg-sky-500/10 text-left transition-all"
                  >
                    <div className="size-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
                      <MaterialIcon name="location_on" />
                    </div>
                    <div>
                      <div className="text-sm font-bold">{text.sosShare}</div>
                      <div className="text-[10px] text-white/40 font-mono">
                        {mapLat.toFixed(4)}, {mapLon.toFixed(4)}
                      </div>
                    </div>
                  </button>
                </div>
                <button
                  onClick={() => {
                    setSosOpen(false);
                    if (strobe) toggleStrobe();
                    if (siren) toggleSiren();
                  }}
                  className="w-full mt-4 py-2.5 text-center text-xs font-bold text-white/40 hover:text-white transition-all"
                >
                  {text.sosCancel}
                </button>
              </div>
            </div>
          )}

          {aiModal && (
            <div
              className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 backdrop-blur-sm md:items-center p-4"
              onClick={(e) => e.target === e.currentTarget && setAiModal(false)}
            >
              <div
                className="w-full max-w-md rounded-3xl bg-[#141a1f] p-6 shadow-2xl border border-white/10 text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black flex items-center gap-2 text-purple-400">
                    <MaterialIcon name="psychology" /> AI Symptom Checker
                  </h3>
                  <button
                    onClick={() => setAiModal(false)}
                    className="text-white/40 hover:text-white"
                  >
                    <MaterialIcon name="close" />
                  </button>
                </div>
                <p className="text-xs text-white/50 mt-1">
                  {isEn
                    ? "Describe symptoms to assess environmental risks."
                    : "Өөрт илэрч буй шинж тэмдгийг бичиж хээрийн нөлөө, өндрийн өвчний эрсдэлийг тодорхойлно уу."}
                </p>
                <textarea
                  value={symptom}
                  onChange={(e) => setSymptom(e.target.value)}
                  placeholder={
                    isEn
                      ? "Enter symptoms (e.g. fever, headache)..."
                      : "Шинж тэмдгээ энд бичнэ үү (жишээ нь: толгой өвдөх, халуурах)..."
                  }
                  className="mt-4 w-full h-24 rounded-xl bg-black/30 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
                />
                <button
                  onClick={handleSymptomCheck}
                  disabled={aiLoading}
                  className="mt-3 w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all disabled:opacity-50"
                >
                  {aiLoading
                    ? isEn
                      ? "Analyzing..."
                      : "Оношилж байна..."
                    : isEn
                      ? "Analyze Risk"
                      : "Эрсдэл тооцоолох"}
                </button>
                {aiResult && (
                  <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-[11px] leading-relaxed text-purple-200">
                    {aiResult}
                  </div>
                )}
              </div>
            </div>
          )}

          {toastMsg && (
            <div className="fixed bottom-28 left-1/2 z-50 -translate-x-1/2 flex items-center gap-2 rounded-full bg-white text-black px-5 py-2.5 text-xs font-black shadow-2xl">
              <MaterialIcon name="info" className="text-sky-600" /> {toastMsg}
            </div>
          )}
        </section>
      </div>
      <style>{`
        @keyframes safety-spin { to { transform: rotate(360deg); } }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </ScreenFrame>
  );
}
