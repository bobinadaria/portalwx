"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, X, LayoutDashboard, Users, ChevronDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import gsap from "gsap";

interface MobileNavProps {
  activePath?: string;
  userName?: string;
  companyName?: string;
  sites?: string[];
  selectedSite?: string;
  onSiteChange?: (site: string | undefined) => void;
  navBadges?: Record<string, number>;
}

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "People", href: "/people", icon: Users },
];

export function MobileNav({
  activePath,
  userName = "User",
  companyName,
  sites,
  selectedSite,
  onSiteChange,
  navBadges,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [siteOpen, setSiteOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!drawerRef.current || !backdropRef.current) return;
    if (open) {
      gsap.fromTo(drawerRef.current, { x: "-100%" }, { x: "0%", duration: 0.25, ease: "power2.out" });
      gsap.fromTo(backdropRef.current, { opacity: 0, pointerEvents: "auto" }, { opacity: 1, duration: 0.2 });
    } else {
      gsap.to(drawerRef.current, { x: "-100%", duration: 0.2, ease: "power2.in" });
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.15, onComplete: () => { if (backdropRef.current) backdropRef.current.style.pointerEvents = "none"; } });
    }
  }, [open]);

  return (
    <>
      {/* ── Mobile top bar ─────────────────────────── */}
      <header className="flex md:hidden h-14 shrink-0 items-center justify-between px-4 bg-surface-raised border-b border-border-default sticky top-0 z-30">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-secondary hover:bg-surface-subtle transition-colors"
        >
          <Menu size={20} />
        </button>

        <span className="text-[15px] font-semibold text-ink-primary">Portal WX</span>

        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-l1 text-xs font-semibold text-ink-inverse select-none">
          {userName.charAt(0).toUpperCase()}
        </span>
      </header>

      {/* ── Backdrop ───────────────────────────────── */}
      <div
        ref={backdropRef}
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-40 bg-black/40 md:hidden"
        style={{ opacity: 0, pointerEvents: "none" }}
        aria-hidden="true"
      />

      {/* ── Nav drawer ─────────────────────────────── */}
      <div
        ref={drawerRef}
        className="fixed top-0 left-0 h-full w-[280px] z-50 flex flex-col bg-surface-raised md:hidden"
        style={{ transform: "translateX(-100%)" }}
        aria-label="Navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-0">
          <span className="text-[15px] font-semibold text-ink-primary">Portal WX</span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:bg-surface-subtle transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Site selector */}
        {sites && sites.length > 0 && (
          <div className="px-5 pt-5">
            <div className="relative">
              <button
                onClick={() => setSiteOpen(!siteOpen)}
                className={cn(
                  "flex h-10 w-full items-center justify-between rounded-lg border border-border-default bg-surface-raised px-3 text-[13px] text-ink-primary transition-colors",
                  "hover:border-border-strong"
                )}
              >
                <span className="truncate">
                  {selectedSite ?? `All your sites (${sites.length})`}
                </span>
                <ChevronDown
                  size={16}
                  className={cn("shrink-0 text-ink-muted transition-transform", siteOpen && "rotate-180")}
                />
              </button>

              {siteOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-20 rounded-lg border border-border-default bg-surface-raised py-1 shadow-[var(--shadow-overlay)]">
                  <button
                    onClick={() => { onSiteChange?.(undefined); setSiteOpen(false); }}
                    className={cn(
                      "flex w-full items-center px-3 py-2 text-[13px] transition-colors",
                      !selectedSite ? "bg-brand-l2 text-signature font-medium" : "text-ink-primary hover:bg-surface-subtle"
                    )}
                  >
                    All your sites ({sites.length})
                  </button>
                  {sites.map((site) => (
                    <button
                      key={site}
                      onClick={() => { onSiteChange?.(site); setSiteOpen(false); }}
                      className={cn(
                        "flex w-full items-center px-3 py-2 text-[13px] transition-colors",
                        site === selectedSite ? "bg-brand-l2 text-signature font-medium" : "text-ink-primary hover:bg-surface-subtle"
                      )}
                    >
                      {site}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Nav items */}
        <nav className="flex-1 px-3 pt-4">
          <ul className="flex flex-col gap-[5px]">
            {navItems.map((item) => {
              const isActive = activePath === item.href;
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex h-12 items-center gap-3 rounded-lg px-4 text-sm font-medium transition-colors",
                      "focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-1",
                      isActive
                        ? "bg-brand-l2 text-signature"
                        : "text-ink-primary hover:bg-surface-subtle"
                    )}
                  >
                    <Icon size={20} className="shrink-0" />
                    <span className="flex-1 truncate">{item.label}</span>
                    {navBadges?.[item.href] != null && (
                      <span className="type-caption text-ink-muted tabular-nums">
                        {navBadges[item.href].toLocaleString()}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User profile */}
        <div className="mt-auto">
          <div className="mx-5 h-px bg-border-default" />
          <div className="flex items-center gap-2.5 px-5 py-4">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-l1 text-xs font-semibold text-ink-inverse">
              {userName.charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm text-ink-primary">{userName}</p>
              {companyName && (
                <p className="truncate text-[10px] uppercase text-ink-muted">{companyName}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
