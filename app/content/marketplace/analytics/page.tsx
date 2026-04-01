"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EChart } from "@/components/data-display/charts/EChart";
import { Badge } from "@/components/ui/Badge";
import { DS, TOOLTIP, AXIS_LABEL, SPLIT_LINE } from "@/lib/chart-theme";
import { marketplaceData } from "@/lib/dashboard-data";

function KpiTile({ label, value, accent }: { label: string; value: string | number; accent?: boolean }) {
  return (
    <div className="bg-surface-raised rounded-xl border border-border-default px-4 py-4">
      <p className="type-caption mb-1">{label}</p>
      <p className={`type-kpi-lg ${accent ? "text-signature" : ""}`}>{value}</p>
    </div>
  );
}

type OfferStatus = "active" | "paused" | "expired";

const allOffers: Array<{
  name: string;
  vendor: string;
  category: string;
  uses: number;
  rate: string;
  status: OfferStatus;
}> = [
  { name: "Gym membership", vendor: "FitLife", category: "Wellness", uses: 214, rate: "68%", status: "active" },
  { name: "Lunch discount", vendor: "Catering Co.", category: "Food", uses: 189, rate: "54%", status: "active" },
  { name: "Coffee club", vendor: "BrewBar", category: "Food", uses: 156, rate: "49%", status: "active" },
  { name: "Yoga classes", vendor: "ZenStudio", category: "Wellness", uses: 98, rate: "31%", status: "active" },
  { name: "Tech gadgets", vendor: "GadgetShop", category: "Electronics", uses: 43, rate: "14%", status: "paused" },
  { name: "Book club", vendor: "ReadMore", category: "Education", uses: 28, rate: "9%", status: "expired" },
];

const statusVariant: Record<OfferStatus, "success" | "warning" | "neutral"> = {
  active: "success",
  paused: "warning",
  expired: "neutral",
};

export default function MarketplaceAnalyticsPage() {
  const d = marketplaceData;

  const barOption = {
    tooltip: TOOLTIP,
    grid: { top: 8, right: 12, bottom: 4, left: 8, containLabel: true },
    xAxis: { type: "value" as const, axisLabel: AXIS_LABEL, splitLine: SPLIT_LINE },
    yAxis: {
      type: "category" as const,
      data: [...d.topOffers].reverse().map((o) => o.name),
      axisLabel: { ...AXIS_LABEL, width: 140, overflow: "truncate" as const },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: "bar",
        data: [...d.topOffers].reverse().map((o) => o.redemptions),
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
            href="/content/marketplace"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:bg-surface-subtle hover:text-ink-primary transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="type-display">Marketplace Analytics</h1>
            <p className="type-caption mt-0.5">Offer performance and redemption data</p>
          </div>
        </div>

        {/* KPI tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <KpiTile label="Total Redemptions" value={d.totalUses.toLocaleString()} accent />
          <KpiTile label="Active Offers" value={d.activeOffers} />
          <KpiTile label="Redemption Rate" value={`${d.redemptionRate}%`} />
          <KpiTile label="Participating Users" value="728" />
        </div>

        {/* Top offers chart */}
        <div className="bg-surface-raised rounded-xl border border-border-default p-4">
          <p className="type-subheading mb-3">Top offers by redemptions</p>
          <EChart option={barOption} style={{ height: 220 }} />
        </div>

        {/* All offers table */}
        <div className="bg-surface-raised rounded-xl border border-border-default overflow-hidden">
          <div className="px-4 py-3 border-b border-border-default">
            <p className="type-subheading">All offers</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-subtle">
                  {["Offer", "Vendor", "Category", "Uses", "Rate", "Status"].map((h) => (
                    <th key={h} className="px-4 py-2 text-left type-caption font-semibold text-ink-muted whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {allOffers.map((o) => (
                  <tr key={o.name}>
                    <td className="px-4 py-2.5 type-label">{o.name}</td>
                    <td className="px-4 py-2.5 type-caption">{o.vendor}</td>
                    <td className="px-4 py-2.5 type-caption">{o.category}</td>
                    <td className="px-4 py-2.5 type-caption tabular-nums">{o.uses}</td>
                    <td className="px-4 py-2.5 type-caption tabular-nums">{o.rate}</td>
                    <td className="px-4 py-2.5">
                      <Badge variant={statusVariant[o.status]}>{o.status}</Badge>
                    </td>
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
