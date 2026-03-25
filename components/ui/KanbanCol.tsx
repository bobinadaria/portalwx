import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface KanbanColProps {
  title: string;
  count?: number;
  children?: React.ReactNode;
  onAdd?: () => void;
  color?: string;
  className?: string;
  emptyMessage?: string;
}

export function KanbanCol({
  title,
  count,
  children,
  onAdd,
  className,
  emptyMessage = "No items",
}: KanbanColProps) {
  const isEmpty = !children || (Array.isArray(children) && children.filter(Boolean).length === 0);

  return (
    <div
      className={cn(
        "flex flex-col gap-2 min-w-[240px] max-w-[280px] flex-shrink-0",
        className
      )}
    >
      {/* Column header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="type-label text-ink-primary">{title}</span>
          {count !== undefined && (
            <span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full bg-surface-subtle text-ink-muted text-xs font-medium">
              {count}
            </span>
          )}
        </div>
        {onAdd && (
          <button
            onClick={onAdd}
            aria-label={`Add to ${title}`}
            className="p-1 rounded hover:bg-surface-subtle transition-colors text-ink-muted hover:text-ink-primary"
          >
            <Plus className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Column body */}
      <div className="flex flex-col gap-2 min-h-[120px] rounded-xl bg-surface-subtle p-2">
        {isEmpty ? (
          <div className="flex-1 flex items-center justify-center py-6">
            <p className="type-caption text-ink-muted">{emptyMessage}</p>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
