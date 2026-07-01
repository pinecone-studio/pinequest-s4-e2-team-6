export type ScreenId = "discover" | "camera" | "ar" | "planner" | "gems" | "offline" | "currency" | "safety";

export type Language = "mn" | "en" | "zh" | "ru" | "es";

export const languageCodes: Language[] = ["mn", "en", "zh", "ru", "es"];

export function isLanguage(value: unknown): value is Language {
  return typeof value === "string" && (languageCodes as string[]).includes(value);
}

export type NavItem = {
  id: ScreenId;
  label: string;
  icon: string;
};
