"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserPortalProvider, useUserPortal } from "@/lib/user-portal-context";
import { PortalTopNav } from "@/components/user-portal/PortalTopNav";
import { PortalBottomNav } from "@/components/user-portal/PortalBottomNav";

function PortalShell({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, logout } = useUserPortal();
  const pathname = usePathname();
  const router = useRouter();

  const isCheckin = pathname.startsWith("/user-portal/check-in");
  const isLogin = pathname === "/user-portal/login";
  const isPublic = isLogin || isCheckin;

  useEffect(() => {
    if (!isAuthenticated && !isPublic) {
      router.replace("/user-portal/login");
    }
  }, [isAuthenticated, isPublic, router]);

  // Check-in: fully self-contained, no nav
  if (isCheckin) {
    return <div className="min-h-screen bg-surface-base">{children}</div>;
  }

  // Login: centered, no nav chrome
  if (isLogin) {
    return (
      <div className="min-h-screen bg-surface-base flex items-center justify-center px-4">
        {children}
      </div>
    );
  }

  // Don't flash protected content before redirect
  if (!isAuthenticated) return null;

  return (
    <div className="flex flex-col h-screen bg-surface-base">
      {/* Desktop top nav */}
      <div className="hidden md:block">
        <PortalTopNav
          activePath={pathname}
          user={user!}
          onLogout={() => {
            logout();
            router.replace("/user-portal/login");
          }}
        />
      </div>

      {/* Mobile top bar — wordmark only */}
      <header className="flex md:hidden h-14 shrink-0 items-center justify-center px-4 bg-surface-raised border-b border-border-default sticky top-0 z-30">
        <span className="text-[15px] font-semibold text-ink-primary">Sharry</span>
      </header>

      <main className="flex-1 min-w-0 overflow-y-auto pb-16 md:pb-0">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <PortalBottomNav activePath={pathname} />
    </div>
  );
}

export default function UserPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserPortalProvider>
      <PortalShell>{children}</PortalShell>
    </UserPortalProvider>
  );
}
