"use client";

import { Showcase, Preview } from "../_showcase";
import { MobileHeader } from "@/components/molecules/MobileHeader";
import { Bell } from "lucide-react";

export default function MobileHeaderPage() {
  return (
    <Showcase title="MobileHeader" description="Mobile app top bar with back button, title, subtitle, and trailing actions.">

      <Preview label="With back button">
        <div className="rounded-xl overflow-hidden border border-border-default max-w-xs">
          <MobileHeader title="Visitor Details" onBack={() => {}} />
        </div>
      </Preview>

      <Preview label="With menu and more">
        <div className="rounded-xl overflow-hidden border border-border-default max-w-xs">
          <MobileHeader title="Dashboard" subtitle="London HQ" onMenu={() => {}} onMore={() => {}} />
        </div>
      </Preview>

      <Preview label="Custom trailing">
        <div className="rounded-xl overflow-hidden border border-border-default max-w-xs">
          <MobileHeader
            title="Notifications"
            onBack={() => {}}
            trailing={
              <button className="p-1.5 text-ink-primary hover:bg-surface-subtle rounded-lg">
                <Bell className="h-5 w-5" />
              </button>
            }
          />
        </div>
      </Preview>

    </Showcase>
  );
}
