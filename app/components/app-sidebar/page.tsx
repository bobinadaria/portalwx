"use client";

import { useState } from "react";
import { Showcase, Preview } from "../_showcase";
import { AppSidebar } from "@/components/navigation/AppSidebar";

const demoSites = ["HQ — New York", "Building B — London", "Building C — Singapore", "Building D — Berlin"];

export default function AppSidebarPage() {
  const [activePath, setActivePath] = useState("/dashboard");
  const [selectedSite, setSelectedSite] = useState<string | undefined>(undefined);
  const [collapsed, setCollapsed] = useState(false);
  const [collapsed2, setCollapsed2] = useState(true);

  return (
    <Showcase
      title="App Sidebar"
      description="Product sidebar with Dashboard and People sections. Matches Figma spec: 240px wide, rounded right corners, site selector, user profile, collapse toggle."
    >
      <Preview label="Default — expanded" className="!p-0 overflow-hidden">
        <div className="flex h-[600px]">
          <AppSidebar
            activePath={activePath}
            sites={demoSites}
            selectedSite={selectedSite}
            onSiteChange={setSelectedSite}
            userName="Michael"
            companyName="ACME Corp"
            collapsed={collapsed}
            onToggle={() => setCollapsed(!collapsed)}
          />
          <div className="flex-1 flex items-center justify-center bg-surface-base">
            <button
              className="text-sm text-ink-secondary hover:text-ink-primary transition-colors"
              onClick={() =>
                setActivePath(activePath === "/dashboard" ? "/people" : "/dashboard")
              }
            >
              Active: <strong className="text-ink-primary">{activePath}</strong> — click to toggle
            </button>
          </div>
        </div>
      </Preview>

      <Preview label="Collapsed" className="!p-0 overflow-hidden">
        <div className="flex h-[400px]">
          <AppSidebar
            activePath="/people"
            userName="Michael"
            companyName="ACME Corp"
            collapsed={collapsed2}
            onToggle={() => setCollapsed2(!collapsed2)}
          />
          <div className="flex-1 bg-surface-base" />
        </div>
      </Preview>

      <Preview label="Without site selector">
        <div className="flex h-[400px] rounded-xl overflow-hidden border border-border-default">
          <AppSidebar
            activePath="/dashboard"
            userName="Jane Smith"
            companyName="Portal WX"
          />
          <div className="flex-1 bg-surface-base" />
        </div>
      </Preview>
    </Showcase>
  );
}
