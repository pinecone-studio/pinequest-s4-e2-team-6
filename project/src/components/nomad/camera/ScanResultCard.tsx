"use client";

import { MaterialIcon } from "../icons/MaterialIcon";
import { cameraCopy } from "./cameraCopy";
import type { Language, Recognition } from "@/lib/camera/types";

type Props = {
  result: Recognition;
  preview: string | null;
  language: Language;
  onScanAgain: () => void;
};

/** Result panel shown after a photo is recognised by the AI. */
export function ScanResultCard({ result, preview, language, onScanAgain }: Props) {
  const t = cameraCopy[language];
  const pct = Math.round(result.confidence * 100);

  return (
    <div className="glass-panel mx-auto w-full max-w-md overflow-hidden rounded-[28px]">
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt={result.name} className="h-52 w-full object-cover" />
      )}

      <div className="p-6">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black tracking-[0]">{result.name}</h2>
            {result.location && (
              <p className="mt-1 text-black/60 dark:text-white/60">{result.location}</p>
            )}
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#6bcbff]/35 bg-[#6bcbff]/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0] text-[#005575] dark:text-[#7dd0ff]">
            <MaterialIcon name="verified_user" className="size-[14px]" />
            {result.category}
          </span>
        </div>

        {result.description && (
          <p className="leading-7 text-black/68 dark:text-white/68">{result.description}</p>
        )}

        <div className="my-4">
          <div className="mb-1 flex justify-between text-xs font-black uppercase tracking-[0] text-black/55 dark:text-white/55">
            <span>{t.confidence}</span>
            <span>{pct}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
            <div className="h-full rounded-full bg-[#00658b] dark:bg-[#7dd0ff]" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {result.tags.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {result.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-black/5 px-3 py-1 text-xs font-bold dark:bg-white/10">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={onScanAgain}
          className="inline-flex w-full min-h-12 items-center justify-center gap-2 rounded-full bg-[#6bcbff] px-6 text-sm font-black uppercase tracking-[0] text-[#00344b] shadow-lg shadow-[#6bcbff]/25 transition hover:scale-[1.02]"
        >
          <MaterialIcon name="photo_camera" className="size-[18px]" />
          {t.scanAgain}
        </button>
      </div>
    </div>
  );
}
