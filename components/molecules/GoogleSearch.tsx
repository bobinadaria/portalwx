"use client";

import { useState } from "react";
import { MapPin, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PlaceSuggestion {
  placeId: string;
  label: string;
  description: string;
}

interface GoogleSearchProps {
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (place: PlaceSuggestion) => void;
  suggestions?: PlaceSuggestion[];
  loading?: boolean;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export function GoogleSearch({
  value = "",
  onChange,
  onSelect,
  suggestions = [],
  loading = false,
  placeholder = "Search address or place…",
  label,
  disabled = false,
  error,
  className,
}: GoogleSearchProps) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);

  const showDropdown = open && focused && (loading || suggestions.length > 0);

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && <label className="type-label text-ink-secondary">{label}</label>}
      <div className="relative">
        <div
          className={cn(
            "flex items-center gap-2 h-9 px-3 rounded border transition-colors bg-surface-raised",
            error ? "border-status-error" : focused ? "border-signature" : "border-border-default",
            disabled && "opacity-50"
          )}
        >
          {loading
            ? <Loader2 className="h-4 w-4 text-ink-muted shrink-0 animate-spin" />
            : <MapPin className="h-4 w-4 text-ink-muted shrink-0" aria-hidden="true" />
          }
          <input
            type="text"
            value={value}
            onChange={(e) => { onChange?.(e.target.value); setOpen(true); }}
            onFocus={() => { setFocused(true); setOpen(true); }}
            onBlur={() => { setFocused(false); setTimeout(() => setOpen(false), 150); }}
            placeholder={placeholder}
            disabled={disabled}
            className="flex-1 text-sm text-ink-primary bg-transparent outline-none placeholder:text-ink-muted disabled:cursor-not-allowed"
            role="combobox"
            aria-expanded={showDropdown}
            aria-autocomplete="list"
          />
          {value && !disabled && (
            <button onClick={() => { onChange?.(""); setOpen(false); }} aria-label="Clear">
              <X className="h-3.5 w-3.5 text-ink-muted hover:text-ink-primary" />
            </button>
          )}
        </div>

        {showDropdown && (
          <div className="absolute z-50 mt-1 w-full rounded-xl border border-border-default bg-surface-overlay shadow-[var(--shadow-overlay)] py-1 max-h-60 overflow-auto">
            {loading && (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-4 w-4 text-ink-muted animate-spin" />
              </div>
            )}
            {!loading && suggestions.map((s) => (
              <button
                key={s.placeId}
                onMouseDown={(e) => { e.preventDefault(); onSelect?.(s); onChange?.(s.label); setOpen(false); }}
                className="flex items-start gap-2.5 w-full px-3 py-2 text-left hover:bg-surface-subtle transition-colors"
              >
                <MapPin className="h-4 w-4 text-ink-muted shrink-0 mt-0.5" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="type-label text-ink-primary truncate">{s.label}</p>
                  <p className="type-caption text-ink-muted truncate">{s.description}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <p className="type-caption text-status-error">{error}</p>}
    </div>
  );
}
