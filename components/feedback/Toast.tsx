"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { X, CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";

type ToastVariant = "success" | "warning" | "error" | "info";

interface ToastProps {
  variant?: ToastVariant;
  message: string;
  visible: boolean;
  onDismiss: () => void;
  duration?: number;
  className?: string;
}

const icons: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle size={16} />,
  warning: <AlertTriangle size={16} />,
  error: <XCircle size={16} />,
  info: <Info size={16} />,
};

const styles: Record<ToastVariant, string> = {
  success: "border-status-success/30 text-status-success",
  warning: "border-status-warning/30 text-status-warning",
  error: "border-status-error/30 text-status-error",
  info: "border-status-info/30 text-status-info",
};

export function Toast({ variant = "info", message, visible, onDismiss, duration = 4000, className }: ToastProps) {
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (visible && duration > 0) {
      timer.current = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer.current);
    }
  }, [visible, duration, onDismiss]);

  if (!visible) return null;

  return (
    <div
      role="alert"
      className={cn(
        "flex items-center gap-2.5 rounded-xl border bg-surface-raised px-4 py-3 shadow-[var(--shadow-overlay)]",
        styles[variant],
        className
      )}
    >
      <span className="shrink-0">{icons[variant]}</span>
      <span className="flex-1 text-sm text-ink-primary">{message}</span>
      <button
        onClick={onDismiss}
        aria-label="Dismiss"
        className="shrink-0 text-ink-muted transition-colors hover:text-ink-primary"
      >
        <X size={14} />
      </button>
    </div>
  );
}
