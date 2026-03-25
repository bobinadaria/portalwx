"use client";

import { useState, useRef } from "react";
import { Upload as UploadIcon, X, File, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Bar } from "@/components/ui/Bar";

export interface UploadFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress?: number;
  status?: "uploading" | "done" | "error";
  error?: string;
}

interface UploadProps {
  files?: UploadFile[];
  onFiles?: (files: File[]) => void;
  onRemove?: (id: string) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  disabled?: boolean;
  label?: string;
  hint?: string;
  className?: string;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function Upload({
  files = [],
  onFiles,
  onRemove,
  accept,
  multiple = true,
  maxSize,
  disabled = false,
  label,
  hint,
  className,
}: UploadProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (list: FileList | null) => {
    if (!list || disabled) return;
    const arr = Array.from(list);
    onFiles?.(arr);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {label && <span className="type-label text-ink-secondary">{label}</span>}

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={cn(
          "flex flex-col items-center justify-center gap-2 p-6 rounded-xl border-2 border-dashed transition-colors cursor-pointer",
          dragging ? "border-signature bg-brand-l2" : "border-border-default bg-surface-subtle",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none"
        )}
        role="button"
        aria-label="Upload files"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }}
      >
        <UploadIcon className={cn("h-6 w-6", dragging ? "text-signature" : "text-ink-muted")} aria-hidden="true" />
        <div className="text-center">
          <p className="type-label text-ink-primary">
            Drop files here or <span className="text-signature">browse</span>
          </p>
          {hint && <p className="type-caption text-ink-muted">{hint}</p>}
          {maxSize && <p className="type-caption text-ink-muted">Max {formatBytes(maxSize)}</p>}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => handleFiles(e.target.files)}
          className="sr-only"
        />
      </div>

      {/* File list */}
      {files.length > 0 && (
        <ul className="flex flex-col gap-2">
          {files.map((f) => (
            <li
              key={f.id}
              className="flex items-center gap-3 p-3 rounded-lg border border-border-default bg-surface-raised"
            >
              <File className="h-4 w-4 text-ink-muted shrink-0" aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="type-label text-ink-primary truncate">{f.name}</span>
                  <span className="type-caption text-ink-muted shrink-0">{formatBytes(f.size)}</span>
                </div>
                {f.status === "uploading" && f.progress !== undefined && (
                  <Bar value={f.progress} size="xs" variant="brand" />
                )}
                {f.status === "error" && f.error && (
                  <p className="type-caption text-status-error flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {f.error}
                  </p>
                )}
              </div>
              {f.status === "done" && (
                <CheckCircle2 className="h-4 w-4 text-status-success shrink-0" aria-hidden="true" />
              )}
              {onRemove && (
                <button
                  onClick={() => onRemove(f.id)}
                  aria-label={`Remove ${f.name}`}
                  className="shrink-0 text-ink-muted hover:text-status-error transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
