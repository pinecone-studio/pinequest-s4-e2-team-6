import { copy, images } from "../data/content";
import { MaterialIcon } from "../icons/MaterialIcon";
import { ScreenFrame } from "../shared/ScreenFrame";
import type { Language } from "../types";

type ArScreenProps = {
  language: Language;
};

export function ArScreen({ language }: ArScreenProps) {
  const text = copy[language].ar;

  return (
    <ScreenFrame bg={images.mountain}>
      <section className="relative min-h-[calc(100vh-7rem)] overflow-hidden rounded-[28px] border border-white/20 bg-black/10">
        <div className="absolute left-1/2 top-8 flex -translate-x-1/2 gap-3">
          <div className="glass-dark rounded-full px-5 py-2 text-xs font-black uppercase tracking-[0] text-white">
            NW 315°
          </div>
          <div className="glass-dark inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-black uppercase tracking-[0] text-white">
            <span className="size-2 rounded-full bg-[#71fcb6] shadow-[0_0_12px_rgba(113,252,182,0.9)]" />
            {text.status}
          </div>
        </div>
        <ArLabel className="left-[55%] top-[32%]" icon="temple_buddhist" title={text.labels[0].title} meta={text.labels[0].meta} />
        <ArLabel className="left-[18%] top-[55%]" icon="hiking" title={text.labels[1].title} meta={text.labels[1].meta} />
      </section>
    </ScreenFrame>
  );
}

function ArLabel({ className, icon, title, meta }: { className: string; icon: string; title: string; meta: string }) {
  return (
    <div className={`absolute ${className}`}>
      <div className="flex flex-col items-center gap-2">
        <button type="button" className="glass-dark flex items-center gap-3 rounded-full px-4 py-2 text-left text-white transition hover:scale-105">
          <span className="grid size-7 place-items-center rounded-full bg-[#71fcb6]/20 text-[#71fcb6]">
            <MaterialIcon name={icon} className="size-[16px]" />
          </span>
          <span>
            <span className="block font-bold drop-shadow">{title}</span>
            <span className="block text-xs font-semibold text-white/75">{meta}</span>
          </span>
          <MaterialIcon name="chevron_right" className="text-white/60" />
        </button>
        <div className="h-14 w-px bg-gradient-to-b from-white/70 to-transparent" />
        <div className="size-3 rounded-full bg-[#71fcb6] shadow-[0_0_18px_rgba(113,252,182,0.9)]" />
      </div>
    </div>
  );
}
