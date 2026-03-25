"use client";

import { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface DateTimePickerProps {
  value?: { date: string; time: string };
  onChange?: (value: { date: string; time: string }) => void;
  label?: string;
  minDate?: string;
  maxDate?: string;
  disabled?: boolean;
  error?: string;
  hint?: string;
  className?: string;
}

export function DateTimePicker({
  value,
  onChange,
  label,
  minDate,
  maxDate,
  disabled = false,
  error,
  hint,
  className,
}: DateTimePickerProps) {
  const [dateFocused, setDateFocused] = useState(false);
  const [timeFocused, setTimeFocused] = useState(false);
  const anyFocused = dateFocused || timeFocused;

  const handleDate = (date: string) => onChange?.({ date, time: value?.time ?? "" });
  const handleTime = (time: string) => onChange?.({ date: value?.date ?? "", time });

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && <label className="type-label text-ink-secondary">{label}</label>}
      <div
        className={cn(
          "flex items-center rounded border transition-colors bg-surface-raised overflow-hidden",
          error ? "border-status-error" : anyFocused ? "border-signature" : "border-border-default",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {/* Date */}
        <div className="flex items-center gap-2 flex-1 h-9 px-3 border-r border-border-default">
          <Calendar className="h-4 w-4 text-ink-muted shrink-0" aria-hidden="true" />
          <input
            type="date"
            value={value?.date ?? ""}
            onChange={(e) => handleDate(e.target.value)}
            min={minDate}
            max={maxDate}
            disabled={disabled}
            onFocus={() => setDateFocused(true)}
            onBlur={() => setDateFocused(false)}
            className="flex-1 text-sm text-ink-primary bg-transparent outline-none disabled:cursor-not-allowed"
          />
        </div>
        {/* Time */}
        <div className="flex items-center gap-2 h-9 px-3">
          <Clock className="h-4 w-4 text-ink-muted shrink-0" aria-hidden="true" />
          <input
            type="time"
            value={value?.time ?? ""}
            onChange={(e) => handleTime(e.target.value)}
            disabled={disabled}
            onFocus={() => setTimeFocused(true)}
            onBlur={() => setTimeFocused(false)}
            className="text-sm text-ink-primary bg-transparent outline-none disabled:cursor-not-allowed"
          />
        </div>
      </div>
      {error && <p className="type-caption text-status-error">{error}</p>}
      {hint && !error && <p className="type-caption text-ink-muted">{hint}</p>}
    </div>
  );
}
