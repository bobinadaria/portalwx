"use client";

import { cn } from "@/lib/utils";

interface RadioProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  name?: string;
  value?: string;
  className?: string;
}

export function Radio({ checked = false, onChange, label, disabled, name, value, className }: RadioProps) {
  const id = `radio-${name}-${value}`;

  return (
    <label
      htmlFor={id}
      className={cn(
        "inline-flex items-center gap-2 text-sm",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className
      )}
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          className="peer sr-only"
        />
        <span
          className={cn(
            "h-4 w-4 rounded-full border-2 transition-colors",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-signature peer-focus-visible:ring-offset-1",
            checked ? "border-signature" : "border-border-strong"
          )}
        />
        {checked && (
          <span className="absolute h-2 w-2 rounded-full bg-signature" />
        )}
      </span>
      {label && <span className="text-ink-primary">{label}</span>}
    </label>
  );
}
