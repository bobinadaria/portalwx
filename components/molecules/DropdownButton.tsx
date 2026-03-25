"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Menu, MenuItem } from "./Menu";

interface DropdownButtonProps {
  label: string;
  items: MenuItem[];
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  anchor?: "left" | "right";
  disabled?: boolean;
  className?: string;
}

const variantStyles = {
  primary:     "bg-signature text-ink-inverse hover:bg-brand-d2 active:bg-brand-d1",
  secondary:   "bg-surface-raised text-ink-primary border border-border-default hover:bg-surface-subtle",
  ghost:       "bg-transparent text-ink-secondary hover:bg-surface-subtle hover:text-ink-primary",
};

const sizeStyles = {
  sm: "h-8 text-xs",
  md: "h-9 text-sm",
  lg: "h-10 text-sm",
};

const paddingStyles = {
  sm: "px-3",
  md: "px-4",
  lg: "px-5",
};

export function DropdownButton({
  label,
  items,
  variant = "secondary",
  size = "md",
  icon,
  anchor = "left",
  disabled = false,
  className,
}: DropdownButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative inline-flex", className)}>
      {/* Main action */}
      <button
        onClick={items[0]?.onClick}
        disabled={disabled}
        className={cn(
          "inline-flex items-center gap-2 font-medium rounded-l transition-colors border-r border-white/20",
          "disabled:pointer-events-none disabled:opacity-50",
          "focus-visible:outline-2 focus-visible:outline-signature focus-visible:outline-offset-2",
          variantStyles[variant],
          sizeStyles[size],
          paddingStyles[size]
        )}
      >
        {icon && <span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>}
        {label}
      </button>
      {/* Dropdown trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        disabled={disabled}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="More options"
        className={cn(
          "inline-flex items-center justify-center px-2 rounded-r font-medium transition-colors",
          "disabled:pointer-events-none disabled:opacity-50",
          "focus-visible:outline-2 focus-visible:outline-signature focus-visible:outline-offset-2",
          variantStyles[variant],
          sizeStyles[size]
        )}
      >
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>
      <Menu items={items} open={open} onClose={() => setOpen(false)} anchor={anchor} />
    </div>
  );
}
