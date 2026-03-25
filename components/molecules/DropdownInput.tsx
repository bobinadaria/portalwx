"use client";

import { useState, useRef } from "react";
import { ChevronDown, Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DropdownInputOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface DropdownInputProps {
  options: DropdownInputOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  searchable?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export function DropdownInput({
  options,
  value,
  onChange,
  placeholder = "Select…",
  label,
  searchable = false,
  disabled = false,
  error,
  className,
}: DropdownInputProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  const filtered = searchable
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  const handleSelect = (opt: DropdownInputOption) => {
    if (opt.disabled) return;
    onChange?.(opt.value);
    setOpen(false);
    setSearch("");
  };

  const handleToggle = () => {
    if (!disabled) setOpen((v) => !v);
  };

  // Close on outside click
  const handleBlur = (e: React.FocusEvent) => {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      setOpen(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && <label className="type-label text-ink-secondary">{label}</label>}
      <div ref={containerRef} className="relative" onBlur={handleBlur}>
        <button
          type="button"
          onClick={handleToggle}
          aria-haspopup="listbox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "flex items-center justify-between w-full h-9 px-3 rounded border text-sm transition-colors",
            "bg-surface-raised text-ink-primary",
            error ? "border-status-error" : "border-border-default",
            !disabled && "hover:border-border-strong focus:border-signature focus:outline-none",
            disabled && "opacity-50 cursor-not-allowed",
            open && "border-signature"
          )}
        >
          <span className={cn(!selected && "text-ink-muted")}>
            {selected ? (
              <span className="flex items-center gap-2">
                {selected.icon && <span className="[&>svg]:h-4 [&>svg]:w-4 text-ink-muted">{selected.icon}</span>}
                {selected.label}
              </span>
            ) : placeholder}
          </span>
          <ChevronDown className={cn("h-4 w-4 text-ink-muted transition-transform shrink-0", open && "rotate-180")} />
        </button>

        {open && (
          <div className="absolute z-50 mt-1 w-full rounded-xl border border-border-default bg-surface-overlay shadow-[var(--shadow-overlay)] py-1">
            {searchable && (
              <div className="px-2 pb-1 border-b border-border-subtle">
                <div className="flex items-center gap-2 px-2 py-1.5">
                  <Search className="h-3.5 w-3.5 text-ink-muted shrink-0" />
                  <input
                    autoFocus
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search…"
                    className="flex-1 text-sm bg-transparent outline-none text-ink-primary placeholder:text-ink-muted"
                  />
                </div>
              </div>
            )}
            <ul role="listbox" className="max-h-56 overflow-auto py-1">
              {filtered.length === 0 && (
                <li className="px-3 py-2 type-caption text-ink-muted">No options found</li>
              )}
              {filtered.map((opt) => (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={opt.value === value}
                  aria-disabled={opt.disabled}
                  onClick={() => handleSelect(opt)}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 text-sm cursor-pointer transition-colors",
                    opt.disabled ? "text-ink-muted cursor-not-allowed" : "text-ink-primary hover:bg-surface-subtle",
                    opt.value === value && "bg-brand-l2"
                  )}
                >
                  {opt.icon && <span className="[&>svg]:h-4 [&>svg]:w-4 text-ink-muted shrink-0">{opt.icon}</span>}
                  <span className="flex-1">{opt.label}</span>
                  {opt.value === value && <Check className="h-3.5 w-3.5 text-signature shrink-0" />}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {error && <p className="type-caption text-status-error">{error}</p>}
    </div>
  );
}
