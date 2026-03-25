import { cn } from "@/lib/utils";

interface DayHours {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}

interface OpeningHoursProps {
  schedule: DayHours[];
  currentDay?: string;
  editable?: boolean;
  onChange?: (schedule: DayHours[]) => void;
  className?: string;
}

export function OpeningHours({
  schedule,
  currentDay,
  editable = false,
  onChange,
  className,
}: OpeningHoursProps) {
  const handleChange = (index: number, field: keyof DayHours, value: string | boolean) => {
    if (!onChange) return;
    const updated = schedule.map((d, i) => (i === index ? { ...d, [field]: value } : d));
    onChange(updated);
  };

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {schedule.map((day, i) => {
        const isToday = currentDay?.toLowerCase() === day.day.toLowerCase();
        return (
          <div
            key={i}
            className={cn(
              "flex items-center justify-between gap-4 px-2 py-1.5 rounded",
              isToday && "bg-brand-l2"
            )}
          >
            <div className="flex items-center gap-2 min-w-[80px]">
              {editable && (
                <input
                  type="checkbox"
                  checked={!day.closed}
                  onChange={(e) => handleChange(i, "closed", !e.target.checked)}
                  aria-label={`${day.day} open`}
                  className="accent-[var(--color-signature)]"
                />
              )}
              <span className={cn("type-label", isToday ? "text-signature" : "text-ink-primary")}>
                {day.day}
              </span>
            </div>
            {day.closed ? (
              <span className="type-caption text-ink-muted">Closed</span>
            ) : editable ? (
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value={day.open}
                  onChange={(e) => handleChange(i, "open", e.target.value)}
                  className="text-sm text-ink-primary bg-surface-raised border border-border-default rounded px-2 py-0.5 outline-none focus:border-signature"
                />
                <span className="type-caption text-ink-muted">–</span>
                <input
                  type="time"
                  value={day.close}
                  onChange={(e) => handleChange(i, "close", e.target.value)}
                  className="text-sm text-ink-primary bg-surface-raised border border-border-default rounded px-2 py-0.5 outline-none focus:border-signature"
                />
              </div>
            ) : (
              <span className="type-caption text-ink-secondary">
                {day.open} – {day.close}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
