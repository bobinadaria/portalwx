import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

interface DateRangeProps {
  startLabel?: string;
  endLabel?: string;
  startValue?: string;
  endValue?: string;
  onStartChange?: (value: string) => void;
  onEndChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function DateRange({
  startLabel = "Start",
  endLabel = "End",
  startValue,
  endValue,
  onStartChange,
  onEndChange,
  disabled,
  className,
}: DateRangeProps) {
  return (
    <div className={cn("flex items-end gap-2", className)}>
      <div className="flex-1 space-y-1.5">
        <label className="type-label block">{startLabel}</label>
        <div className="relative">
          <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            type="date"
            value={startValue}
            disabled={disabled}
            onChange={(e) => onStartChange?.(e.target.value)}
            className={cn(
              "h-9 w-full rounded border border-border-default bg-surface-raised pl-9 pr-3 text-sm text-ink-primary transition-colors",
              "hover:border-border-strong",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-1",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          />
        </div>
      </div>
      <span className="pb-2 text-ink-muted">—</span>
      <div className="flex-1 space-y-1.5">
        <label className="type-label block">{endLabel}</label>
        <div className="relative">
          <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            type="date"
            value={endValue}
            disabled={disabled}
            onChange={(e) => onEndChange?.(e.target.value)}
            className={cn(
              "h-9 w-full rounded border border-border-default bg-surface-raised pl-9 pr-3 text-sm text-ink-primary transition-colors",
              "hover:border-border-strong",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-1",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          />
        </div>
      </div>
    </div>
  );
}
