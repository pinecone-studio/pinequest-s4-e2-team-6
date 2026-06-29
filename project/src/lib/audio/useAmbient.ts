"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Ctx = typeof AudioContext;

/**
 * Generative steppe drone — a soft, khoomei-like ambient pad built live with
 * the Web Audio API (no audio files needed). Low detuned drones through a
 * lowpass filter, gently breathing via a slow LFO. Toggled by a user gesture.
 */
export function useAmbient() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);

  const stop = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
    setTimeout(() => ctx.close().catch(() => undefined), 1400);
    ctxRef.current = null;
    masterRef.current = null;
    setPlaying(false);
  }, []);

  const start = useCallback(() => {
    const AC = (window.AudioContext || (window as unknown as { webkitAudioContext: Ctx }).webkitAudioContext) as Ctx;
    if (!AC) return;
    const ctx = new AC();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 2.5);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 620;
    filter.connect(master);
    master.connect(ctx.destination);

    // Detuned drones: root, a fifth, and a sub for body.
    [98, 146.83, 49].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = i === 2 ? "sine" : "sawtooth";
      osc.frequency.value = freq;
      osc.detune.value = i === 1 ? 6 : -4;
      const g = ctx.createGain();
      g.gain.value = i === 2 ? 0.5 : 0.32;
      osc.connect(g).connect(filter);
      osc.start();
    });

    // Slow breathing LFO on the master level.
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.02;
    lfo.connect(lfoGain).connect(master.gain);
    lfo.start();

    ctxRef.current = ctx;
    masterRef.current = master;
    setPlaying(true);
  }, []);

  const toggle = useCallback(() => {
    if (ctxRef.current) stop();
    else start();
  }, [start, stop]);

  useEffect(() => () => void ctxRef.current?.close().catch(() => undefined), []);

  return { playing, toggle };
}
