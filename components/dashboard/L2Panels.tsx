"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/data-display/ProgressBar";
import { TrendLine } from "@/components/data-display/TrendLine";
import { EChart } from "@/components/data-display/charts/EChart";
import { cn } from "@/lib/utils";
import {
  type SiteFootprintData,
  type AcsUnit,
  systemAcsBySite,
  occupancyData,
  guestsData,
  guestsByDay,
  guestDigitalBreakdown,
  bookingsData,
  bookingsByDay,
  bookingsBySite,
  bookingsByZone,
  bookingsHeatmapHours,
  bookingsHeatmapDays,
  bookingsHeatmapData,
  digitalBadgeAdoptionData,
  adoptionBySite,
  adoptionTrend,
  serviceRequestsData,
  requestsOverTime,
  avgTimeToClose,
  highestResponseByTenant,
  highestResolutionByTenant,
  longestOutstandingRequests,
  peopleIdentityData,
  workplaceAccessData,
  accessByDay,
  presenceByDay,
  digitalCardBreakdown,
  siteComparison,
} from "@/lib/dashboard-data";
import { DS, TOOLTIP, AXIS_LABEL, SPLIT_LINE } from "@/lib/chart-theme";

/* ── Shared sub-components ──────────────────────────── */

function KpiRow({
  items,
}: {
  items: { label: string; value: string | number; accent?: boolean }[];
}) {
  return (
    <div className={cn("grid gap-px rounded-xl overflow-hidden border border-border-default", `grid-cols-${items.length}`)}>
      {items.map((kpi) => (
        <div key={kpi.label} className="bg-surface-subtle px-3 py-3 text-center">
          <p className="type-caption mb-1">{kpi.label}</p>
          <p className={cn("type-kpi-sm", kpi.accent && "text-signature")}>
            {kpi.value}
          </p>
        </div>
      ))}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="type-subheading mb-2">{children}</p>;
}

function MetricRow({
  label,
  value,
  badge,
}: {
  label: string;
  value?: string | number;
  badge?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border-subtle last:border-0">
      <span className="type-body">{label}</span>
      {badge ?? <span className="type-label">{value}</span>}
    </div>
  );
}

/* ── 0. Site Detail Panel ─────────────────────────────── */
export function SiteDetailPanel({ site }: { site: SiteFootprintData }) {
  const allOperational = site.acs.every((a) => a.status === "operational");

  return (
    <div className="space-y-6">
      {/* Site info */}
      <div className="flex items-center gap-3">
        <span className="text-2xl leading-none">{site.flag}</span>
        <div>
          <p className="type-heading">{site.name}</p>
          <p className="type-caption mt-0.5">{site.city}, {site.country}</p>
        </div>
        <div className="ml-auto">
          <Badge variant={site.status === "operational" ? "success" : "error"} dot>
            {site.status === "operational" ? "Operational" : "Affected"}
          </Badge>
        </div>
      </div>

      {/* Site KPIs */}
      <div className="grid grid-cols-3 gap-px rounded-xl overflow-hidden border border-border-default">
        {[
          { label: "Total users", value: site.totalUsers },
          { label: "ACS connected", value: site.acsConnected },
          { label: "Credential coverage", value: `${site.credentialCoverage}%`, accent: true },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-surface-subtle px-3 py-3 text-center">
            <p className="type-caption mb-1">{kpi.label}</p>
            <p className={cn("type-kpi-sm", kpi.accent && "text-signature")}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Access Systems */}
      <div>
        <SectionLabel>Access Systems</SectionLabel>
        {allOperational ? (
          <div className="rounded-xl border border-status-success bg-status-success-bg px-4 py-3">
            <p className="type-label text-status-success">All access systems operational</p>
          </div>
        ) : (
          <div className="divide-y divide-border-subtle rounded-xl border border-border-default overflow-hidden">
            {site.acs.map((unit) => (
              <div key={unit.name} className="flex items-center justify-between px-3 py-3 bg-surface-raised">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full shrink-0",
                      unit.status === "operational" ? "bg-status-success" : "bg-status-error"
                    )}
                  />
                  <span className="type-label">{unit.name}</span>
                  <Badge variant={unit.status === "operational" ? "success" : "error"}>
                    {unit.status === "operational" ? "Operational" : "Lost Connection"}
                  </Badge>
                </div>
                <span className="type-caption text-ink-muted">last sync {unit.lastSync}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── 1. Occupancy Panel ───────────────────────────────── */
export function OccupancyPanel() {
  const d = occupancyData;

  const stackBarOption = {
    tooltip: { ...TOOLTIP, trigger: "axis", axisPointer: { type: "shadow" } },
    legend: { bottom: 0, textStyle: { color: DS.ink2, fontSize: 10 }, icon: "circle", itemWidth: 8, itemHeight: 8 },
    grid: { top: 8, bottom: 36, left: 80, right: 12 },
    xAxis: {
      type: "value",
      splitLine: SPLIT_LINE,
      axisLabel: AXIS_LABEL,
    },
    yAxis: {
      type: "category",
      data: ["Berlin", "Singapore", "London", "New York"],
      axisLabel: { ...AXIS_LABEL, fontSize: 10 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        name: "Home Users",
        type: "bar",
        stack: "total",
        data: [80, 121, 234, 412],
        itemStyle: { color: DS.signature },
        barMaxWidth: 20,
      },
      {
        name: "Travelers",
        type: "bar",
        stack: "total",
        data: [40, 55, 90, 120],
        itemStyle: { color: DS.l1 },
        barMaxWidth: 20,
      },
    ],
  };

  const trendOption = {
    tooltip: { ...TOOLTIP, trigger: "axis" },
    grid: { top: 8, bottom: 20, left: 32, right: 8 },
    xAxis: {
      type: "category",
      data: presenceByDay.labels,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: AXIS_LABEL,
    },
    yAxis: {
      type: "value",
      splitLine: SPLIT_LINE,
      axisLabel: AXIS_LABEL,
    },
    series: [
      {
        name: "Employees",
        type: "line",
        data: presenceByDay.employees,
        smooth: true,
        symbol: "none",
        lineStyle: { color: DS.signature, width: 2 },
        areaStyle: { color: DS.signature + "22" },
      },
    ],
  };

  return (
    <div className="space-y-6">
      <KpiRow items={[
        { label: "Home Users", value: d.homeUsers.toLocaleString() },
        { label: "Travelers", value: d.travelers.toLocaleString() },
        { label: "Total Present", value: d.totalPresent.toLocaleString() },
      ]} />

      <div>
        <SectionLabel>Occupancy by site</SectionLabel>
        <EChart option={stackBarOption} style={{ height: 200 }} />
      </div>

      <div>
        <SectionLabel>Daily occupancy trend</SectionLabel>
        <EChart option={trendOption} style={{ height: 150 }} />
      </div>
    </div>
  );
}

/* ── 2. Guests Panel ──────────────────────────────────── */
export function GuestsPanel() {
  const d = guestsData;
  const [showDigitalBreakdown, setShowDigitalBreakdown] = useState(false);

  const trendOption = {
    tooltip: { ...TOOLTIP, trigger: "axis" },
    legend: { bottom: 0, textStyle: { color: DS.ink2, fontSize: 10 }, icon: "circle", itemWidth: 8, itemHeight: 8 },
    grid: { top: 8, bottom: 36, left: 32, right: 8 },
    xAxis: {
      type: "category",
      data: guestsByDay.labels,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: AXIS_LABEL,
    },
    yAxis: {
      type: "value",
      splitLine: SPLIT_LINE,
      axisLabel: AXIS_LABEL,
    },
    series: [
      {
        name: "Invited",
        type: "line",
        data: guestsByDay.invited,
        smooth: true,
        symbol: "none",
        lineStyle: { color: DS.l1, width: 2 },
      },
      {
        name: "Arrived",
        type: "line",
        data: guestsByDay.arrived,
        smooth: true,
        symbol: "none",
        lineStyle: { color: DS.signature, width: 2 },
        areaStyle: { color: DS.signature + "22" },
      },
    ],
  };

  const badgeHighLevelOption = {
    tooltip: { ...TOOLTIP, trigger: "item", formatter: "{b}: {d}%" },
    legend: { orient: "vertical", right: 0, top: "center", textStyle: { color: DS.ink2, fontSize: 10 }, icon: "circle", itemWidth: 8, itemHeight: 8 },
    series: [
      {
        type: "pie",
        radius: ["42%", "68%"],
        center: ["35%", "50%"],
        data: [
          { name: "Digital card", value: 62, itemStyle: { color: DS.signature } },
          { name: "Plastic card", value: 28, itemStyle: { color: DS.l1 } },
          { name: "Other", value: 10, itemStyle: { color: DS.border } },
        ],
        label: { show: false },
        emphasis: { scale: false },
      },
    ],
  };

  const badgeDigitalBreakdownOption = {
    tooltip: { ...TOOLTIP, trigger: "item", formatter: "{b}: {d}%" },
    legend: { orient: "vertical", right: 0, top: "center", textStyle: { color: DS.ink2, fontSize: 10 }, icon: "circle", itemWidth: 8, itemHeight: 8 },
    series: [
      {
        type: "pie",
        radius: ["42%", "68%"],
        center: ["35%", "50%"],
        data: [
          ...guestDigitalBreakdown.map((item, i) => ({
            name: item.name,
            value: item.value,
            itemStyle: { color: [DS.signature, DS.d2, DS.l1, DS.d1][i] },
          })),
          { name: "Plastic card", value: 28, itemStyle: { color: DS.border } },
          { name: "Other", value: 10, itemStyle: { color: DS.muted } },
        ],
        label: { show: false },
        emphasis: { scale: false },
      },
    ],
  };

  const arrivalRate = d.invited > 0 ? Math.round((d.arrived / d.invited) * 100) : 0;

  return (
    <div className="space-y-6">
      <KpiRow items={[
        { label: "Invited", value: d.invited },
        { label: "Arrived", value: d.arrived },
        { label: "Arrival rate", value: `${arrivalRate}%`, accent: true },
      ]} />

      <div>
        <SectionLabel>Guest trend</SectionLabel>
        <EChart option={trendOption} style={{ height: 150 }} />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <SectionLabel>Guest badge types</SectionLabel>
          <button
            onClick={() => setShowDigitalBreakdown(!showDigitalBreakdown)}
            className={cn(
              "type-caption px-2 py-1 rounded-md border transition-colors",
              showDigitalBreakdown
                ? "border-signature bg-brand-l2 text-signature"
                : "border-border-default text-ink-muted hover:border-signature hover:text-signature"
            )}
          >
            {showDigitalBreakdown ? "Show summary" : "Expand digital"}
          </button>
        </div>
        <EChart
          option={showDigitalBreakdown ? badgeDigitalBreakdownOption : badgeHighLevelOption}
          style={{ height: 160 }}
        />
        <p className="type-caption mt-1">
          {showDigitalBreakdown
            ? "Digital card expanded: BLE, Wallet, QR, Biometric"
            : "Click \"Expand digital\" to see BLE, Wallet, QR, Biometric breakdown"}
        </p>
      </div>
    </div>
  );
}

/* ── 3. Bookings Panel ────────────────────────────────── */
export function BookingsPanel() {
  const d = bookingsData;
  const [bookingTypeFilter, setBookingTypeFilter] = useState<string>("all");

  const typeFilterOptions = [
    { label: "All", value: "all" },
    ...d.byType.map((t) => ({ label: t.label, value: t.type })),
  ];

  const donutOption = {
    tooltip: { ...TOOLTIP, trigger: "item", formatter: "{b}: {c} ({d}%)" },
    legend: { orient: "vertical", right: 0, top: "center", textStyle: { color: DS.ink2, fontSize: 10 }, icon: "circle", itemWidth: 8, itemHeight: 8 },
    series: [
      {
        type: "pie",
        radius: ["42%", "68%"],
        center: ["35%", "50%"],
        data: d.byType.map((t, i) => ({
          name: t.label,
          value: t.count,
          itemStyle: { color: [DS.signature, DS.d2, DS.l1, DS.d1, DS.border][i] },
        })),
        label: { show: false },
        emphasis: { scale: false },
      },
    ],
  };

  const siteBarOption = {
    tooltip: { ...TOOLTIP, trigger: "axis", axisPointer: { type: "shadow" } },
    grid: { top: 8, bottom: 20, left: 72, right: 12 },
    xAxis: {
      type: "value",
      max: 100,
      splitLine: SPLIT_LINE,
      axisLabel: { ...AXIS_LABEL, formatter: "{value}%" },
    },
    yAxis: {
      type: "category",
      data: bookingsBySite.map((s) => s.site),
      axisLabel: { ...AXIS_LABEL, fontSize: 10 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: "bar",
        data: bookingsBySite.map((s) => s.occupancy),
        itemStyle: { color: DS.signature, borderRadius: [0, 3, 3, 0] },
        barMaxWidth: 20,
      },
    ],
  };

  const trendOption = {
    tooltip: { ...TOOLTIP, trigger: "axis" },
    grid: { top: 8, bottom: 20, left: 32, right: 8 },
    xAxis: {
      type: "category",
      data: bookingsByDay.labels,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: AXIS_LABEL,
    },
    yAxis: {
      type: "value",
      splitLine: SPLIT_LINE,
      axisLabel: AXIS_LABEL,
    },
    series: [
      {
        type: "line",
        data: bookingsByDay.values,
        smooth: true,
        symbol: "none",
        lineStyle: { color: DS.signature, width: 2 },
        areaStyle: { color: DS.signature + "22" },
      },
    ],
  };

  const maxHeatVal = Math.max(...bookingsHeatmapData.map((d) => d[2]));

  const heatmapOption = {
    tooltip: {
      ...TOOLTIP,
      formatter: (params: { value: number[] }) => {
        const [day, hour, val] = params.value;
        return `${bookingsHeatmapDays[day]}, ${bookingsHeatmapHours[hour]}: ${val} h`;
      },
    },
    grid: { top: 8, bottom: 40, left: 40, right: 60 },
    xAxis: {
      type: "category",
      data: bookingsHeatmapHours,
      axisLabel: { ...AXIS_LABEL, fontSize: 8, rotate: 0 },
      axisLine: { show: false },
      axisTick: { show: false },
      splitArea: { show: true },
    },
    yAxis: {
      type: "category",
      data: bookingsHeatmapDays,
      axisLabel: { ...AXIS_LABEL, fontSize: 10 },
      axisLine: { show: false },
      axisTick: { show: false },
      splitArea: { show: true },
    },
    visualMap: {
      min: 0,
      max: maxHeatVal,
      calculable: false,
      orient: "vertical",
      right: 0,
      top: "center",
      itemWidth: 10,
      itemHeight: 100,
      textStyle: { color: DS.muted, fontSize: 9 },
      inRange: {
        color: ["#F5F6FA", "#B8C2DE", "#6382D5", "#3F5BA7"],
      },
    },
    series: [
      {
        type: "heatmap",
        data: bookingsHeatmapData.map(([day, hour, val]) => [hour, day, val]),
        label: {
          show: true,
          formatter: (params: { value: number[] }) => `${params.value[2]} h`,
          fontSize: 9,
          color: DS.ink2,
        },
        emphasis: {
          itemStyle: { shadowBlur: 4, shadowColor: "rgba(0,0,0,0.15)" },
        },
      },
    ],
  };

  const zoneBarOption = {
    tooltip: { ...TOOLTIP, trigger: "axis", axisPointer: { type: "shadow" } },
    grid: { top: 8, bottom: 20, left: 120, right: 12 },
    xAxis: {
      type: "value",
      splitLine: SPLIT_LINE,
      axisLabel: AXIS_LABEL,
    },
    yAxis: {
      type: "category",
      data: bookingsByZone.map((z) => z.zone),
      axisLabel: { ...AXIS_LABEL, fontSize: 9 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        name: "Booked",
        type: "bar",
        data: bookingsByZone.map((z) => z.bookings),
        itemStyle: { color: DS.signature, borderRadius: [0, 3, 3, 0] },
        barMaxWidth: 16,
      },
      {
        name: "Capacity",
        type: "bar",
        data: bookingsByZone.map((z) => z.capacity - z.bookings),
        stack: "capacity",
        itemStyle: { color: DS.border, borderRadius: [0, 3, 3, 0] },
        barMaxWidth: 16,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <KpiRow items={[
        { label: "Total Bookings", value: d.totalBookings },
        { label: "Unique Bookers", value: d.uniqueBookers },
        { label: "Cancellations", value: `${d.cancellationRate}%` },
      ]} />

      {/* Booking type filter */}
      <div>
        <SectionLabel>Filter by type</SectionLabel>
        <div className="flex gap-1.5 flex-wrap">
          {typeFilterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setBookingTypeFilter(opt.value)}
              className={cn(
                "type-caption px-2.5 py-1 rounded-md border transition-colors",
                bookingTypeFilter === opt.value
                  ? "border-signature bg-brand-l2 text-signature"
                  : "border-border-default text-ink-muted hover:border-signature hover:text-signature"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {bookingTypeFilter !== "all" && (
          <p className="type-caption mt-2 text-ink-muted">
            Showing data for: {typeFilterOptions.find((o) => o.value === bookingTypeFilter)?.label}
          </p>
        )}
      </div>

      <div>
        <SectionLabel>By type</SectionLabel>
        <EChart option={donutOption} style={{ height: 160 }} />
      </div>

      <div>
        <SectionLabel>Occupancy by site</SectionLabel>
        <EChart option={siteBarOption} style={{ height: 160 }} />
      </div>

      <div>
        <SectionLabel>Booking trend</SectionLabel>
        <EChart option={trendOption} style={{ height: 120 }} />
      </div>

      <div>
        <SectionLabel>Utilization by zone</SectionLabel>
        <EChart option={zoneBarOption} style={{ height: 200 }} />
      </div>

      <div>
        <SectionLabel>Utilization by day & hour</SectionLabel>
        <EChart option={heatmapOption} style={{ height: 220 }} />
        <p className="type-caption mt-1">Cell value = average utilization hours</p>
      </div>

      <div>
        <SectionLabel>Details</SectionLabel>
        <div className="divide-y divide-border-subtle">
          <MetricRow label="No-show rate" value={`${d.noShowRate}%`} />
          <MetricRow label="Cancellation rate" value={`${d.cancellationRate}%`} />
        </div>
      </div>
    </div>
  );
}

/* ── 4. Digital Badge Adoption Panel ──────────────────── */
export function DigitalBadgeAdoptionPanel() {
  const d = digitalBadgeAdoptionData;
  const [showDigitalExpanded, setShowDigitalExpanded] = useState(false);

  // Summary view: Digital vs Physical
  const summaryDonutOption = {
    tooltip: { ...TOOLTIP, trigger: "item", formatter: "{b}: {c} ({d}%)" },
    legend: { orient: "vertical", right: 0, top: "center", textStyle: { color: DS.ink2, fontSize: 10 }, icon: "circle", itemWidth: 8, itemHeight: 8 },
    series: [
      {
        type: "pie",
        radius: ["42%", "68%"],
        center: ["35%", "50%"],
        data: [
          { name: "Digital", value: d.digitalUsers, itemStyle: { color: DS.signature } },
          { name: "Physical", value: d.physicalCardUsers, itemStyle: { color: DS.border } },
        ],
        label: { show: false },
        emphasis: { scale: false },
      },
    ],
  };

  // Expanded view: Wallet / BLE / QR / Biometric / Physical
  const expandedDonutOption = {
    tooltip: { ...TOOLTIP, trigger: "item", formatter: "{b}: {d}%" },
    legend: { orient: "vertical", right: 0, top: "center", textStyle: { color: DS.ink2, fontSize: 10 }, icon: "circle", itemWidth: 8, itemHeight: 8 },
    series: [
      {
        type: "pie",
        radius: ["42%", "68%"],
        center: ["35%", "50%"],
        data: [
          ...d.badgeBreakdown.map((item, i) => ({
            name: item.name,
            value: item.value,
            itemStyle: { color: [DS.signature, DS.d2, DS.l1, DS.d1][i] },
          })),
          { name: "Physical", value: d.physicalCardUsers, itemStyle: { color: DS.border } },
        ],
        label: { show: false },
        emphasis: { scale: false },
      },
    ],
  };

  const siteBarOption = {
    tooltip: { ...TOOLTIP, trigger: "axis", axisPointer: { type: "shadow" } },
    legend: { bottom: 0, textStyle: { color: DS.ink2, fontSize: 10 }, icon: "circle", itemWidth: 8, itemHeight: 8 },
    grid: { top: 8, bottom: 36, left: 72, right: 12 },
    xAxis: {
      type: "value",
      max: 100,
      splitLine: SPLIT_LINE,
      axisLabel: { ...AXIS_LABEL, formatter: "{value}%" },
    },
    yAxis: {
      type: "category",
      data: adoptionBySite.map((s) => s.site),
      axisLabel: { ...AXIS_LABEL, fontSize: 10 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        name: "Digital",
        type: "bar",
        stack: "total",
        data: adoptionBySite.map((s) => s.digital),
        itemStyle: { color: DS.signature },
        barMaxWidth: 20,
      },
      {
        name: "Physical",
        type: "bar",
        stack: "total",
        data: adoptionBySite.map((s) => s.physical),
        itemStyle: { color: DS.border },
        barMaxWidth: 20,
      },
    ],
  };

  const trendOption = {
    tooltip: { ...TOOLTIP, trigger: "axis" },
    grid: { top: 8, bottom: 20, left: 32, right: 8 },
    xAxis: {
      type: "category",
      data: adoptionTrend.labels,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: AXIS_LABEL,
    },
    yAxis: {
      type: "value",
      min: 60,
      max: 80,
      splitLine: SPLIT_LINE,
      axisLabel: { ...AXIS_LABEL, formatter: "{value}%" },
    },
    series: [
      {
        type: "line",
        data: adoptionTrend.values,
        smooth: true,
        symbol: "none",
        lineStyle: { color: DS.signature, width: 2 },
        areaStyle: {
          color: {
            type: "linear", x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: DS.signature + "33" },
              { offset: 1, color: DS.signature + "00" },
            ],
          },
        },
      },
    ],
  };

  return (
    <div className="space-y-6">
      <KpiRow items={[
        { label: "Digital Users", value: d.digitalUsers.toLocaleString() },
        { label: "Physical Cards", value: d.physicalCardUsers },
        { label: "Active Digital", value: d.activeDigitalUsers, accent: true },
      ]} />

      <div>
        <div className="flex items-center justify-between mb-2">
          <SectionLabel>Badge distribution</SectionLabel>
          <button
            onClick={() => setShowDigitalExpanded(!showDigitalExpanded)}
            className={cn(
              "type-caption px-2 py-1 rounded-md border transition-colors",
              showDigitalExpanded
                ? "border-signature bg-brand-l2 text-signature"
                : "border-border-default text-ink-muted hover:border-signature hover:text-signature"
            )}
          >
            {showDigitalExpanded ? "Show summary" : "Expand digital"}
          </button>
        </div>
        <EChart
          option={showDigitalExpanded ? expandedDonutOption : summaryDonutOption}
          style={{ height: 160 }}
        />
        <p className="type-caption mt-1">
          {showDigitalExpanded
            ? "Digital expanded: Wallet · BLE · QR · Biometric"
            : "Digital vs Physical — click \"Expand digital\" for badge type breakdown"}
        </p>
      </div>

      <div>
        <SectionLabel>Adoption by site</SectionLabel>
        <EChart option={siteBarOption} style={{ height: 200 }} />
      </div>

      <div>
        <SectionLabel>Adoption trend</SectionLabel>
        <EChart option={trendOption} style={{ height: 120 }} />
      </div>

      <div>
        <SectionLabel>App data</SectionLabel>
        <div className="divide-y divide-border-subtle">
          <MetricRow label="Active app users" value={d.activeAppUsers.toLocaleString()} />
          <MetricRow label="Avg app opens / user" value={d.avgAppOpens} />
        </div>
        <p className="type-caption mt-2 text-ink-muted">App data — digital badge usage correlates with app activity</p>
      </div>
    </div>
  );
}

/* ── 5. Service Requests Panel ────────────────────────── */
export function ServiceRequestsPanel() {
  const d = serviceRequestsData;

  const requestsTrendOption = {
    tooltip: { ...TOOLTIP, trigger: "axis" },
    legend: { bottom: 0, textStyle: { color: DS.ink2, fontSize: 10 }, icon: "circle", itemWidth: 8, itemHeight: 8 },
    grid: { top: 8, bottom: 36, left: 32, right: 8 },
    xAxis: {
      type: "category",
      data: requestsOverTime.labels,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { ...AXIS_LABEL, rotate: 45 },
    },
    yAxis: {
      type: "value",
      splitLine: SPLIT_LINE,
      axisLabel: AXIS_LABEL,
    },
    series: [
      {
        name: "New requests",
        type: "line",
        data: requestsOverTime.newRequests,
        lineStyle: { color: DS.signature, width: 2 },
        symbol: "circle",
        symbolSize: 4,
        itemStyle: { color: DS.signature },
      },
      {
        name: "Moved to processing",
        type: "line",
        data: requestsOverTime.movedToProcessing,
        lineStyle: { color: DS.warning, width: 2 },
        symbol: "circle",
        symbolSize: 4,
        itemStyle: { color: DS.warning },
      },
      {
        name: "Closed",
        type: "line",
        data: requestsOverTime.closed,
        lineStyle: { color: DS.l1, width: 2 },
        symbol: "circle",
        symbolSize: 4,
        itemStyle: { color: DS.l1 },
      },
    ],
  };

  const avgCloseOption = {
    tooltip: { ...TOOLTIP, trigger: "axis" },
    legend: { bottom: 0, textStyle: { color: DS.ink2, fontSize: 10 }, icon: "circle", itemWidth: 8, itemHeight: 8 },
    grid: { top: 8, bottom: 36, left: 32, right: 8 },
    xAxis: {
      type: "category",
      data: avgTimeToClose.labels,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { ...AXIS_LABEL, rotate: 45 },
    },
    yAxis: {
      type: "value",
      splitLine: SPLIT_LINE,
      axisLabel: AXIS_LABEL,
    },
    series: [
      {
        name: "Resolution time",
        type: "line",
        data: avgTimeToClose.resolutionTime,
        smooth: true,
        lineStyle: { color: DS.signature, width: 2 },
        symbol: "none",
      },
      {
        name: "Response time",
        type: "line",
        data: avgTimeToClose.responseTime,
        smooth: true,
        lineStyle: { color: DS.warning, width: 2 },
        symbol: "none",
      },
    ],
  };

  const tenantResponseOption = {
    tooltip: { ...TOOLTIP, trigger: "axis", axisPointer: { type: "shadow" } },
    grid: { top: 4, bottom: 20, left: 130, right: 48 },
    xAxis: {
      type: "value",
      splitLine: SPLIT_LINE,
      axisLabel: AXIS_LABEL,
    },
    yAxis: {
      type: "category",
      data: highestResponseByTenant.slice(0, 6).map((t) => t.tenant).reverse(),
      axisLabel: { ...AXIS_LABEL, fontSize: 9 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: "bar",
        data: highestResponseByTenant.slice(0, 6).map((t) => t.days).reverse(),
        itemStyle: { color: DS.signature, borderRadius: [0, 3, 3, 0] },
        barMaxWidth: 14,
        label: {
          show: true,
          position: "right",
          formatter: "{c} d",
          fontSize: 9,
          color: DS.ink2,
        },
      },
    ],
  };

  const tenantByLocationOption = {
    tooltip: { ...TOOLTIP, trigger: "axis", axisPointer: { type: "shadow" } },
    grid: { top: 4, bottom: 20, left: 130, right: 24 },
    xAxis: {
      type: "value",
      splitLine: SPLIT_LINE,
      axisLabel: AXIS_LABEL,
    },
    yAxis: {
      type: "category",
      data: d.byTenant.slice(0, 6).map((t) => t.tenant).reverse(),
      axisLabel: { ...AXIS_LABEL, fontSize: 9 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: "bar",
        data: d.byTenant.slice(0, 6).map((t, i) => ({
          value: t.count,
          itemStyle: { color: t.color },
        })).reverse(),
        barMaxWidth: 14,
        label: {
          show: true,
          position: "right",
          formatter: "{c}",
          fontSize: 9,
          color: DS.ink2,
        },
      },
    ],
  };

  const locationBarOption = {
    tooltip: { ...TOOLTIP, trigger: "axis", axisPointer: { type: "shadow" } },
    grid: { top: 4, bottom: 20, left: 130, right: 24 },
    xAxis: {
      type: "value",
      splitLine: SPLIT_LINE,
      axisLabel: AXIS_LABEL,
    },
    yAxis: {
      type: "category",
      data: d.byLocation.slice(0, 6).map((l) => l.location).reverse(),
      axisLabel: { ...AXIS_LABEL, fontSize: 9 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: "bar",
        data: d.byLocation.slice(0, 6).map((l) => ({
          value: l.count,
          itemStyle: { color: l.color },
        })).reverse(),
        barMaxWidth: 14,
        label: {
          show: true,
          position: "right",
          formatter: "{c}",
          fontSize: 9,
          color: DS.ink2,
        },
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div className="grid grid-cols-3 gap-px rounded-xl overflow-hidden border border-border-default">
        <div className="bg-surface-subtle px-3 py-3 text-center">
          <p className="type-caption mb-1">Open</p>
          <p className="type-kpi-sm">{d.openRequests}</p>
        </div>
        <div className="bg-surface-subtle px-3 py-3 text-center">
          <p className="type-caption mb-1">Created</p>
          <p className="type-kpi-sm">{d.createdInPeriod}</p>
          <p className="type-caption mt-0.5">{d.prevCreated} prev. · <span className="text-status-success font-semibold">{d.createdChange}</span></p>
        </div>
        <div className="bg-surface-subtle px-3 py-3 text-center">
          <p className="type-caption mb-1">Closed</p>
          <p className="type-kpi-sm">{d.closedInPeriod}</p>
          <p className="type-caption mt-0.5">{d.prevClosed} prev. · <span className="text-status-success font-semibold">{d.closedChange}</span></p>
        </div>
      </div>

      <div>
        <SectionLabel>Who creates requests?</SectionLabel>
        <EChart option={tenantByLocationOption} style={{ height: 180 }} />
      </div>

      <div>
        <SectionLabel>Where are they reported?</SectionLabel>
        <EChart option={locationBarOption} style={{ height: 180 }} />
      </div>

      <div>
        <SectionLabel>New vs closed over time</SectionLabel>
        <EChart option={requestsTrendOption} style={{ height: 180 }} />
      </div>

      <div>
        <SectionLabel>Average time to close</SectionLabel>
        <EChart option={avgCloseOption} style={{ height: 180 }} />
        <p className="type-caption mt-1">Response = time to processing · Resolution = time to closed</p>
      </div>

      <div>
        <SectionLabel>Highest response time by tenant</SectionLabel>
        <EChart option={tenantResponseOption} style={{ height: 180 }} />
      </div>

      <div>
        <SectionLabel>Longest outstanding requests</SectionLabel>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border-default">
                <th className="type-caption py-2 pr-3">Site</th>
                <th className="type-caption py-2 pr-3">Tenant</th>
                <th className="type-caption py-2 pr-3">Created</th>
                <th className="type-caption py-2 pr-3">Location</th>
                <th className="type-caption py-2">ID</th>
              </tr>
            </thead>
            <tbody>
              {longestOutstandingRequests.slice(0, 5).map((r) => (
                <tr key={r.reportId} className="border-b border-border-subtle">
                  <td className="type-caption py-2 pr-3">{r.site}</td>
                  <td className="type-caption py-2 pr-3">{r.tenant}</td>
                  <td className="type-caption py-2 pr-3">{r.createdAt}</td>
                  <td className="type-caption py-2 pr-3 truncate max-w-[120px]">{r.location}</td>
                  <td className="type-caption py-2">#{r.reportId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── 6. People & Access State ─────────────────────────── */
export function PeopleAccessStatePanel() {
  const d = peopleIdentityData;

  const donutOption = {
    tooltip: { ...TOOLTIP, trigger: "item", formatter: "{b}: {c} ({d}%)" },
    legend: { orient: "vertical", right: 0, top: "center", textStyle: { color: DS.ink2, fontSize: 10 }, icon: "circle", itemWidth: 8, itemHeight: 8 },
    series: [
      {
        type: "pie",
        radius: ["42%", "68%"],
        center: ["38%", "50%"],
        data: [
          { name: "Healthy", value: d.healthy, itemStyle: { color: DS.success } },
          { name: "Needs onboarding", value: d.needsOnboarding, itemStyle: { color: DS.signature } },
          { name: "Needs attention", value: d.needsAttention, itemStyle: { color: DS.warning } },
        ],
        label: { show: false },
        emphasis: { scale: false },
      },
    ],
  };

  return (
    <div className="space-y-6">
      <KpiRow items={[
        { label: "Healthy", value: d.healthy.toLocaleString() },
        { label: "Needs onboarding", value: d.needsOnboarding },
        { label: "Needs attention", value: d.needsAttention },
      ]} />

      <div>
        <SectionLabel>Access state distribution</SectionLabel>
        <EChart option={donutOption} style={{ height: 160 }} />
      </div>

      <div>
        <SectionLabel>Needs attention — breakdown</SectionLabel>
        <div className="divide-y divide-border-subtle">
          {d.attentionBreakdown.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between py-2 cursor-pointer hover:bg-surface-subtle rounded px-2 -mx-2 transition-colors"
              role="button"
              aria-label={`Filter people by: ${item.label}`}
            >
              <span className="type-body">{item.label}</span>
              <div className="flex items-center gap-2">
                <Badge variant="warning">{item.count}</Badge>
                <span className="type-caption text-ink-muted">→ People</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>App data — onboarding signal</SectionLabel>
        <div className="divide-y divide-border-subtle">
          <MetricRow label="New app users" value={d.newAppUsers} />
        </div>
        <p className="type-caption mt-2 text-ink-muted">Gap between new app users and healthy count may indicate onboarding issues</p>
      </div>

      {d.needsAttention > 0 && (
        <div className="rounded-xl border border-status-warning bg-status-warning-bg px-4 py-3 space-y-1">
          <p className="type-label text-ink-primary">Impact summary</p>
          <p className="type-caption">
            {d.needsAttention} users may not be able to access workplace.
          </p>
        </div>
      )}
    </div>
  );
}

/* ── Workplace Usage (kept for backwards compat) ──────── */
export function WorkplaceUsagePanel() {
  const d = workplaceAccessData;

  const donutOption = {
    tooltip: { ...TOOLTIP, trigger: "item", formatter: "{b}: {c} ({d}%)" },
    legend: { orient: "vertical", right: 0, top: "center", textStyle: { color: DS.ink2, fontSize: 10 }, icon: "circle", itemWidth: 8, itemHeight: 8 },
    series: [
      {
        type: "pie",
        radius: ["42%", "68%"],
        center: ["35%", "50%"],
        data: [
          { name: "Digital card", value: 5840, itemStyle: { color: DS.signature } },
          { name: "Plastic card", value: 4120, itemStyle: { color: DS.l1 } },
          { name: "Other", value: 2887, itemStyle: { color: DS.border } },
        ],
        label: { show: false },
        emphasis: { scale: false },
      },
    ],
  };

  const barOption = {
    tooltip: { ...TOOLTIP, trigger: "axis" },
    grid: { top: 8, bottom: 20, left: 44, right: 8 },
    xAxis: {
      type: "category",
      data: accessByDay.labels,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: AXIS_LABEL,
    },
    yAxis: {
      type: "value",
      splitLine: SPLIT_LINE,
      axisLabel: AXIS_LABEL,
    },
    series: [
      {
        type: "bar",
        data: accessByDay.values,
        itemStyle: { color: DS.signature, borderRadius: [3, 3, 0, 0] },
      },
    ],
  };

  return (
    <div className="space-y-6">
      <KpiRow items={[
        { label: "Access Events", value: d.accessEvents.toLocaleString() },
        { label: "Unique Users", value: d.uniqueUsers.toLocaleString() },
        { label: "Digital card", value: `${Math.round((5840 / d.accessEvents) * 100)}%`, accent: true },
      ]} />

      <div>
        <SectionLabel>Access method breakdown</SectionLabel>
        <EChart option={donutOption} style={{ height: 160 }} />
      </div>

      <div>
        <SectionLabel>7-day access trend</SectionLabel>
        <EChart option={barOption} style={{ height: 140 }} />
      </div>
    </div>
  );
}
