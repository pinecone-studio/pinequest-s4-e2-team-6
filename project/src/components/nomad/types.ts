export type ScreenId = "discover" | "camera" | "ar" | "planner" | "gems" | "culture" | "offline" | "safety";

export type Language = "mn" | "en";

export type NavItem = {
  id: ScreenId;
  label: string;
  icon: string;
};
