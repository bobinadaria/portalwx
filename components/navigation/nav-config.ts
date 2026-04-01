import {
  LayoutDashboard,
  Users,
  Building2,
  Utensils,
  ShieldCheck,
  Newspaper,
  Home,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

/* ── Types ────────────────────────────────────────────────────────────── */

export interface NavLeaf {
  type: "leaf";
  label: string;
  href: string;
  icon: LucideIcon;
  notificationDot?: boolean;
}

export interface NavGroupChild {
  label: string;
  href: string;
}

export interface NavGroup {
  type: "group";
  label: string;
  icon: LucideIcon;
  notificationDot?: boolean;
  children: NavGroupChild[];
}

export type NavEntry = NavLeaf | NavGroup;

/* ── Navigation structure (matches full Sharry sidebar) ─────────────── */

export const NAV_ENTRIES: NavEntry[] = [
  { type: "leaf", label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { type: "leaf", label: "People", href: "/people", icon: Users },
  { type: "leaf", label: "Tenants", href: "/tenants", icon: Building2 },
  {
    type: "group",
    label: "Amenities",
    icon: Utensils,
    children: [
      { label: "Bookings", href: "/amenities/bookings" },
      { label: "Restaurants", href: "/amenities/restaurants" },
    ],
  },
  {
    type: "group",
    label: "Operations",
    icon: ShieldCheck,
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
    icon: Newspaper,
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
    icon: Home,
    children: [
      { label: "My Building", href: "/about/my-building" },
      { label: "Local Services", href: "/about/local-services" },
      { label: "Gallery", href: "/about/gallery" },
      { label: "Contacts", href: "/about/contacts" },
      { label: "Documents", href: "/about/documents" },
    ],
  },
  { type: "leaf", label: "Help", href: "/help", icon: HelpCircle },
];

/* ── Helpers ─────────────────────────────────────────────────────────── */

export function isPathActive(href: string, activePath?: string): boolean {
  if (!activePath) return false;
  return activePath === href || activePath.startsWith(href + "/");
}

export function groupContainsActive(group: NavGroup, activePath?: string): boolean {
  return group.children.some((c) => isPathActive(c.href, activePath));
}
