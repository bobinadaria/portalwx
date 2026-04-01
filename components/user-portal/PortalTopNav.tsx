"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CreditCard, House, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserMenu } from "@/components/molecules/UserMenu";
import { UserProfile } from "@/lib/user-portal-data";

interface PortalTopNavProps {
  activePath: string;
  user: UserProfile;
  onLogout: () => void;
}

const navLinks = [
  { label: "Home", href: "/user-portal", icon: House, exact: true },
  { label: "My Cards", href: "/user-portal/cards", icon: CreditCard, exact: false },
  { label: "Guest Passes", href: "/user-portal/guest-passes", icon: Ticket, exact: false },
];

export function PortalTopNav({ activePath, user, onLogout }: PortalTopNavProps) {
  const router = useRouter();

  return (
    <header className="h-14 flex items-center justify-between px-6 bg-surface-raised border-b border-border-default sticky top-0 z-30">
      {/* Wordmark */}
      <div className="flex items-center gap-6 min-w-0">
        <span className="text-[15px] font-semibold text-ink-primary shrink-0">Sharry</span>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = link.exact
              ? activePath === link.href
              : activePath.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg type-label transition-colors",
                  isActive
                    ? "bg-brand-l2 text-signature"
                    : "text-ink-secondary hover:text-ink-primary hover:bg-surface-subtle"
                )}
              >
                <link.icon size={14} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User menu */}
      <div className="w-48 shrink-0">
        <UserMenu
          name={user.name}
          email={user.email}
          role={user.role}
          onLogout={onLogout}
          onProfile={() => router.push("/user-portal/profile")}
        />
      </div>
    </header>
  );
}
