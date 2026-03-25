import { MapPin, AlertTriangle, Clock, User, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

type ReportSeverity = "low" | "medium" | "high" | "critical";
type ReportStatus = "open" | "in-progress" | "resolved" | "closed";

interface FacilityReportCardProps {
  id?: string;
  title: string;
  location?: string;
  reporter?: string;
  time?: string;
  severity?: ReportSeverity;
  status?: ReportStatus;
  description?: string;
  onClick?: () => void;
  className?: string;
}

const severityConfig: Record<ReportSeverity, { label: string; variant: "neutral" | "info" | "warning" | "error" }> = {
  low:      { label: "Low",      variant: "neutral" },
  medium:   { label: "Medium",   variant: "info" },
  high:     { label: "High",     variant: "warning" },
  critical: { label: "Critical", variant: "error" },
};

const statusConfig: Record<ReportStatus, { label: string; variant: "neutral" | "info" | "success" | "brand" }> = {
  open:        { label: "Open",        variant: "info" },
  "in-progress": { label: "In Progress", variant: "brand" },
  resolved:    { label: "Resolved",    variant: "success" },
  closed:      { label: "Closed",      variant: "neutral" },
};

export function FacilityReportCard({
  id,
  title,
  location,
  reporter,
  time,
  severity = "low",
  status = "open",
  description,
  onClick,
  className,
}: FacilityReportCardProps) {
  const sev = severityConfig[severity];
  const sta = statusConfig[status];

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex flex-col gap-3 p-4 rounded-xl border border-border-default bg-surface-raised shadow-[var(--shadow-card)]",
        onClick && "cursor-pointer hover:shadow-[var(--shadow-overlay)] transition-shadow",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5 min-w-0">
          {id && <span className="type-caption text-ink-muted">#{id}</span>}
          <p className="type-label text-ink-primary">{title}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
          <Badge variant={sev.variant}>{sev.label}</Badge>
          <Badge variant={sta.variant}>{sta.label}</Badge>
        </div>
      </div>

      {description && (
        <p className="type-body text-ink-secondary line-clamp-2">{description}</p>
      )}

      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {location && (
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-ink-muted" aria-hidden="true" />
            <span className="type-caption text-ink-secondary">{location}</span>
          </div>
        )}
        {reporter && (
          <div className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-ink-muted" aria-hidden="true" />
            <span className="type-caption text-ink-secondary">{reporter}</span>
          </div>
        )}
        {time && (
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-ink-muted" aria-hidden="true" />
            <span className="type-caption text-ink-muted">{time}</span>
          </div>
        )}
      </div>

      {onClick && (
        <div className="flex justify-end">
          <ChevronRight className="h-4 w-4 text-ink-muted" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}
