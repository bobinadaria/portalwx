"use client";
import { Showcase, Preview } from "../_showcase";
import { KPICard } from "@/components/kpi/KPICard";
import { KPIRow } from "@/components/kpi/KPIRow";
import { KPIGroup } from "@/components/kpi/KPIGroup";
import { KPIInline } from "@/components/kpi/KPIInline";
import { ProgressBar } from "@/components/data-display/ProgressBar";
import { Grid } from "@/components/layout/Grid";

export default function KPIPage() {
  return (
    <Showcase title="KPI System" description="Level 1 and Level 2 KPI components for dashboards.">
      <Preview label="KPI Card — Level 1">
        <Grid cols={4} gap="md">
          <KPICard
            title="Total Sites"
            value="16"
            context="across 4 regions"
            change="+2"
            changeType="positive"
            trend={[10, 11, 12, 13, 14, 15, 16]}
          />
          <KPICard
            title="Avg Occupancy"
            value="72%"
            context="last 7 days"
            change="+5%"
            changeType="positive"
            trend={[60, 63, 65, 68, 70, 71, 72]}
          />
          <KPICard
            title="Active Incidents"
            value="3"
            change="+2"
            changeType="negative"
            trend={[1, 0, 1, 2, 1, 2, 3]}
          />
          <KPICard
            title="Uptime"
            value="99.8%"
            context="30-day average"
            change="stable"
            changeType="neutral"
          />
        </Grid>
      </Preview>

      <Preview label="KPI Card — Clickable">
        <Grid cols={3} gap="md">
          <KPICard title="Active Users" value="1,284" change="+12%" changeType="positive" onClick={() => {}} />
          <KPICard title="Visitors Today" value="342" onClick={() => {}} />
          <KPICard title="Alerts" value="7" change="+3" changeType="negative" onClick={() => {}} />
        </Grid>
      </Preview>

      <Preview label="KPI Row">
        <KPIRow
          items={[
            { label: "Sites", value: 16, change: "+2", changeType: "positive" },
            { label: "Occupancy", value: "72%", change: "+5%", changeType: "positive" },
            { label: "Incidents", value: 3, change: "+2", changeType: "negative" },
            { label: "Uptime", value: "99.8%", change: "stable", changeType: "neutral" },
          ]}
        />
      </Preview>

      <Preview label="KPI Group — Level 2">
        <Grid cols={2} gap="md">
          <KPIGroup
            title="Building A — Occupancy"
            metrics={[
              { label: "Current", value: "87%" },
              { label: "Peak today", value: "94%" },
              { label: "7-day avg", value: "82%" },
            ]}
          >
            <ProgressBar value={87} label="Current" showValue />
          </KPIGroup>
          <KPIGroup
            title="Building B — Access"
            metrics={[
              { label: "Entries today", value: 241 },
              { label: "Unique users", value: 189 },
              { label: "Denied", value: 3 },
            ]}
          />
        </Grid>
      </Preview>

      <Preview label="KPI Inline">
        <div className="flex flex-wrap gap-6 rounded-xl border border-border-default bg-surface-raised px-4 py-3">
          <KPIInline label="Sites:" value={16} />
          <KPIInline label="Online:" value={14} />
          <KPIInline label="Alerts:" value={3} />
          <KPIInline label="Uptime:" value="99.8%" />
        </div>
      </Preview>
    </Showcase>
  );
}
