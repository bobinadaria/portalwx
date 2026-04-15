import { getIcon } from "@/lib/icons";
import type { LucideIcon } from "lucide-react";

/* ── Types ────────────────────────────────────────────────────────────── */

export interface NavLeaf {
  type: "leaf";
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface NavGroupChild {
  label: string;
  href: string;
  /** Optional text prefix badge, e.g. "🆕" */
  badge?: string;
}

export interface NavGroup {
  type: "group";
  label: string;
  icon: LucideIcon;
  children: NavGroupChild[];
}

export interface NavSeparator {
  type: "separator";
}

export interface NavExternalLink {
  type: "external";
  label: string;
  href: string;
  icon?: LucideIcon;
}

export type NavEntry = NavLeaf | NavGroup | NavSeparator | NavExternalLink;

/* ── Navigation structure (matches full Sharry sidebar) ─────────────── */

export const NAV_ENTRIES: NavEntry[] = [
  {
    type: "leaf",
    label: "Dashboard",
    href: "/dashboard",
    icon: getIcon("Icons/Home")!,
  },
  {
    type: "leaf",
    label: "People",
    href: "/people",
    icon: getIcon("Icons/Group")!,
  },
  {
    type: "leaf",
    label: "Tenants",
    href: "/tenants",
    icon: getIcon("Icons/Category2")!,
  },
  {
    type: "group",
    label: "Amenities",
    icon: getIcon("Icons/Gaming")!,
    children: [
      { label: "Bookings", href: "/amenities/bookings" },
      { label: "Bookings 2.0", href: "/amenities/bookings-2", badge: "🆕" },
      { label: "Restaurants", href: "/amenities/restaurants" },
    ],
  },
  {
    type: "group",
    label: "Operations",
    icon: getIcon("Icons/Setting")!,
    children: [
      { label: "Guestbook", href: "/operations/guestbook" },
      { label: "Parking", href: "/operations/parking" },
      { label: "Access", href: "/operations/access" },
      { label: "Service Requests", href: "/operations/service-requests" },
    ],
  },
  {
    type: "group",
    label: "Content",
    icon: getIcon("Icons/Paper-Note")!,
    children: [
      { label: "Events", href: "/content/events" },
      { label: "News", href: "/content/news" },
      { label: "Special Offers", href: "/content/special-offers" },
      { label: "Polls", href: "/content/polls" },
      { label: "Forum", href: "/content/forum" },
      { label: "Marketplace", href: "/content/marketplace" },
      { label: "Manuals", href: "/content/manuals" },
      { label: "Signages", href: "/content/signages" },
      { label: "Content Blocks", href: "/content/content-blocks" },
      { label: "Menu Links", href: "/content/menu-links" },
    ],
  },
  {
    type: "group",
    label: "About",
    icon: getIcon("Icons/Building2")!,
    children: [
      { label: "My Building", href: "/about/my-building" },
      { label: "Local Services", href: "/about/local-services" },
      { label: "Gallery", href: "/about/gallery" },
      { label: "Contacts", href: "/about/contacts" },
      { label: "Documents", href: "/about/documents" },
    ],
  },
  {
    type: "leaf",
    label: "Help",
    href: "/help",
    icon: getIcon("Icons/Question_small")!,
  },
  {
    type: "leaf",
    label: "Scheduled Tasks",
    href: "/scheduled-tasks",
    icon: getIcon("Icons/Progress")!,
  },
  { type: "separator" },
  {
    type: "external",
    label: "BMS",
    href: "#",
    icon: getIcon("Icons/LinkOutside_small")!,
  },
];

/* ── Helpers ─────────────────────────────────────────────────────────── */

export function isPathActive(href: string, activePath?: string): boolean {
  if (!activePath) return false;
  return activePath === href || activePath.startsWith(href + "/");
}

export function groupContainsActive(
  group: NavGroup,
  activePath?: string
): boolean {
  return group.children.some((c) => isPathActive(c.href, activePath));
}
