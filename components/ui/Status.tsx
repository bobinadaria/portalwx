import { cn } from "@/lib/utils";

type StatusVariant = "online" | "offline" | "busy" | "away" | "success" | "warning" | "error" | "info" | "neutral";
type StatusSize = "sm" | "md" | "lg";

interface StatusProps {
  variant?: StatusVariant;
  size?: StatusSize;
  label?: string;
  className?: string;
}

const dotColors: Record<StatusVariant, string> = {
  online:  "bg-status-success",
  success: "bg-status-success",
  offline: "bg-ink-muted",
  neutral: "bg-ink-muted",
  busy:    "bg-status-error",
  error:   "bg-status-error",
  away:    "bg-status-warning",
  warning: "bg-status-warning",
  info:    "bg-status-info",
};

const dotSizes: Record<StatusSize, string> = {
  sm: "h-1.5 w-1.5",
  md: "h-2 w-2",
  lg: "h-2.5 w-2.5",
};

const labelColors: Record<StatusVariant, string> = {
  online:  "text-status-success",
  success: "text-status-success",
  offline: "text-ink-muted",
  neutral: "text-ink-muted",
  busy:    "text-status-error",
  error:   "text-status-error",
  away:    "text-status-warning",
  warning: "text-status-warning",
  info:    "text-status-info",
};

export function Status({ variant = "neutral", size = "md", label, className }: StatusProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span
        className={cn(
          "rounded-full shrink-0",
          dotColors[variant],
          dotSizes[size]
        )}
        aria-hidden="true"
      />
      {label && (
        <span className={cn("type-caption font-medium", labelColors[variant])}>
          {label}
        </span>
      )}
    </span>
  );
}
