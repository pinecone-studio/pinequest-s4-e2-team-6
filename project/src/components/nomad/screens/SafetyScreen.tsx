import { images } from "../data/content";
import { MaterialIcon } from "../icons/MaterialIcon";
import { ContactCard } from "../shared/ContactCard";
import { ScreenFrame } from "../shared/ScreenFrame";

export function SafetyScreen() {
  return (
    <ScreenFrame bg={images.map}>
      <section className="py-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#ffdad6]/45 px-4 py-2 text-xs font-black uppercase tracking-[0] text-[#ba1a1a]">
          <MaterialIcon name="verified_user" />
          Баталгаажсан аюулгүй бүс
        </div>
        <h2 className="text-4xl font-black tracking-[0] md:text-6xl">Аюулгүй байдлын төв</h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-black/65 dark:text-white/65">
          Байршил хуваалцах, офлайн заавар, ойролцоох эмнэлэг, цагдаа болон SOS товчийг нэг дор.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-12">
          <button type="button" className="glass-panel rounded-[24px] p-5 text-left md:col-span-3">
            <MaterialIcon name="share_location" className="text-[#00658b]" />
            <h3 className="mt-3 text-xl font-black">Байршил хуваалцах</h3>
            <p className="mt-1 text-black/60 dark:text-white/60">Live tracking холбоос</p>
          </button>
          <button type="button" className="glass-panel rounded-[24px] p-5 text-left md:col-span-3">
            <MaterialIcon name="cloud_download" className="text-[#00658b]" />
            <h3 className="mt-3 text-xl font-black">Офлайн гарын авлага</h3>
            <p className="mt-1 text-black/60 dark:text-white/60">Анхны тусламж ба хэллэг</p>
          </button>
          <div className="glass-panel overflow-hidden rounded-[28px] md:col-span-6 md:row-span-2">
            <div className="relative h-56 bg-cover bg-center" style={{ backgroundImage: `url(${images.map})` }}>
              <div className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00658b] shadow-[0_0_15px_rgba(0,101,139,0.8)]" />
            </div>
            <div className="p-6">
              <p className="text-xs font-black uppercase tracking-[0] text-[#00658b] dark:text-[#7dd0ff]">Ойролцоох эмнэлэг</p>
              <h3 className="mt-1 text-2xl font-black">Улсын төв эмнэлэг</h3>
              <p className="mt-1 text-black/60 dark:text-white/60">1.2 км • 24/7 нээлттэй</p>
            </div>
          </div>
          <ContactCard icon="local_police" title="Цагдаагийн хэлтэс" meta="0.8 км зайтай" />
          <ContactCard icon="account_balance" title="Таны элчин сайд" meta="3.5 км зайтай" />
        </div>
        <button type="button" className="fixed bottom-28 left-1/2 z-40 inline-flex w-[88%] max-w-sm -translate-x-1/2 items-center justify-center gap-3 rounded-full bg-[#ba1a1a] px-8 py-4 text-xl font-black tracking-[0] text-white shadow-[0_10px_30px_rgba(186,26,26,0.3)] transition hover:scale-[1.02]">
          <MaterialIcon name="sos" className="size-[28px]" />
          SOS тусламж
        </button>
      </section>
    </ScreenFrame>
  );
}
