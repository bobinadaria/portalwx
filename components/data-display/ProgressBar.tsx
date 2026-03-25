import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  variant?: "brand" | "success" | "warning" | "error";
  size?: "sm" | "md";
  className?: string;
}

const barColors = {
  brand: "bg-signature",
  success: "bg-status-success",
  warning: "bg-status-warning",
  error: "bg-status-error",
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = false,
  variant = "brand",
  size = "md",
  className,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("space-y-1", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="type-caption">{label}</span>}
          {showValue && <span className="type-caption">{Math.round(pct)}%</span>}
        </div>
      )}
      <div
        className={cn(
          "overflow-hidden rounded-full bg-surface-subtle",
          size === "sm" ? "h-1.5" : "h-2.5"
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={cn("h-full rounded-full transition-[width] duration-300", barColors[variant])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
