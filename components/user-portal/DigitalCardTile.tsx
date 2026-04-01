import { CreditCard, ChevronRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { QrCode } from "@/components/ui/QrCode";
import { DigitalCard, CARD_STATUS_BADGE, CARD_STATUS_LABEL } from "@/lib/user-portal-data";

interface DigitalCardTileProps {
  card: DigitalCard;
  view: "grid" | "list";
  onClick: () => void;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function DigitalCardTile({ card, view, onClick }: DigitalCardTileProps) {
  if (view === "list") {
    return (
      <Card padding="sm" interactive onClick={onClick}>
        <div className="flex items-center gap-4">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-l2 text-signature">
            <CreditCard size={16} />
          </span>
          <div className="flex-1 min-w-0">
            <p className="type-label">{card.label}</p>
            <p className="type-caption text-ink-muted">
              {card.site} · Issued {formatDate(card.issuedAt)}
            </p>
          </div>
          <Badge variant={CARD_STATUS_BADGE[card.status]} dot>
            {CARD_STATUS_LABEL[card.status]}
          </Badge>
          <ChevronRight size={14} className="text-ink-muted shrink-0" />
        </div>
      </Card>
    );
  }

  // Grid view
  return (
    <Card padding="md" interactive onClick={onClick}>
      <div className="flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="type-label">{card.label}</p>
            <p className="type-caption text-ink-muted">{card.site}</p>
          </div>
          <Badge variant={CARD_STATUS_BADGE[card.status]} dot>
            {CARD_STATUS_LABEL[card.status]}
          </Badge>
        </div>

        {/* QR or unavailable */}
        <div className="flex items-center justify-center py-2">
          {card.status === "active" ? (
            <QrCode value={card.qrValue} size={96} />
          ) : (
            <div
              className={cn(
                "flex h-[120px] w-[120px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border-default bg-surface-subtle"
              )}
            >
              <Lock size={18} className="text-ink-muted" />
              <p className="type-caption text-ink-muted text-center">Unavailable</p>
            </div>
          )}
        </div>

        {/* Footer metadata */}
        <div className="border-t border-border-subtle pt-3 flex items-center justify-between">
          <p className="type-caption text-ink-muted">Issued {formatDate(card.issuedAt)}</p>
          <p className="type-caption text-ink-muted">
            {card.expiresAt ? `Expires ${formatDate(card.expiresAt)}` : "No expiry"}
          </p>
        </div>
      </div>
    </Card>
  );
}
