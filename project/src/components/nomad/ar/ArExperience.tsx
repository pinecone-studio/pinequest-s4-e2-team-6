"use client";

import { useMemo, useState, type RefObject } from "react";
import { MaterialIcon } from "../icons/MaterialIcon";
import { angularDiff, isLocked, onScreen, projectX, projectY } from "@/lib/ar/projection";
import type { ArMode } from "@/lib/ar/useArView";
import { blurFor, elevationFor, opacityFor, scaleFor } from "@/lib/places/geo";
import { usePlaces, type Coords } from "@/lib/places/usePlaces";
import type { NearbyPlace, PlaceCategory } from "@/lib/places/types";
import { ArMarker } from "./ArMarker";
import { ArRadar } from "./ArRadar";
import { ArStatus } from "./ArStatus";
import { Atmosphere } from "./Atmosphere";
import { CompassStrip } from "./CompassStrip";
import { FilterChips } from "./FilterChips";
import { PlaceDetail } from "./PlaceDetail";
import { Reticle } from "./Reticle";
import { arCopy } from "./arCopy";
import type { Language } from "../types";

type View = { heading: number; pitch: number; roll: number; mode: ArMode; bind: Record<string, unknown> };
type Story = { text: string; loading: boolean; activeId: string | null; run: (id: string, prompt: string) => void };

type Props = {
  videoRef: RefObject<HTMLVideoElement | null>;
  cameraReady: boolean;
  view: View;
  story: Story;
  language: Language;
  coords: Coords;
  denied: boolean;
  accuracy?: number;
  onExit: () => void;
  onDemo: () => void;
};

/** Live AR scene driven by real GPS: nearby places locked to true bearings. */
export function ArExperience({
  videoRef,
  cameraReady,
  view,
  story,
  language,
  coords,
  denied,
  accuracy,
  onExit,
  onDemo,
}: Props) {
  const { heading, pitch, roll, bind } = view;
  const { nearby, loading } = usePlaces(coords);
  const [filter, setFilter] = useState<Set<PlaceCategory>>(new Set());

  const counts = useMemo(
    () => nearby.reduce((a, x) => ((a[x.category] = (a[x.category] ?? 0) + 1), a), {} as Record<string, number>),
    [nearby],
  );
  const visible = filter.size ? nearby.filter((x) => filter.has(x.category)) : nearby;

  const markers = visible.slice(0, 16).flatMap((place) => {
    const d = angularDiff(place.bearing, heading);
    if (!onScreen(d)) return [];
    const x = projectX(d);
    const y = projectY(elevationFor(place.distance), pitch) + roll * 0.12;
    return [{ place, x, y, locked: isLocked(x, y) }];
  });
  const locked = markers.filter((m) => m.locked).sort((a, b) => Math.abs(a.x - 50) - Math.abs(b.x - 50))[0]?.place ?? null;

  const ask = (place: NearbyPlace) => {
    const name = language === "mn" ? place.nameMn : place.nameEn;
    const prompt =
      language === "mn"
        ? `Аялагчид зориулж Монгол дахь "${name}" газрын тухай 2-3 өгүүлбэрээр сонирхолтой танилцуул.`
        : `Tell a traveler about "${name}" in Mongolia in 2-3 engaging sentences.`;
    story.run(place.id, prompt);
  };

  const toggle = (c: PlaceCategory | null) =>
    setFilter((prev) => {
      if (!c) return new Set();
      const n = new Set(prev);
      if (n.has(c)) n.delete(c);
      else n.add(c);
      return n;
    });

  return (
    <main {...bind} className="relative h-[100svh] w-full touch-none select-none overflow-hidden bg-[#08111c] text-white">
      <video ref={videoRef} playsInline muted className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${cameraReady ? "opacity-100" : "opacity-0"}`} />
      {!cameraReady && <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_10%,#1a3147,#0c1722_55%,#070d15)]" />}
      <Atmosphere roll={roll} />

      {markers.map((m) => (
        <ArMarker key={m.place.id} place={m.place} x={m.x} y={m.y} scale={scaleFor(m.place.distance)} opacity={opacityFor(m.place.distance)} blur={blurFor(m.place.distance)} locked={m.locked} language={language} onTap={ask} />
      ))}

      <Reticle locked={Boolean(locked)} />
      <CompassStrip heading={heading} places={visible} language={language} />
      <FilterChips language={language} selected={filter} counts={counts} onToggle={toggle} />
      <ArRadar heading={heading} places={visible} lockedId={locked?.id ?? null} />
      <PlaceDetail place={locked} story={story} language={language} onAsk={ask} />
      <ArStatus hasCoords={Boolean(coords)} denied={denied} count={nearby.length} loading={loading} accuracy={accuracy} language={language} onDemo={onDemo} />

      <button type="button" onClick={onExit} className="glass-dark absolute left-3 top-16 z-30 inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-black uppercase tracking-tight">
        <MaterialIcon name="close" className="size-4" />
        {arCopy[language].exit}
      </button>
    </main>
  );
}
