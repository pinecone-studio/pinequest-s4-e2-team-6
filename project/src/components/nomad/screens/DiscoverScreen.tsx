import { MaterialIcon } from "../icons/MaterialIcon";
import { ScreenFrame } from "../shared/ScreenFrame";
import type { ScreenId } from "../types";

type DiscoverScreenProps = {
  setActive: (screen: ScreenId) => void;
};

export function DiscoverScreen({ setActive }: DiscoverScreenProps) {
  return (
    <ScreenFrame>
      <section className="grid min-h-[calc(100vh-7rem)] place-items-center">
        <div className="glass-panel w-full max-w-4xl rounded-[28px] p-8 text-center md:p-14">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#6bcbff]/30 bg-[#6bcbff]/18 px-4 py-2 text-xs font-black uppercase tracking-[0] text-[#00658b] dark:text-[#7dd0ff]">
            <span className="size-2 rounded-full bg-[#00658b] dark:bg-[#7dd0ff]" />
            AI баталгаажсан аяллын туршлага
          </div>
          <h1 className="text-5xl font-black leading-[1.05] tracking-[0] md:text-7xl">Монголыг AI-тай нээ.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-black/65 dark:text-white/65">
            Камерын танилт, AR чиглүүлэг, офлайн газрын зураг, ухаалаг маршрут болон соёлын зөвлөхийг нэг дор багтаасан Монгол аяллын туслах.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setActive("camera")}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#6bcbff] px-8 text-sm font-black uppercase tracking-[0] text-[#00344b] shadow-lg shadow-[#6bcbff]/25 transition hover:scale-[1.02]"
            >
              Аяллаа эхлүүлэх
              <MaterialIcon name="arrow_forward" className="size-[18px]" />
            </button>
            <button
              type="button"
              onClick={() => setActive("planner")}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-white/50 px-8 text-sm font-black uppercase tracking-[0] backdrop-blur transition hover:bg-white/70 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
            >
              <MaterialIcon name="play_circle" className="size-[18px]" />
              Демо харах
            </button>
          </div>
        </div>
      </section>
    </ScreenFrame>
  );
}
