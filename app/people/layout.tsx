"use client";

import { AppSidebar } from "@/components/navigation/AppSidebar";
import { useSiteContext } from "@/lib/site-context";
import { getPeopleCountForSite } from "@/lib/people-data";

const sites = [
  "HQ — New York",
  "Building B — London",
  "Building C — Singapore",
  "Building D — Berlin",
];

export default function PeopleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { selectedSite, setSelectedSite } = useSiteContext();

  const peopleCount = getPeopleCountForSite(selectedSite);

  return (
    <div className="flex h-screen bg-surface-base">
      <AppSidebar
        activePath="/people"
        sites={sites}
        selectedSite={selectedSite}
        onSiteChange={(site) => setSelectedSite(site === selectedSite ? undefined : site)}
        userName="Michael"
        companyName="ACME Corp"
        statusLabel=""
        navBadges={{ "/people": peopleCount }}
      />
      <main className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
