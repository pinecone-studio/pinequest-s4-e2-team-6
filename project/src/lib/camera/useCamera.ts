"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ScannerError } from "./types";

type CameraState = {
  ready: boolean;
  starting: boolean;
  error: ScannerError | null;
};

/**
 * Manages a live `getUserMedia` stream bound to a <video> element.
 *
 * Prefers the rear ("environment") camera for landmark scanning, handles
 * permission/availability errors with typed codes, and always releases the
 * hardware on unmount so we never leave the camera light on.
 */
export function useCamera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [state, setState] = useState<CameraState>({
    ready: false,
    starting: false,
    error: null,
  });

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setState({ ready: false, starting: false, error: null });
  }, []);

  const start = useCallback(async () => {
    if (streamRef.current) return;
    if (!navigator.mediaDevices?.getUserMedia) {
      setState({ ready: false, starting: false, error: "no-camera" });
      return;
    }

    setState({ ready: false, starting: true, error: null });
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" }, width: { ideal: 1920 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => undefined);
      }
      setState({ ready: true, starting: false, error: null });
    } catch (err) {
      setState({ ready: false, starting: false, error: classify(err) });
    }
  }, []);

  useEffect(() => stop, [stop]);

  return { videoRef, start, stop, ...state };
}

function classify(err: unknown): ScannerError {
  const name = (err as { name?: string })?.name;
  if (name === "NotAllowedError" || name === "SecurityError") return "permission";
  if (name === "NotFoundError" || name === "OverconstrainedError") return "no-camera";
  return "unknown";
}
