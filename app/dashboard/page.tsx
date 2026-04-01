"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Drawer } from "@/components/overlays/Drawer";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { TrendLine } from "@/components/data-display/TrendLine";
import { ProgressBar } from "@/components/data-display/ProgressBar";
import { cn } from "@/lib/utils";
import {
  zoneOptions,
  timeOptions,
  getDashboardKPIs,
  getFilteredSites,
  sitesFootprint,
} from "@/lib/dashboard-data";
import { useSiteContext } from "@/lib/site-context";
import {
  SiteDetailPanel,
  OccupancyPanel,
  GuestsPanel,
  BookingsPanel,
  DigitalBadgeAdoptionPanel,
  ServiceRequestsPanel,
  PeopleAccessStatePanel,
  ParkingPanel,
  AgreementsPanel,
  ContentPanel,
  MarketplacePanel,
  AlertsPanel,
} from "@/components/dashboard/L2Panels";
import { SitesAccessStatusWidget } from "@/components/dashboard/SitesAccessStatusWidget";
import { KPIGrid } from "@/components/dashboard/KPIGrid";
import { type SiteFootprintData } from "@/lib/dashboard-data";
import {
  Activity,
  UserCheck,
  Users,
  CalendarCheck,
  Smartphone,
  ShieldCheck,
  ClipboardList,
  ParkingCircle,
  FileCheck,
  Newspaper,
  ShoppingBag,
  Bell,
} from "lucide-react";
import {
  parkingData,
  agreementsData,
  contentData,
  marketplaceData,
  alertsData,
} from "@/lib/dashboard-data";

/* ── Types ──────────────────────────────────────────── */
type PanelId =
  | "site-detail"
  | "occupancy"
  | "guests"
  | "access"
  | "bookings"
  | "digital-badge"
  | "service-requests"
  | "people"
  | "parking"
  | "agreements"
  | "content"
  | "marketplace"
  | "alerts"
  | null;

/* ── L1 Card ─────────────────────────────────────────
   Compact, clickable, shows one primary KPI + trend.
   Opens L2 Drawer on click. */
interface L1CardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  context: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  trend?: number[];
  badge?: React.ReactNode;
  active?: boolean;
  extra?: React.ReactNode;
  onClick: () => void;
}

function L1Card({
  icon,
  title,
  value,
  context,
  change,
  changeType,
  trend,
  badge,
  active,
  extra,
  onClick,
}: L1CardProps) {
  const changeColor = {
    positive: "text-status-success",
    negative: "text-status-error",
    neutral: "text-ink-muted",
  }[changeType];

  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "group w-full text-left rounded-xl border bg-surface-raised p-4 transition-all duration-150",
        "hover:shadow-[var(--shadow-raised)] focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-2",
        active
          ? "border-signature ring-1 ring-signature shadow-[var(--shadow-raised)]"
          : "border-border-default shadow-[var(--shadow-card)]"
      )}
    >
      {/* Top row: icon + badge */}
      <div className="flex items-start justify-between mb-3">
        <span
          className={cn(
            "inline-flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
            active
              ? "bg-signature text-ink-inverse"
              : "bg-brand-l2 text-signature group-hover:bg-signature group-hover:text-ink-inverse"
          )}
        >
          {icon}
        </span>
        {badge}
      </div>

      {/* Title */}
      <p className="type-caption mb-2">{title}</p>

      {/* KPI row */}
      <div className="flex items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="type-kpi-lg leading-none">{value}</p>
          <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
            <span className={cn("text-xs font-semibold", changeColor)}>{change}</span>
            <span className="type-caption truncate">{context}</span>
          </div>
        </div>
        {trend && trend.length > 1 && (
          <TrendLine
            data={trend}
            width={72}
            height={28}
            color={
              changeType === "positive"
                ? "var(--status-success)"
                : changeType === "negative"
                  ? "var(--status-error)"
                  : "var(--color-signature)"
            }
          />
        )}
      </div>

      {/* Extra slot */}
      {extra && (
        <div className="mt-3 pt-3 border-t border-border-subtle">
          {extra}
        </div>
      )}
    </button>
  );
}

/* ── L2 panel meta ──────────────────────────────────── */
const panelMeta: Record<NonNullable<PanelId>, { title: string; description: string }> = {
  "site-detail": {
    title: "Site Detail",
    description: "Site-level people, access systems, and credential coverage",
  },
  occupancy: {
    title: "Occupancy",
    description: "Employee occupancy — home users and travelers across sites",
  },
  guests: {
    title: "Guests",
    description: "Guest visits, arrivals, and badge type distribution",
  },
  access: {
    title: "Workplace Usage",
    description: "Access events, unique users, and credential type distribution",
  },
  bookings: {
    title: "Bookings",
    description: "Reservation activity across hot desks, meeting rooms, parking, and more",
  },
  "digital-badge": {
    title: "Digital Badge Adoption",
    description: "Digital credential adoption rate by site and badge type (employees only)",
  },
  "service-requests": {
    title: "Service Requests",
    description: "Open requests, creation patterns, and team response performance",
  },
  people: {
    title: "People & Access State",
    description: "Access readiness of users — healthy, onboarding, and attention required",
  },
  parking: {
    title: "Parking",
    description: "Parking spot occupancy, peak-hour trends, and blocklist hits",
  },
  agreements: {
    title: "Agreements",
    description: "Signature completion rate and outstanding mandatory documents",
  },
  content: {
    title: "Content & Engagement",
    description: "Employee engagement across news, polls, and forum activity",
  },
  marketplace: {
    title: "Marketplace",
    description: "Offer redemptions and top-performing employee benefits",
  },
  alerts: {
    title: "Alerts",
    description: "Safety and security alerts — count, response times, and recent incidents",
  },
};

/* ── Main Page ──────────────────────────────────────── */
export default function DashboardPage() {
  const router = useRouter();
  const [activePanel, setActivePanel] = useState<PanelId>(null);
  const [drillSite, setDrillSite] = useState<SiteFootprintData | null>(null);
  const { selectedSite, setSelectedSite, timeRange, setTimeRange, zone, setZone } = useSiteContext();

  const siteFilterOptions = [
    { label: "All sites", value: "__all__" },
    ...sitesFootprint.map((s) => ({ label: s.name, value: s.name })),
  ];

  // Reactive KPIs — recalculate whenever sidebar site changes
  const kpis = getDashboardKPIs(selectedSite);
  const {
    occupancy: occupancyData,
    guests: guestsData,
    bookings: bookingsData,
    digitalBadge: digitalBadgeAdoptionData,
    serviceRequests: serviceRequestsData,
    people: peopleIdentityData,
  } = kpis;

  const closePanel = () => setActivePanel(null);
  const toggle = (id: NonNullable<PanelId>) =>
    setActivePanel((p) => (p === id ? null : id));

  /** Close the drawer and navigate to a module page */
  const viewInModule = (href: string) => {
    closePanel();
    router.push(href);
  };

  function handleSiteSelect(site: SiteFootprintData) {
    setDrillSite(site);
    setActivePanel("site-detail");
  }

  const occupancyPct = Math.round(
    (occupancyData.totalPresent / occupancyData.totalCapacity) * 100
  );

  const siteLabel = selectedSite ? `at ${selectedSite.split(" — ")[1] ?? selectedSite}` : "across all sites";

  /* ── L2 panel renderer ─────────────────────────── */
  function renderPanel(id: NonNullable<PanelId>) {
    switch (id) {
      case "site-detail":       return drillSite ? <SiteDetailPanel site={drillSite} /> : null;
      case "occupancy":         return <OccupancyPanel onViewInModule={() => viewInModule("/operations/access")} />;
      case "guests":            return <GuestsPanel onViewInModule={() => viewInModule("/operations/guestbook")} />;
      case "access":            return <></>;
      case "bookings":          return <BookingsPanel onViewInModule={() => viewInModule("/amenities/bookings")} />;
      case "digital-badge":     return <DigitalBadgeAdoptionPanel onViewInModule={() => viewInModule("/people")} />;
      case "service-requests":  return <ServiceRequestsPanel onViewInModule={() => viewInModule("/operations/service-requests")} />;
      case "people":            return <PeopleAccessStatePanel onViewInModule={() => viewInModule("/people")} />;
      case "parking":           return <ParkingPanel onViewInModule={() => viewInModule("/operations/parking")} />;
      case "agreements":        return <AgreementsPanel onViewInModule={() => viewInModule("/people")} />;
      case "content":           return <ContentPanel onViewInModule={() => viewInModule("/content/news")} />;
      case "marketplace":       return <MarketplacePanel onViewInModule={() => viewInModule("/content/marketplace")} />;
      case "alerts":            return <AlertsPanel onViewInModule={() => viewInModule("/operations/access")} />;
    }
  }

  return (
    <div className="max-w-full px-4 md:px-10 lg:px-16 py-4 md:py-8">
      <div className="max-w-wide mx-auto space-y-10">

        {/* ── Page Header (no Live status) ─────────────── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="type-display">Dashboard</h1>
            <p className="type-body mt-1">
              Operational overview — click any card for details
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Select
              label=""
              options={timeOptions}
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            />
          </div>
        </div>

        {/* ── Zone 1: Sites & Access Status (full width) ── */}
        <SitesAccessStatusWidget
          onSiteSelect={handleSiteSelect}
          selectedSiteId={activePanel === "site-detail" ? (drillSite?.id ?? null) : null}
          sites={getFilteredSites(selectedSite)}
        />

        {/* ── Zone 2: Workplace ────────────────────────── */}
        <div>
          <p className="type-subheading mb-3">Workplace</p>
          <KPIGrid>

            {/* Occupancy */}
            <L1Card
              icon={<UserCheck size={14} />}
              title="Occupancy"
              value={`${occupancyData.totalPresent} / ${occupancyData.totalCapacity}`}
              context={`${occupancyPct}% of capacity ${siteLabel}`}
              change={occupancyData.change}
              changeType={occupancyData.changeType}
              trend={occupancyData.trend}
              active={activePanel === "occupancy"}
              onClick={() => toggle("occupancy")}
              extra={
                <ProgressBar
                  value={occupancyData.totalPresent}
                  max={occupancyData.totalCapacity}
                  variant="brand"
                  size="sm"
                />
              }
            />


            {/* Guests */}
            <L1Card
              icon={<Users size={14} />}
              title="Guests"
              value={guestsData.totalGuests}
              context={`active visits ${siteLabel}`}
              change={guestsData.change}
              changeType={guestsData.changeType}
              trend={guestsData.trend}
              active={activePanel === "guests"}
              onClick={() => toggle("guests")}
              extra={
                <p className="type-caption">
                  {guestsData.invited} invited · {guestsData.arrived} arrived
                </p>
              }
            />

            {/* Bookings */}
            <L1Card
              icon={<CalendarCheck size={14} />}
              title="Bookings"
              value={bookingsData.totalBookings.toLocaleString()}
              context={`reservations ${siteLabel}`}
              change={bookingsData.change}
              changeType={bookingsData.changeType}
              trend={bookingsData.trend}
              active={activePanel === "bookings"}
              onClick={() => toggle("bookings")}
              extra={
                <p className="type-caption">
                  {bookingsData.byType.map((t) => t.label).join(" · ")}
                </p>
              }
            />

            {/* Parking */}
            <L1Card
              icon={<ParkingCircle size={14} />}
              title="Parking"
              value={`${parkingData.avgOccupancy}%`}
              context={`avg occupancy · ${parkingData.occupiedSpots} / ${parkingData.totalSpots} spots`}
              change={parkingData.change}
              changeType={parkingData.changeType}
              trend={parkingData.trend}
              active={activePanel === "parking"}
              onClick={() => toggle("parking")}
              extra={
                <ProgressBar
                  value={parkingData.occupiedSpots}
                  max={parkingData.totalSpots}
                  variant="brand"
                  size="sm"
                />
              }
            />
          </KPIGrid>
        </div>

        {/* ── Zone 3: Digital & Operations ──────────────── */}
        <div>
          <p className="type-subheading mb-3">Digital & Operations</p>
          <KPIGrid>

            {/* Digital Badge Adoption */}
            <L1Card
              icon={<Smartphone size={14} />}
              title="Digital Badge Adoption"
              value={`${digitalBadgeAdoptionData.adoptionRate}%`}
              context={`employees using digital access ${siteLabel}`}
              change={digitalBadgeAdoptionData.change}
              changeType={digitalBadgeAdoptionData.changeType}
              trend={digitalBadgeAdoptionData.trend}
              active={activePanel === "digital-badge"}
              onClick={() => toggle("digital-badge")}
              extra={
                <div>
                  <ProgressBar
                    value={digitalBadgeAdoptionData.adoptionRate}
                    max={100}
                    variant="brand"
                    size="sm"
                  />
                  <p className="type-caption mt-1.5">
                    {digitalBadgeAdoptionData.activeDigitalUsers} active digital users
                  </p>
                </div>
              }
            />

            {/* Service Requests */}
            <L1Card
              icon={<ClipboardList size={14} />}
              title="Service Requests"
              value={serviceRequestsData.openRequests}
              context={`open requests ${siteLabel}`}
              change={serviceRequestsData.change}
              changeType={serviceRequestsData.changeType}
              trend={serviceRequestsData.trend}
              badge={
                serviceRequestsData.openRequests > 50 ? (
                  <Badge variant="warning">{serviceRequestsData.openRequests} open</Badge>
                ) : undefined
              }
              active={activePanel === "service-requests"}
              onClick={() => toggle("service-requests")}
              extra={
                <p className="type-caption">
                  +{serviceRequestsData.createdInPeriod} created · {serviceRequestsData.closedInPeriod} closed
                </p>
              }
            />

            {/* People & Access State */}
            <L1Card
              icon={<ShieldCheck size={14} />}
              badge={
                peopleIdentityData.needsAttention > 0 ? (
                  <Badge variant="warning">{peopleIdentityData.needsAttention} issues</Badge>
                ) : undefined
              }
              title="People & Access State"
              value={peopleIdentityData.totalPeople.toLocaleString()}
              context={`access readiness ${siteLabel}`}
              change={peopleIdentityData.change}
              changeType={peopleIdentityData.changeType}
              active={activePanel === "people"}
              onClick={() => toggle("people")}
              extra={
                <p className="type-caption">
                  Healthy: {peopleIdentityData.healthy.toLocaleString()} · Onboarding: {peopleIdentityData.needsOnboarding} · Issues: {peopleIdentityData.needsAttention}
                </p>
              }
            />

            {/* Agreements */}
            <L1Card
              icon={<FileCheck size={14} />}
              title="Agreements"
              value={`${agreementsData.signatureRate}%`}
              context={`signed · ${agreementsData.signed.toLocaleString()} of ${agreementsData.totalRequired.toLocaleString()}`}
              change={agreementsData.change}
              changeType={agreementsData.changeType}
              trend={agreementsData.trend}
              badge={
                agreementsData.unsigned > 0 ? (
                  <Badge variant="warning">{agreementsData.unsigned} unsigned</Badge>
                ) : undefined
              }
              active={activePanel === "agreements"}
              onClick={() => toggle("agreements")}
              extra={
                <ProgressBar
                  value={agreementsData.signed}
                  max={agreementsData.totalRequired}
                  variant="brand"
                  size="sm"
                />
              }
            />
          </KPIGrid>
        </div>

        {/* ── Zone 4: Engagement ───────────────────────── */}
        <div>
          <p className="type-subheading mb-3">Engagement</p>
          <KPIGrid>

            {/* Content */}
            <L1Card
              icon={<Newspaper size={14} />}
              title="Content & Engagement"
              value={`${contentData.engagementRate}%`}
              context={`engagement rate · ${contentData.newsViews.toLocaleString()} news views`}
              change={contentData.change}
              changeType={contentData.changeType}
              trend={contentData.trend}
              active={activePanel === "content"}
              onClick={() => toggle("content")}
              extra={
                <p className="type-caption">
                  Poll participation: {contentData.pollParticipation}% · Forum reads: {contentData.forumReads.toLocaleString()}
                </p>
              }
            />

            {/* Marketplace */}
            <L1Card
              icon={<ShoppingBag size={14} />}
              title="Marketplace"
              value={`${marketplaceData.redemptionRate}%`}
              context={`redemption rate · ${marketplaceData.totalUses.toLocaleString()} uses`}
              change={marketplaceData.change}
              changeType={marketplaceData.changeType}
              trend={marketplaceData.trend}
              active={activePanel === "marketplace"}
              onClick={() => toggle("marketplace")}
              extra={
                <p className="type-caption">
                  {marketplaceData.activeOffers} active offers · Top: {marketplaceData.topOffers[0]?.name}
                </p>
              }
            />

            {/* Alerts */}
            <L1Card
              icon={<Bell size={14} />}
              title="Alerts"
              value={alertsData.alertsThisMonth}
              context={`alerts this month · avg ${alertsData.alertsAvg} / month`}
              change={alertsData.change}
              changeType={alertsData.changeType}
              trend={alertsData.trend}
              active={activePanel === "alerts"}
              onClick={() => toggle("alerts")}
              extra={
                <p className="type-caption">
                  Avg response: {alertsData.avgResponseTime} · Last: {alertsData.recentAlerts[0]?.title}
                </p>
              }
            />
          </KPIGrid>
        </div>

      </div>

      {/* ── Level 2 — Drawer ─────────────────────── */}
      {activePanel && (
        <Drawer
          open={!!activePanel}
          onClose={closePanel}
          title={panelMeta[activePanel].title}
          mobileSheet
        >
          {/* Filter bar — hidden for site detail */}
          <div className="-mx-4 -mt-4">
            {activePanel !== "site-detail" && (
              <div className="flex gap-3 px-4 py-3 border-b border-border-default">
                <div className="flex-1">
                  <Select
                    label="Site"
                    options={siteFilterOptions}
                    value={selectedSite ?? "__all__"}
                    onChange={(e) =>
                      setSelectedSite(e.target.value === "__all__" ? undefined : e.target.value)
                    }
                  />
                </div>
                <div className="flex-1">
                  <Select
                    label="Zone"
                    options={zoneOptions}
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <Select
                    label="Time"
                    options={timeOptions}
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Description */}
            <p className="type-caption px-4 py-2.5 border-b border-border-subtle bg-surface-subtle">
              {panelMeta[activePanel].description}
            </p>
          </div>

          {/* Panel content */}
          <div className="pt-4">
            {renderPanel(activePanel)}
          </div>
        </Drawer>
      )}
    </div>
  );
}
