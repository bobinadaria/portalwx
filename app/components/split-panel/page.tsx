"use client";
import { Showcase, Preview } from "../_showcase";
import { SplitPanel } from "@/components/layout/SplitPanel";

function Panel({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-border-default bg-surface-subtle p-4">
      <p className="type-label">{label}</p>
    </div>
  );
}

export default function SplitPanelPage() {
  return (
    <Showcase title="SplitPanel" description="Two-column layout with ratio presets.">
      <Preview label="1:1">
        <SplitPanel left={<Panel label="Left" />} right={<Panel label="Right" />} ratio="1:1" />
      </Preview>

      <Preview label="2:1">
        <SplitPanel left={<Panel label="Main content" />} right={<Panel label="Sidebar" />} ratio="2:1" />
      </Preview>

      <Preview label="1:2">
        <SplitPanel left={<Panel label="Nav" />} right={<Panel label="Content" />} ratio="1:2" />
      </Preview>
    </Showcase>
  );
}
