"use client";

import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  danger?: boolean;
  checked?: boolean;
  dividerBefore?: boolean;
}

interface MenuProps {
  items: MenuItem[];
  open: boolean;
  onClose: () => void;
  anchor?: "left" | "right";
  className?: string;
}

export function Menu({ items, open, onClose, anchor = "left", className }: MenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      role="menu"
      aria-orientation="vertical"
      className={cn(
        "absolute z-50 mt-1 min-w-[180px] rounded-xl border border-border-default bg-surface-overlay shadow-[var(--shadow-overlay)] py-1",
        anchor === "right" ? "right-0" : "left-0",
        className
      )}
    >
      {items.map((item, i) => {
        const Tag = item.href ? "a" : "button";
        return (
          <div key={i}>
            {item.dividerBefore && i > 0 && (
              <div className="my-1 border-t border-border-subtle" role="separator" />
            )}
            <Tag
              role="menuitem"
              href={item.href}
              onClick={() => { if (!item.disabled) { item.onClick?.(); onClose(); } }}
              disabled={item.href ? undefined : item.disabled}
              aria-disabled={item.disabled}
              className={cn(
                "flex items-center gap-2.5 w-full px-3 py-2 text-sm text-left transition-colors",
                item.disabled
                  ? "text-ink-muted cursor-not-allowed"
                  : item.danger
                  ? "text-status-error hover:bg-status-error-bg"
                  : "text-ink-primary hover:bg-surface-subtle"
              )}
            >
              {item.icon && (
                <span className={cn(
                  "shrink-0 [&>svg]:h-4 [&>svg]:w-4",
                  item.danger ? "text-status-error" : "text-ink-muted"
                )}>
                  {item.icon}
                </span>
              )}
              <span className="flex-1">{item.label}</span>
              {item.checked !== undefined && (
                <span className="shrink-0">
                  {item.checked && <Check className="h-3.5 w-3.5 text-signature" />}
                </span>
              )}
            </Tag>
          </div>
        );
      })}
    </div>
  );
}
