import { images } from "../data/content";
import { MaterialIcon } from "../icons/MaterialIcon";
import { CurrencyRow } from "../shared/CurrencyRow";
import { ScreenFrame } from "../shared/ScreenFrame";
import { StatCard } from "../shared/StatCard";

export function OfflineScreen() {
  return (
    <ScreenFrame bg={images.map}>
      <section className="py-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0] text-[#00658b] dark:text-[#7dd0ff]">Офлайн төв</p>
            <h2 className="mt-2 text-4xl font-black tracking-[0]">Сүлжээгүй үед ч бэлэн</h2>
          </div>
          <span className="hidden items-center gap-2 rounded-full bg-[#71fcb6]/25 px-4 py-2 text-xs font-black uppercase tracking-[0] text-[#005233] dark:text-[#71fcb6] md:inline-flex">
            <span className="size-2 rounded-full bg-[#71fcb6]" />
            Бэлэн
          </span>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard icon="satellite_alt" value="Хүчтэй" label="GPS дохио" />
          <StatCard icon="explore" value="342° NW" label="чиглэл" />
          <div className="glass-panel overflow-hidden rounded-[28px] md:col-span-2">
            <div className="h-52 bg-cover bg-center" style={{ backgroundImage: `url(${images.map})` }} />
            <div className="p-6">
              <p className="text-xs font-black uppercase tracking-[0] text-[#00658b] dark:text-[#7dd0ff]">Татсан</p>
              <h3 className="mt-1 text-2xl font-black">Монголын үндсэн газрын зураг</h3>
              <p className="mt-1 text-black/60 dark:text-white/60">Vector + topo • 1.2 GB</p>
            </div>
          </div>
          <div className="glass-panel rounded-[28px] p-6 md:col-span-2">
            <h3 className="text-xs font-black uppercase tracking-[0] text-black/50 dark:text-white/50">Валют хөрвүүлэгч</h3>
            <div className="mt-4 space-y-3">
              <CurrencyRow label="USD" value="100" suffix="$" />
              <CurrencyRow label="MNT" value="338,500" suffix="₮" highlight />
            </div>
          </div>
          <div className="glass-panel rounded-[28px] p-6 md:col-span-2">
            <h3 className="mb-3 text-xs font-black uppercase tracking-[0] text-black/50 dark:text-white/50">Офлайн хэл</h3>
            {["Англи", "Монгол", "Орос татах"].map((item, index) => (
              <div key={item} className="flex items-center justify-between border-b border-black/10 py-3 last:border-0 dark:border-white/10">
                <span>{item}</span>
                <MaterialIcon name={index < 2 ? "check_circle" : "download"} className={index < 2 ? "text-[#006c45]" : "text-[#6f7880]"} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </ScreenFrame>
  );
}
