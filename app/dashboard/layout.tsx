"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/navigation/AppSidebar";
import { MobileNav } from "@/components/navigation/MobileNav";
import { useSiteContext } from "@/lib/site-context";
import { getPeopleCountForSite } from "@/lib/people-data";

const sites = [
  "HQ — New York",
  "Building B — London",
  "Building C — Singapore",
  "Building D — Berlin",
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { selectedSite, setSelectedSite } = useSiteContext();

  const peopleCount = getPeopleCountForSite(selectedSite);
  const sidebarProps = {
    sites,
    selectedSite,
    onSiteChange: (site: string) => setSelectedSite(site === selectedSite ? undefined : site),
    userName: "Michael",
    companyName: "ACME Corp",
    statusLabel: "",
    navBadges: { "/people": peopleCount },
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-surface-base">
      {/* Desktop sidebar */}
      <div className="hidden md:flex h-full">
        <AppSidebar activePath={pathname} {...sidebarProps} />
      </div>

      {/* Mobile nav (top bar + drawer) */}
      <MobileNav
        activePath={pathname}
        {...sidebarProps}
        onSiteChange={(site) => setSelectedSite(site === selectedSite ? undefined : site)}
      />

      <main className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
