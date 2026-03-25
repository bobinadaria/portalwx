"use client";

import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Figma hierarchy → variant names
// Primary / Secondary / Tertiary / Danger / Link / Icon
// Surface: light (on light bg) | dark (on dark bg, e.g. sidebar/topbar)
// Size: lg = 48px (primary/secondary/danger), md = 36px (tertiary/icon/link)

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "ghost" | "danger" | "link" | "icon";
export type ButtonSize = "lg" | "md" | "sm";
export type ButtonSurface = "light" | "dark";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** light = on white/light surface · dark = on dark bg (sidebar, topbar, overlay) */
  surface?: ButtonSurface;
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

// Figma default sizes per variant × surface
const defaultSize: Record<ButtonVariant, Record<ButtonSurface, ButtonSize>> = {
  primary:   { light: "lg", dark: "md" },
  secondary: { light: "lg", dark: "md" },
  tertiary:  { light: "md", dark: "md" },
  ghost:     { light: "md", dark: "md" },
  danger:    { light: "lg", dark: "lg" },
  link:      { light: "md", dark: "md" },
  icon:      { light: "md", dark: "md" },
};

// Height + padding for regular (non-icon, non-link) buttons
const sizeClasses: Record<ButtonSize, string> = {
  lg: "h-12 px-6 gap-1.5",
  md: "h-9 px-3 gap-1.5",
  sm: "h-7 px-2.5 gap-1 text-xs",
};

// Square sizing for icon-only button
const iconSquareClasses: Record<ButtonSize, string> = {
  lg: "h-12 w-12 min-w-12",
  md: "h-9 w-[42px] min-w-[42px]",
  sm: "h-7 w-7 min-w-7",
};

// Variant × surface → state classes
// Note: tertiary uses border-transparent at rest to avoid layout shift on hover
type VKey = `${ButtonVariant}-${ButtonSurface}`;

const variantMap: Record<VKey, string> = {
  /* ── Primary ── */
  "primary-light": cn(
    "bg-brand-d1 text-ink-inverse",
    "hover:bg-brand-d2",
    "active:bg-signature",
    "disabled:bg-ink-muted disabled:text-surface-subtle",
  ),
  "primary-dark": cn(
    "bg-surface-raised text-ink-secondary border-2 border-transparent",
    "hover:border-border-default hover:text-brand-d1",
    "active:border-border-default active:text-signature",
    "disabled:bg-surface-subtle disabled:text-ink-muted disabled:border-transparent",
  ),

  /* ── Secondary ── */
  "secondary-light": cn(
    "bg-transparent text-brand-d1 border-2 border-brand-d1",
    "hover:border-brand-d2 hover:text-brand-d2",
    "active:border-signature active:text-signature",
    "disabled:bg-surface-subtle disabled:border-ink-muted disabled:text-ink-secondary",
  ),
  "secondary-dark": cn(
    "bg-transparent text-brand-l2 border-2 border-brand-l2",
    "hover:border-border-default hover:text-ink-primary",
    "active:border-white active:text-white",
    "disabled:border disabled:border-ink-muted disabled:text-ink-muted",
  ),

  /* ── Tertiary ── */
  "tertiary-light": cn(
    "bg-surface-subtle text-ink-secondary border-2 border-transparent",
    "hover:border-border-default hover:text-brand-d1",
    "active:border-border-default active:text-signature",
    "disabled:text-ink-muted",
  ),
  "tertiary-dark": cn(
    "bg-surface-subtle text-ink-secondary border-2 border-transparent",
    "hover:border-border-default hover:text-brand-d1",
    "active:border-border-default active:text-signature",
    "disabled:text-ink-muted",
  ),

  /* ── Ghost ── */
  "ghost-light": cn(
    "bg-transparent text-ink-secondary border-2 border-transparent",
    "hover:bg-surface-subtle hover:text-ink-primary",
    "active:bg-surface-subtle active:text-ink-primary",
    "disabled:text-ink-muted",
  ),
  "ghost-dark": cn(
    "bg-transparent text-brand-l2 border-2 border-transparent",
    "hover:bg-surface-subtle hover:text-ink-primary",
    "active:bg-surface-subtle active:text-ink-primary",
    "disabled:text-ink-muted",
  ),

  /* ── Danger ── */
  "danger-light": cn(
    "bg-status-error text-ink-inverse",
    "hover:bg-status-error/80",
    "active:bg-status-error/90",
    "disabled:bg-ink-muted disabled:text-surface-subtle",
  ),
  "danger-dark": cn(
    "bg-status-error text-ink-inverse",
    "hover:bg-status-error/80",
    "active:bg-status-error/90",
    "disabled:bg-ink-muted disabled:text-surface-subtle",
  ),

  /* ── Link ── */
  "link-light": cn(
    "bg-transparent text-ink-secondary",
    "hover:text-brand-d1",
    "active:text-signature",
    "disabled:text-ink-muted",
  ),
  "link-dark": cn(
    "bg-transparent text-brand-l2",
    "hover:text-ink-primary",
    "active:text-white",
    "disabled:text-ink-muted",
  ),

  /* ── Icon ── */
  "icon-light": cn(
    "bg-transparent text-ink-secondary border-2 border-border-default",
    "hover:bg-surface-raised",
    "active:bg-surface-raised",
    "disabled:bg-surface-subtle disabled:border-transparent",
  ),
  "icon-dark": cn(
    "bg-transparent text-brand-l2 border-2 border-brand-l2",
    "hover:bg-surface-raised hover:border-border-default hover:text-ink-primary",
    "active:bg-surface-raised active:border-border-default",
    "disabled:bg-surface-subtle disabled:border-transparent",
  ),
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size,
      surface = "light",
      loading = false,
      icon,
      iconRight,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const resolvedSize = size ?? defaultSize[variant][surface];
    const isDisabled = disabled || loading;
    const vKey: VKey = `${variant}-${surface}`;

    const isLink = variant === "link";
    const isIcon = variant === "icon";

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={cn(
          // Base
          "inline-flex items-center justify-center font-semibold text-[13px] rounded-lg",
          "transition-colors cursor-pointer select-none",
          "disabled:pointer-events-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-d1 focus-visible:ring-offset-2",
          // Size — link has no fixed height, icon is square
          isLink  ? "gap-1.5" : isIcon ? iconSquareClasses[resolvedSize] : sizeClasses[resolvedSize],
          // Variant × surface
          variantMap[vKey],
          className,
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden />
        ) : (
          icon && <span className="shrink-0 opacity-70">{icon}</span>
        )}
        {!isIcon && children}
        {!loading && iconRight && <span className="shrink-0 opacity-70">{iconRight}</span>}
      </button>
    );
  },
);
Button.displayName = "Button";
