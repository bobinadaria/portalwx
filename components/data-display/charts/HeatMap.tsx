"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface HeatMapCell {
  row: string;
  col: string;
  value: number;
}

interface HeatMapProps {
  cells: HeatMapCell[];
  rows: string[];
  cols: string[];
  colorLow?: string;
  colorHigh?: string;
  showValues?: boolean;
  cellSize?: number;
  className?: string;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

export function HeatMap({
  cells,
  rows,
  cols,
  colorLow = "#edf0f7",
  colorHigh = "#6382d5",
  showValues = false,
  cellSize = 36,
  className,
}: HeatMapProps) {
  const [tooltip, setTooltip] = useState<{ row: string; col: string; value: number } | null>(null);

  const values = cells.map((c) => c.value);
  const min = Math.min(...values, 0);
  const max = Math.max(...values, 1);

  const getColor = (value: number) => {
    const t = (value - min) / (max - min);
    const lo = hexToRgb(colorLow);
    const hi = hexToRgb(colorHigh);
    const r = Math.round(lerp(lo[0], hi[0], t));
    const g = Math.round(lerp(lo[1], hi[1], t));
    const b = Math.round(lerp(lo[2], hi[2], t));
    return `rgb(${r},${g},${b})`;
  };

  const getValue = (row: string, col: string) =>
    cells.find((c) => c.row === row && c.col === col)?.value ?? 0;

  const labelW = 80;
  const pad = 4;

  return (
    <div className={cn("overflow-auto", className)}>
      <table className="border-collapse" aria-label="Heat map">
        <thead>
          <tr>
            <th className="type-caption text-ink-muted" style={{ width: labelW }} />
            {cols.map((col) => (
              <th
                key={col}
                className="type-caption text-ink-muted text-center pb-1"
                style={{ width: cellSize + pad * 2 }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row}>
              <td className="type-caption text-ink-secondary pr-3 text-right" style={{ width: labelW }}>
                {row}
              </td>
              {cols.map((col) => {
                const val = getValue(row, col);
                const bg = getColor(val);
                const t = (val - min) / (max - min);
                const textColor = t > 0.5 ? "var(--ink-inverse)" : "var(--ink-primary)";
                return (
                  <td key={col} style={{ padding: pad }}>
                    <div
                      className="flex items-center justify-center rounded cursor-pointer transition-opacity hover:opacity-80"
                      style={{ width: cellSize, height: cellSize, background: bg }}
                      title={`${row} × ${col}: ${val}`}
                      onMouseEnter={() => setTooltip({ row, col, value: val })}
                      onMouseLeave={() => setTooltip(null)}
                    >
                      {showValues && (
                        <span className="text-xs font-medium" style={{ color: textColor }}>{val}</span>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-3">
        <span className="type-caption text-ink-muted">{min}</span>
        <div className="flex-1 h-2 rounded-full" style={{
          background: `linear-gradient(to right, ${colorLow}, ${colorHigh})`
        }} />
        <span className="type-caption text-ink-muted">{max}</span>
      </div>
    </div>
  );
}
