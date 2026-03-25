import { cn } from "@/lib/utils";

interface MobilePreviewContentProps {
  children: React.ReactNode;
  title?: string;
  showFrame?: boolean;
  className?: string;
}

export function MobilePreviewContent({
  children,
  title,
  showFrame = true,
  className,
}: MobilePreviewContentProps) {
  if (!showFrame) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {title && <p className="type-caption text-ink-muted mb-3">{title}</p>}
      <div className="relative w-[320px] border-4 border-ink-primary rounded-[2.5rem] overflow-hidden shadow-[var(--shadow-overlay)] bg-surface-base">
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-3 pb-1 bg-surface-raised">
          <span className="type-caption text-ink-primary font-medium">9:41</span>
          <div className="absolute left-1/2 -translate-x-1/2 w-20 h-5 bg-ink-primary rounded-full" />
          <div className="flex items-center gap-1">
            <span className="type-caption text-ink-primary">●●●</span>
          </div>
        </div>
        {/* Content */}
        <div className="overflow-hidden" style={{ minHeight: 500 }}>
          {children}
        </div>
        {/* Home indicator */}
        <div className="flex justify-center py-2 bg-surface-base">
          <div className="w-28 h-1 bg-ink-primary rounded-full opacity-30" />
        </div>
      </div>
    </div>
  );
}
