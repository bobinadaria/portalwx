import { User, Building2, Clock, Phone, Mail, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Status } from "@/components/ui/Status";

type GuestStatus = "expected" | "checked-in" | "checked-out" | "cancelled";

interface GuestCardProps {
  name: string;
  company?: string;
  host?: string;
  avatarSrc?: string;
  status?: GuestStatus;
  time?: string;
  phone?: string;
  email?: string;
  showQr?: boolean;
  actions?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const statusConfig: Record<GuestStatus, { label: string; variant: "neutral" | "brand" | "success" | "warning" | "error" | "info" }> = {
  expected:    { label: "Expected",    variant: "info" },
  "checked-in":  { label: "Checked in",  variant: "success" },
  "checked-out": { label: "Checked out", variant: "neutral" },
  cancelled:   { label: "Cancelled",   variant: "error" },
};

export function GuestCard({
  name,
  company,
  host,
  avatarSrc,
  status = "expected",
  time,
  phone,
  email,
  showQr = false,
  actions,
  onClick,
  className,
}: GuestCardProps) {
  const statusInfo = statusConfig[status];

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex flex-col gap-4 p-4 rounded-xl border border-border-default bg-surface-raised shadow-[var(--shadow-card)]",
        onClick && "cursor-pointer hover:shadow-[var(--shadow-overlay)] transition-shadow",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar src={avatarSrc} name={name} size="md" />
          <div className="min-w-0">
            <p className="type-label text-ink-primary truncate">{name}</p>
            {company && (
              <div className="flex items-center gap-1">
                <Building2 className="h-3 w-3 text-ink-muted" aria-hidden="true" />
                <p className="type-caption text-ink-muted truncate">{company}</p>
              </div>
            )}
          </div>
        </div>
        <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1.5">
        {host && (
          <div className="flex items-center gap-2">
            <User className="h-3.5 w-3.5 text-ink-muted shrink-0" aria-hidden="true" />
            <span className="type-caption text-ink-secondary">Host: <span className="text-ink-primary">{host}</span></span>
          </div>
        )}
        {time && (
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-ink-muted shrink-0" aria-hidden="true" />
            <span className="type-caption text-ink-secondary">{time}</span>
          </div>
        )}
        {phone && (
          <div className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-ink-muted shrink-0" aria-hidden="true" />
            <a href={`tel:${phone}`} className="type-caption text-signature hover:text-brand-d2">{phone}</a>
          </div>
        )}
        {email && (
          <div className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-ink-muted shrink-0" aria-hidden="true" />
            <a href={`mailto:${email}`} className="type-caption text-signature hover:text-brand-d2 truncate">{email}</a>
          </div>
        )}
      </div>

      {(actions || showQr) && (
        <div className="flex items-center justify-between border-t border-border-subtle pt-3">
          {showQr && (
            <div className="flex items-center gap-1 text-ink-muted">
              <QrCode className="h-4 w-4" />
              <span className="type-caption">QR Pass</span>
            </div>
          )}
          {actions && <div className="flex items-center gap-2 ml-auto">{actions}</div>}
        </div>
      )}
    </div>
  );
}
