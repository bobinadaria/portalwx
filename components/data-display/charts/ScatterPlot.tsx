"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface ScatterPoint {
  x: number;
  y: number;
  label?: string;
  group?: string;
}

interface ScatterPlotProps {
  points: ScatterPoint[];
  height?: number;
  xLabel?: string;
  yLabel?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  className?: string;
}

const GROUP_COLORS = [
  "var(--color-signature)",
  "var(--status-success)",
  "var(--status-warning)",
  "var(--status-error)",
  "var(--status-info)",
];

export function ScatterPlot({
  points,
  height = 220,
  xLabel,
  yLabel,
  showGrid = true,
  showLegend = true,
  className,
}: ScatterPlotProps) {
  const [tooltip, setTooltip] = useState<ScatterPoint & { sx: number; sy: number } | null>(null);

  const padL = yLabel ? 52 : 40;
  const padR = 16;
  const padT = 16;
  const padB = xLabel ? 44 : 32;
  const svgW = 600;
  const svgH = height;
  const chartW = svgW - padL - padR;
  const chartH = svgH - padT - padB;

  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys, 0);
  const maxY = Math.max(...ys);
  const rangeX = maxX - minX || 1;
  const rangeY = maxY - minY || 1;

  const groups = Array.from(new Set(points.map((p) => p.group ?? "").filter(Boolean)));

  const toSX = (x: number) => padL + ((x - minX) / rangeX) * chartW;
  const toSY = (y: number) => padT + (1 - (y - minY) / rangeY) * chartH;

  const getColor = (group?: string) => {
    if (!group) return GROUP_COLORS[0];
    const i = groups.indexOf(group);
    return GROUP_COLORS[i % GROUP_COLORS.length];
  };

  const gridLines = 5;

  return (
    <div className={cn("flex flex-col gap-3 w-full", className)}>
      <div className="relative w-full" style={{ height: svgH }}>
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-full overflow-visible" role="img" aria-label="Scatter plot">
          {showGrid && Array.from({ length: gridLines + 1 }).map((_, i) => {
            const y = padT + (i / gridLines) * chartH;
            const val = maxY - (i / gridLines) * rangeY;
            return (
              <g key={i}>
                <line x1={padL} y1={y} x2={padL + chartW} y2={y} stroke="var(--border-default)" strokeWidth={1} />
                <text x={padL - 6} y={y + 4} textAnchor="end" className="fill-[var(--ink-muted)]" fontSize={11}>
                  {val % 1 === 0 ? val : val.toFixed(1)}
                </text>
              </g>
            );
          })}

          {points.map((p, i) => {
            const sx = toSX(p.x);
            const sy = toSY(p.y);
            const color = getColor(p.group);
            return (
              <circle
                key={i}
                cx={sx}
                cy={sy}
                r={5}
                fill={color}
                fillOpacity={0.8}
                className="cursor-pointer hover:r-7 transition-all"
                onMouseEnter={() => setTooltip({ ...p, sx, sy })}
                onMouseLeave={() => setTooltip(null)}
              >
                <title>{p.label ?? `(${p.x}, ${p.y})`}</title>
              </circle>
            );
          })}

          {/* X-axis labels */}
          {Array.from({ length: 6 }).map((_, i) => {
            const x = padL + (i / 5) * chartW;
            const val = minX + (i / 5) * rangeX;
            return (
              <text key={i} x={x} y={padT + chartH + 16} textAnchor="middle" className="fill-[var(--ink-muted)]" fontSize={11}>
                {val % 1 === 0 ? val : val.toFixed(1)}
              </text>
            );
          })}

          {yLabel && (
            <text x={12} y={padT + chartH / 2} textAnchor="middle" transform={`rotate(-90, 12, ${padT + chartH / 2})`} className="fill-[var(--ink-muted)]" fontSize={11}>{yLabel}</text>
          )}
          {xLabel && (
            <text x={padL + chartW / 2} y={svgH - 4} textAnchor="middle" className="fill-[var(--ink-muted)]" fontSize={11}>{xLabel}</text>
          )}

          {/* Tooltip */}
          {tooltip && (
            <foreignObject x={tooltip.sx + 8} y={tooltip.sy - 30} width={130} height={60}>
              <div className="bg-surface-overlay border border-border-default rounded-lg px-2.5 py-2 shadow-[var(--shadow-overlay)]">
                {tooltip.label && <p className="type-label text-ink-primary">{tooltip.label}</p>}
                <p className="type-caption text-ink-muted">x: {tooltip.x}, y: {tooltip.y}</p>
              </div>
            </foreignObject>
          )}
        </svg>
      </div>

      {showLegend && groups.length > 0 && (
        <div className="flex items-center gap-4 flex-wrap justify-center">
          {groups.map((g, i) => (
            <div key={g} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: GROUP_COLORS[i % GROUP_COLORS.length] }} />
              <span className="type-caption text-ink-secondary">{g}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
