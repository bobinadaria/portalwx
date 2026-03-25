"use client";

import { useState, useRef, useEffect } from "react";
import { Search as SearchIcon, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchResult {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  category?: string;
}

interface SearchProps {
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (result: SearchResult) => void;
  results?: SearchResult[];
  loading?: boolean;
  placeholder?: string;
  label?: string;
  minChars?: number;
  className?: string;
}

export function Search({
  value = "",
  onChange,
  onSelect,
  results = [],
  loading = false,
  placeholder = "Search…",
  label,
  minChars = 2,
  className,
}: SearchProps) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const showResults = open && focused && value.length >= minChars;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    setOpen(true);
  };

  const clear = () => {
    onChange?.("");
    setOpen(false);
    inputRef.current?.focus();
  };

  const handleSelect = (result: SearchResult) => {
    onSelect?.(result);
    setOpen(false);
  };

  const grouped = results.reduce<Record<string, SearchResult[]>>((acc, r) => {
    const cat = r.category ?? "";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(r);
    return acc;
  }, {});

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && <label className="type-label text-ink-secondary">{label}</label>}
      <div ref={containerRef} className="relative">
        <div
          className={cn(
            "flex items-center gap-2 h-9 px-3 rounded border transition-colors bg-surface-raised",
            focused ? "border-signature" : "border-border-default"
          )}
        >
          {loading
            ? <Loader2 className="h-4 w-4 text-ink-muted shrink-0 animate-spin" />
            : <SearchIcon className="h-4 w-4 text-ink-muted shrink-0" aria-hidden="true" />
          }
          <input
            ref={inputRef}
            type="search"
            value={value}
            onChange={handleChange}
            onFocus={() => { setFocused(true); setOpen(true); }}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            className="flex-1 text-sm text-ink-primary bg-transparent outline-none placeholder:text-ink-muted"
            role="combobox"
            aria-expanded={showResults}
            aria-autocomplete="list"
          />
          {value && (
            <button onClick={clear} aria-label="Clear search" className="text-ink-muted hover:text-ink-primary">
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {showResults && (
          <div
            role="listbox"
            className="absolute z-50 mt-1 w-full rounded-xl border border-border-default bg-surface-overlay shadow-[var(--shadow-overlay)] py-1 max-h-72 overflow-auto"
          >
            {loading && (
              <div className="px-3 py-6 flex items-center justify-center">
                <Loader2 className="h-4 w-4 text-ink-muted animate-spin" />
              </div>
            )}
            {!loading && results.length === 0 && (
              <p className="px-3 py-2 type-caption text-ink-muted">No results for "{value}"</p>
            )}
            {!loading && Object.entries(grouped).map(([cat, items]) => (
              <div key={cat}>
                {cat && (
                  <p className="px-3 pt-2 pb-0.5 type-subheading">{cat}</p>
                )}
                {items.map((r) => (
                  <div
                    key={r.id}
                    role="option"
                    onClick={() => handleSelect(r)}
                    className="flex items-center gap-2.5 px-3 py-2 cursor-pointer hover:bg-surface-subtle transition-colors"
                  >
                    {r.icon && (
                      <span className="shrink-0 text-ink-muted [&>svg]:h-4 [&>svg]:w-4">{r.icon}</span>
                    )}
                    <div className="min-w-0">
                      <p className="type-label text-ink-primary truncate">{r.label}</p>
                      {r.description && <p className="type-caption text-ink-muted truncate">{r.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
