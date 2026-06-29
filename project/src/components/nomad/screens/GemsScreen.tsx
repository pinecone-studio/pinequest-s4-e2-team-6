import { copy, images } from "../data/content";
import { OrnamentDivider } from "../shared/Ornament";
import { ScreenFrame } from "../shared/ScreenFrame";
import type { Language } from "../types";

type GemsScreenProps = {
  language: Language;
};

export function GemsScreen({ language }: GemsScreenProps) {
  const text = copy[language].gems;

  return (
    <ScreenFrame bg={images.steppe}>
      <section className="py-8">
        <p className="text-sm font-black uppercase tracking-[0] text-[#00658b] dark:text-[#7dd0ff]">{text.eyebrow}</p>
        <h2 className="mt-2 text-4xl font-black tracking-[0] md:text-6xl">{text.title}</h2>
        <OrnamentDivider className="mt-6 justify-start!" />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {text.items.map(([title, region, description, score], index) => (
            <article key={title} className={`glass-panel overflow-hidden rounded-[28px] ${index === 0 ? "md:row-span-2" : ""}`}>
              <div className={`${index === 0 ? "h-80" : "h-48"} bg-cover bg-center`} style={{ backgroundImage: `url(${index % 2 ? images.mountain : images.terelj})` }} />
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-[#00658b] dark:text-[#7dd0ff]">{region}</p>
                    <h3 className="mt-1 text-2xl font-black">{title}</h3>
                  </div>
                  <span className="rounded-full bg-[#71fcb6]/25 px-3 py-1 text-sm font-black text-[#005233] dark:text-[#71fcb6]">{score}</span>
                </div>
                <p className="mt-3 leading-7 text-black/62 dark:text-white/62">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </ScreenFrame>
  );
}
