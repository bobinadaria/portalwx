import { cn } from "@/lib/utils";

interface GaugeChartProps {
  value: number;
  min?: number;
  max?: number;
  label?: string;
  unit?: string;
  size?: number;
  thickness?: number;
  color?: "brand" | "success" | "warning" | "error";
  showTicks?: boolean;
  className?: string;
}

const colorMap = {
  brand:   "var(--color-signature)",
  success: "var(--status-success)",
  warning: "var(--status-warning)",
  error:   "var(--status-error)",
};

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export function GaugeChart({
  value,
  min = 0,
  max = 100,
  label,
  unit = "%",
  size = 160,
  thickness = 20,
  color = "brand",
  showTicks = true,
  className,
}: GaugeChartProps) {
  const cx = size / 2;
  const cy = size * 0.65;
  const r = (size - thickness * 2) / 2;

  const startAngle = 210;
  const endAngle = -30;
  const totalArc = 300;

  const pct = Math.min(1, Math.max(0, (value - min) / (max - min)));
  const fillAngle = startAngle - pct * totalArc;

  const arc = (from: number, to: number, stroke: string, sw: number, opacity = 1) => {
    const s = polarToCartesian(cx, cy, r, from);
    const e = polarToCartesian(cx, cy, r, to);
    const large = Math.abs(from - to) > 180 ? 1 : 0;
    const sweep = from > to ? 1 : 0;
    return (
      <path
        d={`M${s.x},${s.y} A${r},${r} 0 ${large} ${sweep} ${e.x},${e.y}`}
        fill="none"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
        opacity={opacity}
      />
    );
  };

  const ticks = showTicks ? 6 : 0;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <svg width={size} height={size * 0.75} viewBox={`0 0 ${size} ${size * 0.75}`} aria-label={`Gauge: ${value}${unit}`} role="img">
        {/* Track */}
        {arc(startAngle, endAngle, "var(--surface-subtle)", thickness - 2)}
        {/* Fill */}
        {pct > 0 && arc(startAngle, fillAngle, colorMap[color], thickness - 2)}

        {/* Tick marks */}
        {showTicks && Array.from({ length: ticks }).map((_, i) => {
          const angle = startAngle - (i / (ticks - 1)) * totalArc;
          const inner = polarToCartesian(cx, cy, r - thickness / 2 - 4, angle);
          const outer = polarToCartesian(cx, cy, r + thickness / 2 - 4, angle);
          return (
            <line
              key={i}
              x1={inner.x} y1={inner.y}
              x2={outer.x} y2={outer.y}
              stroke="var(--border-strong)"
              strokeWidth={1.5}
              strokeLinecap="round"
            />
          );
        })}

        {/* Value */}
        <text x={cx} y={cy - 4} textAnchor="middle" className="fill-[var(--ink-primary)]" fontSize={size / 7} fontWeight={600}>
          {value}
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" className="fill-[var(--ink-muted)]" fontSize={size / 12}>
          {unit}
        </text>
      </svg>
      {label && <p className="type-caption text-ink-muted mt-1">{label}</p>}
    </div>
  );
}
