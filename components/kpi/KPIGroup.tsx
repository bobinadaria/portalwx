import { cn } from "@/lib/utils";

interface KPIGroupMetric {
  label: string;
  value: string | number;
}

interface KPIGroupProps {
  title: string;
  metrics: KPIGroupMetric[];
  children?: React.ReactNode;
  className?: string;
}

export function KPIGroup({ title, metrics, children, className }: KPIGroupProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border-default bg-surface-raised p-4 space-y-4",
        className
      )}
    >
      <p className="type-heading">{title}</p>

      <div className="flex flex-wrap gap-6">
        {metrics.map((m) => (
          <div key={m.label} className="space-y-0.5">
            <p className="type-caption">{m.label}</p>
            <p className="type-kpi-sm">{m.value}</p>
          </div>
        ))}
      </div>

      {children}
    </div>
  );
}
