import { cn } from "@/lib/utils";

interface KPIRowItem {
  label: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
}

interface KPIRowProps {
  items: KPIRowItem[];
  className?: string;
}

const changeColors = {
  positive: "text-status-success",
  negative: "text-status-error",
  neutral: "text-ink-muted",
};

export function KPIRow({ items, className }: KPIRowProps) {
  return (
    <div
      className={cn(
        "flex divide-x divide-border-default overflow-x-auto rounded-xl border border-border-default bg-surface-raised",
        className
      )}
    >
      {items.map((item) => (
        <div key={item.label} className="flex-1 px-4 py-3 min-w-[120px]">
          <p className="type-caption mb-0.5">{item.label}</p>
          <p className="type-kpi-sm">{item.value}</p>
          {item.change && (
            <p className={cn("mt-0.5 text-xs font-medium", changeColors[item.changeType ?? "neutral"])}>
              {item.change}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
