"use client";

import { MaterialIcon } from "../icons/MaterialIcon";
import { cameraCopy } from "./cameraCopy";
import type { Language, ScanPhase } from "@/lib/camera/types";

type Props = {
  setVideoRef: (node: HTMLVideoElement | null) => void;
  phase: ScanPhase;
  language: Language;
  onCapture: () => void;
  onSwitchCamera: () => void;
};

/**
 * Live camera preview with the capture control and a busy overlay shown while
 * the frame is being captured / recognised / saved.
 */
export function CameraViewport({
  setVideoRef,
  phase,
  language,
  onCapture,
  onSwitchCamera,
}: Props) {
  const t = cameraCopy[language];
  const busy = phase === "capturing" || phase === "recognizing" || phase === "saving";

  const busyLabel =
    phase === "capturing" ? t.capturing : phase === "saving" ? t.saving : t.recognizing;

  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[28px] border border-white/20 bg-black shadow-2xl">
      <video
        ref={setVideoRef}
        autoPlay
        playsInline
        muted
        className="aspect-[3/4] w-full object-cover"
      />

      <div className="pointer-events-none absolute inset-4 rounded-[20px] border-2 border-white/40" />

      <button
        type="button"
        onClick={onSwitchCamera}
        disabled={busy || phase === "starting"}
        aria-label={t.switchCamera}
        title={t.switchCamera}
        className="absolute right-6 top-6 grid size-11 place-items-center rounded-full border border-white/30 bg-black/45 text-white shadow-lg backdrop-blur-md transition hover:scale-105 disabled:opacity-50"
      >
        <MaterialIcon name="flip_camera_ios" className="size-[22px]" />
      </button>

      {busy && (
        <div className="absolute inset-0 grid place-items-center bg-black/55 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 text-white">
            <span className="size-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            <span className="text-sm font-black uppercase tracking-[0]">{busyLabel}</span>
          </div>
        </div>
      )}

      <div className="absolute bottom-8 left-1/2 flex w-[min(88%,18rem)] -translate-x-1/2 flex-col items-center text-center sm:bottom-6">
        <p className="mb-2 text-xs font-semibold text-white/80 drop-shadow sm:mb-3">{t.hint}</p>
        <button
          type="button"
          onClick={onCapture}
          disabled={busy}
          aria-label={t.capture}
          className="grid size-16 place-items-center rounded-full border-4 border-white/80 bg-[#6bcbff] text-[#00344b] shadow-[0_20px_40px_rgba(0,101,139,0.35)] transition hover:scale-105 disabled:opacity-60 sm:size-20"
        >
          <MaterialIcon name="document_scanner" className="size-7 sm:size-[34px]" />
        </button>
      </div>
    </div>
  );
}
