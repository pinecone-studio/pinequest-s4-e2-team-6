import { copy, images } from "../data/content";
import { MaterialIcon } from "../icons/MaterialIcon";
import { CultureList } from "../shared/CultureList";
import { ScreenFrame } from "../shared/ScreenFrame";
import type { Language } from "../types";

type CultureScreenProps = {
  language: Language;
};

export function CultureScreen({ language }: CultureScreenProps) {
  const text = copy[language].culture;

  return (
    <ScreenFrame bg={images.terelj}>
      <section className="mx-auto max-w-4xl py-8">
        <div className="mb-5 flex justify-end">
          <div className="max-w-md rounded-[24px] bg-[#00658b] p-5 text-white shadow-lg">
            {text.question}
          </div>
        </div>
        <div className="glass-panel rounded-[28px] p-6 md:p-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full bg-[#6bcbff]/25 text-[#00658b] dark:text-[#7dd0ff]">
                <MaterialIcon name="auto_awesome" />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0] text-[#00658b] dark:text-[#7dd0ff]">{text.badge}</p>
                <h2 className="text-2xl font-black">{text.title}</h2>
              </div>
            </div>
            <MaterialIcon name="translate" className="text-[#6f7880]" />
          </div>
          <div className="overflow-hidden rounded-[24px] bg-cover bg-center" style={{ backgroundImage: `url(${images.mountain})` }}>
            <div className="bg-gradient-to-t from-black/75 to-black/10 p-6 pt-36 text-white">
              <p className="text-xs font-black uppercase tracking-[0] text-white/70">{text.ruleLabel}</p>
              <p className="mt-2 text-2xl font-black">{text.rule}</p>
            </div>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <CultureList title={text.doTitle} icon="check_circle" items={text.doItems} />
            <CultureList title={text.dontTitle} icon="block" items={text.dontItems} />
          </div>
        </div>
      </section>
    </ScreenFrame>
  );
}
