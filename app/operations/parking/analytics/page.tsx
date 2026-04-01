"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EChart } from "@/components/data-display/charts/EChart";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { DS, TOOLTIP, AXIS_LABEL, SPLIT_LINE } from "@/lib/chart-theme";
import {
  parkingData,
  parkingOccupancyByHour,
  parkingOccupancyByDay,
} from "@/lib/dashboard-data";

function KpiTile({ label, value, accent }: { label: string; value: string | number; accent?: boolean }) {
  return (
    <div className="bg-surface-raised rounded-xl border border-border-default px-4 py-4">
      <p className="type-caption mb-1">{label}</p>
      <p className={`type-kpi-lg ${accent ? "text-signature" : ""}`}>{value}</p>
    </div>
  );
}

const blocklistHits = [
  { plate: "ABC-1234", hits: 3, lastSeen: "Today, 09:14", zone: "Level B1" },
  { plate: "XYZ-5678", hits: 1, lastSeen: "Yesterday, 17:42", zone: "Level A" },
  { plate: "DEF-9012", hits: 5, lastSeen: "3 days ago", zone: "Level B2" },
  { plate: "GHI-3456", hits: 2, lastSeen: "Today, 11:30", zone: "Level A" },
];

const weeklyByType = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  visitor: [38, 45, 41, 52, 48, 22, 10],
  employee: [62, 68, 71, 65, 70, 30, 12],
};

export default function ParkingAnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const d = parkingData;

  const areaOption = {
    tooltip: { ...TOOLTIP, trigger: "axis" },
    grid: { top: 12, right: 12, bottom: 28, left: 40 },
    xAxis: {
      type: "category" as const,
      data: parkingOccupancyByHour.labels.map((h) => `${h}:00`),
      axisLabel: AXIS_LABEL,
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value" as const,
      max: 100,
      axisLabel: { ...AXIS_LABEL, formatter: (v: number) => `${v}%` },
      splitLine: SPLIT_LINE,
    },
    series: [
      {
        type: "line",
        name: "Occupancy",
        data: parkingOccupancyByHour.values,
        smooth: true,
        areaStyle: { color: DS.signature + "22" },
        lineStyle: { color: DS.signature, width: 2 },
        itemStyle: { color: DS.signature },
        symbol: "none",
      },
    ],
  };

  const weeklyOption = {
    tooltip: { ...TOOLTIP, trigger: "axis", axisPointer: { type: "shadow" } },
    legend: { bottom: 0, textStyle: { color: DS.ink2, fontSize: 10 }, icon: "circle", itemWidth: 8 },
    grid: { top: 12, right: 12, bottom: 36, left: 40 },
    xAxis: {
      type: "category" as const,
      data: weeklyByType.labels,
      axisLabel: AXIS_LABEL,
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value" as const,
      max: 100,
      axisLabel: { ...AXIS_LABEL, formatter: (v: number) => `${v}%` },
      splitLine: SPLIT_LINE,
    },
    series: [
      {
        type: "bar",
        name: "Visitor",
        data: weeklyByType.visitor,
        stack: "total",
        itemStyle: { color: DS.l1 },
      },
      {
        type: "bar",
        name: "Employee",
        data: weeklyByType.employee,
        stack: "total",
        itemStyle: { color: DS.signature, borderRadius: [3, 3, 0, 0] },
      },
    ],
  };

  const dailyBarOption = {
    tooltip: TOOLTIP,
    grid: { top: 12, right: 12, bottom: 28, left: 40 },
    xAxis: {
      type: "category" as const,
      data: parkingOccupancyByDay.labels,
      axisLabel: AXIS_LABEL,
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value" as const,
      max: 100,
      axisLabel: { ...AXIS_LABEL, formatter: (v: number) => `${v}%` },
      splitLine: SPLIT_LINE,
    },
    series: [
      {
        type: "bar",
        data: parkingOccupancyByDay.values,
        itemStyle: { color: DS.signature, borderRadius: [3, 3, 0, 0] },
      },
    ],
  };

  return (
    <div className="max-w-full px-4 md:px-10 lg:px-16 py-4 md:py-8">
      <div className="max-w-wide mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center gap-3">
          <Link
            href="/operations/parking"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:bg-surface-subtle hover:text-ink-primary transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="type-display">Parking Analytics</h1>
            <p className="type-caption mt-0.5">Real-time and historical parking data</p>
          </div>
        </div>

        {/* KPI tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <KpiTile label="Avg Occupancy" value={`${d.avgOccupancy}%`} accent />
          <KpiTile label="Peak Occupancy" value={`${d.peakOccupancy}%`} />
          <KpiTile label="Total Spots" value={d.totalSpots} />
          <KpiTile label="Blocklist Hits" value={d.blocklistHits} />
        </div>

        {/* Tabs */}
        <Tabs
          tabs={[
            { value: "overview", label: "Overview" },
            { value: "visitor", label: "Visitor" },
            { value: "employee", label: "Employee" },
            { value: "compliance", label: "Compliance" },
          ]}
          value={activeTab}
          onChange={setActiveTab}
        />

        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="bg-surface-raised rounded-xl border border-border-default p-4">
              <p className="type-subheading mb-3">Occupancy by hour — today</p>
              <EChart option={areaOption} style={{ height: 200 }} />
            </div>
            <div className="bg-surface-raised rounded-xl border border-border-default p-4">
              <p className="type-subheading mb-3">Daily occupancy trend — this week</p>
              <EChart option={dailyBarOption} style={{ height: 180 }} />
            </div>
          </div>
        )}

        {(activeTab === "visitor" || activeTab === "employee") && (
          <div className="bg-surface-raised rounded-xl border border-border-default p-4">
            <p className="type-subheading mb-3">
              {activeTab === "visitor" ? "Visitor" : "Employee"} occupancy — weekly breakdown
            </p>
            <EChart option={weeklyOption} style={{ height: 220 }} />
          </div>
        )}

        {activeTab === "compliance" && (
          <div className="bg-surface-raised rounded-xl border border-border-default overflow-hidden">
            <div className="px-4 py-3 border-b border-border-default">
              <p className="type-subheading">Blocklist hits</p>
            </div>
            <div className="divide-y divide-border-subtle">
              {blocklistHits.map((entry) => (
                <div key={entry.plate} className="flex items-center justify-between px-4 py-3 gap-3">
                  <div className="min-w-0">
                    <p className="type-label font-mono">{entry.plate}</p>
                    <p className="type-caption">{entry.lastSeen} · {entry.zone}</p>
                  </div>
                  <Badge variant="error">{entry.hits} hits</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
