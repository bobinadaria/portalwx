import { ArrowLeft, Menu, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  onMenu?: () => void;
  onMore?: () => void;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  transparent?: boolean;
  className?: string;
}

export function MobileHeader({
  title,
  subtitle,
  onBack,
  onMenu,
  onMore,
  leading,
  trailing,
  transparent = false,
  className,
}: MobileHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center h-14 px-3 gap-2",
        !transparent && "bg-surface-raised border-b border-border-subtle",
        transparent && "bg-transparent",
        className
      )}
    >
      {/* Leading slot */}
      <div className="flex items-center w-10 shrink-0">
        {leading ?? (
          onBack ? (
            <button
              onClick={onBack}
              aria-label="Go back"
              className="p-1.5 rounded-lg text-ink-primary hover:bg-surface-subtle transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          ) : onMenu ? (
            <button
              onClick={onMenu}
              aria-label="Open menu"
              className="p-1.5 rounded-lg text-ink-primary hover:bg-surface-subtle transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
          ) : null
        )}
      </div>

      {/* Center title */}
      <div className="flex-1 flex flex-col items-center justify-center min-w-0">
        <p className="type-label text-ink-primary truncate">{title}</p>
        {subtitle && <p className="type-caption text-ink-muted truncate">{subtitle}</p>}
      </div>

      {/* Trailing slot */}
      <div className="flex items-center justify-end w-10 shrink-0">
        {trailing ?? (
          onMore ? (
            <button
              onClick={onMore}
              aria-label="More options"
              className="p-1.5 rounded-lg text-ink-primary hover:bg-surface-subtle transition-colors"
            >
              <MoreVertical className="h-5 w-5" />
            </button>
          ) : null
        )}
      </div>
    </header>
  );
}
