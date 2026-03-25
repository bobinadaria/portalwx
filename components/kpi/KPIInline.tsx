import { cn } from "@/lib/utils";

interface KPIInlineProps {
  label: string;
  value: string | number;
  className?: string;
}

export function KPIInline({ label, value, className }: KPIInlineProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs", className)}>
      <span className="text-ink-muted">{label}</span>
      <span className="font-semibold text-ink-primary">{value}</span>
    </span>
  );
}
