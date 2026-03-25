import { cn } from "@/lib/utils";

interface StatBlockProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: React.ReactNode;
  className?: string;
}

const changeStyles = {
  positive: "text-status-success",
  negative: "text-status-error",
  neutral: "text-ink-muted",
};

export function StatBlock({ label, value, change, changeType = "neutral", icon, className }: StatBlockProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center gap-2">
        {icon && <span className="text-ink-muted">{icon}</span>}
        <span className="type-caption">{label}</span>
      </div>
      <p className="type-kpi-lg">{value}</p>
      {change && (
        <p className={cn("text-xs font-medium", changeStyles[changeType])}>
          {change}
        </p>
      )}
    </div>
  );
}
