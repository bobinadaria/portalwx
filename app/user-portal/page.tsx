"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Activity, CreditCard, ArrowRight } from "lucide-react";
import { useUserPortal } from "@/lib/user-portal-context";
import {
  MOCK_CARDS,
  MOCK_RECEIVED_PASSES,
  RECENT_ACTIVITY,
  CARD_STATUS_BADGE,
  CARD_STATUS_LABEL,
} from "@/lib/user-portal-data";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Alert } from "@/components/feedback/Alert";
import { Button } from "@/components/ui/Button";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function UserPortalHome() {
  const { user } = useUserPortal();
  const router = useRouter();

  if (!user) return null;

  const previewCards = MOCK_CARDS.slice(0, 2);
  const pendingPasses = MOCK_RECEIVED_PASSES.filter((p) => p.status === "expected");

  return (
    <div className="px-4 md:px-10 lg:px-16 py-6">
      <div className="max-w-wide mx-auto space-y-8">

        {/* Welcome header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="type-display">{getGreeting()}, {user.name.split(" ")[0]}</h1>
            <p className="type-body text-ink-secondary mt-1">
              {user.site} · {formatDate(new Date().toISOString())}
            </p>
          </div>
          <Badge variant="success" dot>Active</Badge>
        </div>

        {/* Pending check-in alert */}
        {pendingPasses.length > 0 && (
          <Alert variant="info" title="Pending check-in">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-1">
              <span>
                You are expected at <strong>{pendingPasses[0].site}</strong> hosted by{" "}
                <strong>{pendingPasses[0].host}</strong>.
              </span>
              <Button
                variant="primary"
                size="sm"
                className="shrink-0"
                onClick={() => router.push(`/user-portal/check-in/${pendingPasses[0].checkInToken}`)}
              >
                Check in now
              </Button>
            </div>
          </Alert>
        )}

        {/* My Cards preview */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="type-subheading text-ink-muted">My Cards</h2>
            <Link
              href="/user-portal/cards"
              className="type-label text-signature hover:text-brand-d2 flex items-center gap-1 transition-colors"
            >
              View all
              <ArrowRight size={13} />
            </Link>
          </div>

          <Card padding="md">
            <div className="divide-y divide-border-subtle">
              {previewCards.map((card) => (
                <div key={card.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-l2 text-signature shrink-0">
                      <CreditCard size={14} />
                    </span>
                    <div>
                      <p className="type-label">{card.label}</p>
                      <p className="type-caption text-ink-muted">{card.site}</p>
                    </div>
                  </div>
                  <Badge variant={CARD_STATUS_BADGE[card.status]} dot>
                    {CARD_STATUS_LABEL[card.status]}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent activity */}
        <div>
          <h2 className="type-subheading text-ink-muted mb-3">Recent Activity</h2>
          <Card padding="md">
            <div className="divide-y divide-border-subtle">
              {RECENT_ACTIVITY.map((item) => (
                <div key={item.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-l2">
                    <Activity size={12} className="text-signature" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="type-body text-ink-primary">{item.text}</p>
                    <p className="type-caption text-ink-muted">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
