"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface DonutChartSlice {
  label: string;
  value: number;
  color?: string;
}

interface DonutChartProps {
  slices: DonutChartSlice[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerValue?: string | number;
  showLegend?: boolean;
  className?: string;
}

const DEFAULT_COLORS = [
  "var(--color-signature)",
  "var(--status-success)",
  "var(--status-warning)",
  "var(--status-info)",
  "var(--status-error)",
  "var(--color-d1)",
  "var(--color-l1)",
];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, start: number, end: number): string {
  const s = polarToCartesian(cx, cy, r, start);
  const e = polarToCartesian(cx, cy, r, end);
  const large = end - start > 180 ? 1 : 0;
  return `M${s.x},${s.y} A${r},${r} 0 ${large} 1 ${e.x},${e.y}`;
}

export function DonutChart({
  slices,
  size = 160,
  thickness = 32,
  centerLabel,
  centerValue,
  showLegend = true,
  className,
}: DonutChartProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const total = slices.reduce((s, d) => s + d.value, 0) || 1;
  const cx = size / 2;
  const cy = size / 2;
  const r = (size - thickness) / 2;

  let angle = 0;
  const arcs = slices.map((slice, i) => {
    const sweep = (slice.value / total) * 360;
    const start = angle;
    const end = angle + sweep;
    angle = end;
    return { ...slice, start, end, color: slice.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length] };
  });

  return (
    <div className={cn("flex flex-col gap-4 items-center", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Donut chart">
          {arcs.map((arc, i) => (
            <path
              key={i}
              d={arcPath(cx, cy, r, arc.start, arc.end - 0.5)}
              fill="none"
              stroke={arc.color}
              strokeWidth={hovered === i ? thickness + 4 : thickness}
              strokeLinecap="round"
              className="cursor-pointer transition-all duration-150"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              aria-label={`${arc.label}: ${arc.value}`}
            >
              <title>{arc.label}: {arc.value} ({((arc.value / total) * 100).toFixed(1)}%)</title>
            </path>
          ))}
        </svg>

        {/* Center text */}
        {(centerValue !== undefined || centerLabel) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {hovered !== null ? (
              <>
                <span className="type-kpi-sm text-ink-primary">{arcs[hovered].value}</span>
                <span className="type-caption text-ink-muted">{arcs[hovered].label}</span>
              </>
            ) : (
              <>
                {centerValue !== undefined && (
                  <span className="type-kpi-sm text-ink-primary">{centerValue}</span>
                )}
                {centerLabel && (
                  <span className="type-caption text-ink-muted">{centerLabel}</span>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {showLegend && (
        <div className="flex flex-col gap-1.5 w-full max-w-[200px]">
          {arcs.map((arc, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-2"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: arc.color }} />
                <span className={cn("type-caption truncate", hovered === i ? "text-ink-primary font-medium" : "text-ink-secondary")}>
                  {arc.label}
                </span>
              </div>
              <span className="type-caption text-ink-muted shrink-0">
                {((arc.value / total) * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
