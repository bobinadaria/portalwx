import { cn } from "@/lib/utils";

interface DonutSegment {
  label: string;
  value: number;
  color: string; // CSS color from token, e.g. "var(--color-signature)"
}

interface DonutChartProps {
  segments: DonutSegment[];
  size?: number;
  strokeWidth?: number;
  centerLabel?: string;
  centerValue?: string;
  className?: string;
}

export function DonutChart({
  segments,
  size = 120,
  strokeWidth = 14,
  centerLabel,
  centerValue,
  className,
}: DonutChartProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((sum, s) => sum + s.value, 0);

  let offset = 0;
  const arcs = segments.map((seg) => {
    const pct = total > 0 ? seg.value / total : 0;
    const dash = circumference * pct;
    const gap = circumference - dash;
    const startOffset = circumference * offset;
    offset += pct;
    return { ...seg, dash, gap, startOffset };
  });

  return (
    <div className={cn("inline-flex flex-col items-center gap-3", className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--surface-subtle)"
          strokeWidth={strokeWidth}
        />

        {/* Segments */}
        {arcs.map((arc) => (
          <circle
            key={arc.label}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={arc.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arc.dash} ${arc.gap}`}
            strokeDashoffset={-arc.startOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        ))}

        {/* Center text */}
        {(centerValue || centerLabel) && (
          <>
            {centerValue && (
              <text
                x={size / 2}
                y={size / 2 - (centerLabel ? 4 : 0)}
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-ink-primary text-lg font-semibold"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {centerValue}
              </text>
            )}
            {centerLabel && (
              <text
                x={size / 2}
                y={size / 2 + 14}
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-ink-muted text-[10px]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {centerLabel}
              </text>
            )}
          </>
        )}
      </svg>
    </div>
  );
}
