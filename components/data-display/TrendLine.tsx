import { cn } from "@/lib/utils";

interface TrendLineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string; // CSS color, e.g. "var(--color-signature)"
  className?: string;
}

export function TrendLine({
  data,
  width = 80,
  height = 32,
  color = "var(--color-signature)",
  className,
}: TrendLineProps) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 2;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - padding - ((v - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("inline-block", className)}
      aria-hidden="true"
    >
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
