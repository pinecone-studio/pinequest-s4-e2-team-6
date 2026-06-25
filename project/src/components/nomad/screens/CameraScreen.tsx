import { copy, images } from "../data/content";
import { MaterialIcon } from "../icons/MaterialIcon";
import { ScreenFrame } from "../shared/ScreenFrame";
import type { Language } from "../types";

type CameraScreenProps = {
  language: Language;
};

export function CameraScreen({ language }: CameraScreenProps) {
  const text = copy[language].camera;

  return (
    <ScreenFrame bg={images.terelj}>
      <section className="relative min-h-[calc(100vh-7rem)]">
        <div className="absolute left-1/2 top-[46%] w-[92%] max-w-sm -translate-x-1/2 -translate-y-1/2">
          <div className="glass-panel rounded-[28px] p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black tracking-[0]">{text.title}</h2>
                <p className="mt-1 text-black/60 dark:text-white/60">{text.location}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#6bcbff]/35 bg-[#6bcbff]/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0] text-[#005575] dark:text-[#7dd0ff]">
                <MaterialIcon name="verified_user" className="size-[14px]" />
                {text.badge}
              </span>
            </div>
            <p className="leading-7 text-black/68 dark:text-white/68">
              {text.description}
            </p>
            <div className="my-5 flex gap-4 border-y border-black/10 py-3 dark:border-white/10">
              <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0]">
                <MaterialIcon name="route" className="text-[#6f7880]" />
                {text.distance}
              </span>
              <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0]">
                <MaterialIcon name="directions_walk" className="text-[#6f7880]" />
                {text.time}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {["headphones", "translate", "bookmark_add"].map((icon, index) => (
                <button key={icon} type="button" className="flex flex-col items-center gap-2 text-[#00658b] transition hover:scale-105 dark:text-[#7dd0ff]">
                  <span className="grid size-12 place-items-center rounded-full bg-[#00658b]/10">
                    <MaterialIcon name={icon} />
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0]">{text.actions[index]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <button type="button" className="absolute bottom-28 left-1/2 grid size-20 -translate-x-1/2 place-items-center rounded-full border border-white/20 bg-[#00658b]/90 text-white shadow-[0_20px_40px_rgba(0,101,139,0.3)] backdrop-blur-xl transition hover:scale-105">
          <MaterialIcon name="document_scanner" className="size-[34px]" />
        </button>
      </section>
    </ScreenFrame>
  );
}
