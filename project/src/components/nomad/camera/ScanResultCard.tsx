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
  const foundedValue = shouldShowFounded(result.category) ? result.foundedOrBuilt : null;

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

        <div className={`mt-5 grid gap-2 ${foundedValue ? "grid-cols-2" : "grid-cols-1"}`}>
          {foundedValue && (
            <MiniFact icon="event_note" label={t.foundedOrBuilt} value={foundedValue} />
          )}
          <MiniFact icon="account_balance" label={t.historicalPeriod} value={result.historicalPeriod} />
        </div>

        <div className="mt-5 space-y-4">
          <DetailBlock icon="auto_awesome" title={t.significance} text={result.significance} />
          <DetailBlock icon="event_note" title={t.history} text={result.history} />
          <DetailBlock icon="landscape" title={t.architectureOrNature} text={result.architectureOrNature} />
        </div>

        {result.facts.length > 0 && (
          <ListBlock icon="check_circle" title={t.facts} items={result.facts} />
        )}

        {result.visitorTips.length > 0 && (
          <ListBlock icon="directions_walk" title={t.visitorTips} items={result.visitorTips} />
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

function MiniFact({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  if (!value) return null;

  return (
    <div className="rounded-2xl bg-black/5 p-3 dark:bg-white/10">
      <p className="mb-1 flex items-center gap-1 text-[10px] font-black uppercase tracking-[0] text-black/45 dark:text-white/45">
        <MaterialIcon name={icon} className="size-[13px]" />
        {label}
      </p>
      <p className="text-sm font-black leading-5 tracking-[0]">{value}</p>
    </div>
  );
}

function shouldShowFounded(category: string): boolean {
  return ["building", "museum", "monument", "temple", "historic_site"].includes(category);
}

function DetailBlock({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  if (!text) return null;

  return (
    <section>
      <h3 className="mb-1 flex items-center gap-2 text-xs font-black uppercase tracking-[0] text-black/55 dark:text-white/55">
        <MaterialIcon name={icon} className="size-[15px]" />
        {title}
      </h3>
      <p className="text-sm leading-6 text-black/68 dark:text-white/68">{text}</p>
    </section>
  );
}

function ListBlock({
  icon,
  title,
  items,
}: {
  icon: string;
  title: string;
  items: string[];
}) {
  return (
    <section className="mt-5">
      <h3 className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0] text-black/55 dark:text-white/55">
        <MaterialIcon name={icon} className="size-[15px]" />
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-2xl bg-black/5 px-3 py-2 text-sm leading-6 text-black/68 dark:bg-white/10 dark:text-white/68"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
