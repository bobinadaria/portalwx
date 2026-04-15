"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ExternalLink,
} from "lucide-react";
import { getIcon } from "@/lib/icons";

const CalendarIcon = getIcon("Icons/Calendar")!;
import Link from "next/link";
import {
  NAV_ENTRIES,
  isPathActive,
  groupContainsActive,
  type NavGroup,
  type NavLeaf,
  type NavSeparator,
  type NavExternalLink,
} from "./nav-config";

/* ── Props ──────────────────────────────────────────────────────────── */

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

/* ── Component ──────────────────────────────────────────────────────── */

export function AppSidebar({
  activePath,
  logo,
  statusLabel = "All Connectors Up",
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

  // Auto-expand groups containing the active path
  const getInitialExpanded = () =>
    new Set<string>(
      NAV_ENTRIES.filter(
        (e): e is NavGroup =>
          e.type === "group" && groupContainsActive(e, activePath)
      ).map((e) => e.label)
    );

  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    getInitialExpanded
  );

  // Expand the relevant group when activePath changes
  useEffect(() => {
    NAV_ENTRIES.forEach((e) => {
      if (e.type === "group" && groupContainsActive(e, activePath)) {
        setExpandedGroups((prev) => {
          if (prev.has(e.label)) return prev;
          return new Set([...prev, e.label]);
        });
      }
    });
  }, [activePath]);

  const toggleGroup = (label: string) => {
    if (collapsed) {
      onToggle?.();
      setExpandedGroups((prev) => new Set([...prev, label]));
      return;
    }
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  return (
    <aside
      className={cn(
        "flex h-full flex-col bg-surface-raised rounded-tr-[24px] rounded-br-[24px] transition-[width] duration-200",
        collapsed ? "w-[68px]" : "w-[240px]",
        className
      )}
    >
      {/* ── Logo ───────────────────────────────────── */}
      <div className="flex items-center px-[18px] pt-5 pb-0 min-h-[52px] shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-2">
            {logo ?? (
              <span className="text-[15px] font-semibold text-ink-primary">
                Portal WX
              </span>
            )}
          </div>
        )}
      </div>

      {/* ── Site selector ──────────────────────────── */}
      {!collapsed && sites && sites.length > 0 && (
        <div className="px-[18px] pt-4 pb-0 shrink-0">
          <div className="relative">
            <button
              onClick={() => setSiteOpen(!siteOpen)}
              className={cn(
                "flex h-9 w-full items-center justify-between rounded-lg border border-border-default bg-surface-raised px-3 text-[13px] text-ink-primary transition-colors",
                "hover:border-border-strong",
                "focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-1"
              )}
            >
              <span className="truncate">
                {selectedSite ?? `All your sites (${sites.length})`}
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={cn(
                  "shrink-0 text-ink-muted transition-transform",
                  siteOpen && "rotate-180"
                )}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {/* Dropdown */}
            {siteOpen && (
              <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-20 rounded-lg border border-border-default bg-surface-raised py-1 shadow-[var(--shadow-overlay)]">
                <button
                  onClick={() => {
                    onSiteChange?.("__all__");
                    setSiteOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center px-3 py-2 text-[13px] transition-colors",
                    !selectedSite
                      ? "bg-brand-l2 text-signature font-medium"
                      : "text-ink-primary hover:bg-surface-subtle"
                  )}
                >
                  All sites ({sites.length})
                </button>
                <div className="mx-3 my-0.5 h-px bg-border-subtle" />
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

      {/* ── Nav items ──────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto px-[10px] pt-4 pb-2 min-h-0">
        <ul className="flex flex-col gap-[2px]">
          {NAV_ENTRIES.map((entry, i) => {
            if (entry.type === "separator") {
              return (
                <li key={`sep-${i}`} className="mx-3 my-2 h-px bg-border-subtle" />
              );
            }

            if (entry.type === "external") {
              return (
                <ExternalLinkItem
                  key={entry.href}
                  entry={entry as NavExternalLink}
                  collapsed={collapsed}
                />
              );
            }

            if (entry.type === "leaf") {
              return (
                <LeafItem
                  key={entry.href}
                  entry={entry}
                  activePath={activePath}
                  collapsed={collapsed}
                  badge={navBadges?.[entry.href]}
                />
              );
            }

            // Group
            const isExpanded = expandedGroups.has(entry.label);
            const hasActiveChild = groupContainsActive(entry, activePath);

            return (
              <GroupItem
                key={entry.label}
                entry={entry}
                activePath={activePath}
                collapsed={collapsed}
                isExpanded={isExpanded}
                hasActiveChild={hasActiveChild}
                onToggle={() => toggleGroup(entry.label)}
              />
            );
          })}
        </ul>
      </nav>

      {/* ── Bottom section ─────────────────────────── */}
      <div className="mt-auto shrink-0">
        {/* Pinned Scheduled Tasks link */}
        {!collapsed && (
          <div className="px-[10px]">
            <Link
              href="/scheduled-tasks"
              className={cn(
                "flex h-10 items-center gap-2.5 rounded-lg px-3 text-[13px] font-medium transition-colors",
                "focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-1",
                isPathActive("/scheduled-tasks", activePath)
                  ? "bg-brand-l2 text-signature"
                  : "text-ink-secondary hover:bg-surface-subtle hover:text-ink-primary"
              )}
            >
              <CalendarIcon size={16} className="shrink-0" />
              <span>Scheduled Tasks</span>
            </Link>
          </div>
        )}

        {/* Status badge */}
        {!collapsed && statusLabel && (
          <div className="px-[18px] pt-3 pb-3">
            <span className="flex items-center justify-center rounded-lg bg-status-success-bg px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-status-success w-full">
              {statusLabel}
            </span>
          </div>
        )}

        {/* Separator */}
        <div className="mx-[18px] h-px bg-border-default" />

        {/* User */}
        {!collapsed && (
          <div className="flex items-center gap-2.5 px-[18px] py-3">
            {userAvatar ?? (
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-l1 text-sm font-medium text-ink-inverse">
                {userName.charAt(0).toUpperCase()}
              </span>
            )}
            <div className="min-w-0 flex-1">
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
          className="flex h-9 w-full items-center justify-center rounded-br-[24px] text-ink-muted transition-colors hover:text-ink-primary focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-1"
        >
          {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        </button>
      </div>
    </aside>
  );
}

/* ── Leaf item ──────────────────────────────────────────────────────── */

function LeafItem({
  entry,
  activePath,
  collapsed,
  badge,
}: {
  entry: NavLeaf;
  activePath?: string;
  collapsed: boolean;
  badge?: number;
}) {
  const active = isPathActive(entry.href, activePath);
  const Icon = entry.icon;

  return (
    <li>
      <Link
        href={entry.href}
        className={cn(
          "flex h-10 items-center gap-2.5 rounded-lg px-3 text-[13px] font-medium transition-colors",
          "focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-1",
          active
            ? "bg-brand-l2 text-signature"
            : "text-ink-secondary hover:bg-surface-subtle hover:text-ink-primary"
        )}
      >
        <Icon size={16} className="shrink-0" />
        {!collapsed && (
          <>
            <span className="flex-1 truncate">{entry.label}</span>
            {badge != null && (
              <span className="type-caption text-ink-muted tabular-nums">
                {badge.toLocaleString()}
              </span>
            )}
          </>
        )}
      </Link>
    </li>
  );
}

/* ── Group item ─────────────────────────────────────────────────────── */

function GroupItem({
  entry,
  activePath,
  collapsed,
  isExpanded,
  hasActiveChild,
  onToggle,
}: {
  entry: NavGroup;
  activePath?: string;
  collapsed: boolean;
  isExpanded: boolean;
  hasActiveChild: boolean;
  onToggle: () => void;
}) {
  const Icon = entry.icon;

  return (
    <li>
      {/* Group header button */}
      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        className={cn(
          "flex h-10 w-full items-center gap-2.5 rounded-lg px-3 text-[13px] font-medium transition-colors",
          "focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-1",
          hasActiveChild
            ? "bg-brand-l2 text-signature hover:bg-brand-l1"
            : "text-ink-secondary hover:bg-surface-subtle hover:text-ink-primary"
        )}
      >
        <Icon size={16} className="shrink-0" />
        {!collapsed && (
          <>
            <span className="flex-1 truncate text-left">{entry.label}</span>
            <ChevronRight
              size={14}
              className={cn(
                "shrink-0 text-ink-muted transition-transform duration-150",
                isExpanded && "rotate-90"
              )}
            />
          </>
        )}
      </button>

      {/* Children */}
      {!collapsed && isExpanded && (
        <ul className="mt-0.5 flex flex-col gap-[1px]">
          {entry.children.map((child) => {
            const childActive = isPathActive(child.href, activePath);
            return (
              <li key={child.href}>
                <Link
                  href={child.href}
                  className={cn(
                    "flex h-9 items-center gap-1.5 rounded-lg pl-9 pr-3 text-[13px] transition-colors",
                    "focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-1",
                    childActive
                      ? "bg-brand-l2 text-signature font-medium"
                      : "text-ink-secondary hover:bg-surface-subtle hover:text-ink-primary"
                  )}
                >
                  {child.badge && (
                    <span className="shrink-0 text-[11px]">{child.badge}</span>
                  )}
                  <span className="truncate">{child.label}</span>
                  {child.notificationDot && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-status-error shrink-0" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

/* ── External link item ─────────────────────────────────────────────── */

function ExternalLinkItem({
  entry,
  collapsed,
}: {
  entry: NavExternalLink;
  collapsed: boolean;
}) {
  const Icon = entry.icon ?? ExternalLink;

  return (
    <li>
      <a
        href={entry.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex h-10 items-center gap-2.5 rounded-lg px-3 text-[13px] font-medium transition-colors",
          "text-ink-secondary hover:bg-surface-subtle hover:text-ink-primary",
          "focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-1"
        )}
      >
        <Icon size={16} className="shrink-0" />
        {!collapsed && <span className="flex-1 truncate">{entry.label}</span>}
      </a>
    </li>
  );
}
