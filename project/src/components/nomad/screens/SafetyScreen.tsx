import { copy, images } from "../data/content";
import { MaterialIcon } from "../icons/MaterialIcon";
import { ContactCard } from "../shared/ContactCard";
import { ScreenFrame } from "../shared/ScreenFrame";
import type { Language } from "../types";

type SafetyScreenProps = {
  language: Language;
};

export function SafetyScreen({ language }: SafetyScreenProps) {
  const text = copy[language].safety;

  return (
    <ScreenFrame bg={images.map}>
      <section className="py-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#ffdad6]/45 px-4 py-2 text-xs font-black uppercase tracking-[0] text-[#ba1a1a]">
          <MaterialIcon name="verified_user" />
          {text.badge}
        </div>
        <h2 className="text-4xl font-black tracking-[0] md:text-6xl">{text.title}</h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-black/65 dark:text-white/65">
          {text.description}
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-12">
          <button type="button" className="glass-panel rounded-[24px] p-5 text-left md:col-span-3">
            <MaterialIcon name="share_location" className="text-[#00658b]" />
            <h3 className="mt-3 text-xl font-black">{text.shareTitle}</h3>
            <p className="mt-1 text-black/60 dark:text-white/60">{text.shareMeta}</p>
          </button>
          <button type="button" className="glass-panel rounded-[24px] p-5 text-left md:col-span-3">
            <MaterialIcon name="cloud_download" className="text-[#00658b]" />
            <h3 className="mt-3 text-xl font-black">{text.guideTitle}</h3>
            <p className="mt-1 text-black/60 dark:text-white/60">{text.guideMeta}</p>
          </button>
          <div className="glass-panel overflow-hidden rounded-[28px] md:col-span-6 md:row-span-2">
            <div className="relative h-56 bg-cover bg-center" style={{ backgroundImage: `url(${images.map})` }}>
              <div className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00658b] shadow-[0_0_15px_rgba(0,101,139,0.8)]" />
            </div>
            <div className="p-6">
              <p className="text-xs font-black uppercase tracking-[0] text-[#00658b] dark:text-[#7dd0ff]">{text.hospitalLabel}</p>
              <h3 className="mt-1 text-2xl font-black">{text.hospitalTitle}</h3>
              <p className="mt-1 text-black/60 dark:text-white/60">{text.hospitalMeta}</p>
            </div>
          </div>
          <ContactCard icon="local_police" title={text.policeTitle} meta={text.policeMeta} />
          <ContactCard icon="account_balance" title={text.embassyTitle} meta={text.embassyMeta} />
        </div>
        <button type="button" className="fixed bottom-28 left-1/2 z-40 inline-flex w-[88%] max-w-sm -translate-x-1/2 items-center justify-center gap-3 rounded-full bg-[#ba1a1a] px-8 py-4 text-xl font-black tracking-[0] text-white shadow-[0_10px_30px_rgba(186,26,26,0.3)] transition hover:scale-[1.02]">
          <MaterialIcon name="sos" className="size-[28px]" />
          {text.sos}
        </button>
      </section>
    </ScreenFrame>
  );
}
