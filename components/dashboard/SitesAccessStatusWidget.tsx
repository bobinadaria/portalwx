"use client";

import { useRef, useState, useEffect } from "react";
import { SiteMap } from "@/components/map/SiteMap";
import { cn } from "@/lib/utils";
import { sitesFootprint, type SiteFootprintData } from "@/lib/dashboard-data";
import { Map } from "lucide-react";

interface SitesAccessStatusWidgetProps {
  onSiteSelect?: (site: SiteFootprintData) => void;
  selectedSiteId?: string | null;
  /** Pass filtered sites from the dashboard page; defaults to all sitesFootprint */
  sites?: SiteFootprintData[];
}

export function SitesAccessStatusWidget({
  onSiteSelect,
  selectedSiteId: externalSelectedId,
  sites: sitesProp,
}: SitesAccessStatusWidgetProps) {
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const activeSites = sitesProp ?? sitesFootprint;

  const selectedId = externalSelectedId !== undefined ? externalSelectedId : internalSelectedId;

  const totalSites = activeSites.length;
  const operational = activeSites.filter((s) => s.status === "operational").length;
  const affected = activeSites.filter((s) => s.status === "affected").length;

  // Sort: affected first, then operational
  const sortedSites = [...activeSites].sort((a, b) => {
    if (a.status === "affected" && b.status !== "affected") return -1;
    if (a.status !== "affected" && b.status === "affected") return 1;
    return 0;
  });

  // Affected sites for impact message
  const affectedSites = activeSites.filter((s) => s.status === "affected");
  const affectedUsers = affectedSites.reduce((sum, s) => sum + s.totalUsers, 0);

  function handleSiteClick(id: string) {
    const site = activeSites.find((s) => s.id === id);
    if (!site) return;
    const next = selectedId === id ? null : id;
    setInternalSelectedId(next);
    if (next && onSiteSelect) onSiteSelect(site);
  }

  // Check if scroll is needed
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => setCanScrollRight(el.scrollWidth > el.clientWidth + el.scrollLeft + 4);
    check();
    el.addEventListener("scroll", check);
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", check);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="rounded-xl border border-border-default bg-surface-raised shadow-[var(--shadow-card)] flex flex-col">
      {/* ── Top section: header + site chips + impact alert in same row ── */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-start gap-6 flex-wrap">
          {/* KPI block */}
          <div className="shrink-0">
            <p className="type-subheading mb-1">Sites & Access Status</p>
            <div className="flex items-baseline gap-2">
              <span className="type-kpi-lg">{totalSites}</span>
              <span className="type-caption">sites</span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1 type-caption">
                <span className="h-1.5 w-1.5 rounded-full bg-status-success inline-block" />
                {operational} operational
              </span>
              <span className="flex items-center gap-1 type-caption">
                <span className="h-1.5 w-1.5 rounded-full bg-status-error inline-block" />
                {affected} affected
              </span>
            </div>
          </div>

          {/* Site chips + impact — fills remaining space */}
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            {/* Horizontal scrolling site chips */}
            <div className="relative">
              <div
                ref={scrollRef}
                className="flex gap-2 overflow-x-auto scrollbar-hide"
                style={{ scrollbarWidth: "none" }}
              >
                {sortedSites.map((site) => (
                  <button
                    key={site.id}
                    onClick={() => handleSiteClick(site.id)}
                    className={cn(
                      "shrink-0 rounded-lg border px-3 py-2 transition-all duration-100 text-left",
                      "hover:shadow-sm focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-1",
                      selectedId === site.id
                        ? "border-signature bg-brand-l2"
                        : "border-border-default bg-surface-subtle"
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full shrink-0",
                          site.status === "operational" ? "bg-status-success" : "bg-status-error"
                        )}
                      />
                      <span className="text-sm leading-none shrink-0">{site.flag}</span>
                      <span className="type-label whitespace-nowrap">{site.city}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right fade-out mask */}
              {canScrollRight && (
                <div
                  className="absolute top-0 right-0 bottom-0 w-12 pointer-events-none"
                  style={{
                    background: "linear-gradient(to right, transparent, var(--surface-raised))",
                  }}
                />
              )}
            </div>

            {/* Impact alert — inline with header */}
            {affectedSites.length > 0 && (
              <div className="rounded-lg border border-status-error bg-status-error-bg px-3 py-2">
                <p className="type-caption text-status-error">
                  ACS Lost Connection in {affectedSites.map((s) => s.city).join(", ")} — {affectedUsers} users affected
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Map toggle button — mobile only ── */}
      <div className="flex md:hidden px-5 pb-3">
        <button
          onClick={() => setShowMap((v) => !v)}
          className="flex items-center gap-1.5 type-caption text-signature hover:text-brand-d1 transition-colors"
        >
          <Map size={12} />
          {showMap ? "Hide map" : "Show map"}
        </button>
      </div>

      {/* ── Map — hidden on mobile by default ── */}
      <div className={cn("px-5 pb-5", !showMap && "hidden md:block")}>
        <SiteMap
          sites={sitesFootprint}
          selectedSiteId={selectedId}
          onSiteClick={handleSiteClick}
          className="min-h-[220px] h-[280px]"
        />
      </div>
    </div>
  );
}
