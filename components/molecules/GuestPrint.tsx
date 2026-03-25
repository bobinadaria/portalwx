import { Building2, User, Clock, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";
import { QrCode } from "@/components/ui/QrCode";
import { Print } from "@/components/ui/Print";

interface GuestPrintProps {
  guestName: string;
  guestCompany?: string;
  guestEmail?: string;
  guestPhone?: string;
  hostName?: string;
  location?: string;
  visitTime?: string;
  badgeNumber?: string;
  qrValue?: string;
  logoSrc?: string;
  organizationName?: string;
  className?: string;
}

export function GuestPrint({
  guestName,
  guestCompany,
  guestEmail,
  guestPhone,
  hostName,
  location,
  visitTime,
  badgeNumber,
  qrValue,
  logoSrc,
  organizationName = "Portal WX",
  className,
}: GuestPrintProps) {
  return (
    <Print className={className}>
      <div className="w-[340px] border-2 border-border-default rounded-2xl overflow-hidden bg-surface-raised font-sans">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 bg-signature text-ink-inverse">
          {logoSrc
            // eslint-disable-next-line @next/next/no-img-element
            ? <img src={logoSrc} alt={organizationName} className="h-7 object-contain" />
            : <span className="type-label text-ink-inverse">{organizationName}</span>
          }
          {badgeNumber && (
            <span className="type-caption bg-white/20 px-2 py-0.5 rounded-full">#{badgeNumber}</span>
          )}
        </div>

        {/* Guest identity */}
        <div className="flex flex-col items-center gap-3 py-5 px-5 border-b border-border-subtle">
          <Avatar name={guestName} size="lg" />
          <div className="text-center">
            <p className="type-heading text-ink-primary">{guestName}</p>
            {guestCompany && <p className="type-caption text-ink-muted">{guestCompany}</p>}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-2 px-5 py-4">
          {hostName && (
            <div className="flex items-center gap-2">
              <User className="h-3.5 w-3.5 text-ink-muted shrink-0" />
              <span className="type-caption text-ink-secondary">Visiting <span className="text-ink-primary font-medium">{hostName}</span></span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-2">
              <Building2 className="h-3.5 w-3.5 text-ink-muted shrink-0" />
              <span className="type-caption text-ink-secondary">{location}</span>
            </div>
          )}
          {visitTime && (
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-ink-muted shrink-0" />
              <span className="type-caption text-ink-secondary">{visitTime}</span>
            </div>
          )}
          {guestPhone && (
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-ink-muted shrink-0" />
              <span className="type-caption text-ink-secondary">{guestPhone}</span>
            </div>
          )}
        </div>

        {/* QR */}
        {qrValue && (
          <div className="flex justify-center py-4 border-t border-border-subtle">
            <QrCode value={qrValue} size={96} caption="Scan to verify" />
          </div>
        )}
      </div>
    </Print>
  );
}
