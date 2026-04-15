"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import {
  NAV_ENTRIES,
  isPathActive,
  groupContainsActive,
  type NavGroup,
  type NavExternalLink,
} from "./nav-config";

interface MobileNavProps {
  activePath?: string;
  userName?: string;
  companyName?: string;
  sites?: string[];
  selectedSite?: string;
  onSiteChange?: (site: string | undefined) => void;
  navBadges?: Record<string, number>;
}

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

  // Auto-expand groups containing activePath
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
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  useEffect(() => {
    if (!drawerRef.current || !backdropRef.current) return;
    if (open) {
      gsap.fromTo(drawerRef.current, { x: "-100%" }, { x: "0%", duration: 0.25, ease: "power2.out" });
      gsap.fromTo(backdropRef.current, { opacity: 0, pointerEvents: "auto" }, { opacity: 1, duration: 0.2 });
    } else {
      gsap.to(drawerRef.current, { x: "-100%", duration: 0.2, ease: "power2.in" });
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.15,
        onComplete: () => {
          if (backdropRef.current) backdropRef.current.style.pointerEvents = "none";
        },
      });
    }
  }, [open]);

  const handleLinkClick = () => setOpen(false);

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
        <div className="flex items-center justify-between px-5 pt-5 pb-0 shrink-0">
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
          <div className="px-5 pt-4 shrink-0">
            <div className="relative">
              <button
                onClick={() => setSiteOpen(!siteOpen)}
                className={cn(
                  "flex h-9 w-full items-center justify-between rounded-lg border border-border-default bg-surface-raised px-3 text-[13px] text-ink-primary transition-colors",
                  "hover:border-border-strong"
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
                  className={cn("shrink-0 text-ink-muted transition-transform", siteOpen && "rotate-180")}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
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
        <nav className="flex-1 overflow-y-auto px-3 pt-4 pb-2 min-h-0">
          <ul className="flex flex-col gap-[2px]">
            {NAV_ENTRIES.map((entry, i) => {
              if (entry.type === "separator") {
                return (
                  <li key={`sep-${i}`} className="mx-3 my-2 h-px bg-border-subtle" />
                );
              }

              if (entry.type === "external") {
                const ExtIcon = (entry as NavExternalLink).icon;
                return (
                  <li key={entry.href}>
                    <a
                      href={entry.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick}
                      className="flex h-10 items-center gap-3 rounded-lg px-3 text-[13px] font-medium transition-colors text-ink-secondary hover:bg-surface-subtle hover:text-ink-primary"
                    >
                      {ExtIcon && <ExtIcon size={16} className="shrink-0" />}
                      <span className="flex-1 truncate">{entry.label}</span>
                    </a>
                  </li>
                );
              }

              if (entry.type === "leaf") {
                const active = isPathActive(entry.href, activePath);
                const Icon = entry.icon;
                const badge = navBadges?.[entry.href];
                return (
                  <li key={entry.href}>
                    <Link
                      href={entry.href}
                      onClick={handleLinkClick}
                      className={cn(
                        "flex h-10 items-center gap-3 rounded-lg px-3 text-[13px] font-medium transition-colors",
                        active
                          ? "bg-brand-l2 text-signature"
                          : "text-ink-secondary hover:bg-surface-subtle hover:text-ink-primary"
                      )}
                    >
                      <Icon size={16} className="shrink-0" />
                      <span className="flex-1 truncate">{entry.label}</span>
                      {badge != null && (
                        <span className="type-caption text-ink-muted tabular-nums">
                          {badge.toLocaleString()}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              }

              // Group
              const isExpanded = expandedGroups.has(entry.label);
              const hasActiveChild = groupContainsActive(entry, activePath);
              const Icon = entry.icon;

              return (
                <li key={entry.label}>
                  <button
                    onClick={() => toggleGroup(entry.label)}
                    className={cn(
                      "flex h-10 w-full items-center gap-3 rounded-lg px-3 text-[13px] font-medium transition-colors",
                      hasActiveChild
                        ? "bg-brand-l2 text-signature hover:bg-brand-l1"
                        : "text-ink-secondary hover:bg-surface-subtle hover:text-ink-primary"
                    )}
                  >
                    <Icon size={16} className="shrink-0" />
                    <span className="flex-1 truncate text-left">{entry.label}</span>
                    <ChevronRight
                      size={14}
                      className={cn(
                        "shrink-0 text-ink-muted transition-transform duration-150",
                        isExpanded && "rotate-90"
                      )}
                    />
                  </button>

                  {isExpanded && (
                    <ul className="mt-0.5 flex flex-col gap-[1px]">
                      {entry.children.map((child) => {
                        const childActive = isPathActive(child.href, activePath);
                        return (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={handleLinkClick}
                              className={cn(
                                "flex h-9 items-center gap-1.5 rounded-lg pl-9 pr-3 text-[13px] transition-colors",
                                childActive
                                  ? "bg-brand-l2 text-signature font-medium"
                                  : "text-ink-secondary hover:bg-surface-subtle hover:text-ink-primary"
                              )}
                            >
                              {child.badge && (
                                <span className="shrink-0 text-[11px]">{child.badge}</span>
                              )}
                              <span className="truncate">{child.label}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User profile */}
        <div className="mt-auto shrink-0">
          <div className="mx-5 h-px bg-border-default" />
          <div className="flex items-center gap-2.5 px-5 py-3">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-l1 text-xs font-semibold text-ink-inverse">
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
