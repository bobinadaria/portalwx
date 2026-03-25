"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface BarChartSeries {
  label: string;
  data: number[];
  color?: string;
}

interface BarChartProps {
  series: BarChartSeries[];
  labels: string[];
  height?: number;
  orientation?: "vertical" | "horizontal";
  stacked?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  showValues?: boolean;
  yLabel?: string;
  className?: string;
}

const DEFAULT_COLORS = [
  "var(--color-signature)",
  "var(--status-success)",
  "var(--status-warning)",
  "var(--status-info)",
  "var(--status-error)",
];

export function BarChart({
  series,
  labels,
  height = 220,
  orientation = "vertical",
  stacked = false,
  showGrid = true,
  showLegend = true,
  showValues = false,
  yLabel,
  className,
}: BarChartProps) {
  const [hoveredBar, setHoveredBar] = useState<{ li: number; si: number } | null>(null);

  const allValues = stacked
    ? labels.map((_, i) => series.reduce((sum, s) => sum + (s.data[i] ?? 0), 0))
    : series.flatMap((s) => s.data);
  const maxVal = Math.max(...allValues, 1);

  const padL = yLabel ? 52 : 40;
  const padR = 16;
  const padT = 16;
  const padB = 32;
  const svgW = 600;
  const svgH = height;
  const chartW = svgW - padL - padR;
  const chartH = svgH - padT - padB;
  const gridLines = 5;

  const groupW = chartW / labels.length;
  const barW = stacked ? groupW * 0.6 : (groupW * 0.7) / series.length;
  const groupPad = groupW * 0.15;

  return (
    <div className={cn("flex flex-col gap-3 w-full", className)}>
      <div className="relative w-full" style={{ height: svgH }}>
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-full overflow-visible" role="img" aria-label="Bar chart">
          {/* Grid */}
          {showGrid && Array.from({ length: gridLines + 1 }).map((_, i) => {
            const y = padT + (i / gridLines) * chartH;
            const val = maxVal - (i / gridLines) * maxVal;
            return (
              <g key={i}>
                <line x1={padL} y1={y} x2={padL + chartW} y2={y} stroke="var(--border-default)" strokeWidth={1} />
                <text x={padL - 6} y={y + 4} textAnchor="end" className="fill-[var(--ink-muted)]" fontSize={11}>
                  {Math.round(val)}
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {labels.map((label, li) => {
            let yOffset = 0;
            return (
              <g key={li}>
                {series.map((s, si) => {
                  const color = s.color ?? DEFAULT_COLORS[si % DEFAULT_COLORS.length];
                  const value = s.data[li] ?? 0;
                  const barH = (value / maxVal) * chartH;
                  const x = stacked
                    ? padL + li * groupW + groupPad
                    : padL + li * groupW + groupPad + si * barW;
                  const y = stacked
                    ? padT + chartH - yOffset - barH
                    : padT + chartH - barH;
                  const w = stacked ? groupW * 0.6 : barW;
                  const isHovered = hoveredBar?.li === li && hoveredBar?.si === si;
                  if (stacked) yOffset += barH;

                  return (
                    <g key={si}>
                      <rect
                        x={x}
                        y={y}
                        width={w}
                        height={barH}
                        fill={color}
                        fillOpacity={isHovered ? 1 : 0.85}
                        rx={2}
                        className="cursor-pointer transition-all"
                        onMouseEnter={() => setHoveredBar({ li, si })}
                        onMouseLeave={() => setHoveredBar(null)}
                      />
                      {showValues && barH > 16 && (
                        <text
                          x={x + w / 2}
                          y={y + 12}
                          textAnchor="middle"
                          className="fill-[var(--ink-inverse)] pointer-events-none"
                          fontSize={10}
                          fontWeight={500}
                        >
                          {value}
                        </text>
                      )}
                    </g>
                  );
                })}
                <text
                  x={padL + li * groupW + groupW / 2}
                  y={padT + chartH + 16}
                  textAnchor="middle"
                  className="fill-[var(--ink-muted)]"
                  fontSize={11}
                >
                  {label}
                </text>
              </g>
            );
          })}

          {/* Y label */}
          {yLabel && (
            <text
              x={12}
              y={padT + chartH / 2}
              textAnchor="middle"
              transform={`rotate(-90, 12, ${padT + chartH / 2})`}
              className="fill-[var(--ink-muted)]"
              fontSize={11}
            >
              {yLabel}
            </text>
          )}
        </svg>
      </div>

      {showLegend && series.length > 1 && (
        <div className="flex items-center gap-4 flex-wrap justify-center">
          {series.map((s, si) => {
            const color = s.color ?? DEFAULT_COLORS[si % DEFAULT_COLORS.length];
            return (
              <div key={si} className="flex items-center gap-1.5">
                <span className="h-2 w-4 rounded-sm" style={{ background: color }} />
                <span className="type-caption text-ink-secondary">{s.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
