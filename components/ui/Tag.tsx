import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type TagVariant = "neutral" | "brand" | "success" | "warning" | "error" | "info";
type TagSize = "sm" | "md";

interface TagProps {
  variant?: TagVariant;
  size?: TagSize;
  children: React.ReactNode;
  onRemove?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<TagVariant, string> = {
  neutral: "bg-surface-subtle text-ink-secondary border-border-default",
  brand:   "bg-brand-l1 text-signature border-signature/20",
  success: "bg-status-success-bg text-status-success border-status-success/20",
  warning: "bg-status-warning-bg text-status-warning border-status-warning/20",
  error:   "bg-status-error-bg text-status-error border-status-error/20",
  info:    "bg-status-info-bg text-status-info border-status-info/20",
};

const sizeStyles: Record<TagSize, string> = {
  sm: "px-2 py-0.5 text-xs gap-1",
  md: "px-2.5 py-1 text-xs gap-1.5",
};

export function Tag({ variant = "neutral", size = "md", children, onRemove, icon, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {icon && <span className="shrink-0 [&>svg]:h-3 [&>svg]:w-3">{icon}</span>}
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          aria-label="Remove"
          className="shrink-0 opacity-60 hover:opacity-100 transition-opacity ml-0.5"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
}
