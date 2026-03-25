"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  min?: string;
  max?: string;
  step?: number;
  disabled?: boolean;
  error?: string;
  hint?: string;
  className?: string;
}

export function TimePicker({
  value,
  onChange,
  label,
  placeholder = "00:00",
  min,
  max,
  step,
  disabled = false,
  error,
  hint,
  className,
}: TimePickerProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && <label className="type-label text-ink-secondary">{label}</label>}
      <div
        className={cn(
          "flex items-center gap-2 h-9 px-3 rounded border transition-colors bg-surface-raised",
          error ? "border-status-error" : focused ? "border-signature" : "border-border-default",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <Clock className="h-4 w-4 text-ink-muted shrink-0" aria-hidden="true" />
        <input
          type="time"
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 text-sm text-ink-primary bg-transparent outline-none placeholder:text-ink-muted disabled:cursor-not-allowed"
        />
      </div>
      {error && <p className="type-caption text-status-error">{error}</p>}
      {hint && !error && <p className="type-caption text-ink-muted">{hint}</p>}
    </div>
  );
}
