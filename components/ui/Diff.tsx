import { cn } from "@/lib/utils";

type DiffMode = "unified" | "split";

interface DiffLine {
  type: "added" | "removed" | "unchanged" | "header";
  content: string;
  lineOld?: number;
  lineNew?: number;
}

interface DiffProps {
  lines: DiffLine[];
  mode?: DiffMode;
  showLineNumbers?: boolean;
  title?: string;
  className?: string;
}

const lineStyles: Record<DiffLine["type"], string> = {
  added:     "bg-status-success-bg text-status-success",
  removed:   "bg-status-error-bg text-status-error",
  unchanged: "text-ink-secondary",
  header:    "bg-surface-subtle text-ink-muted italic",
};

const linePrefix: Record<DiffLine["type"], string> = {
  added:     "+ ",
  removed:   "- ",
  unchanged: "  ",
  header:    "  ",
};

export function Diff({
  lines,
  mode = "unified",
  showLineNumbers = true,
  title,
  className,
}: DiffProps) {
  return (
    <div className={cn("rounded-xl border border-border-default overflow-hidden font-mono text-xs", className)}>
      {title && (
        <div className="px-4 py-2 bg-surface-subtle border-b border-border-default">
          <span className="type-label text-ink-secondary">{title}</span>
        </div>
      )}
      <div className="overflow-auto bg-surface-raised">
        {lines.map((line, i) => (
          <div key={i} className={cn("flex items-stretch min-w-0", lineStyles[line.type])}>
            {showLineNumbers && line.type !== "header" && (
              <>
                <span className="select-none px-2 py-0.5 text-right text-ink-muted bg-surface-subtle border-r border-border-default min-w-[36px] shrink-0">
                  {line.lineOld ?? " "}
                </span>
                <span className="select-none px-2 py-0.5 text-right text-ink-muted bg-surface-subtle border-r border-border-default min-w-[36px] shrink-0">
                  {line.lineNew ?? " "}
                </span>
              </>
            )}
            <pre className="flex-1 px-3 py-0.5 leading-5 whitespace-pre overflow-x-auto">
              <span className="select-none opacity-60">{linePrefix[line.type]}</span>
              {line.content}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
