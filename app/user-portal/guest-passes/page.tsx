"use client";

import { useState } from "react";
import { Link as LinkIcon, Ticket, CheckCircle } from "lucide-react";
import {
  MOCK_RECEIVED_PASSES,
  MOCK_SENT_PASSES,
  GuestPass,
} from "@/lib/user-portal-data";
import { PassRow } from "@/components/user-portal/PassRow";
import { Tabs } from "@/components/ui/Tabs";
import { Drawer } from "@/components/overlays/Drawer";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { QrCode } from "@/components/ui/QrCode";
import { EmptyState } from "@/components/ui/EmptyState";

const GUEST_STATUS_BADGE: Record<string, "neutral" | "brand" | "success" | "warning" | "error" | "info"> = {
  expected: "info",
  "checked-in": "success",
  "checked-out": "neutral",
  cancelled: "error",
};

const GUEST_STATUS_LABEL: Record<string, string> = {
  expected: "Expected",
  "checked-in": "Checked in",
  "checked-out": "Checked out",
  cancelled: "Cancelled",
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border-subtle last:border-0">
      <p className="type-label text-ink-secondary">{label}</p>
      <p className="type-body text-ink-primary text-right max-w-[60%]">{value}</p>
    </div>
  );
}

export default function GuestPassesPage() {
  const [tab, setTab] = useState<string>("received");
  const [sentPasses, setSentPasses] = useState(MOCK_SENT_PASSES);
  const [selectedPass, setSelectedPass] = useState<GuestPass | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const openPass = (pass: GuestPass) => {
    setSelectedPass(pass);
    setDrawerOpen(true);
    setCopied(false);
  };

  const handleRevoke = (pass: GuestPass) => {
    setSentPasses((prev) =>
      prev.map((p) => (p.id === pass.id ? { ...p, status: "cancelled" as const } : p))
    );
    if (selectedPass?.id === pass.id) {
      setSelectedPass({ ...pass, status: "cancelled" });
    }
  };

  const handleCopyLink = () => {
    if (selectedPass) {
      navigator.clipboard.writeText(
        `${window.location.origin}/user-portal/check-in/${selectedPass.checkInToken}`
      ).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const receivedList = MOCK_RECEIVED_PASSES;
  const sentList = sentPasses;
  const currentList = tab === "received" ? receivedList : sentList;

  return (
    <div className="px-4 md:px-10 lg:px-16 py-6">
      <div className="max-w-wide mx-auto space-y-6">

        <h1 className="type-display">Guest Passes</h1>

        <Tabs
          tabs={[
            { label: "Received", value: "received" },
            { label: "Sent by me", value: "sent" },
          ]}
          value={tab}
          onChange={setTab}
        />

        <div className="flex flex-col gap-3">
          {currentList.length === 0 ? (
            <EmptyState
              icon={<Ticket size={32} />}
              title="No passes yet"
              description={
                tab === "received"
                  ? "Guest passes sent to you will appear here."
                  : "Passes you have issued to guests will appear here."
              }
            />
          ) : (
            currentList.map((pass) => (
              <PassRow
                key={pass.id}
                pass={pass}
                perspective={tab === "received" ? "guest" : "host"}
                onOpen={openPass}
                onRevoke={handleRevoke}
              />
            ))
          )}
        </div>
      </div>

      {/* Pass detail drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Pass details"
        mobileSheet
      >
        {selectedPass && (
          <div className="flex flex-col gap-5">

            {/* Guest info */}
            <div className="flex items-center gap-3">
              <Avatar name={selectedPass.guestName} size="lg" />
              <div>
                <p className="type-heading">{selectedPass.guestName}</p>
                <p className="type-body text-ink-secondary">{selectedPass.guestEmail}</p>
              </div>
            </div>

            {/* QR */}
            {(selectedPass.status === "expected" || selectedPass.status === "checked-in") && (
              <div className="flex justify-center">
                <QrCode
                  value={selectedPass.qrValue}
                  size={160}
                  label="Entry pass"
                  caption="Valid for scheduled visit"
                />
              </div>
            )}

            {/* Status badge */}
            <div className="flex justify-center">
              <Badge variant={GUEST_STATUS_BADGE[selectedPass.status]} dot>
                {GUEST_STATUS_LABEL[selectedPass.status]}
              </Badge>
            </div>

            {/* Metadata */}
            <div className="rounded-xl border border-border-default bg-surface-subtle px-4 py-2">
              <MetaRow label="Host" value={selectedPass.host} />
              <MetaRow label="Site" value={selectedPass.site} />
              <MetaRow label="Scheduled" value={formatTime(selectedPass.scheduledAt)} />
            </div>

            {/* Actions */}
            {selectedPass.status === "expected" && (
              <div className="flex flex-col gap-2">
                <Button
                  variant="secondary"
                  size="md"
                  icon={copied ? <CheckCircle size={14} /> : <LinkIcon size={14} />}
                  className="w-full"
                  onClick={handleCopyLink}
                >
                  {copied ? "Link copied!" : "Copy check-in link"}
                </Button>
                <Button
                  variant="danger"
                  size="md"
                  className="w-full"
                  onClick={() => {
                    handleRevoke(selectedPass);
                    setDrawerOpen(false);
                  }}
                >
                  Cancel pass
                </Button>
              </div>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
}
