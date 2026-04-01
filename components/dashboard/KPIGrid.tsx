import { cn } from "@/lib/utils";
import React from "react";

interface KPIGridProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Responsive grid for KPI cards.
 * Adapts columns based on child count:
 * - 1 card: stays single column, doesn't stretch
 * - 2 cards: 2 cols on sm+
 * - 3+ cards: 2 cols on sm, 3 cols on lg, wraps to next row
 */
export function KPIGrid({ children, className }: KPIGridProps) {
  const count = React.Children.count(children);

  return (
    <div
      className={cn(
        "grid gap-4",
        count === 1
          ? "grid-cols-1 max-w-sm"
          : count === 2
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
}
