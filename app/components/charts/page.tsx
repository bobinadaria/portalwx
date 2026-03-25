"use client";
import { Showcase, Preview } from "../_showcase";
import { ProgressBar } from "@/components/data-display/ProgressBar";
import { DistributionBar } from "@/components/data-display/DistributionBar";
import { DonutChart } from "@/components/data-display/DonutChart";
import { TrendLine } from "@/components/data-display/TrendLine";
import { StatBlock } from "@/components/data-display/StatBlock";
import { MetricList } from "@/components/data-display/MetricList";

export default function ChartsPage() {
  return (
    <Showcase title="Charts & Metrics" description="Progress bars, distribution bars, donut charts, trend lines, stat blocks, and metric lists.">
      <Preview label="ProgressBar">
        <div className="space-y-4 max-w-md">
          <ProgressBar value={72} label="Occupancy" showValue />
          <ProgressBar value={95} variant="warning" label="Capacity" showValue />
          <ProgressBar value={15} variant="error" label="Availability" showValue />
          <ProgressBar value={100} variant="success" label="Sync" showValue />
          <ProgressBar value={50} size="sm" />
        </div>
      </Preview>

      <Preview label="DistributionBar">
        <div className="max-w-md">
          <DistributionBar
            segments={[
              { label: "Occupied", value: 65, color: "bg-signature" },
              { label: "Reserved", value: 20, color: "bg-brand-l1" },
              { label: "Available", value: 15, color: "bg-surface-subtle" },
            ]}
          />
        </div>
      </Preview>

      <Preview label="DonutChart">
        <div className="flex flex-wrap gap-8">
          <DonutChart
            segments={[
              { label: "Active", value: 78, color: "var(--color-signature)" },
              { label: "Idle", value: 22, color: "var(--border-default)" },
            ]}
            centerValue="78%"
            centerLabel="Active"
          />
          <DonutChart
            segments={[
              { label: "Online", value: 12, color: "var(--status-success)" },
              { label: "Degraded", value: 3, color: "var(--status-warning)" },
              { label: "Offline", value: 1, color: "var(--status-error)" },
            ]}
            centerValue="16"
            centerLabel="Sites"
            size={140}
          />
        </div>
      </Preview>

      <Preview label="TrendLine">
        <div className="flex items-center gap-6">
          <div className="space-y-1">
            <p className="type-caption">Upward</p>
            <TrendLine data={[10, 12, 11, 15, 18, 22, 25]} color="var(--status-success)" />
          </div>
          <div className="space-y-1">
            <p className="type-caption">Downward</p>
            <TrendLine data={[25, 22, 20, 18, 15, 12, 10]} color="var(--status-error)" />
          </div>
          <div className="space-y-1">
            <p className="type-caption">Flat</p>
            <TrendLine data={[15, 16, 14, 15, 16, 15, 14]} />
          </div>
        </div>
      </Preview>

      <Preview label="StatBlock">
        <div className="flex flex-wrap gap-8">
          <StatBlock label="Active Users" value="1,284" change="+12%" changeType="positive" />
          <StatBlock label="Incidents" value="3" change="+2" changeType="negative" />
          <StatBlock label="Uptime" value="99.8%" change="stable" changeType="neutral" />
        </div>
      </Preview>

      <Preview label="MetricList">
        <MetricList
          metrics={[
            { label: "Total Sites", value: 16 },
            { label: "Avg Occupancy", value: "72%" },
            { label: "Active Alerts", value: 3 },
          ]}
        />
      </Preview>
    </Showcase>
  );
}
