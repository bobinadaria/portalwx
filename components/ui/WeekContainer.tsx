import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WeekDay {
  date: Date;
  label?: string;
}

interface WeekContainerProps {
  days: WeekDay[];
  renderDay: (day: WeekDay, index: number) => React.ReactNode;
  onPrev?: () => void;
  onNext?: () => void;
  title?: string;
  showNavigation?: boolean;
  className?: string;
}

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function WeekContainer({
  days,
  renderDay,
  onPrev,
  onNext,
  title,
  showNavigation = true,
  className,
}: WeekContainerProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {(title || showNavigation) && (
        <div className="flex items-center justify-between">
          {title && <p className="type-label text-ink-secondary">{title}</p>}
          {showNavigation && (
            <div className="flex items-center gap-1 ml-auto">
              <button
                onClick={onPrev}
                aria-label="Previous week"
                className="p-1 rounded hover:bg-surface-subtle transition-colors text-ink-muted hover:text-ink-primary"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={onNext}
                aria-label="Next week"
                className="p-1 rounded hover:bg-surface-subtle transition-colors text-ink-muted hover:text-ink-primary"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}
      <div className="grid grid-cols-7 gap-1">
        {DAY_LABELS.map((d) => (
          <div key={d} className="flex items-center justify-center type-caption text-ink-muted py-1">
            {d}
          </div>
        ))}
        {days.map((day, i) => (
          <div key={i} className="flex items-center justify-center">
            {renderDay(day, i)}
          </div>
        ))}
      </div>
    </div>
  );
}
