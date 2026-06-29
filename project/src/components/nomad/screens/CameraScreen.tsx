"use client";

import { images } from "../data/content";
import { ScreenFrame } from "../shared/ScreenFrame";
import { CameraViewport } from "../camera/CameraViewport";
import { PermissionState } from "../camera/PermissionState";
import { ScanResultCard } from "../camera/ScanResultCard";
import { ScanHistory } from "../camera/ScanHistory";
import { cameraCopy } from "../camera/cameraCopy";
import { useScanner } from "@/lib/camera/useScanner";
import type { Language } from "../types";

type CameraScreenProps = {
  language: Language;
};

/**
 * Live AI camera screen: open the device camera, capture a frame, recognise it
 * with the vision model, persist it to Supabase, and browse past scans.
 * All heavy lifting lives in `useScanner`; this component just routes phases.
 */
export function CameraScreen({ language }: CameraScreenProps) {
  const s = useScanner(language);
  const t = cameraCopy[language];

  const showViewport =
    s.cameraReady && s.phase !== "result" && s.phase !== "idle";
  const showResult = s.phase === "result" && s.result;

  return (
    <ScreenFrame bg={images.terelj}>
      <section className="min-h-[calc(100vh-7rem)]">
        {showResult ? (
          <ScanResultCard
            result={s.result!}
            preview={s.preview}
            language={language}
            onScanAgain={s.reset}
          />
        ) : showViewport ? (
          <CameraViewport
            setVideoRef={s.setVideoRef}
            phase={s.phase}
            language={language}
            onCapture={s.shoot}
            onSwitchCamera={s.switchCamera}
          />
        ) : (
          <PermissionState
            language={language}
            starting={s.phase === "starting"}
            error={s.phase === "error" ? s.error : null}
            onStart={s.open}
          />
        )}

        {showViewport && s.phase === "error" && s.error && (
          <p className="mx-auto mt-4 max-w-md rounded-2xl bg-red-500/10 px-4 py-3 text-center text-sm font-bold text-red-600 dark:text-red-400">
            {t.errors[s.error]}
          </p>
        )}

        <ScanHistory
          scans={s.scans}
          loading={s.historyLoading}
          language={language}
          onDelete={s.deleteScan}
        />
      </section>
    </ScreenFrame>
  );
}
