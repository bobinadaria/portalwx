"use client";

import { useState } from "react";
import { Bell, Check, CheckCheck, X, AlertCircle, Info, CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type NotificationVariant = "info" | "success" | "warning" | "error" | "default";

export interface Notification {
  id: string;
  title: string;
  message?: string;
  time: string;
  read?: boolean;
  variant?: NotificationVariant;
  avatar?: React.ReactNode;
  action?: { label: string; onClick: () => void };
}

interface NotificationsProps {
  items?: Notification[];
  onRead?: (id: string) => void;
  onReadAll?: () => void;
  onDismiss?: (id: string) => void;
  onClearAll?: () => void;
  emptyMessage?: string;
  className?: string;
}

const variantIcons: Record<NotificationVariant, React.ReactNode> = {
  default: <Bell className="h-4 w-4 text-ink-muted" />,
  info:    <Info className="h-4 w-4 text-status-info" />,
  success: <CheckCircle2 className="h-4 w-4 text-status-success" />,
  warning: <AlertTriangle className="h-4 w-4 text-status-warning" />,
  error:   <AlertCircle className="h-4 w-4 text-status-error" />,
};

export function Notifications({
  items = [],
  onRead,
  onReadAll,
  onDismiss,
  onClearAll,
  emptyMessage = "No notifications",
  className,
}: NotificationsProps) {
  const unreadCount = items.filter((n) => !n.read).length;

  return (
    <div className={cn("flex flex-col bg-surface-overlay rounded-xl border border-border-default shadow-[var(--shadow-overlay)] w-[360px]", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-ink-secondary" aria-hidden="true" />
          <span className="type-label text-ink-primary">Notifications</span>
          {unreadCount > 0 && (
            <span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full bg-signature text-ink-inverse text-xs font-medium">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {onReadAll && unreadCount > 0 && (
            <button onClick={onReadAll} aria-label="Mark all as read" title="Mark all read" className="p-1.5 rounded text-ink-muted hover:text-ink-primary hover:bg-surface-subtle transition-colors">
              <CheckCheck className="h-3.5 w-3.5" />
            </button>
          )}
          {onClearAll && items.length > 0 && (
            <button onClick={onClearAll} aria-label="Clear all" title="Clear all" className="p-1.5 rounded text-ink-muted hover:text-status-error hover:bg-status-error-bg transition-colors">
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <ul className="flex flex-col overflow-auto max-h-[480px]" role="list">
        {items.length === 0 && (
          <li className="flex flex-col items-center justify-center gap-2 py-10 text-ink-muted">
            <Bell className="h-6 w-6 opacity-40" />
            <p className="type-caption">{emptyMessage}</p>
          </li>
        )}
        {items.map((n) => (
          <li
            key={n.id}
            className={cn(
              "flex items-start gap-3 px-4 py-3 border-b border-border-subtle last:border-b-0 transition-colors",
              !n.read && "bg-brand-l2/60",
              onRead && !n.read && "cursor-pointer hover:bg-surface-subtle"
            )}
            onClick={() => onRead?.(n.id)}
          >
            {/* Icon / avatar */}
            <div className="shrink-0 mt-0.5">
              {n.avatar ?? variantIcons[n.variant ?? "default"]}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className={cn("type-label", n.read ? "text-ink-secondary" : "text-ink-primary")}>
                  {n.title}
                </p>
                <span className="type-caption text-ink-muted shrink-0">{n.time}</span>
              </div>
              {n.message && (
                <p className="type-caption text-ink-muted mt-0.5 line-clamp-2">{n.message}</p>
              )}
              {n.action && (
                <button
                  onClick={(e) => { e.stopPropagation(); n.action!.onClick(); }}
                  className="mt-1.5 type-caption text-signature hover:text-brand-d2 transition-colors"
                >
                  {n.action.label}
                </button>
              )}
            </div>

            {/* Unread dot + dismiss */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              {!n.read && (
                <span className="h-1.5 w-1.5 rounded-full bg-signature" aria-label="Unread" />
              )}
              {onDismiss && (
                <button
                  onClick={(e) => { e.stopPropagation(); onDismiss(n.id); }}
                  aria-label="Dismiss"
                  className="text-ink-muted hover:text-status-error opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
