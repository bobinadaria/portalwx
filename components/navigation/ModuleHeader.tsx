"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, BarChart3, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SearchField } from "@/components/ui/SearchField";
import { cn } from "@/lib/utils";

interface ModuleHeaderProps {
  title: string;
  /** Primary CTA label, e.g. "Add Asset". If omitted, button is hidden. */
  primaryAction?: string;
  onPrimaryAction?: () => void;
  /** Path to the analytics sub-page. If set, "View analytic" is enabled. */
  analyticsHref?: string;
  /** Show search field */
  showSearch?: boolean;
  className?: string;
}

export function ModuleHeader({
  title,
  primaryAction,
  onPrimaryAction,
  analyticsHref,
  showSearch = true,
  className,
}: ModuleHeaderProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <h1 className="type-display shrink-0">{title}</h1>

      <div className="flex items-center gap-2 shrink-0">
        {showSearch && (
          <div className="hidden sm:block w-48">
            <SearchField placeholder="Search..." />
          </div>
        )}

        {primaryAction && (
          <Button
            variant="primary"
            size="md"
            onClick={onPrimaryAction}
          >
            {primaryAction}
          </Button>
        )}

        {/* MoreMenu "..." */}
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="More options"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg border border-border-default transition-colors",
              "text-ink-secondary hover:bg-surface-subtle hover:text-ink-primary",
              menuOpen && "bg-surface-subtle"
            )}
          >
            <MoreHorizontal size={16} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-[calc(100%+4px)] z-20 w-44 rounded-lg border border-border-default bg-surface-raised py-1 shadow-[var(--shadow-overlay)]">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  if (analyticsHref) router.push(analyticsHref);
                }}
                disabled={!analyticsHref}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2 text-[13px] transition-colors",
                  analyticsHref
                    ? "text-ink-primary hover:bg-surface-subtle"
                    : "text-ink-muted cursor-not-allowed"
                )}
              >
                <BarChart3 size={14} className="shrink-0" />
                View analytic
              </button>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex w-full items-center gap-2 px-3 py-2 text-[13px] text-ink-primary transition-colors hover:bg-surface-subtle"
              >
                <Download size={14} className="shrink-0" />
                Export entries
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
