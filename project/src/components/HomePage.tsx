"use client";

import { useState } from "react";
import { ArScreen } from "./nomad/screens/ArScreen";
import { CameraScreen } from "./nomad/screens/CameraScreen";
import { CultureScreen } from "./nomad/screens/CultureScreen";
import { DiscoverScreen } from "./nomad/screens/DiscoverScreen";
import { GemsScreen } from "./nomad/screens/GemsScreen";
import { OfflineScreen } from "./nomad/screens/OfflineScreen";
import { PlannerScreen } from "./nomad/screens/PlannerScreen";
import { SafetyScreen } from "./nomad/screens/SafetyScreen";
import { AppShell } from "./nomad/shared/AppShell";
import type { ScreenId } from "./nomad/types";

export default function HomePage() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>("discover");

  return (
    <>
      <AppShell active={activeScreen} setActive={setActiveScreen} />
      {activeScreen === "discover" && <DiscoverScreen setActive={setActiveScreen} />}
      {activeScreen === "camera" && <CameraScreen />}
      {activeScreen === "ar" && <ArScreen />}
      {activeScreen === "planner" && <PlannerScreen />}
      {activeScreen === "gems" && <GemsScreen />}
      {activeScreen === "culture" && <CultureScreen />}
      {activeScreen === "offline" && <OfflineScreen />}
      {activeScreen === "safety" && <SafetyScreen />}
    </>
  );
}
