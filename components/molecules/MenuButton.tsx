"use client";

import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Menu, MenuItem } from "./Menu";

interface MenuButtonProps {
  label: string;
  items: MenuItem[];
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  anchor?: "left" | "right";
  disabled?: boolean;
  className?: string;
}

export function MenuButton({
  label,
  items,
  icon,
  variant = "secondary",
  size = "md",
  anchor = "left",
  disabled = false,
  className,
}: MenuButtonProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className={cn("relative inline-flex", className)}>
      <Button
        variant={variant}
        size={size}
        icon={icon}
        iconRight={<ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        disabled={disabled}
      >
        {label}
      </Button>
      <Menu items={items} open={open} onClose={() => setOpen(false)} anchor={anchor} />
    </div>
  );
}
