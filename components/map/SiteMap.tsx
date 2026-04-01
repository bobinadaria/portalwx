"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { SiteFootprintData } from "@/lib/dashboard-data";

interface SiteMapProps {
  sites: SiteFootprintData[];
  selectedSiteId?: string | null;
  onSiteClick: (siteId: string) => void;
  className?: string;
}

/** Compute bubble radius based on user count. Min 10px, max 28px. */
function bubbleSize(totalUsers: number, allUsers: number[]): number {
  const max = Math.max(...allUsers);
  const min = Math.min(...allUsers);
  if (max === min) return 18;
  const ratio = (totalUsers - min) / (max - min);
  return 10 + ratio * 18;
}

export function SiteMap({ sites, selectedSiteId, onSiteClick, className }: SiteMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const allUserCounts = sites.map((s) => s.totalUsers);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) return;

    let alive = true;

    import("mapbox-gl").then((mapboxgl) => {
      if (!alive || !containerRef.current) return;

      mapboxgl.default.accessToken = token;

      const map = new mapboxgl.default.Map({
        container: containerRef.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [20, 30],
        zoom: 1.4,
        attributionControl: false,
        logoPosition: "bottom-right",
        projection: "mercator" as any,
      });

      map.addControl(
        new mapboxgl.default.AttributionControl({ compact: true }),
        "bottom-right"
      );

      mapRef.current = map;

      map.on("load", () => {
        if (!alive) return;
        addMarkers(mapboxgl.default, map);
        // Fit bounds on initial load when no site is selected
        if (!selectedSiteId && sites.length > 0) {
          const bounds = new mapboxgl.default.LngLatBounds();
          sites.forEach((s) => bounds.extend(s.coordinates));
          map.fitBounds(bounds, { padding: 50, maxZoom: 6 });
        }
      });
    });

    return () => {
      alive = false;
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      mapRef.current?.remove();
      mapRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    import("mapbox-gl").then((mapboxgl) => {
      if (!mapRef.current) return;
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      if (mapRef.current.loaded()) {
        addMarkers(mapboxgl.default, mapRef.current);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sites, selectedSiteId]);

  useEffect(() => {
    if (!mapRef.current) return;
    if (selectedSiteId) {
      const site = sites.find((s) => s.id === selectedSiteId);
      if (!site) return;
      mapRef.current.flyTo({
        center: site.coordinates,
        zoom: 9,
        duration: 900,
      });
    } else if (sites.length > 0) {
      // Zoom to fit all sites
      import("mapbox-gl").then((mapboxgl) => {
        if (!mapRef.current) return;
        const bounds = new mapboxgl.default.LngLatBounds();
        sites.forEach((s) => bounds.extend(s.coordinates));
        mapRef.current.fitBounds(bounds, {
          padding: 50,
          duration: 900,
          maxZoom: 6,
        });
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSiteId]);

  function addMarkers(mapboxgl: any, map: any) {
    sites.forEach((site) => {
      const isSelected = site.id === selectedSiteId;
      const isAffected = site.status === "affected";
      const size = bubbleSize(site.totalUsers, allUserCounts);
      const displaySize = isSelected ? size + 6 : size;

      const el = document.createElement("div");
      el.style.cssText = `
        width: ${displaySize}px;
        height: ${displaySize}px;
        border-radius: 50%;
        background: ${isAffected ? "rgba(235,87,87,0.7)" : "rgba(40,175,97,0.7)"};
        border: ${isSelected ? "3px solid white" : "2px solid white"};
        box-shadow: 0 1px 4px rgba(0,0,0,0.3);
        cursor: pointer;
        transition: all 0.15s;
      `;

      el.setAttribute("title", `${site.name} — ${site.totalUsers} users`);
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onSiteClick(site.id);
      });

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat(site.coordinates)
        .addTo(map);

      markersRef.current.push(marker);
    });
  }

  return (
    <div
      ref={containerRef}
      className={cn("w-full h-full rounded-xl overflow-hidden", className)}
    />
  );
}
