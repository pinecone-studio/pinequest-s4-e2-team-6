"use client";

import { MaterialIcon } from "../icons/MaterialIcon";
import { cameraCopy } from "./cameraCopy";
import type { Language, Scan } from "@/lib/camera/types";

type Props = {
  scans: Scan[];
  loading: boolean;
  language: Language;
};

/** Grid of the device's previously scanned places, newest first. */
export function ScanHistory({ scans, loading, language }: Props) {
  const t = cameraCopy[language];

  if (loading) {
    return (
      <div className="mx-auto mt-8 grid w-full max-w-md grid-cols-2 gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="aspect-square animate-pulse rounded-2xl bg-black/5 dark:bg-white/5" />
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-md">
      <h3 className="mb-3 text-xs font-black uppercase tracking-[0] text-black/55 dark:text-white/55">
        {t.historyTitle}
      </h3>

      {scans.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-black/15 p-6 text-center text-sm text-black/50 dark:border-white/15 dark:text-white/50">
          {t.historyEmpty}
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {scans.map((scan) => (
            <article key={scan.id} className="glass-panel overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={scan.image_url} alt={scan.name} className="h-28 w-full object-cover" />
              <div className="p-3">
                <p className="truncate text-sm font-black tracking-[0]">{scan.name}</p>
                {scan.location && (
                  <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-black/55 dark:text-white/55">
                    <MaterialIcon name="navigation" className="size-[12px]" />
                    {scan.location}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
