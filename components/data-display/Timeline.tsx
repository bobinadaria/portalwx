import { cn } from "@/lib/utils";

interface TimelineEntry {
  id: string;
  label: string;
  timestamp: string;
  description?: string;
  icon?: React.ReactNode;
}

interface TimelineProps {
  entries: TimelineEntry[];
  className?: string;
}

export function Timeline({ entries, className }: TimelineProps) {
  return (
    <ol className={cn("space-y-0", className)}>
      {entries.map((entry, i) => (
        <li key={entry.id} className="relative flex gap-3 pb-6 last:pb-0">
          {/* Vertical line */}
          {i < entries.length - 1 && (
            <span className="absolute left-[11px] top-6 h-full w-px bg-border-default" />
          )}

          {/* Dot / icon */}
          <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border-default bg-surface-raised text-ink-muted">
            {entry.icon ?? <span className="h-2 w-2 rounded-full bg-signature" />}
          </span>

          {/* Content */}
          <div className="flex-1 pt-0.5">
            <p className="text-sm font-medium text-ink-primary">{entry.label}</p>
            <p className="type-caption">{entry.timestamp}</p>
            {entry.description && (
              <p className="mt-1 text-sm text-ink-secondary">{entry.description}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
