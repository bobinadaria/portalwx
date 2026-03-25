"use client";

import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { animateModalIn, animateModalOut, animateBackdropIn, animateBackdropOut } from "@/lib/animations";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

export function Modal({ open, onClose, title, children, size = "md", className }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const handleClose = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    if (panel) animateModalOut(panel, () => {});
    if (backdrop) animateBackdropOut(backdrop, () => { isAnimating.current = false; onClose(); });
    else { isAnimating.current = false; onClose(); }
  }, [onClose]);

  useEffect(() => {
    if (open) {
      isAnimating.current = false;
      requestAnimationFrame(() => {
        if (panelRef.current) animateModalIn(panelRef.current);
        if (backdropRef.current) animateBackdropIn(backdropRef.current);
      });
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
          "relative w-full rounded-xl bg-surface-raised shadow-[var(--shadow-overlay)]",
          sizeMap[size],
          className
        )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between border-b border-border-default px-5 py-4">
            <h2 className="type-heading">{title}</h2>
            <button
              onClick={handleClose}
              aria-label="Close modal"
              className="flex h-8 w-8 items-center justify-center rounded text-ink-muted transition-colors hover:bg-surface-subtle hover:text-ink-primary"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
