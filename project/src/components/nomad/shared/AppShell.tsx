import { ThemeToggle } from "@/components/ThemeToggle";
import { navItems } from "../data/content";
import { MaterialIcon } from "../icons/MaterialIcon";
import type { ScreenId } from "../types";

type AppShellProps = {
  active: ScreenId;
  setActive: (screen: ScreenId) => void;
};

export function AppShell({ active, setActive }: AppShellProps) {
  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-white/20 bg-white/60 px-5 py-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#141817]/65 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full border border-black/10 bg-[#e5e2e1] text-[#00658b] shadow-inner dark:border-white/10 dark:bg-white/10 dark:text-[#7dd0ff]">
              <MaterialIcon name="person" />
            </div>
            <button type="button" onClick={() => setActive("discover")} className="text-left">
              <span className="block text-2xl font-black leading-none tracking-[0] text-[#1c1b1b] dark:text-[#f3f0ef]">
                AI Nomad
              </span>
              <span className="mt-1 hidden text-xs font-bold uppercase tracking-[0] text-black/50 dark:text-white/50 sm:block">
                Монгол аяллын AI хөтөч
              </span>
            </button>
          </div>

          <nav className="hidden items-center gap-1 rounded-full border border-black/10 bg-white/45 p-1 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-black uppercase tracking-[0] transition ${
                  active === item.id
                    ? "bg-[#00658b] text-white shadow-sm dark:bg-[#7dd0ff] dark:text-[#001e2d]"
                    : "text-black/58 hover:bg-black/5 dark:text-white/58 dark:hover:bg-white/10"
                }`}
              >
                <MaterialIcon name={item.icon} className="size-[18px]" />
                {item.label}
              </button>
            ))}
          </nav>

          <ThemeToggle />
        </div>
      </header>

      <nav className="fixed bottom-5 left-1/2 z-50 flex w-[94%] -translate-x-1/2 items-center justify-around rounded-full border border-white/25 bg-white/35 px-2 py-2 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-[#101312]/55 lg:hidden">
        {navItems.slice(0, 5).map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            className={`flex min-w-0 flex-1 flex-col items-center justify-center rounded-full px-2 py-2 text-[10px] font-black uppercase tracking-[0] transition ${
              active === item.id
                ? "bg-[#6bcbff]/85 text-[#00344b] dark:bg-[#00658b]/80 dark:text-white"
                : "text-black/58 dark:text-white/60"
            }`}
          >
            <MaterialIcon name={item.icon} className="mb-1 size-[22px]" />
            <span className="max-w-full truncate">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
