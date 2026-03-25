"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface MapProps {
  className?: string;
  /** Longitude, latitude center. Defaults to Europe. */
  center?: [number, number];
  zoom?: number;
  style?: string;
}

export function Map({
  className,
  center = [10, 51],   // Central Europe
  zoom = 3.5,
  style = "mapbox://styles/mapbox/light-v11",
}: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      console.warn("Map: NEXT_PUBLIC_MAPBOX_TOKEN is not set.");
      return;
    }

    let alive = true;

    import("mapbox-gl").then((mapboxgl) => {
      if (!alive || !containerRef.current) return;

      mapboxgl.default.accessToken = token;

      mapRef.current = new mapboxgl.default.Map({
        container: containerRef.current,
        style,
        center,
        zoom,
        // Clean — no default controls
        attributionControl: false,
        logoPosition: "bottom-right",
      });

      // Remove default controls
      mapRef.current.addControl(
        new mapboxgl.default.AttributionControl({ compact: true }),
        "bottom-right"
      );
    });

    return () => {
      alive = false;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("w-full h-full rounded-xl overflow-hidden", className)}
    />
  );
}
