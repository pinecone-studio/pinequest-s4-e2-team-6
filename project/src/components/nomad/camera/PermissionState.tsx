"use client";

import { MaterialIcon } from "../icons/MaterialIcon";
import { cameraCopy } from "./cameraCopy";
import type { Language, ScannerError } from "@/lib/camera/types";

type Props = {
  language: Language;
  starting: boolean;
  error: ScannerError | null;
  onStart: () => void;
};

/** Pre-camera state: intro + open button, loading spinner, or an error retry. */
export function PermissionState({ language, starting, error, onStart }: Props) {
  const t = cameraCopy[language];

  return (
    <div className="glass-panel mx-auto w-full max-w-md rounded-[28px] p-8 text-center">
      <div className="mx-auto mb-5 grid size-16 place-items-center rounded-full bg-[#00658b]/10 text-[#00658b] dark:text-[#7dd0ff]">
        <MaterialIcon name={error ? "block" : "photo_camera"} className="size-8" />
      </div>

      <h2 className="text-2xl font-black tracking-[0]">{t.title}</h2>
      <p className="mx-auto mt-2 max-w-xs leading-7 text-black/60 dark:text-white/60">
        {error ? t.errors[error] : t.subtitle}
      </p>

      <button
        type="button"
        onClick={onStart}
        disabled={starting}
        className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#6bcbff] px-8 text-sm font-black uppercase tracking-[0] text-[#00344b] shadow-lg shadow-[#6bcbff]/25 transition hover:scale-[1.02] disabled:opacity-60"
      >
        {starting ? (
          <span className="size-4 animate-spin rounded-full border-2 border-[#00344b]/30 border-t-[#00344b]" />
        ) : (
          <MaterialIcon name="photo_camera" className="size-[18px]" />
        )}
        {starting ? t.starting : t.start}
      </button>
    </div>
  );
}
