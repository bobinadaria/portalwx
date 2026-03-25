import { cn } from "@/lib/utils";

type DayStatusVariant = "available" | "busy" | "partial" | "closed" | "holiday" | "none";

interface DayStatusProps {
  day: number;
  label?: string;
  variant?: DayStatusVariant;
  selected?: boolean;
  today?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const variantDot: Record<DayStatusVariant, string> = {
  available: "bg-status-success",
  busy:      "bg-status-error",
  partial:   "bg-status-warning",
  closed:    "bg-ink-muted",
  holiday:   "bg-status-info",
  none:      "hidden",
};

export function DayStatus({
  day,
  label,
  variant = "none",
  selected = false,
  today = false,
  disabled = false,
  onClick,
  className,
}: DayStatusProps) {
  const Tag = onClick ? "button" : "div";

  return (
    <Tag
      onClick={!disabled ? onClick : undefined}
      aria-label={label ?? `Day ${day}`}
      aria-pressed={onClick ? selected : undefined}
      disabled={onClick ? disabled : undefined}
      className={cn(
        "relative flex flex-col items-center justify-center h-9 w-9 rounded-lg text-sm font-medium transition-colors",
        !disabled && onClick && "cursor-pointer",
        disabled && "opacity-40 pointer-events-none",
        selected
          ? "bg-signature text-ink-inverse"
          : today
          ? "border border-signature text-signature"
          : "text-ink-primary hover:bg-surface-subtle",
        className
      )}
    >
      <span>{day}</span>
      {variant !== "none" && !selected && (
        <span
          className={cn("absolute bottom-1 h-1 w-1 rounded-full", variantDot[variant])}
          aria-hidden="true"
        />
      )}
    </Tag>
  );
}
