import { cn } from "@/lib/utils";

interface Segment {
  label: string;
  value: number;
  color: string; // Tailwind bg class, e.g. "bg-signature"
}

interface DistributionBarProps {
  segments: Segment[];
  showLegend?: boolean;
  className?: string;
}

export function DistributionBar({ segments, showLegend = true, className }: DistributionBarProps) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);

  return (
    <div className={cn("space-y-2", className)}>
      {/* Bar */}
      <div className="flex h-2.5 overflow-hidden rounded-full bg-surface-subtle">
        {segments.map((seg) => {
          const pct = total > 0 ? (seg.value / total) * 100 : 0;
          return (
            <div
              key={seg.label}
              className={cn("h-full first:rounded-l-full last:rounded-r-full", seg.color)}
              style={{ width: `${pct}%` }}
              title={`${seg.label}: ${Math.round(pct)}%`}
            />
          );
        })}
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="flex flex-wrap gap-4">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-center gap-1.5">
              <span className={cn("h-2 w-2 rounded-full", seg.color)} />
              <span className="type-caption">{seg.label}</span>
              <span className="text-xs font-medium text-ink-primary">
                {total > 0 ? Math.round((seg.value / total) * 100) : 0}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
