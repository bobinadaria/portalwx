"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EChart } from "@/components/data-display/charts/EChart";
import { Badge } from "@/components/ui/Badge";
import { DS, TOOLTIP, AXIS_LABEL, SPLIT_LINE } from "@/lib/chart-theme";
import { guestsData } from "@/lib/dashboard-data";

function KpiTile({ label, value, accent }: { label: string; value: string | number; accent?: boolean }) {
  return (
    <div className="bg-surface-raised rounded-xl border border-border-default px-4 py-4">
      <p className="type-caption mb-1">{label}</p>
      <p className={`type-kpi-lg ${accent ? "text-signature" : ""}`}>{value}</p>
    </div>
  );
}

const visitorLog = [
  { name: "Sarah Johnson", host: "Michael Brown", timeIn: "08:32", timeOut: "17:15", badge: "Digital" },
  { name: "Thomas Chen", host: "Anna Smith", timeIn: "09:05", timeOut: "–", badge: "Physical" },
  { name: "Maria Garcia", host: "Lisa Park", timeIn: "10:20", timeOut: "12:45", badge: "Digital" },
  { name: "James Wilson", host: "Tom Lee", timeIn: "11:00", timeOut: "–", badge: "Visitor" },
  { name: "Emma Davis", host: "Sara Kim", timeIn: "13:30", timeOut: "15:00", badge: "Digital" },
];

const kiosks = [
  { name: "Main Entrance", status: "online" },
  { name: "Lobby B", status: "online" },
  { name: "Level 3 South", status: "offline" },
  { name: "Parking Entrance", status: "online" },
];

const visitsByHour = {
  labels: ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18"],
  values: [12, 28, 35, 22, 18, 31, 27, 19, 14, 8, 3],
};

export default function GuestbookAnalyticsPage() {
  const d = guestsData;

  const areaOption = {
    tooltip: { ...TOOLTIP, trigger: "axis" },
    grid: { top: 12, right: 12, bottom: 28, left: 36 },
    xAxis: {
      type: "category" as const,
      data: visitsByHour.labels.map((h) => `${h}:00`),
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
        data: visitsByHour.values,
        smooth: true,
        areaStyle: { color: DS.signature + "22" },
        lineStyle: { color: DS.signature, width: 2 },
        itemStyle: { color: DS.signature },
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
        data: [
          { name: "Digital", value: 480, itemStyle: { color: DS.signature } },
          { name: "Physical", value: 210, itemStyle: { color: DS.l1 } },
          { name: "Walk-in", value: 95, itemStyle: { color: DS.muted } },
        ],
      },
    ],
  };

  return (
    <div className="max-w-full px-4 md:px-10 lg:px-16 py-4 md:py-8">
      <div className="max-w-wide mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center gap-3">
          <Link
            href="/operations/guestbook"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:bg-surface-subtle hover:text-ink-primary transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="type-display">Guestbook Analytics</h1>
            <p className="type-caption mt-0.5">Visitor flow, badge types and kiosk status</p>
          </div>
        </div>

        {/* KPI tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <KpiTile label="Total Visits" value={d.totalGuests} accent />
          <KpiTile label="Active Now" value={d.arrived} />
          <KpiTile label="Pre-registered" value={d.invited} />
          <KpiTile label="Walk-ins" value={95} />
        </div>

        {/* Charts row */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-surface-raised rounded-xl border border-border-default p-4">
            <p className="type-subheading mb-3">Visits by hour — today</p>
            <EChart option={areaOption} style={{ height: 200 }} />
          </div>
          <div className="bg-surface-raised rounded-xl border border-border-default p-4">
            <p className="type-subheading mb-3">Badge type distribution</p>
            <EChart option={donutOption} style={{ height: 200 }} />
          </div>
        </div>

        {/* Visitor log */}
        <div className="bg-surface-raised rounded-xl border border-border-default overflow-hidden">
          <div className="px-4 py-3 border-b border-border-default">
            <p className="type-subheading">Today's visitor log</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-subtle">
                  {["Visitor", "Host", "Time in", "Time out", "Badge"].map((h) => (
                    <th key={h} className="px-4 py-2 text-left type-caption font-semibold text-ink-muted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {visitorLog.map((v) => (
                  <tr key={v.name}>
                    <td className="px-4 py-2.5 type-label">{v.name}</td>
                    <td className="px-4 py-2.5 type-caption">{v.host}</td>
                    <td className="px-4 py-2.5 type-caption tabular-nums">{v.timeIn}</td>
                    <td className="px-4 py-2.5 type-caption tabular-nums">{v.timeOut}</td>
                    <td className="px-4 py-2.5">
                      <Badge variant={v.badge === "Digital" ? "brand" : v.badge === "Physical" ? "neutral" : "info"}>
                        {v.badge}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Kiosk status */}
        <div className="bg-surface-raised rounded-xl border border-border-default overflow-hidden">
          <div className="px-4 py-3 border-b border-border-default">
            <p className="type-subheading">Kiosk status</p>
          </div>
          <div className="divide-y divide-border-subtle">
            {kiosks.map((k) => (
              <div key={k.name} className="flex items-center justify-between px-4 py-3">
                <p className="type-label">{k.name}</p>
                <Badge variant={k.status === "online" ? "success" : "error"}>{k.status}</Badge>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
