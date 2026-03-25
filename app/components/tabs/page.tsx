"use client";

import { useState } from "react";
import { Showcase, Preview } from "../_showcase";
import { Tabs } from "@/components/ui/Tabs";

const tabItems = [
  { label: "Overview", value: "overview" },
  { label: "Analytics", value: "analytics" },
  { label: "Settings", value: "settings" },
];

export default function TabsPage() {
  const [active, setActive] = useState("overview");

  return (
    <Showcase title="Tabs" description="Segmented navigation within a panel or page section.">
      <Preview label="Default">
        <Tabs tabs={tabItems} value={active} onChange={setActive} />
        <p className="type-body mt-4">
          Active tab: <strong>{active}</strong>
        </p>
      </Preview>

      <Preview label="With Content">
        <Tabs tabs={tabItems} value={active} onChange={setActive} />
        <div className="mt-4 rounded-xl bg-surface-subtle p-4">
          {active === "overview" && <p className="type-body">Overview panel content.</p>}
          {active === "analytics" && <p className="type-body">Analytics panel content.</p>}
          {active === "settings" && <p className="type-body">Settings panel content.</p>}
        </div>
      </Preview>
    </Showcase>
  );
}
