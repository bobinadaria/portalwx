import { cn } from "@/lib/utils";

interface MobilePreviewPropertyProps {
  label: string;
  value?: React.ReactNode;
  icon?: React.ReactNode;
  bordered?: boolean;
  className?: string;
}

export function MobilePreviewProperty({
  label,
  value,
  icon,
  bordered = true,
  className,
}: MobilePreviewPropertyProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 px-4 py-3",
        bordered && "border-b border-border-subtle",
        className
      )}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {icon && (
          <span className="shrink-0 text-ink-muted [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
        )}
        <span className="type-label text-ink-secondary">{label}</span>
      </div>
      {value !== undefined && (
        <div className="type-body text-ink-primary text-right">{value}</div>
      )}
    </div>
  );
}
