"use client";

import { useRouter } from "next/navigation";
import { GuestCard } from "@/components/molecules/GuestCard";
import { Button } from "@/components/ui/Button";
import { GuestPass } from "@/lib/user-portal-data";

interface PassRowProps {
  pass: GuestPass;
  perspective: "guest" | "host";
  onOpen: (pass: GuestPass) => void;
  onRevoke?: (pass: GuestPass) => void;
}

function formatScheduledTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function PassRow({ pass, perspective, onOpen, onRevoke }: PassRowProps) {
  const router = useRouter();

  const isGuest = perspective === "guest";
  const name = isGuest ? pass.guestName : pass.guestName;
  const company = isGuest ? `Hosted by ${pass.host}` : pass.guestEmail;
  const host = isGuest ? pass.host : undefined;

  const actions = (
    <>
      {isGuest && pass.status === "expected" && (
        <Button
          variant="primary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/user-portal/check-in/${pass.checkInToken}`);
          }}
        >
          Check in now
        </Button>
      )}
      {!isGuest && pass.status === "expected" && onRevoke && (
        <Button
          variant="danger"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onRevoke(pass);
          }}
        >
          Revoke pass
        </Button>
      )}
    </>
  );

  return (
    <GuestCard
      name={name}
      company={company}
      host={host}
      email={isGuest ? pass.hostEmail : pass.guestEmail}
      status={pass.status}
      time={formatScheduledTime(pass.scheduledAt)}
      showQr={pass.status === "expected"}
      actions={actions}
      onClick={() => onOpen(pass)}
    />
  );
}
