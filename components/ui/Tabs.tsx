"use client";

import { cn } from "@/lib/utils";

interface Tab {
  label: string;
  value: string;
}

interface TabsProps {
  tabs: Tab[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Tabs({ tabs, value, onChange, className }: TabsProps) {
  return (
    <div
      role="tablist"
      className={cn(
        "flex gap-1 border-b border-border-default",
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          role="tab"
          aria-selected={tab.value === value}
          onClick={() => onChange(tab.value)}
          className={cn(
            "relative px-3 py-2 text-sm font-medium transition-colors",
            tab.value === value
              ? "text-signature"
              : "text-ink-muted hover:text-ink-primary"
          )}
        >
          {tab.label}
          {tab.value === value && (
            <span className="absolute inset-x-0 -bottom-px h-0.5 bg-signature" />
          )}
        </button>
      ))}
    </div>
  );
}
