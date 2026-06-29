"use client";

import { images } from "../data/content";
import { MaterialIcon } from "../icons/MaterialIcon";
import { ScreenFrame } from "../shared/ScreenFrame";
import { KnotMark, OrnamentDivider } from "../shared/Ornament";
import { arCopy } from "./arCopy";
import type { Language } from "../types";

type Props = { language: Language; starting: boolean; onEnter: () => void };

/** Intro + permission gesture for the AR scene (camera + orientation). */
export function ArEnter({ language, starting, onEnter }: Props) {
  const t = arCopy[language];

  return (
    <ScreenFrame bg={images.mountain}>
      <section className="grid min-h-[calc(100svh-7rem)] place-items-center py-6">
        <div className="glass-panel mx-auto w-full max-w-md rounded-[28px] p-8 text-center">
          <div className="mx-auto grid size-20 place-items-center rounded-full bg-linear-to-br from-[#6bcbff] via-[#00658b] to-[#e0a32e] text-white shadow-xl">
            {starting ? <KnotMark className="size-9" spin /> : <MaterialIcon name="view_in_ar" className="size-9" />}
          </div>

          <p className="mt-5 text-xs font-black uppercase tracking-tight text-[#00658b] dark:text-[#7dd0ff]">
            {t.eyebrow}
          </p>
          <h2 className="mt-1 text-2xl font-black tracking-tight">{t.enterTitle}</h2>
          <p className="mx-auto mt-2 max-w-sm leading-7 text-black/60 dark:text-white/60">{t.enterDesc}</p>

          <OrnamentDivider className="mt-6" />

          <button
            type="button"
            onClick={onEnter}
            disabled={starting}
            className="ring-glow mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-linear-to-r from-[#00658b] to-[#0a86b8] px-8 text-sm font-black uppercase tracking-tight text-white transition hover:scale-105 disabled:opacity-60 dark:from-[#6bcbff] dark:to-[#e0a32e] dark:text-[#001e2d]"
          >
            <MaterialIcon name="view_in_ar" className="size-[18px]" />
            {starting ? t.starting : t.enter}
          </button>
        </div>
      </section>
    </ScreenFrame>
  );
}
