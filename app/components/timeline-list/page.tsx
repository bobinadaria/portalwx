"use client";
import { Showcase, Preview } from "../_showcase";
import { Timeline } from "@/components/data-display/Timeline";
import { List } from "@/components/data-display/List";

const timelineEntries = [
  { id: "1", label: "System deployed", timestamp: "Mar 17, 2026 · 14:00", description: "Production release v2.4.1 deployed to all sites." },
  { id: "2", label: "Alert triggered", timestamp: "Mar 17, 2026 · 12:30", description: "Building B occupancy exceeded 95% threshold." },
  { id: "3", label: "Config updated", timestamp: "Mar 16, 2026 · 09:15", description: "Access policy for Zone C updated by admin." },
  { id: "4", label: "User onboarded", timestamp: "Mar 15, 2026 · 16:45" },
];

const listItems = [
  { id: "1", content: <div className="flex justify-between"><span className="type-label">Building A</span><span className="type-caption">New York</span></div> },
  { id: "2", content: <div className="flex justify-between"><span className="type-label">Building B</span><span className="type-caption">London</span></div> },
  { id: "3", content: <div className="flex justify-between"><span className="type-label">Building C</span><span className="type-caption">Singapore</span></div> },
];

export default function TimelineListPage() {
  return (
    <Showcase title="Timeline & List" description="Chronological events and simple item lists.">
      <Preview label="Timeline">
        <div className="max-w-md">
          <Timeline entries={timelineEntries} />
        </div>
      </Preview>

      <Preview label="List">
        <div className="max-w-sm rounded-xl border border-border-default bg-surface-raised overflow-hidden">
          <List items={listItems} />
        </div>
      </Preview>
    </Showcase>
  );
}
