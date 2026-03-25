import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

type BadgeVariant = "neutral" | "brand" | "success" | "warning" | "error" | "info";

interface BadgeCardProps {
  title: string;
  description?: string;
  badge?: string;
  badgeVariant?: BadgeVariant;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function BadgeCard({
  title,
  description,
  badge,
  badgeVariant = "neutral",
  icon,
  actions,
  footer,
  onClick,
  className,
}: BadgeCardProps) {
  return (
    <Card interactive={!!onClick} onClick={onClick} className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {icon && (
            <span className="shrink-0 text-ink-muted [&>svg]:h-5 [&>svg]:w-5">{icon}</span>
          )}
          <div className="min-w-0">
            <p className="type-label text-ink-primary truncate">{title}</p>
            {description && <p className="type-caption text-ink-muted truncate">{description}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {badge && <Badge variant={badgeVariant}>{badge}</Badge>}
          {actions}
        </div>
      </div>
      {footer && (
        <div className="border-t border-border-subtle pt-3">
          {footer}
        </div>
      )}
    </Card>
  );
}
