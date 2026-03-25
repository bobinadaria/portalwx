"use client";

import { useEffect, useRef, useCallback } from "react";
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
  className?: string;
}

export function Drawer({
  open,
  onClose,
  title,
  children,
  direction = "right",
  width = "w-[400px] max-w-[90vw]",
  className,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const handleClose = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    if (panel) animateDrawerOut(panel, () => {}, { direction });
    if (backdrop) animateBackdropOut(backdrop, () => { isAnimating.current = false; onClose(); });
    else { isAnimating.current = false; onClose(); }
  }, [direction, onClose]);

  useEffect(() => {
    if (open) {
      isAnimating.current = false;
      requestAnimationFrame(() => {
        if (panelRef.current) animateDrawerIn(panelRef.current, { direction });
        if (backdropRef.current) animateBackdropIn(backdropRef.current);
      });
    }
  }, [open, direction]);

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
          "absolute top-0 bottom-0 flex flex-col bg-surface-raised border-border-default shadow-[var(--shadow-overlay)]",
          direction === "right" ? "right-0 border-l" : "left-0 border-r",
          width,
          className
        )}
      >
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
