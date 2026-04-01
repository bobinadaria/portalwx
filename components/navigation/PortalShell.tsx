"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "./AppSidebar";
import { MobileNav } from "./MobileNav";
import { useSiteContext } from "@/lib/site-context";
import { getPeopleCountForSite } from "@/lib/people-data";

const SITES = [
  "HQ — New York",
  "Building B — London",
  "Building C — Singapore",
  "Building D — Berlin",
];

interface PortalShellProps {
  children: React.ReactNode;
}

/**
 * Shared layout shell for all Portal WX module pages.
 * Renders AppSidebar (desktop) + MobileNav (mobile) + main content area.
 * Consumes SiteContext internally — no props needed from layouts.
 */
export function PortalShell({ children }: PortalShellProps) {
  const pathname = usePathname();
  const { selectedSite, setSelectedSite } = useSiteContext();
  const [collapsed, setCollapsed] = useState(false);

  const peopleCount = getPeopleCountForSite(selectedSite);

  const handleSiteChange = (site: string | undefined) =>
    setSelectedSite(!site || site === "__all__" ? undefined : site);

  const commonProps = {
    sites: SITES,
    selectedSite,
    userName: "Michael",
    companyName: "ACME Corp",
    navBadges: { "/people": peopleCount },
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-surface-base">
      {/* Desktop sidebar */}
      <div className="hidden md:flex h-full shrink-0">
        <AppSidebar
          activePath={pathname}
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
          onSiteChange={(site) => handleSiteChange(site)}
          statusLabel="All Connectors Up"
          {...commonProps}
        />
      </div>

      {/* Mobile nav (top bar + drawer) */}
      <MobileNav
        activePath={pathname}
        onSiteChange={handleSiteChange}
        {...commonProps}
      />

      <main className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
