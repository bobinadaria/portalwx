import { cn } from "@/lib/utils";

interface DividerProps {
  label?: string;
  className?: string;
}

export function Divider({ label, className }: DividerProps) {
  if (label) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <span className="h-px flex-1 bg-border-default" />
        <span className="type-caption shrink-0">{label}</span>
        <span className="h-px flex-1 bg-border-default" />
      </div>
    );
  }
  return <hr className={cn("border-t border-border-default", className)} />;
}
