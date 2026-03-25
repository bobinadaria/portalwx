"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { animateDrawerIn, animateDrawerOut, animateBackdropIn, animateBackdropOut } from "@/lib/animations";
import { X } from "lucide-react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  direction?: "right" | "left";
  width?: string;
  /** On mobile, render as a bottom sheet instead of a side panel */
  mobileSheet?: boolean;
  className?: string;
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

export function Drawer({
  open,
  onClose,
  title,
  children,
  direction = "right",
  width = "w-[400px] max-w-[90vw]",
  mobileSheet = false,
  className,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const isMobile = useIsMobile();

  const resolvedDirection = mobileSheet && isMobile ? "bottom" : direction;

  const handleClose = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    if (panel) animateDrawerOut(panel, () => {}, { direction: resolvedDirection });
    if (backdrop) animateBackdropOut(backdrop, () => { isAnimating.current = false; onClose(); });
    else { isAnimating.current = false; onClose(); }
  }, [resolvedDirection, onClose]);

  useEffect(() => {
    if (open) {
      isAnimating.current = false;
      requestAnimationFrame(() => {
        if (panelRef.current) animateDrawerIn(panelRef.current, { direction: resolvedDirection });
        if (backdropRef.current) animateBackdropIn(backdropRef.current);
      });
    }
  }, [open, resolvedDirection]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/40"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "absolute flex flex-col bg-surface-raised border-border-default shadow-[var(--shadow-overlay)]",
          mobileSheet
            ? [
                // Mobile: bottom sheet
                "bottom-0 left-0 right-0 max-h-[85vh] rounded-t-2xl border-t",
                // Desktop: right panel
                "md:top-0 md:bottom-0 md:right-0 md:left-auto md:max-h-none md:rounded-none md:border-t-0 md:border-l",
                `md:${width.split(" ")[0]}`,
              ]
            : [
                "top-0 bottom-0",
                direction === "right" ? "right-0 border-l" : "left-0 border-r",
                width,
              ],
          className
        )}
      >
        {/* Drag handle — mobile sheet only */}
        {mobileSheet && (
          <div className="flex md:hidden justify-center pt-3 pb-1 shrink-0">
            <div className="h-1 w-10 rounded-full bg-border-strong" />
          </div>
        )}

        {/* Header */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-border-default px-4">
          {title && <h2 className="type-heading">{title}</h2>}
          <button
            onClick={handleClose}
            aria-label="Close drawer"
            className="flex h-8 w-8 items-center justify-center rounded text-ink-muted transition-colors hover:bg-surface-subtle hover:text-ink-primary"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}
