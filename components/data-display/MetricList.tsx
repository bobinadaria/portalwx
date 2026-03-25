import { cn } from "@/lib/utils";

interface Metric {
  label: string;
  value: string | number;
}

interface MetricListProps {
  metrics: Metric[];
  direction?: "vertical" | "horizontal";
  className?: string;
}

export function MetricList({ metrics, direction = "horizontal", className }: MetricListProps) {
  return (
    <dl
      className={cn(
        "flex gap-6",
        direction === "vertical" ? "flex-col gap-3" : "flex-row flex-wrap",
        className
      )}
    >
      {metrics.map((m) => (
        <div key={m.label} className="space-y-0.5">
          <dt className="type-caption">{m.label}</dt>
          <dd className="type-kpi-sm">{m.value}</dd>
        </div>
      ))}
    </dl>
  );
}
