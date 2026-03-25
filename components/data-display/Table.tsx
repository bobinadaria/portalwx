import { cn } from "@/lib/utils";

/* ── Table root ────────────────────────────────────────────── */
interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export function Table({ children, className }: TableProps) {
  return (
    <div className={cn("overflow-x-auto rounded-xl border border-border-default", className)}>
      <table className="w-full text-sm">{children}</table>
    </div>
  );
}

/* ── Head ──────────────────────────────────────────────────── */
export function TableHead({ children }: { children: React.ReactNode }) {
  return <thead className="border-b border-border-default bg-surface-subtle">{children}</thead>;
}

/* ── Row ───────────────────────────────────────────────────── */
interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function TableRow({ children, className, onClick }: TableRowProps) {
  return (
    <tr
      onClick={onClick}
      className={cn(
        "border-b border-border-subtle last:border-0",
        onClick && "cursor-pointer hover:bg-surface-subtle",
        className
      )}
    >
      {children}
    </tr>
  );
}

/* ── Cell ──────────────────────────────────────────────────── */
interface TableCellProps {
  children: React.ReactNode;
  header?: boolean;
  align?: "left" | "center" | "right";
  className?: string;
}

export function TableCell({ children, header, align = "left", className }: TableCellProps) {
  const Tag = header ? "th" : "td";
  return (
    <Tag
      className={cn(
        "px-4 py-2.5",
        header ? "type-label font-medium text-ink-secondary" : "text-ink-primary",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
    >
      {children}
    </Tag>
  );
}
