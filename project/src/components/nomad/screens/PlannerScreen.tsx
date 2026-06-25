import { copy, images } from "../data/content";
import { MaterialIcon } from "../icons/MaterialIcon";
import { ScreenFrame } from "../shared/ScreenFrame";
import { StatCard } from "../shared/StatCard";
import type { Language } from "../types";

type PlannerScreenProps = {
  language: Language;
};

export function PlannerScreen({ language }: PlannerScreenProps) {
  const text = copy[language].planner;

  return (
    <ScreenFrame bg={images.steppe}>
      <section className="grid gap-6 py-6 md:grid-cols-[0.85fr_1.35fr]">
        <div className="space-y-5">
          <div className="glass-panel rounded-[28px] p-6">
            <p className="text-xs font-black uppercase tracking-[0] text-black/50 dark:text-white/50">{text.promptLabel}</p>
            <p className="mt-3 text-xl font-semibold">{text.prompt}</p>
          </div>
          <div className="glass-panel rounded-[28px] p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-[#6bcbff] text-[#00344b]">
                <MaterialIcon name="psychology" />
              </span>
              <span className="text-xs font-black uppercase tracking-[0] text-[#00658b] dark:text-[#7dd0ff]">{text.badge}</span>
            </div>
            <h2 className="text-3xl font-black tracking-[0]">{text.title}</h2>
            <p className="mt-3 leading-7 text-black/65 dark:text-white/65">
              {text.description}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <StatCard icon="schedule" value={text.durationValue} label={text.durationLabel} />
              <StatCard icon="payments" value={text.costValue} label={text.costLabel} />
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <div className="glass-panel h-64 overflow-hidden rounded-[28px]">
            <div className="h-full bg-cover bg-center" style={{ backgroundImage: `url(${images.map})` }}>
              <div className="flex h-full items-end justify-end bg-gradient-to-t from-black/40 to-transparent p-5">
                <button type="button" className="inline-flex items-center gap-2 rounded-full bg-[#00658b] px-5 py-3 text-sm font-black uppercase tracking-[0] text-white">
                  <MaterialIcon name="navigation" className="size-[18px]" />
                  {text.startRoute}
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {text.stops.map(([time, title, description, duration, price]) => (
              <div key={title} className="glass-panel rounded-[24px] p-5">
                <div className="mb-2 flex items-start justify-between gap-4">
                  <h3 className="text-xl font-black">{title}</h3>
                  <span className="rounded-full bg-[#6bcbff]/20 px-3 py-1 text-xs font-black text-[#00658b] dark:text-[#7dd0ff]">{time}</span>
                </div>
                <p className="text-black/62 dark:text-white/62">{description}</p>
                <div className="mt-4 flex gap-4 border-t border-black/10 pt-3 text-xs font-black uppercase tracking-[0] text-black/55 dark:border-white/10 dark:text-white/55">
                  <span>{duration}</span>
                  <span>{price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ScreenFrame>
  );
}
