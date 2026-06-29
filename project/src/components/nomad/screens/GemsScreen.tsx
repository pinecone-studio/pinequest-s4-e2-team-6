"use client";

import { useEffect, useMemo, useState } from "react";
import { images } from "../data/content";
import { OrnamentDivider } from "../shared/Ornament";
import { ScreenFrame } from "../shared/ScreenFrame";
import { AimagMap } from "../gems/AimagMap";
import { GemDetail } from "../gems/GemDetail";
import { GemGrid } from "../gems/GemGrid";
import { gemsCopy } from "../gems/gemsCopy";
import { aimagById } from "@/lib/gems/aimags";
import { aimagCounts, gemsByAimag } from "@/lib/gems/seed";
import { useGeolocation } from "@/lib/offline/useGeolocation";
import type { Gem } from "@/lib/gems/types";
import type { Language, ScreenId } from "../types";

type GemsScreenProps = { language: Language; setActive: (s: ScreenId) => void };

/**
 * Hidden gems by province: an interactive Mongolia map → cinematic cards with
 * live GPS distances → a detail with a real Leaflet route + AI guide.
 */
export function GemsScreen({ language, setActive }: GemsScreenProps) {
  const t = gemsCopy[language];
  const geo = useGeolocation();
  const startGeo = geo.start;
  const [aimag, setAimag] = useState<string | null>(null);
  const [open, setOpen] = useState<Gem | null>(null);

  useEffect(() => {
    startGeo(); // live distances as the visitor moves
  }, [startGeo]);

  const coords = useMemo(
    () => (geo.fix ? { lat: geo.fix.lat, lng: geo.fix.lng } : null),
    [geo.fix],
  );
  const list = aimag ? gemsByAimag(aimag) : [];
  const a = aimag ? aimagById(aimag) : null;

  return (
    <ScreenFrame bg={images.steppe}>
      <section className="space-y-5 py-6">
        <header className="animate-fade-up text-center">
          <p className="text-sm font-black uppercase tracking-tight text-[#00658b] dark:text-[#7dd0ff]">{t.eyebrow}</p>
          <h2 className="mt-1 text-3xl font-black tracking-tight sm:text-5xl">{t.title}</h2>
          <p className="mx-auto mt-2 max-w-md leading-7 text-black/60 dark:text-white/60">{t.subtitle}</p>
          <OrnamentDivider className="mt-5" />
        </header>

        <div className="glass-panel rounded-[28px] p-3 text-[#00658b] dark:text-[#7dd0ff]">
          <AimagMap counts={aimagCounts()} selected={aimag} language={language} onSelect={setAimag} />
        </div>

        {a ? (
          <h3 className="text-center text-lg font-black tracking-tight">
            {language === "mn" ? a.nameMn : a.nameEn} · {list.length} {t.places}
          </h3>
        ) : (
          <p className="text-center text-sm font-bold text-black/45 dark:text-white/45">{t.pick}</p>
        )}

        {aimag && <GemGrid gems={list} coords={coords} language={language} onOpen={setOpen} />}
      </section>

      {open && (
        <GemDetail
          gem={open}
          coords={coords}
          language={language}
          onClose={() => setOpen(null)}
          onNavigate={(s) => {
            setOpen(null);
            setActive(s);
          }}
        />
      )}
    </ScreenFrame>
  );
}
