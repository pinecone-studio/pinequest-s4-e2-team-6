import { images } from "../data/content";
import { MaterialIcon } from "../icons/MaterialIcon";
import { CultureList } from "../shared/CultureList";
import { ScreenFrame } from "../shared/ScreenFrame";

export function CultureScreen() {
  return (
    <ScreenFrame bg={images.terelj}>
      <section className="mx-auto max-w-4xl py-8">
        <div className="mb-5 flex justify-end">
          <div className="max-w-md rounded-[24px] bg-[#00658b] p-5 text-white shadow-lg">
            Ариун газар орохдоо яаж зөв мэндлэх вэ?
          </div>
        </div>
        <div className="glass-panel rounded-[28px] p-6 md:p-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full bg-[#6bcbff]/25 text-[#00658b] dark:text-[#7dd0ff]">
                <MaterialIcon name="auto_awesome" />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0] text-[#00658b] dark:text-[#7dd0ff]">Соёлын AI зөвлөх</p>
                <h2 className="text-2xl font-black">Хүндэтгэлтэй зочлох дүрэм</h2>
              </div>
            </div>
            <MaterialIcon name="translate" className="text-[#6f7880]" />
          </div>
          <div className="overflow-hidden rounded-[24px] bg-cover bg-center" style={{ backgroundImage: `url(${images.mountain})` }}>
            <div className="bg-gradient-to-t from-black/75 to-black/10 p-6 pt-36 text-white">
              <p className="text-xs font-black uppercase tracking-[0] text-white/70">Гол дүрэм</p>
              <p className="mt-2 text-2xl font-black">Овоо, хийд, айлын гэрт орохдоо тайван, баруун талаас нь хүндэтгэлтэй ойрт.</p>
            </div>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <CultureList title="Зөв" icon="check_circle" items={["Мэндэлж зөвшөөрөл ав", "Дуугаа намсга", "Зураг авахын өмнө асуу"]} />
            <CultureList title="Болохгүй" icon="block" items={["Овоон дээр гишгэх", "Хог үлдээх", "Шүтээнийг гараар заах"]} />
          </div>
        </div>
      </section>
    </ScreenFrame>
  );
}
