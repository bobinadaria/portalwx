import { X, Info, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type BannerVariant = "info" | "success" | "warning" | "error" | "neutral";

interface BannerProps {
  variant?: BannerVariant;
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
  action?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BannerVariant, { wrapper: string; icon: string; iconEl: React.ReactNode }> = {
  info: {
    wrapper: "bg-status-info-bg border-status-info/30 text-status-info",
    icon: "text-status-info",
    iconEl: <Info className="h-4 w-4" aria-hidden="true" />,
  },
  success: {
    wrapper: "bg-status-success-bg border-status-success/30 text-status-success",
    icon: "text-status-success",
    iconEl: <CheckCircle2 className="h-4 w-4" aria-hidden="true" />,
  },
  warning: {
    wrapper: "bg-status-warning-bg border-status-warning/30 text-status-warning",
    icon: "text-status-warning",
    iconEl: <AlertTriangle className="h-4 w-4" aria-hidden="true" />,
  },
  error: {
    wrapper: "bg-status-error-bg border-status-error/30 text-status-error",
    icon: "text-status-error",
    iconEl: <XCircle className="h-4 w-4" aria-hidden="true" />,
  },
  neutral: {
    wrapper: "bg-surface-subtle border-border-default text-ink-secondary",
    icon: "text-ink-muted",
    iconEl: <Info className="h-4 w-4" aria-hidden="true" />,
  },
};

export function Banner({
  variant = "info",
  title,
  children,
  onDismiss,
  action,
  className,
}: BannerProps) {
  const styles = variantStyles[variant];

  return (
    <div
      role="alert"
      className={cn(
        "w-full flex items-start gap-3 px-4 py-3 border text-sm",
        styles.wrapper,
        className
      )}
    >
      <span className={cn("shrink-0 mt-0.5", styles.icon)}>{styles.iconEl}</span>
      <div className="flex-1 min-w-0">
        {title && <p className="font-medium mb-0.5">{title}</p>}
        <div className="type-body opacity-90">{children}</div>
        {action && <div className="mt-2">{action}</div>}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          className="shrink-0 mt-0.5 opacity-60 hover:opacity-100 transition-opacity"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
