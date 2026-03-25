"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, ChevronDown, ChevronsLeft, ChevronsRight } from "lucide-react";
import Link from "next/link";

interface AppSidebarProps {
  activePath?: string;
  logo?: React.ReactNode;
  statusLabel?: string;
  userName?: string;
  companyName?: string;
  userAvatar?: React.ReactNode;
  sites?: string[];
  selectedSite?: string;
  onSiteChange?: (site: string) => void;
  collapsed?: boolean;
  onToggle?: () => void;
  className?: string;
  /** Map of nav href → count badge, e.g. { "/people": 3645 } */
  navBadges?: Record<string, number>;
}

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "People", href: "/people", icon: Users },
];

export function AppSidebar({
  activePath,
  logo,
  statusLabel = "Live",
  userName = "User",
  companyName,
  userAvatar,
  sites,
  selectedSite,
  onSiteChange,
  collapsed = false,
  onToggle,
  className,
  navBadges,
}: AppSidebarProps) {
  const [siteOpen, setSiteOpen] = useState(false);

  return (
    <aside
      className={cn(
        "flex h-full flex-col bg-surface-raised rounded-tr-[24px] rounded-br-[24px] transition-[width] duration-200",
        collapsed ? "w-[68px]" : "w-[240px]",
        className
      )}
    >
      {/* ── Top: Logo + Status ─────────────────────────── */}
      <div className="flex items-center justify-between px-[18px] pt-5 pb-0">
        {!collapsed && (
          <div className="flex items-center gap-2">
            {logo ?? (
              <span className="text-[15px] font-semibold text-ink-primary">
                Portal WX
              </span>
            )}
          </div>
        )}
        {!collapsed && statusLabel && (
          <span className="inline-flex items-center rounded-lg bg-status-success px-3 py-1.5 text-[11px] font-medium uppercase text-ink-inverse">
            {statusLabel}
          </span>
        )}
      </div>

      {/* ── Site selector ──────────────────────────────── */}
      {!collapsed && sites && sites.length > 0 && (
        <div className="px-[36px] pt-6 pb-0">
          <div className="relative">
            <button
              onClick={() => setSiteOpen(!siteOpen)}
              className={cn(
                "flex h-10 w-full items-center justify-between rounded-lg border border-border-default bg-surface-raised px-3 text-[13px] text-ink-primary transition-colors",
                "hover:border-border-strong",
                "focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-1"
              )}
            >
              <span className="truncate">
                {selectedSite ?? `All your sites (${sites.length})`}
              </span>
              <ChevronDown
                size={16}
                className={cn(
                  "shrink-0 text-ink-muted transition-transform",
                  siteOpen && "rotate-180"
                )}
              />
            </button>

            {/* Dropdown */}
            {siteOpen && (
              <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-20 rounded-lg border border-border-default bg-surface-raised py-1 shadow-[var(--shadow-overlay)]">
                {sites.map((site) => (
                  <button
                    key={site}
                    onClick={() => {
                      onSiteChange?.(site);
                      setSiteOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center px-3 py-2 text-[13px] transition-colors",
                      site === selectedSite
                        ? "bg-brand-l2 text-signature font-medium"
                        : "text-ink-primary hover:bg-surface-subtle"
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

      {/* ── Nav items ──────────────────────────────────── */}
      <nav className="flex-1 px-[18px] pt-6">
        <ul className="flex flex-col gap-[5px]">
          {navItems.map((item) => {
            const isActive = activePath === item.href;
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex h-12 items-center gap-2 rounded-lg px-[18px] text-sm font-medium transition-colors",
                    "focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-1",
                    isActive
                      ? "bg-brand-l2 text-signature"
                      : "text-ink-primary hover:bg-surface-subtle"
                  )}
                >
                  <Icon size={20} className="shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 truncate">{item.label}</span>
                      {navBadges?.[item.href] != null && (
                        <span className="type-caption text-ink-muted tabular-nums">
                          {navBadges[item.href].toLocaleString()}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Bottom section ─────────────────────────────── */}
      <div className="mt-auto">
        {/* Separator */}
        <div className="mx-[35px] h-px bg-border-default" />

        {/* User */}
        {!collapsed && (
          <div className="flex items-center gap-2.5 px-[36px] py-2.5">
            {userAvatar ?? (
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-l1 text-xs font-medium text-ink-inverse">
                {userName.charAt(0).toUpperCase()}
              </span>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm text-ink-primary">{userName}</p>
              {companyName && (
                <p className="truncate text-[10px] uppercase text-ink-muted">
                  {companyName}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Collapse toggle */}
        <button
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="flex h-10 w-full items-center justify-center text-ink-muted transition-colors hover:text-ink-primary"
        >
          {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        </button>
      </div>
    </aside>
  );
}
