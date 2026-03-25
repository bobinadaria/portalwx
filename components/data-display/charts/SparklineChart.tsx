import { cn } from "@/lib/utils";

interface SparklineChartProps {
  data: number[];
  width?: number;
  height?: number;
  color?: "brand" | "success" | "warning" | "error" | "muted";
  filled?: boolean;
  className?: string;
}

const colorMap = {
  brand:   "var(--color-signature)",
  success: "var(--status-success)",
  warning: "var(--status-warning)",
  error:   "var(--status-error)",
  muted:   "var(--ink-muted)",
};

export function SparklineChart({
  data,
  width = 80,
  height = 32,
  color = "brand",
  filled = false,
  className,
}: SparklineChartProps) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 2;

  const points = data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * (width - pad * 2),
    y: pad + ((1 - (v - min) / range) * (height - pad * 2)),
  }));

  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");
  const last = points[points.length - 1];
  const fillPath = `M${points[0].x},${height} ` + points.map((p) => `L${p.x},${p.y}`).join(" ") + ` L${last.x},${height} Z`;

  const stroke = colorMap[color];

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("overflow-visible", className)}
      aria-hidden="true"
    >
      {filled && (
        <path d={fillPath} fill={stroke} fillOpacity={0.12} />
      )}
      <polyline
        points={polyline}
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={last.x} cy={last.y} r={2.5} fill={stroke} />
    </svg>
  );
}
