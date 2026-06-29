import { ThemeToggle } from "@/components/ThemeToggle";
import { copy, languageOptions, navItems } from "../data/content";
import { MaterialIcon } from "../icons/MaterialIcon";
import type { Language, NavItem, ScreenId } from "../types";

type AppShellProps = {
  active: ScreenId;
  setActive: (screen: ScreenId) => void;
  language: Language;
  setLanguage: (language: Language) => void;
};

export function AppShell({ active, setActive, language, setLanguage }: AppShellProps) {
  const items = navItems[language];
  const text = copy[language];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/30 bg-white/55 backdrop-blur-2xl dark:border-white/10 dark:bg-[#0b0f11]/65">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 md:px-10">
          {/* Brand */}
          <button type="button" onClick={() => setActive("discover")} className="flex items-center gap-2.5 text-left">
            <span className="grid size-8 place-items-center rounded-xl bg-linear-to-br from-[#6bcbff] via-[#00658b] to-[#e0a32e] text-white shadow-md shadow-[#00658b]/30 sm:size-9">
              <MaterialIcon name="explore" className="size-4.5" />
            </span>
            <span className="leading-none">
              <span className="block text-sm font-black tracking-tight sm:text-base">
                AI <span className="text-gradient">Nomad</span>
              </span>
              <span className="mt-0.5 hidden text-[9px] font-bold uppercase tracking-[0.08em] text-black/45 dark:text-white/45 sm:block">
                {text.appTagline}
              </span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 rounded-full border border-black/10 bg-white/50 p-1 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 lg:flex">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-tight transition ${
                  active === item.id
                    ? "bg-linear-to-r from-[#00658b] to-[#0a86b8] text-white shadow-sm dark:from-[#6bcbff] dark:to-[#e0a32e] dark:text-[#001e2d]"
                    : "text-black/55 hover:bg-black/5 dark:text-white/55 dark:hover:bg-white/10"
                }`}
              >
                <MaterialIcon name={item.icon} className="size-4" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-1.5">
            <div className="flex rounded-full border border-black/10 bg-white/50 p-0.5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
              {languageOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setLanguage(option.value)}
                  aria-pressed={language === option.value}
                  className={`rounded-full px-2.5 py-1.5 text-[11px] font-black uppercase transition ${
                    language === option.value
                      ? "bg-[#00658b] text-white shadow-sm dark:bg-[#6bcbff] dark:text-[#001e2d]"
                      : "text-black/50 hover:bg-black/5 dark:text-white/50 dark:hover:bg-white/10"
                  }`}
                >
                  {option.value === "mn" ? "MN" : "EN"}
                </button>
              ))}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <BottomNav items={items} active={active} setActive={setActive} />
    </>
  );
}

function BottomNav({
  items,
  active,
  setActive,
}: {
  items: NavItem[];
  active: ScreenId;
  setActive: (screen: ScreenId) => void;
}) {
  return (
    <nav className="fixed bottom-3 left-1/2 z-50 flex w-[min(94%,30rem)] -translate-x-1/2 items-center justify-around gap-0.5 rounded-[22px] border border-white/30 bg-white/45 p-1.5 shadow-2xl shadow-black/20 backdrop-blur-2xl dark:border-white/10 dark:bg-[#0b0f11]/70 lg:hidden">
      {items.slice(0, 5).map((item) => {
        const on = active === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            aria-current={on ? "page" : undefined}
            className={`flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-2xl px-1 py-2 transition ${
              on
                ? "bg-linear-to-br from-[#6bcbff] to-[#00658b] text-white shadow-lg shadow-[#00658b]/30 dark:from-[#6bcbff] dark:to-[#e0a32e] dark:text-[#001e2d]"
                : "text-black/50 dark:text-white/55"
            }`}
          >
            <MaterialIcon name={item.icon} className={`size-5 transition ${on ? "scale-110" : ""}`} />
            <span className="max-w-full truncate text-[9px] font-black uppercase tracking-tight">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
