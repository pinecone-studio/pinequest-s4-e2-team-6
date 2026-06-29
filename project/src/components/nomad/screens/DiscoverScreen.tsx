import { copy, navItems } from "../data/content";
import { MaterialIcon } from "../icons/MaterialIcon";
import { ScreenFrame } from "../shared/ScreenFrame";
import type { Language, ScreenId } from "../types";

type DiscoverScreenProps = {
  setActive: (screen: ScreenId) => void;
  language: Language;
};

export function DiscoverScreen({ setActive, language }: DiscoverScreenProps) {
  const text = copy[language].discover;
  const chips = navItems[language].filter((i) => i.id !== "discover").slice(0, 6);

  return (
    <ScreenFrame>
      <section className="grid min-h-[calc(100svh-7rem)] place-items-center py-6">
        <div className="w-full max-w-3xl text-center">
          <div className="animate-fade-up mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-[#6bcbff]/40 bg-[#6bcbff]/15 px-4 py-1.5 text-[11px] font-black uppercase tracking-tight text-[#00658b] backdrop-blur dark:text-[#7dd0ff]">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#00658b] opacity-70 dark:bg-[#7dd0ff]" />
              <span className="relative inline-flex size-2 rounded-full bg-[#00658b] dark:bg-[#7dd0ff]" />
            </span>
            {text.badge}
          </div>

          <h1 className="animate-fade-up delay-1 text-balance text-4xl font-black leading-[1.04] tracking-tight sm:text-6xl md:text-7xl">
            {text.title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-gradient">{text.title.split(" ").slice(-1)}</span>
          </h1>

          <p className="animate-fade-up delay-2 mx-auto mt-5 max-w-xl text-pretty text-base leading-7 text-black/65 dark:text-white/65 sm:text-lg sm:leading-8">
            {text.description}
          </p>

          <div className="animate-fade-up delay-2 mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setActive("camera")}
              className="ring-glow inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#00658b] to-[#0a86b8] px-7 text-sm font-black uppercase tracking-tight text-white transition hover:scale-[1.03] dark:from-[#6bcbff] dark:to-[#7b61ff] dark:text-[#001e2d]"
            >
              <MaterialIcon name="photo_camera" className="size-[18px]" />
              {text.primaryCta}
              <MaterialIcon name="arrow_forward" className="size-[18px]" />
            </button>
            <button
              type="button"
              onClick={() => setActive("planner")}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-white/55 px-7 text-sm font-black uppercase tracking-tight backdrop-blur transition hover:bg-white/75 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
            >
              <MaterialIcon name="play_circle" className="size-[18px]" />
              {text.secondaryCta}
            </button>
          </div>

          <div className="animate-fade-up delay-3 mt-10 flex flex-wrap justify-center gap-2">
            {chips.map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => setActive(chip.id)}
                className="glass-panel inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold tracking-tight transition hover:scale-[1.04]"
              >
                <MaterialIcon name={chip.icon} className="size-4 text-[#00658b] dark:text-[#7dd0ff]" />
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </section>
    </ScreenFrame>
  );
}
