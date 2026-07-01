"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { copy, languageOptions, navItems } from "../data/content";
import { MaterialIcon } from "../icons/MaterialIcon";
import type { Language, NavItem, ScreenId } from "../types";

const MAIN_NAV_IDS: ScreenId[] = [
  "discover",
  "camera",
  "ar",
  "planner",
  "offline",
];
const SIDE_NAV_IDS: ScreenId[] = ["gems", "currency", "safety"];

type AppShellProps = {
  active: ScreenId;
  setActive: (screen: ScreenId) => void;
  language: Language;
  setLanguage: (language: Language) => void;
};

export function AppShell({
  active,
  setActive,
  language,
  setLanguage,
}: AppShellProps) {
  const items = navItems[language];
  const mainItems = MAIN_NAV_IDS.map((id) =>
    items.find((item) => item.id === id),
  ).filter((item): item is NavItem => Boolean(item));
  const sideItems = SIDE_NAV_IDS.map((id) =>
    items.find((item) => item.id === id),
  ).filter((item): item is NavItem => Boolean(item));
  const text = copy[language];
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const sideActive = sideItems.some((item) => item.id === active);
  const currentLanguage =
    languageOptions.find((option) => option.value === language) ??
    languageOptions[0];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/30 bg-white/55 backdrop-blur-2xl dark:border-white/10 dark:bg-[#0b0f11]/65">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 md:px-10">
          <div className="flex min-w-0 flex-1 items-center gap-2 lg:flex-none">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label={language === "mn" ? "Нэмэлт цэс нээх" : "Open menu"}
              aria-expanded={sidebarOpen}
              className={`grid size-9 place-items-center rounded-full border border-black/10 bg-white/50 text-black/60 backdrop-blur-xl transition hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-white/65 dark:hover:bg-white/10 sm:size-10 ${
                sideActive
                  ? "text-[#00658b] ring-2 ring-[#00658b]/25 dark:text-[#6bcbff] dark:ring-[#6bcbff]/25"
                  : ""
              }`}
            >
              <MaterialIcon name="menu" className="size-5" />
            </button>

            <button
              type="button"
              onClick={() => setActive("discover")}
              className="group flex min-w-0 flex-col items-start text-left"
              aria-label="AI Nomad home"
            >
              <BrandLogo className="text-[20px] sm:text-[23px]" />
              <span className="mt-0.5 hidden max-w-[min(52vw,17rem)] whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.08em] text-black/45 dark:text-white/45 sm:block lg:max-w-[13.5rem]">
                {text.appTagline}
              </span>
            </button>
          </div>

          <nav className="hidden items-center gap-0.5 rounded-full border border-black/10 bg-white/50 p-1 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 lg:flex">
            {mainItems.map((item) => (
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
            <div className="relative">
              <button
                type="button"
                onClick={() => setLanguageOpen((open) => !open)}
                aria-expanded={languageOpen}
                aria-haspopup="menu"
                className="flex h-9 items-center gap-1.5 rounded-full border border-black/10 bg-white/50 px-3 text-[11px] font-black uppercase text-black/65 backdrop-blur-xl transition hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10 sm:h-10"
              >
                <span>{currentLanguage.value.toUpperCase()}</span>
                <MaterialIcon
                  name="chevron_right"
                  className={`size-4 rotate-90 transition ${languageOpen ? "-rotate-90" : ""}`}
                />
              </button>

              <div
                className={`absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-2xl border border-black/10 bg-white/90 p-1 shadow-2xl shadow-black/15 backdrop-blur-2xl transition dark:border-white/10 dark:bg-[#0b0f11]/90 ${
                  languageOpen
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-1 opacity-0"
                }`}
                role="menu"
              >
                {languageOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setLanguage(option.value);
                      setLanguageOpen(false);
                    }}
                    aria-pressed={language === option.value}
                    role="menuitemradio"
                    aria-checked={language === option.value}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-xs font-black transition ${
                      language === option.value
                        ? "bg-[#00658b] text-white shadow-sm dark:bg-[#6bcbff] dark:text-[#001e2d]"
                        : "text-black/65 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10"
                    }`}
                  >
                    <span className="truncate">{option.label}</span>
                    <span className="text-[10px] uppercase opacity-70">
                      {option.value}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <SideDrawer
        items={sideItems}
        active={active}
        open={sidebarOpen}
        language={language}
        onClose={() => setSidebarOpen(false)}
        onSelect={(screen) => {
          setActive(screen);
          setSidebarOpen(false);
        }}
      />

      <BottomNav items={mainItems} active={active} setActive={setActive} />
    </>
  );
}

function SideDrawer({
  items,
  active,
  open,
  language,
  onClose,
  onSelect,
}: {
  items: NavItem[];
  active: ScreenId;
  open: boolean;
  language: Language;
  onClose: () => void;
  onSelect: (screen: ScreenId) => void;
}) {
  return (
    <>
      <button
        type="button"
        aria-label={language === "mn" ? "Цэс хаах" : "Close menu"}
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-black/35 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed left-0 top-0 z-[70] flex h-[100svh] w-[min(82vw,21rem)] flex-col border-r border-white/25 bg-white/80 px-4 pb-5 pt-4 shadow-2xl shadow-black/25 backdrop-blur-2xl transition-transform duration-300 dark:border-white/10 dark:bg-[#0b0f11]/90 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onSelect("discover")}
            className="group flex min-w-0 flex-col items-start text-left"
            aria-label="AI Nomad home"
          >
            <BrandLogo className="text-[26px]" />
            <span className="mt-1 max-w-40 truncate text-[9px] font-bold uppercase tracking-[0.08em] text-black/45 dark:text-white/45">
              {copy[language].appTagline}
            </span>
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label={language === "mn" ? "Цэс хаах" : "Close menu"}
            className="grid size-10 place-items-center rounded-full border border-black/10 bg-white/55 text-black/65 transition hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
          >
            <MaterialIcon name="close" className="size-5" />
          </button>
        </div>

        <nav className="mt-8 flex flex-col gap-2">
          {items.map((item) => {
            const on = active === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                aria-current={on ? "page" : undefined}
                className={`flex min-h-14 items-center gap-3 rounded-2xl px-4 text-left text-sm font-black uppercase tracking-tight transition ${
                  on
                    ? "bg-linear-to-r from-[#00658b] to-[#0a86b8] text-white shadow-lg shadow-[#00658b]/20 dark:from-[#6bcbff] dark:to-[#e0a32e] dark:text-[#001e2d]"
                    : "bg-white/45 text-black/65 hover:bg-black/5 dark:bg-white/5 dark:text-white/65 dark:hover:bg-white/10"
                }`}
              >
                <MaterialIcon name={item.icon} className="size-5" />
                <span className="min-w-0 flex-1 truncate">{item.label}</span>
                <MaterialIcon
                  name="chevron_right"
                  className={`size-4 transition ${on ? "translate-x-0.5" : ""}`}
                />
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

function BrandLogo({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-block shrink-0 font-black leading-none tracking-normal text-black antialiased dark:text-white ${className}`}
    >
      <span className="absolute inset-0 text-[#00658b]/30 opacity-0 blur-[7px] transition-opacity duration-300 group-hover:opacity-100 dark:text-white/40">
        AI Nomad
      </span>
      <span className="relative transition-[filter] duration-300 group-hover:drop-shadow-[0_1px_8px_rgba(0,101,139,0.22)] dark:group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
        AI Nomad
      </span>
    </span>
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
      {items.map((item) => {
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
            <MaterialIcon
              name={item.icon}
              className={`size-5 transition ${on ? "scale-110" : ""}`}
            />
            <span className="max-w-full truncate text-[9px] font-black uppercase tracking-tight">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
