"use client";

import { useState } from "react";
import { LogOut, Settings, User, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";
import { Menu, MenuItem } from "./Menu";

interface UserMenuProps {
  name: string;
  email?: string;
  avatarSrc?: string;
  role?: string;
  items?: MenuItem[];
  onLogout?: () => void;
  onSettings?: () => void;
  onProfile?: () => void;
  collapsed?: boolean;
  className?: string;
}

export function UserMenu({
  name,
  email,
  avatarSrc,
  role,
  items,
  onLogout,
  onSettings,
  onProfile,
  collapsed = false,
  className,
}: UserMenuProps) {
  const [open, setOpen] = useState(false);

  const defaultItems: MenuItem[] = [
    ...(onProfile ? [{ label: "Profile", icon: <User className="h-4 w-4" />, onClick: onProfile }] : []),
    ...(onSettings ? [{ label: "Settings", icon: <Settings className="h-4 w-4" />, onClick: onSettings }] : []),
    ...(onLogout ? [
      { label: "Sign out", icon: <LogOut className="h-4 w-4" />, onClick: onLogout, dividerBefore: true, danger: false },
    ] : []),
  ];

  const menuItems = items ?? defaultItems;
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`User menu for ${name}`}
        className={cn(
          "flex items-center gap-2.5 rounded-lg p-1.5 w-full transition-colors hover:bg-surface-subtle",
          open && "bg-surface-subtle"
        )}
      >
        <Avatar src={avatarSrc} name={name} size="sm" />
        {!collapsed && (
          <div className="flex-1 text-left min-w-0">
            <p className="type-label text-ink-primary truncate">{name}</p>
            {(email || role) && (
              <p className="type-caption text-ink-muted truncate">{role ?? email}</p>
            )}
          </div>
        )}
        {!collapsed && (
          <ChevronDown className={cn("h-3.5 w-3.5 text-ink-muted shrink-0 transition-transform", open && "rotate-180")} />
        )}
      </button>
      <Menu items={menuItems} open={open} onClose={() => setOpen(false)} anchor="left" className="bottom-full mb-1 top-auto" />
    </div>
  );
}
