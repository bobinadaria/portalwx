import { CheckCircle2, XCircle, AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type ValidityStatus = "valid" | "invalid" | "warning" | "pending" | "expired";

export interface ValidityItem {
  label: string;
  status: ValidityStatus;
  message?: string;
  expiresAt?: string;
}

interface ValidityProps {
  items: ValidityItem[];
  title?: string;
  overall?: ValidityStatus;
  className?: string;
}

const statusConfig: Record<ValidityStatus, { icon: React.ReactNode; color: string; bg: string }> = {
  valid: {
    icon: <CheckCircle2 className="h-4 w-4" aria-hidden="true" />,
    color: "text-status-success",
    bg: "bg-status-success-bg",
  },
  invalid: {
    icon: <XCircle className="h-4 w-4" aria-hidden="true" />,
    color: "text-status-error",
    bg: "bg-status-error-bg",
  },
  warning: {
    icon: <AlertCircle className="h-4 w-4" aria-hidden="true" />,
    color: "text-status-warning",
    bg: "bg-status-warning-bg",
  },
  pending: {
    icon: <Clock className="h-4 w-4" aria-hidden="true" />,
    color: "text-ink-muted",
    bg: "bg-surface-subtle",
  },
  expired: {
    icon: <XCircle className="h-4 w-4" aria-hidden="true" />,
    color: "text-status-error",
    bg: "bg-status-error-bg",
  },
};

const overallLabels: Record<ValidityStatus, string> = {
  valid:   "All checks passed",
  invalid: "Validation failed",
  warning: "Requires attention",
  pending: "Pending verification",
  expired: "Credentials expired",
};

export function Validity({ items, title, overall, className }: ValidityProps) {
  const derivedOverall: ValidityStatus = overall ?? (
    items.every((i) => i.status === "valid") ? "valid" :
    items.some((i) => i.status === "invalid" || i.status === "expired") ? "invalid" :
    items.some((i) => i.status === "warning") ? "warning" :
    "pending"
  );
  const config = statusConfig[derivedOverall];

  return (
    <div className={cn("flex flex-col gap-4 p-4 rounded-xl border border-border-default bg-surface-raised shadow-[var(--shadow-card)]", className)}>
      {/* Overall status */}
      <div className={cn("flex items-center gap-2 p-3 rounded-lg", config.bg)}>
        <span className={config.color}>{config.icon}</span>
        <div>
          <p className={cn("type-label", config.color)}>{overallLabels[derivedOverall]}</p>
          {title && <p className="type-caption text-ink-muted">{title}</p>}
        </div>
      </div>

      {/* Individual checks */}
      <ul className="flex flex-col gap-2">
        {items.map((item, i) => {
          const itemConfig = statusConfig[item.status];
          return (
            <li key={i} className="flex items-start gap-3">
              <span className={cn("mt-0.5 shrink-0", itemConfig.color)}>{itemConfig.icon}</span>
              <div className="min-w-0">
                <p className="type-label text-ink-primary">{item.label}</p>
                {item.message && <p className="type-caption text-ink-muted">{item.message}</p>}
                {item.expiresAt && (
                  <p className={cn("type-caption", item.status === "expired" ? "text-status-error" : "text-ink-muted")}>
                    {item.status === "expired" ? "Expired" : "Expires"}: {item.expiresAt}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
