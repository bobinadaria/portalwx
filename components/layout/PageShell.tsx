"use client";

import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/navigation/Sidebar";
import { TopBar } from "@/components/navigation/TopBar";
import { useState } from "react";

interface PageShellProps {
  children: React.ReactNode;
  sidebarItems?: { label: string; href: string; icon?: React.ReactNode; active?: boolean }[];
  title?: string;
  className?: string;
}

export function PageShell({ children, sidebarItems = [], title, className }: PageShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-surface-base">
      <Sidebar
        items={sidebarItems}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        {title && <TopBar title={title} />}
        <main
          className={cn(
            "flex-1 overflow-y-auto px-6 py-6 md:px-10 lg:px-16",
            className
          )}
        >
          <div className="mx-auto max-w-[var(--width-wide)]">{children}</div>
        </main>
      </div>
    </div>
  );
}
