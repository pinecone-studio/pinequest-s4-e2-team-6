"use client";

import { useEffect } from "react";
import { MoonIcon, SunIcon } from "./icons/AppIcons";

const storageKey = "ai-nomad-theme";

function applyTheme(theme: "light" | "dark") {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

function getPreferredTheme(): "light" | "dark" {
  const savedTheme = localStorage.getItem(storageKey);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  useEffect(() => {
    applyTheme(getPreferredTheme());

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      if (!localStorage.getItem(storageKey)) {
        applyTheme(mediaQuery.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  function toggleTheme() {
    const nextTheme = document.documentElement.classList.contains("dark") ? "light" : "dark";
    localStorage.setItem(storageKey, nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="grid size-10 place-items-center rounded-full border border-black/10 bg-white text-[#171717] shadow-sm transition hover:border-black/20 hover:bg-[#eef3ef] dark:border-white/10 dark:bg-[#1b1f1d] dark:text-white dark:hover:border-white/20"
      aria-label="Өнгөний горим солих"
      title="Өнгөний горим"
    >
      <MoonIcon className="size-5 dark:hidden" />
      <SunIcon className="hidden size-5 dark:block" />
    </button>
  );
}
