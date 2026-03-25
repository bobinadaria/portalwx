"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type CodeEditorLanguage = "javascript" | "typescript" | "json" | "html" | "css" | "bash" | "python" | "text";

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  language?: CodeEditorLanguage;
  readOnly?: boolean;
  showCopy?: boolean;
  showLineNumbers?: boolean;
  rows?: number;
  label?: string;
  className?: string;
}

export function CodeEditor({
  value,
  onChange,
  language = "text",
  readOnly = false,
  showCopy = true,
  showLineNumbers = true,
  rows = 10,
  label,
  className,
}: CodeEditorProps) {
  const [copied, setCopied] = useState(false);

  const lines = value.split("\n");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <div className="flex items-center justify-between">
          <span className="type-label text-ink-secondary">{label}</span>
          <span className="type-caption text-ink-muted uppercase tracking-wide">{language}</span>
        </div>
      )}
      <div className="relative rounded-xl border border-border-default bg-surface-raised overflow-hidden font-mono text-sm">
        {showCopy && (
          <button
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy code"}
            className="absolute top-2 right-2 z-10 p-1.5 rounded bg-surface-subtle hover:bg-surface-overlay border border-border-default text-ink-muted hover:text-ink-primary transition-colors"
          >
            {copied
              ? <Check className="h-3.5 w-3.5 text-status-success" />
              : <Copy className="h-3.5 w-3.5" />
            }
          </button>
        )}
        <div className="flex overflow-auto">
          {showLineNumbers && (
            <div
              className="select-none px-3 py-3 text-right text-ink-muted bg-surface-subtle border-r border-border-default min-w-[40px] flex flex-col"
              aria-hidden="true"
            >
              {lines.map((_, i) => (
                <span key={i} className="leading-6 text-xs">{i + 1}</span>
              ))}
            </div>
          )}
          {readOnly ? (
            <pre className="flex-1 p-3 text-ink-primary text-xs leading-6 overflow-auto whitespace-pre">
              <code>{value}</code>
            </pre>
          ) : (
            <textarea
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              rows={rows}
              spellCheck={false}
              className="flex-1 p-3 text-ink-primary text-xs leading-6 bg-transparent resize-none outline-none font-mono w-full"
            />
          )}
        </div>
      </div>
    </div>
  );
}
