import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
      {icon && <div className="mb-3 text-ink-muted">{icon}</div>}
      <p className="type-heading mb-1">{title}</p>
      {description && <p className="type-body mb-4 max-w-xs">{description}</p>}
      {action}
    </div>
  );
}
