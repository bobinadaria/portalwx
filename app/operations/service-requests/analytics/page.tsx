"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EChart } from "@/components/data-display/charts/EChart";
import { Badge } from "@/components/ui/Badge";
import { DS, TOOLTIP, AXIS_LABEL, SPLIT_LINE } from "@/lib/chart-theme";
import {
  serviceRequestsData,
  requestsOverTime,
  highestResolutionByTenant,
} from "@/lib/dashboard-data";

function KpiTile({ label, value, accent }: { label: string; value: string | number; accent?: boolean }) {
  return (
    <div className="bg-surface-raised rounded-xl border border-border-default px-4 py-4">
      <p className="type-caption mb-1">{label}</p>
      <p className={`type-kpi-lg ${accent ? "text-signature" : ""}`}>{value}</p>
    </div>
  );
}

const byCategory = [
  { name: "HVAC", value: 42, itemStyle: { color: DS.signature } },
  { name: "Cleaning", value: 31, itemStyle: { color: DS.l1 } },
  { name: "IT", value: 28, itemStyle: { color: DS.d2 } },
  { name: "Security", value: 19, itemStyle: { color: DS.warning } },
  { name: "Other", value: 15, itemStyle: { color: DS.muted } },
];

const byTeam = [
  { team: "Facilities", count: 52 },
  { team: "IT Support", count: 38 },
  { team: "Security", count: 22 },
  { team: "Catering", count: 15 },
  { team: "Cleaning", count: 29 },
];

type RequestStatus = "open" | "in-progress" | "resolved";

const recentRequests: Array<{
  id: string;
  title: string;
  category: string;
  assignee: string;
  status: RequestStatus;
  created: string;
}> = [
  { id: "SR-1041", title: "AC not working in Room 304", category: "HVAC", assignee: "John D.", status: "open", created: "Today, 09:12" },
  { id: "SR-1040", title: "Projector bulb replacement", category: "IT", assignee: "Sara K.", status: "in-progress", created: "Today, 08:45" },
  { id: "SR-1039", title: "Broken chair in lobby", category: "Facilities", assignee: "–", status: "open", created: "Yesterday" },
  { id: "SR-1038", title: "Cleaning required — Floor 5", category: "Cleaning", assignee: "Maria G.", status: "in-progress", created: "Yesterday" },
  { id: "SR-1037", title: "Badge reader fault — Gate 2", category: "Security", assignee: "Tom L.", status: "resolved", created: "2 days ago" },
];

const statusVariant: Record<RequestStatus, "warning" | "info" | "success"> = {
  open: "warning",
  "in-progress": "info",
  resolved: "success",
};

export default function ServiceRequestsAnalyticsPage() {
  const d = serviceRequestsData;

  const trendOption = {
    tooltip: { ...TOOLTIP, trigger: "axis" },
    legend: { bottom: 0, textStyle: { color: DS.ink2, fontSize: 10 }, icon: "circle", itemWidth: 8 },
    grid: { top: 12, right: 12, bottom: 36, left: 36 },
    xAxis: {
      type: "category" as const,
      data: requestsOverTime.labels,
      axisLabel: AXIS_LABEL,
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value" as const,
      axisLabel: AXIS_LABEL,
      splitLine: SPLIT_LINE,
    },
    series: [
      {
        type: "line",
        name: "Created",
        data: requestsOverTime.newRequests,
        smooth: true,
        lineStyle: { color: DS.signature, width: 2 },
        itemStyle: { color: DS.signature },
        symbol: "none",
      },
      {
        type: "line",
        name: "Closed",
        data: requestsOverTime.closed,
        smooth: true,
        lineStyle: { color: DS.success, width: 2 },
        itemStyle: { color: DS.success },
        symbol: "none",
      },
    ],
  };

  const donutOption = {
    tooltip: { ...TOOLTIP, trigger: "item", formatter: "{b}: {c} ({d}%)" },
    legend: { orient: "vertical", right: 0, top: "center", textStyle: { color: DS.ink2, fontSize: 10 }, icon: "circle", itemWidth: 8 },
    series: [
      {
        type: "pie",
        radius: ["42%", "68%"],
        center: ["38%", "50%"],
        label: { show: false },
        data: byCategory,
      },
    ],
  };

  const teamBarOption = {
    tooltip: TOOLTIP,
    grid: { top: 8, right: 12, bottom: 4, left: 8, containLabel: true },
    xAxis: { type: "value" as const, axisLabel: AXIS_LABEL, splitLine: SPLIT_LINE },
    yAxis: {
      type: "category" as const,
      data: [...byTeam].reverse().map((t) => t.team),
      axisLabel: AXIS_LABEL,
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: "bar",
        data: [...byTeam].reverse().map((t) => t.count),
        itemStyle: { color: DS.signature, borderRadius: [0, 3, 3, 0] },
      },
    ],
  };

  return (
    <div className="max-w-full px-4 md:px-10 lg:px-16 py-4 md:py-8">
      <div className="max-w-wide mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center gap-3">
          <Link
            href="/operations/service-requests"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:bg-surface-subtle hover:text-ink-primary transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="type-display">Service Requests Analytics</h1>
            <p className="type-caption mt-0.5">Requests by category, team performance and trends</p>
          </div>
        </div>

        {/* KPI tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <KpiTile label="Open" value={d.openRequests} accent />
          <KpiTile label="Created this period" value={d.createdInPeriod} />
          <KpiTile label="Closed" value={d.closedInPeriod} />
          <KpiTile label="Avg resolution" value={`${highestResolutionByTenant[0]?.days ?? 3.2}d`} />
        </div>

        {/* Charts row */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-surface-raised rounded-xl border border-border-default p-4">
            <p className="type-subheading mb-3">Creation trend</p>
            <EChart option={trendOption} style={{ height: 200 }} />
          </div>
          <div className="bg-surface-raised rounded-xl border border-border-default p-4">
            <p className="type-subheading mb-3">By category</p>
            <EChart option={donutOption} style={{ height: 200 }} />
          </div>
        </div>

        {/* Team bar */}
        <div className="bg-surface-raised rounded-xl border border-border-default p-4">
          <p className="type-subheading mb-3">Requests by team</p>
          <EChart option={teamBarOption} style={{ height: 180 }} />
        </div>

        {/* Recent requests */}
        <div className="bg-surface-raised rounded-xl border border-border-default overflow-hidden">
          <div className="px-4 py-3 border-b border-border-default">
            <p className="type-subheading">Recent open requests</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-subtle">
                  {["ID", "Title", "Category", "Assignee", "Status", "Created"].map((h) => (
                    <th key={h} className="px-4 py-2 text-left type-caption font-semibold text-ink-muted whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {recentRequests.map((r) => (
                  <tr key={r.id}>
                    <td className="px-4 py-2.5 type-caption font-mono text-ink-muted">{r.id}</td>
                    <td className="px-4 py-2.5 type-label max-w-[200px] truncate">{r.title}</td>
                    <td className="px-4 py-2.5 type-caption">{r.category}</td>
                    <td className="px-4 py-2.5 type-caption">{r.assignee}</td>
                    <td className="px-4 py-2.5">
                      <Badge variant={statusVariant[r.status]}>{r.status}</Badge>
                    </td>
                    <td className="px-4 py-2.5 type-caption whitespace-nowrap">{r.created}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
