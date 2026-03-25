"use client";

import { createContext, useContext, useState } from "react";

interface SiteContextValue {
  selectedSite: string | undefined;
  setSelectedSite: (site: string | undefined) => void;
}

const SiteContext = createContext<SiteContextValue>({
  selectedSite: undefined,
  setSelectedSite: () => {},
});

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [selectedSite, setSelectedSite] = useState<string | undefined>(undefined);
  return (
    <SiteContext.Provider value={{ selectedSite, setSelectedSite }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteContext() {
  return useContext(SiteContext);
}
