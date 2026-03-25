import { cn } from "@/lib/utils";
import { Crumbs } from "@/components/ui/Crumbs";

interface CrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  crumbs?: CrumbItem[];
  actions?: React.ReactNode;
  tabs?: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  crumbs,
  actions,
  tabs,
  badge,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-1 border-b border-border-subtle pb-4", className)}>
      {crumbs && crumbs.length > 0 && (
        <Crumbs items={crumbs} className="mb-1" />
      )}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="type-display">{title}</h1>
            {badge}
          </div>
          {description && (
            <p className="type-body text-ink-secondary">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            {actions}
          </div>
        )}
      </div>
      {tabs && <div className="mt-3">{tabs}</div>}
    </div>
  );
}
