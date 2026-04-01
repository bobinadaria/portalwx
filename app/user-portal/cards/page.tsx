"use client";

import { useState } from "react";
import { LayoutGrid, List, Lock, RefreshCw, CreditCard } from "lucide-react";
import {
  MOCK_CARDS,
  DigitalCard,
  CARD_STATUS_BADGE,
  CARD_STATUS_LABEL,
} from "@/lib/user-portal-data";
import { DigitalCardTile } from "@/components/user-portal/DigitalCardTile";
import { Drawer } from "@/components/overlays/Drawer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { QrCode } from "@/components/ui/QrCode";
import { cn } from "@/lib/utils";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border-subtle last:border-0">
      <p className="type-label text-ink-secondary">{label}</p>
      <p className="type-body text-ink-primary">{value}</p>
    </div>
  );
}

export default function CardsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [cards, setCards] = useState<DigitalCard[]>(MOCK_CARDS);
  const [selectedCard, setSelectedCard] = useState<DigitalCard | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openCard = (card: DigitalCard) => {
    setSelectedCard(card);
    setDrawerOpen(true);
  };

  const updateStatus = (id: string, status: DigitalCard["status"]) => {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    setSelectedCard((prev) => (prev?.id === id ? { ...prev, status } : prev));
  };

  const CARD_TYPE_LABEL: Record<string, string> = {
    employee: "Employee badge",
    parking: "Parking permit",
    locker: "Locker access",
    visitor: "Visitor badge",
  };

  return (
    <div className="px-4 md:px-10 lg:px-16 py-6">
      <div className="max-w-wide mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="type-display">My Cards</h1>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setView("grid")}
              aria-label="Grid view"
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg border transition-colors",
                view === "grid"
                  ? "border-signature bg-brand-l2 text-signature"
                  : "border-border-default text-ink-muted hover:text-ink-primary hover:bg-surface-subtle"
              )}
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => setView("list")}
              aria-label="List view"
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg border transition-colors",
                view === "list"
                  ? "border-signature bg-brand-l2 text-signature"
                  : "border-border-default text-ink-muted hover:text-ink-primary hover:bg-surface-subtle"
              )}
            >
              <List size={14} />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className={cn(
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            : "flex flex-col gap-3"
        )}>
          {cards.map((card) => (
            <DigitalCardTile
              key={card.id}
              card={card}
              view={view}
              onClick={() => openCard(card)}
            />
          ))}
        </div>
      </div>

      {/* Card detail drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={selectedCard?.label ?? "Card detail"}
        mobileSheet
      >
        {selectedCard && (
          <div className="flex flex-col gap-5">

            {/* QR or unavailable */}
            <div className="flex flex-col items-center gap-3">
              {selectedCard.status === "active" ? (
                <QrCode
                  value={selectedCard.qrValue}
                  size={180}
                  label="Scan to access"
                  caption="Present this code at the reader"
                />
              ) : (
                <div className="flex h-[200px] w-[200px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border-default bg-surface-subtle">
                  <Lock size={24} className="text-ink-muted" />
                  <p className="type-body text-ink-muted">Card unavailable</p>
                  <p className="type-caption text-ink-muted text-center max-w-[140px]">
                    This card cannot be used in its current state
                  </p>
                </div>
              )}
              <Badge variant={CARD_STATUS_BADGE[selectedCard.status]} dot>
                {CARD_STATUS_LABEL[selectedCard.status]}
              </Badge>
            </div>

            {/* Metadata */}
            <div className="rounded-xl border border-border-default bg-surface-subtle px-4 py-2">
              <MetaRow label="Site" value={selectedCard.site} />
              <MetaRow label="Type" value={CARD_TYPE_LABEL[selectedCard.type] ?? selectedCard.type} />
              <MetaRow label="Issued" value={formatDate(selectedCard.issuedAt)} />
              <MetaRow
                label="Expires"
                value={selectedCard.expiresAt ? formatDate(selectedCard.expiresAt) : "No expiry"}
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              {selectedCard.status === "active" && (
                <Button
                  variant="secondary"
                  size="md"
                  className="w-full"
                  onClick={() => updateStatus(selectedCard.id, "suspended")}
                >
                  Suspend card
                </Button>
              )}
              {selectedCard.status === "suspended" && (
                <>
                  <Button
                    variant="primary"
                    size="md"
                    icon={<RefreshCw size={14} />}
                    className="w-full"
                    onClick={() => updateStatus(selectedCard.id, "active")}
                  >
                    Reactivate card
                  </Button>
                  <Button
                    variant="danger"
                    size="md"
                    className="w-full"
                    onClick={() => updateStatus(selectedCard.id, "revoked")}
                  >
                    Revoke card
                  </Button>
                </>
              )}
              {(selectedCard.status === "expired" || selectedCard.status === "revoked") && (
                <Button
                  variant="ghost"
                  size="md"
                  icon={<CreditCard size={14} />}
                  className="w-full"
                >
                  Request new card
                </Button>
              )}
            </div>

          </div>
        )}
      </Drawer>
    </div>
  );
}
