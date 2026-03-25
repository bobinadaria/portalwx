"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export function Checkbox({ checked = false, onChange, label, disabled, className, id }: CheckboxProps) {
  const inputId = id ?? (label ? `cb-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "inline-flex items-center gap-2 text-sm",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className
      )}
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        <input
          type="checkbox"
          id={inputId}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          className="peer sr-only"
        />
        <span
          className={cn(
            "h-4 w-4 rounded border transition-colors",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-signature peer-focus-visible:ring-offset-1",
            checked
              ? "border-signature bg-signature"
              : "border-border-strong bg-surface-raised"
          )}
        />
        {checked && (
          <Check size={12} className="absolute text-ink-inverse" strokeWidth={3} />
        )}
      </span>
      {label && <span className="text-ink-primary">{label}</span>}
    </label>
  );
}
