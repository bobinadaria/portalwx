import { cn } from "@/lib/utils";

interface TopBarProps {
  title?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function TopBar({ title, actions, className }: TopBarProps) {
  return (
    <header
      className={cn(
        "flex h-14 shrink-0 items-center justify-between border-b border-border-default bg-surface-raised px-6",
        className
      )}
    >
      {title && <h1 className="type-heading">{title}</h1>}
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}
