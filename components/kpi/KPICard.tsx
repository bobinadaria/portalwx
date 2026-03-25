import { cn } from "@/lib/utils";
import { TrendLine } from "@/components/data-display/TrendLine";

interface KPICardProps {
  title: string;
  value: string | number;
  context?: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  trend?: number[];
  onClick?: () => void;
  className?: string;
}

const changeColors = {
  positive: "text-status-success",
  negative: "text-status-error",
  neutral: "text-ink-muted",
};

export function KPICard({
  title,
  value,
  context,
  change,
  changeType = "neutral",
  trend,
  onClick,
  className,
}: KPICardProps) {
  const Tag = onClick ? "button" : "div";

  return (
    <Tag
      onClick={onClick}
      className={cn(
        "rounded-xl border border-border-default bg-surface-raised p-4 text-left",
        onClick &&
          "cursor-pointer transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-2",
        className
      )}
    >
      <p className="type-caption mb-1">{title}</p>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="type-kpi-lg">{value}</p>
          {(context || change) && (
            <div className="mt-1 flex items-center gap-2">
              {change && (
                <span className={cn("text-xs font-medium", changeColors[changeType])}>
                  {change}
                </span>
              )}
              {context && <span className="type-caption">{context}</span>}
            </div>
          )}
        </div>
        {trend && trend.length > 1 && (
          <TrendLine
            data={trend}
            color={
              changeType === "positive"
                ? "var(--status-success)"
                : changeType === "negative"
                  ? "var(--status-error)"
                  : "var(--color-signature)"
            }
          />
        )}
      </div>
    </Tag>
  );
}
