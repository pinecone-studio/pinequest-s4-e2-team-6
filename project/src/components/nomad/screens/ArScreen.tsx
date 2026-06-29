"use client";

import { useCallback, useMemo, useState } from "react";
import { useCamera } from "@/lib/camera/useCamera";
import { useArStory } from "@/lib/ar/useArStory";
import { useArView } from "@/lib/ar/useArView";
import { useGeolocation } from "@/lib/offline/useGeolocation";
import { DEMO_LOCATION } from "@/lib/places/curated";
import { ArEnter } from "../ar/ArEnter";
import { ArExperience } from "../ar/ArExperience";
import type { Language } from "../types";

type ArScreenProps = { language: Language };

/**
 * Real GPS AR: nearby places (curated + Supabase + Google) locked to their true
 * compass bearings, with depth, a heading HUD/radar, lock-on and AI guides.
 * Falls back to drag-to-look and a Terelj demo location when sensors/GPS fail.
 */
export function ArScreen({ language }: ArScreenProps) {
  const camera = useCamera();
  const view = useArView();
  const story = useArStory(language);
  const geo = useGeolocation();
  const [entered, setEntered] = useState(false);
  const [starting, setStarting] = useState(false);
  const [demo, setDemo] = useState(false);

  const onEnter = useCallback(async () => {
    setStarting(true);
    await view.start();
    await camera.start();
    geo.start();
    setStarting(false);
    setEntered(true);
  }, [view, camera, geo]);

  const onExit = useCallback(() => {
    camera.stop();
    story.reset();
    setEntered(false);
  }, [camera, story]);

  const coords = useMemo(
    () => (demo ? DEMO_LOCATION : geo.fix ? { lat: geo.fix.lat, lng: geo.fix.lng } : null),
    [demo, geo.fix],
  );

  if (!entered) {
    return <ArEnter language={language} starting={starting} onEnter={onEnter} />;
  }

  return (
    <ArExperience
      videoRef={camera.videoRef}
      cameraReady={camera.ready}
      view={view}
      story={story}
      language={language}
      coords={coords}
      denied={geo.status === "denied"}
      accuracy={geo.fix?.accuracy}
      onExit={onExit}
      onDemo={() => setDemo(true)}
    />
  );
}
