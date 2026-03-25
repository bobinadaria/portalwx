"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

export interface LineChartSeries {
  label: string;
  data: number[];
  color?: string;
}

interface LineChartProps {
  series: LineChartSeries[];
  labels: string[];
  height?: number;
  yLabel?: string;
  xLabel?: string;
  filled?: boolean;
  showGrid?: boolean;
  showDots?: boolean;
  showLegend?: boolean;
  className?: string;
}

const DEFAULT_COLORS = [
  "var(--color-signature)",
  "var(--status-success)",
  "var(--status-warning)",
  "var(--status-info)",
  "var(--status-error)",
];

export function LineChart({
  series,
  labels,
  height = 220,
  yLabel,
  xLabel,
  filled = false,
  showGrid = true,
  showDots = true,
  showLegend = true,
  className,
}: LineChartProps) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string; values: { name: string; value: number; color: string }[] } | null>(null);

  const allValues = series.flatMap((s) => s.data);
  const min = Math.min(...allValues, 0);
  const max = Math.max(...allValues);
  const range = max - min || 1;

  const padL = yLabel ? 52 : 40;
  const padR = 16;
  const padT = 16;
  const padB = xLabel ? 44 : 32;
  const svgW = 600;
  const svgH = height;
  const chartW = svgW - padL - padR;
  const chartH = svgH - padT - padB;

  const gridLines = 5;

  const toX = (i: number) => padL + (i / (labels.length - 1)) * chartW;
  const toY = (v: number) => padT + (1 - (v - min) / range) * chartH;

  const buildPath = (data: number[]) =>
    data.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(v)}`).join(" ");

  const buildFill = (data: number[]) => {
    const line = data.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(v)}`).join(" ");
    const n = data.length - 1;
    return `${line} L${toX(n)},${toY(min)} L${toX(0)},${toY(min)} Z`;
  };

  return (
    <div className={cn("flex flex-col gap-3 w-full", className)}>
      <div className="relative w-full" style={{ height: svgH }}>
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          className="w-full h-full overflow-visible"
          role="img"
          aria-label="Line chart"
        >
          {/* Grid */}
          {showGrid && Array.from({ length: gridLines + 1 }).map((_, i) => {
            const y = padT + (i / gridLines) * chartH;
            const val = max - (i / gridLines) * range;
            return (
              <g key={i}>
                <line x1={padL} y1={y} x2={padL + chartW} y2={y} stroke="var(--border-default)" strokeWidth={1} />
                <text x={padL - 6} y={y + 4} textAnchor="end" className="fill-[var(--ink-muted)]" fontSize={11}>
                  {val % 1 === 0 ? val : val.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Series */}
          {series.map((s, si) => {
            const color = s.color ?? DEFAULT_COLORS[si % DEFAULT_COLORS.length];
            return (
              <g key={si}>
                {filled && (
                  <path d={buildFill(s.data)} fill={color} fillOpacity={0.08} />
                )}
                <path
                  d={buildPath(s.data)}
                  fill="none"
                  stroke={color}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {showDots && s.data.map((v, i) => (
                  <circle
                    key={i}
                    cx={toX(i)}
                    cy={toY(v)}
                    r={3}
                    fill={color}
                    className="cursor-pointer"
                    onMouseEnter={(e) => {
                      const vals = series.map((s2, si2) => ({
                        name: s2.label,
                        value: s2.data[i],
                        color: s2.color ?? DEFAULT_COLORS[si2 % DEFAULT_COLORS.length],
                      }));
                      setTooltip({ x: toX(i), y: toY(v), label: labels[i], values: vals });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                ))}
              </g>
            );
          })}

          {/* X-axis labels */}
          {labels.map((l, i) => (
            <text
              key={i}
              x={toX(i)}
              y={padT + chartH + 18}
              textAnchor="middle"
              className="fill-[var(--ink-muted)]"
              fontSize={11}
            >
              {l}
            </text>
          ))}

          {/* Y-axis label */}
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

          {/* X-axis label */}
          {xLabel && (
            <text
              x={padL + chartW / 2}
              y={svgH - 4}
              textAnchor="middle"
              className="fill-[var(--ink-muted)]"
              fontSize={11}
            >
              {xLabel}
            </text>
          )}

          {/* Tooltip */}
          {tooltip && (
            <g>
              <line x1={tooltip.x} y1={padT} x2={tooltip.x} y2={padT + chartH} stroke="var(--border-strong)" strokeWidth={1} strokeDasharray="4 2" />
              <foreignObject x={tooltip.x + 8} y={tooltip.y - 20} width={140} height={100}>
                <div className="bg-surface-overlay border border-border-default rounded-lg px-2.5 py-2 shadow-[var(--shadow-overlay)]">
                  <p className="type-caption text-ink-muted mb-1">{tooltip.label}</p>
                  {tooltip.values.map((v, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full shrink-0" style={{ background: v.color }} />
                      <span className="type-caption text-ink-primary">{v.value}</span>
                      <span className="type-caption text-ink-muted">{v.name}</span>
                    </div>
                  ))}
                </div>
              </foreignObject>
            </g>
          )}
        </svg>
      </div>

      {/* Legend */}
      {showLegend && series.length > 1 && (
        <div className="flex items-center gap-4 flex-wrap justify-center">
          {series.map((s, si) => {
            const color = s.color ?? DEFAULT_COLORS[si % DEFAULT_COLORS.length];
            return (
              <div key={si} className="flex items-center gap-1.5">
                <span className="h-2 w-4 rounded-full" style={{ background: color }} />
                <span className="type-caption text-ink-secondary">{s.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
