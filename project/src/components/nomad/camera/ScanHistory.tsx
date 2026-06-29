"use client";

import { useState } from "react";
import { MaterialIcon } from "../icons/MaterialIcon";
import { cameraCopy } from "./cameraCopy";
import type { Language, Scan } from "@/lib/camera/types";

type Props = {
  scans: Scan[];
  loading: boolean;
  language: Language;
  onDelete: (scanId: string) => Promise<void>;
};

/** Grid of the device's previously scanned places, newest first. */
export function ScanHistory({ scans, loading, language, onDelete }: Props) {
  const t = cameraCopy[language];
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const selected = scans.find((scan) => scan.id === selectedId) ?? null;

  const deleteScan = async (scanId: string) => {
    if (deletingId) return;
    setDeletingId(scanId);
    try {
      await onDelete(scanId);
      setSelectedId((id) => (id === scanId ? null : id));
    } finally {
      setDeletingId(null);
    }
  };

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
        <>
          <div className="grid grid-cols-2 gap-3">
            {scans.map((scan) => (
              <article
                key={scan.id}
                className={`glass-panel relative overflow-hidden rounded-2xl transition ${
                  selectedId === scan.id ? "ring-2 ring-[#6bcbff]" : "hover:scale-[1.01]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedId((id) => (id === scan.id ? null : scan.id))}
                  className="block w-full text-left"
                >
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
                </button>
                <button
                  type="button"
                  aria-label={t.deleteScan}
                  title={t.deleteScan}
                  onClick={() => void deleteScan(scan.id)}
                  className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur-md transition hover:bg-red-500"
                >
                  {deletingId === scan.id ? (
                    <span className="size-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  ) : (
                    <MaterialIcon name="delete" className="size-[16px]" />
                  )}
                </button>
              </article>
            ))}
          </div>

          {selected && (
            <HistoryDetail
              scan={selected}
              language={language}
              deleting={deletingId === selected.id}
              onDelete={() => deleteScan(selected.id)}
            />
          )}
        </>
      )}
    </div>
  );
}

function HistoryDetail({
  scan,
  language,
  deleting,
  onDelete,
}: {
  scan: Scan;
  language: Language;
  deleting: boolean;
  onDelete: () => void;
}) {
  const t = cameraCopy[language];
  const pct = Math.round((scan.confidence ?? 0) * 100);

  return (
    <article className="glass-panel mt-4 overflow-hidden rounded-2xl">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={scan.image_url} alt={scan.name} className="h-44 w-full object-cover" />
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h4 className="text-lg font-black tracking-[0]">{scan.name}</h4>
            {scan.location && (
              <p className="mt-1 flex items-center gap-1 text-sm text-black/55 dark:text-white/55">
                <MaterialIcon name="navigation" className="size-[14px]" />
                {scan.location}
              </p>
            )}
          </div>
          {scan.category && (
            <span className="shrink-0 rounded-full bg-[#6bcbff]/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0] text-[#005575] dark:text-[#7dd0ff]">
              {scan.category}
            </span>
          )}
        </div>

        {scan.description && (
          <p className="mt-3 text-sm leading-6 text-black/68 dark:text-white/68">
            {scan.description}
          </p>
        )}

        {scan.confidence !== null && (
          <div className="mt-4">
            <div className="mb-1 flex justify-between text-xs font-black uppercase tracking-[0] text-black/55 dark:text-white/55">
              <span>{t.confidence}</span>
              <span>{pct}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
              <div className="h-full rounded-full bg-[#00658b] dark:bg-[#7dd0ff]" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}

        {scan.tags && scan.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {scan.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-black/5 px-3 py-1 text-xs font-bold dark:bg-white/10">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={onDelete}
          disabled={deleting}
          className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-red-500/12 px-4 text-sm font-black uppercase tracking-[0] text-red-600 transition hover:bg-red-500 hover:text-white disabled:opacity-60 dark:text-red-300"
        >
          {deleting ? (
            <span className="size-4 animate-spin rounded-full border-2 border-current/30 border-t-current" />
          ) : (
            <MaterialIcon name="delete" className="size-[18px]" />
          )}
          {t.deleteScan}
        </button>
      </div>
    </article>
  );
}
