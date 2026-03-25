"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type BarVariant = "brand" | "success" | "warning" | "error" | "neutral";
type BarSize = "xs" | "sm" | "md";

interface BarProps {
  /** Value 0–100 */
  value?: number;
  /** If true, animates indeterminate loading */
  indeterminate?: boolean;
  variant?: BarVariant;
  size?: BarSize;
  className?: string;
  "aria-label"?: string;
}

const variantTrack: Record<BarVariant, string> = {
  brand:   "bg-brand-l1",
  success: "bg-status-success-bg",
  warning: "bg-status-warning-bg",
  error:   "bg-status-error-bg",
  neutral: "bg-surface-subtle",
};

const variantFill: Record<BarVariant, string> = {
  brand:   "bg-signature",
  success: "bg-status-success",
  warning: "bg-status-warning",
  error:   "bg-status-error",
  neutral: "bg-ink-muted",
};

const sizeStyles: Record<BarSize, string> = {
  xs: "h-0.5",
  sm: "h-1",
  md: "h-1.5",
};

export function Bar({
  value = 0,
  indeterminate = false,
  variant = "brand",
  size = "sm",
  className,
  "aria-label": ariaLabel = "Loading",
}: BarProps) {
  const fillRef = useRef<HTMLDivElement>(null);

  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
      className={cn(
        "w-full overflow-hidden rounded-full",
        variantTrack[variant],
        sizeStyles[size],
        className
      )}
    >
      <div
        ref={fillRef}
        className={cn(
          "h-full rounded-full transition-all duration-300",
          variantFill[variant],
          indeterminate && "animate-[indeterminate_1.5s_ease-in-out_infinite] w-1/3"
        )}
        style={!indeterminate ? { width: `${clamped}%` } : undefined}
      />
      <style>{`
        @keyframes indeterminate {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
}
