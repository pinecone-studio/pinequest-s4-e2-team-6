"use client";

import { useCallback } from "react";
import { images } from "../data/content";
import { MaterialIcon } from "../icons/MaterialIcon";
import { ScreenFrame } from "../shared/ScreenFrame";
import { CoordReadout } from "../offline/CoordReadout";
import { EnableGpsCard } from "../offline/EnableGpsCard";
import { GpsRadar } from "../offline/GpsRadar";
import { OfflineConverter } from "../offline/OfflineConverter";
import { OfflineStatusBar } from "../offline/OfflineStatusBar";
import { Phrasebook } from "../offline/Phrasebook";
import { WaypointList } from "../offline/WaypointList";
import { offlineCopy } from "../offline/offlineCopy";
import { bearing, distanceKm } from "@/lib/offline/geo";
import { waypoints } from "@/lib/offline/waypoints";
import { useCompass } from "@/lib/offline/useCompass";
import { useGeolocation } from "@/lib/offline/useGeolocation";
import { useOnlineStatus } from "@/lib/offline/useOnlineStatus";
import type { Language } from "../types";

type OfflineScreenProps = { language: Language };

export function OfflineScreen({ language }: OfflineScreenProps) {
  const t = offlineCopy[language];
  const online = useOnlineStatus();
  const { fix, status, start: startGps } = useGeolocation();
  const { heading: compassHeading, start: startCompass } = useCompass();

  const enable = useCallback(() => {
    startGps();
    startCompass();
  }, [startGps, startCompass]);

  const here = fix ? { lat: fix.lat, lng: fix.lng } : null;
  const radarBlips = buildBlips(here);
  const heading = compassHeading ?? fix?.heading ?? null;

  return (
    <ScreenFrame bg={images.map}>
      <section className="space-y-5 py-6">
        <header className="animate-fade-up">
          <p className="text-sm font-black uppercase tracking-tight text-[#00658b] dark:text-[#7dd0ff]">{t.eyebrow}</p>
          <h2 className="mt-1 text-3xl font-black tracking-tight sm:text-5xl">{t.title}</h2>
          <p className="mt-2 max-w-2xl leading-7 text-black/60 dark:text-white/60">{t.subtitle}</p>
        </header>

        <OfflineStatusBar online={online} fix={fix} language={language} />

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-panel flex items-center justify-center rounded-[28px] p-6">
            {fix ? (
              <GpsRadar heading={heading} blips={radarBlips} label={t.youAreHere} />
            ) : (
              <EnableGpsCard status={status} language={language} onEnable={enable} />
            )}
          </div>

          <div className="space-y-4">
            {fix ? (
              <CoordReadout fix={fix} language={language} />
            ) : (
              <div className="glass-panel grid h-full min-h-40 place-items-center rounded-[28px] p-6 text-center text-sm text-black/50 dark:text-white/50">
                {t.subtitle}
              </div>
            )}
          </div>
        </div>

        {here && <WaypointList here={here} language={language} />}

        <div className="grid gap-4 md:grid-cols-2">
          <ReadyCard t={t} />
          <OfflineConverter language={language} />
        </div>

        <Phrasebook language={language} />
      </section>
    </ScreenFrame>
  );
}

function ReadyCard({ t }: { t: (typeof offlineCopy)[Language] }) {
  return (
    <div className="glass-panel overflow-hidden rounded-[28px]">
      <div className="bg-linear-to-br from-[#00658b] to-[#e0a32e] p-6 text-white">
        <MaterialIcon name="cloud_download" className="size-7" />
        <h3 className="mt-3 text-xl font-black tracking-tight">{t.readyTitle}</h3>
      </div>
      <p className="p-6 text-sm leading-6 text-black/60 dark:text-white/60">{t.readyDesc}</p>
    </div>
  );
}

function buildBlips(here: { lat: number; lng: number } | null) {
  if (!here) return [];
  const dists = waypoints.map((w) => distanceKm(here, w.coord));
  const max = Math.max(1, ...dists);
  return waypoints.map((w, i) => ({
    id: w.id,
    bearing: bearing(here, w.coord),
    radius: Math.min(1, Math.max(0.18, Math.sqrt(dists[i] / max))),
  }));
}
