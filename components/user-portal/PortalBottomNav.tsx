"use client";

import Link from "next/link";
import { House, CreditCard, Ticket, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortalBottomNavProps {
  activePath: string;
}

const navItems = [
  { label: "Home", href: "/user-portal", icon: House, exact: true },
  { label: "Cards", href: "/user-portal/cards", icon: CreditCard, exact: false },
  { label: "Passes", href: "/user-portal/guest-passes", icon: Ticket, exact: false },
  { label: "Profile", href: "/user-portal/profile", icon: User, exact: false },
];

export function PortalBottomNav({ activePath }: PortalBottomNavProps) {
  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-0 left-0 right-0 h-16 flex md:hidden items-center bg-surface-raised border-t border-border-default z-30"
    >
      {navItems.map((item) => {
        const isActive = item.exact
          ? activePath === item.href
          : activePath.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-1 h-full transition-colors",
              isActive ? "text-signature" : "text-ink-muted hover:text-ink-primary"
            )}
          >
            <item.icon size={20} />
            <span className="type-caption">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
