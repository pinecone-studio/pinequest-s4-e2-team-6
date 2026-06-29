"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ScannerError } from "./types";

type CameraState = {
  ready: boolean;
  starting: boolean;
  error: ScannerError | null;
  facingMode: CameraFacingMode;
};

export type CameraFacingMode = "environment" | "user";

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
  const facingModeRef = useRef<CameraFacingMode>("environment");
  const [state, setState] = useState<CameraState>({
    ready: false,
    starting: false,
    error: null,
    facingMode: "environment",
  });

  const attachStream = useCallback(async () => {
    const video = videoRef.current;
    const stream = streamRef.current;
    if (!video || !stream) return;

    if (video.srcObject !== stream) {
      video.srcObject = stream;
    }

    await video.play().catch(() => undefined);
  }, []);

  const stopTracks = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  const stop = useCallback(() => {
    stopTracks();
    setState((current) => ({ ...current, ready: false, starting: false, error: null }));
  }, [stopTracks]);

  const setVideoRef = useCallback(
    (node: HTMLVideoElement | null) => {
      videoRef.current = node;
      if (node) void attachStream();
    },
    [attachStream],
  );

  const start = useCallback(async (nextFacingMode = facingModeRef.current): Promise<ScannerError | null> => {
    if (streamRef.current) {
      await attachStream();
      return null;
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      setState((current) => ({ ...current, ready: false, starting: false, error: "no-camera" }));
      return "no-camera";
    }

    setState((current) => ({ ...current, ready: false, starting: true, error: null }));
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: nextFacingMode }, width: { ideal: 1920 } },
        audio: false,
      });
      streamRef.current = stream;
      facingModeRef.current = nextFacingMode;
      await attachStream();
      setState({ ready: true, starting: false, error: null, facingMode: nextFacingMode });
      return null;
    } catch (err) {
      const error = classify(err);
      setState((current) => ({ ...current, ready: false, starting: false, error }));
      return error;
    }
  }, [attachStream]);

  const switchCamera = useCallback(async (): Promise<ScannerError | null> => {
    const nextFacingMode: CameraFacingMode =
      facingModeRef.current === "environment" ? "user" : "environment";
    stopTracks();
    return start(nextFacingMode);
  }, [start, stopTracks]);

  useEffect(() => {
    if (state.ready) void attachStream();
  }, [attachStream, state.ready]);

  useEffect(() => stop, [stop]);

  return { videoRef, setVideoRef, start, stop, switchCamera, ...state };
}

function classify(err: unknown): ScannerError {
  const name = (err as { name?: string })?.name;
  if (name === "NotAllowedError" || name === "SecurityError") return "permission";
  if (name === "NotFoundError" || name === "OverconstrainedError") return "no-camera";
  return "unknown";
}
