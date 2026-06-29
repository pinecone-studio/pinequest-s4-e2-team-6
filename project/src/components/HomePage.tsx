"use client";

import { useState } from "react";
import { ArScreen } from "./nomad/screens/ArScreen";
import { CameraScreen } from "./nomad/screens/CameraScreen";
import { CultureWidget } from "./nomad/culture/CultureWidget";
import { CurrencyScreen } from "./nomad/screens/CurrencyScreen";
import { DiscoverScreen } from "./nomad/screens/DiscoverScreen";
import { GemsScreen } from "./nomad/screens/GemsScreen";
import { OfflineScreen } from "./nomad/screens/OfflineScreen";
import { PlannerScreen } from "./nomad/screens/PlannerScreen";
import { SafetyScreen } from "./nomad/screens/SafetyScreen";
import { AmbientToggle } from "./nomad/shared/AmbientToggle";
import { AppShell } from "./nomad/shared/AppShell";
import type { Language, ScreenId } from "./nomad/types";

export default function HomePage() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>("discover");
  const [language, setLanguage] = useState<Language>("mn");

  return (
    <>
      <AppShell active={activeScreen} setActive={setActiveScreen} language={language} setLanguage={setLanguage} />
      {activeScreen === "discover" && <DiscoverScreen setActive={setActiveScreen} language={language} />}
      {activeScreen === "camera" && <CameraScreen language={language} />}
      {activeScreen === "ar" && <ArScreen language={language} />}
      {activeScreen === "planner" && <PlannerScreen language={language} />}
      {activeScreen === "gems" && <GemsScreen language={language} setActive={setActiveScreen} />}
      {activeScreen === "offline" && <OfflineScreen language={language} />}
      {activeScreen === "currency" && <CurrencyScreen language={language} />}
      {activeScreen === "safety" && <SafetyScreen language={language} />}

      {/* Floating culture advisor — available on every screen, docked bottom-right */}
      <CultureWidget language={language} />
      {/* Generative steppe ambience, docked bottom-left */}
      <AmbientToggle language={language} />
    </>
  );
}
