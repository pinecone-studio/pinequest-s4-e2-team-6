"use client";

import { useCallback, useRef, useState } from "react";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { captureFrame } from "./captureFrame";
import { getDeviceId } from "./deviceId";
import { getCoords, recognize, RecognizeError } from "./recognize";
import { uploadScanImage } from "./storage";
import { useCamera } from "./useCamera";
import { useScans } from "./useScans";
import type {
  Coords,
  Language,
  Recognition,
  ScannerError,
  ScanPhase,
} from "./types";

/**
 * Top-level scanner controller. Drives the capture → recognise → upload → save
 * pipeline and exposes a small, declarative surface to the UI so the screen
 * component stays presentational.
 */
export function useScanner(language: Language) {
  const camera = useCamera();
  const { scans, loading, save, refresh } = useScans();

  const [phase, setPhase] = useState<ScanPhase>("idle");
  const [error, setError] = useState<ScannerError | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<Recognition | null>(null);
  const busy = useRef(false);

  const open = useCallback(async () => {
    setError(null);
    setPhase("starting");
    await camera.start();
    setPhase(camera.error ? "error" : "live");
    if (camera.error) setError(camera.error);
  }, [camera]);

  const reset = useCallback(() => {
    setPreview(null);
    setResult(null);
    setError(null);
    setPhase(camera.ready ? "live" : "idle");
  }, [camera.ready]);

  // Persisting is best-effort: a recognised landmark is still shown to the user
  // even if Storage/DB writes fail, so a backend hiccup never blocks the demo.
  const persist = useCallback(
    async (rec: Recognition, blob: Blob, coords: Coords) => {
      if (!isSupabaseConfigured()) return;
      try {
        setPhase("saving");
        const url = await uploadScanImage(getDeviceId(), blob);
        await save(rec, url, coords);
      } catch {
        // swallow — result is already in hand; history just won't include it
      }
    },
    [save],
  );

  const shoot = useCallback(async () => {
    if (busy.current || !camera.videoRef.current) return;
    busy.current = true;
    setError(null);

    try {
      setPhase("capturing");
      const shot = await captureFrame(camera.videoRef.current);
      setPreview(shot.dataUrl);

      setPhase("recognizing");
      const coords: Coords = await getCoords();
      const rec = await recognize({ dataUrl: shot.dataUrl, language, coords });
      setResult(rec);

      await persist(rec, shot.blob, coords);
      setPhase("result");
    } catch (err) {
      setError(toError(err));
      setPhase("error");
    } finally {
      busy.current = false;
    }
  }, [camera.videoRef, language, persist]);

  return {
    phase,
    error,
    preview,
    result,
    scans,
    historyLoading: loading,
    videoRef: camera.videoRef,
    cameraReady: camera.ready,
    open,
    shoot,
    reset,
    refresh,
  };
}

function toError(err: unknown): ScannerError {
  if (err instanceof RecognizeError) return err.code;
  const msg = (err as Error)?.message ?? "";
  if (msg.startsWith("upload-failed") || msg.startsWith("save-failed")) {
    return "upload";
  }
  return "unknown";
}
