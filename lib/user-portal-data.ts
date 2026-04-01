// ─── Types ───────────────────────────────────────────────────────────────────

export type CardStatus = "active" | "suspended" | "expired" | "revoked";
export type PassStatus = "expected" | "checked-in" | "checked-out" | "cancelled";
export type BadgeVariant = "neutral" | "brand" | "success" | "warning" | "error" | "info";

export const CARD_STATUS_BADGE: Record<CardStatus, BadgeVariant> = {
  active: "success",
  suspended: "warning",
  expired: "neutral",
  revoked: "error",
};

export const CARD_STATUS_LABEL: Record<CardStatus, string> = {
  active: "Active",
  suspended: "Suspended",
  expired: "Expired",
  revoked: "Revoked",
};

export type CardType = "employee" | "parking" | "locker" | "visitor";

export interface DigitalCard {
  id: string;
  label: string;
  site: string;
  type: CardType;
  status: CardStatus;
  issuedAt: string;
  expiresAt?: string;
  qrValue: string;
}

export interface GuestPass {
  id: string;
  guestName: string;
  guestEmail: string;
  host: string;
  hostEmail: string;
  site: string;
  status: PassStatus;
  scheduledAt: string;
  checkInToken: string;
  qrValue: string;
}

export interface CheckInSession {
  token: string;
  guestName: string;
  guestEmail: string;
  host: string;
  site: string;
  scheduledAt: string;
  agreementText: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  company: string;
  site: string;
  role: string;
  avatarSrc?: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

export const MOCK_USER: UserProfile = {
  id: "u1",
  name: "Sarah Chen",
  email: "sarah.chen@acme.com",
  company: "ACME Corp",
  site: "HQ — New York",
  role: "Employee",
};

export const MOCK_CARDS: DigitalCard[] = [
  {
    id: "c1",
    label: "HQ Main Badge",
    site: "HQ — New York",
    type: "employee",
    status: "active",
    issuedAt: "2025-09-01",
    expiresAt: "2026-09-01",
    qrValue: "card-c1-hq-main-badge",
  },
  {
    id: "c2",
    label: "Parking Permit",
    site: "HQ — New York · Level B2",
    type: "parking",
    status: "active",
    issuedAt: "2025-09-01",
    qrValue: "card-c2-parking-permit",
  },
  {
    id: "c3",
    label: "Locker 14A",
    site: "HQ — New York · Floor 3",
    type: "locker",
    status: "suspended",
    issuedAt: "2025-11-15",
    expiresAt: "2026-11-15",
    qrValue: "card-c3-locker-14a",
  },
  {
    id: "c4",
    label: "Visitor Badge",
    site: "Building B — London",
    type: "visitor",
    status: "expired",
    issuedAt: "2024-06-10",
    expiresAt: "2024-06-12",
    qrValue: "card-c4-visitor-london",
  },
];

export const MOCK_RECEIVED_PASSES: GuestPass[] = [
  {
    id: "p1",
    guestName: "Sarah Chen",
    guestEmail: "sarah.chen@acme.com",
    host: "Marcus Webb",
    hostEmail: "marcus.webb@clientco.com",
    site: "HQ — New York · Lobby",
    status: "expected",
    scheduledAt: "2026-03-27T10:00:00",
    checkInToken: "demo-token-1",
    qrValue: "pass-p1-expected",
  },
  {
    id: "p2",
    guestName: "Sarah Chen",
    guestEmail: "sarah.chen@acme.com",
    host: "Julia Park",
    hostEmail: "julia.park@globex.com",
    site: "Building B — London",
    status: "checked-in",
    scheduledAt: "2026-03-20T14:00:00",
    checkInToken: "demo-token-3",
    qrValue: "pass-p2-checked-in",
  },
  {
    id: "p3",
    guestName: "Sarah Chen",
    guestEmail: "sarah.chen@acme.com",
    host: "Tom Brennan",
    hostEmail: "tom.brennan@initech.com",
    site: "Tower A — Chicago",
    status: "cancelled",
    scheduledAt: "2026-03-15T09:00:00",
    checkInToken: "demo-token-4",
    qrValue: "pass-p3-cancelled",
  },
];

export const MOCK_SENT_PASSES: GuestPass[] = [
  {
    id: "s1",
    guestName: "Alex Rivera",
    guestEmail: "alex.rivera@partner.com",
    host: "Sarah Chen",
    hostEmail: "sarah.chen@acme.com",
    site: "HQ — New York · Floor 4",
    status: "expected",
    scheduledAt: "2026-03-28T13:30:00",
    checkInToken: "demo-token-5",
    qrValue: "pass-s1-alex",
  },
  {
    id: "s2",
    guestName: "Nina Kowalski",
    guestEmail: "nina.k@design.co",
    host: "Sarah Chen",
    hostEmail: "sarah.chen@acme.com",
    site: "HQ — New York · Conference Room 2B",
    status: "checked-out",
    scheduledAt: "2026-03-26T15:00:00",
    checkInToken: "demo-token-6",
    qrValue: "pass-s2-nina",
  },
];

export const MOCK_CHECK_IN_TOKENS: Record<string, CheckInSession> = {
  "demo-token-1": {
    token: "demo-token-1",
    guestName: "Sarah Chen",
    guestEmail: "sarah.chen@acme.com",
    host: "Marcus Webb",
    site: "HQ — New York · Lobby",
    scheduledAt: "2026-03-27T10:00:00",
    agreementText: `Welcome to HQ — New York.

By completing this check-in, you agree to abide by all site rules and security policies of this facility.

Visitor Rules:
1. You must be accompanied by your host at all times in restricted areas.
2. Photography is prohibited in operational areas unless explicitly permitted.
3. All personal items are subject to inspection by security personnel.
4. Visitors are required to wear their issued badge visibly at all times.
5. Access to server rooms, executive floors, and lab spaces is strictly prohibited without prior written authorization.

Health & Safety:
You agree to comply with all health and safety requirements, including emergency procedures posted throughout the building.

Data & Privacy:
Your check-in data including name, photo, and contact information will be stored securely and used solely for access management purposes.

By proceeding, you confirm that the information you have provided is accurate and that you agree to the terms above.`,
  },
  "demo-token-2": {
    token: "demo-token-2",
    guestName: "External Visitor",
    guestEmail: "visitor@example.com",
    host: "Emily Hartman",
    site: "Building B — London · Reception",
    scheduledAt: "2026-03-27T14:00:00",
    agreementText: `Welcome to Building B — London.

By completing this check-in, you agree to abide by all site rules and security policies.

Please keep your visitor badge visible at all times. Follow all instructions from security staff. Report any incidents to reception immediately.

Your visit data is retained for 90 days in accordance with our data retention policy.`,
  },
};

export const RECENT_ACTIVITY = [
  { id: "a1", text: "Accessed HQ Main Badge — Main Entrance", time: "Today, 8:47 AM" },
  { id: "a2", text: "Parking permit scanned — Level B2 gate", time: "Today, 8:51 AM" },
  { id: "a3", text: "Guest pass issued to Alex Rivera", time: "Yesterday, 3:12 PM" },
  { id: "a4", text: "HQ Main Badge renewed automatically", time: "Sep 1, 2025" },
];
