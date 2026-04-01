"use client";

import { createContext, useContext, useState } from "react";

interface SiteContextValue {
  selectedSite: string | undefined;
  setSelectedSite: (site: string | undefined) => void;
  timeRange: string;
  setTimeRange: (t: string) => void;
  zone: string;
  setZone: (z: string) => void;
}

const SiteContext = createContext<SiteContextValue>({
  selectedSite: undefined,
  setSelectedSite: () => {},
  timeRange: "day",
  setTimeRange: () => {},
  zone: "all",
  setZone: () => {},
});

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [selectedSite, setSelectedSite] = useState<string | undefined>(undefined);
  const [timeRange, setTimeRange] = useState("day");
  const [zone, setZone] = useState("all");

  return (
    <SiteContext.Provider value={{ selectedSite, setSelectedSite, timeRange, setTimeRange, zone, setZone }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteContext() {
  return useContext(SiteContext);
}
