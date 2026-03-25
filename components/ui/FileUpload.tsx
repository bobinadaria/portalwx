"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";

interface FileUploadProps {
  label?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  helper?: string;
  onChange?: (files: FileList | null) => void;
  className?: string;
}

export function FileUpload({ label, accept, multiple, disabled, helper, onChange, className }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={cn("space-y-1.5", className)}>
      {label && <p className="type-label">{label}</p>}
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border-default bg-surface-subtle px-4 py-6 transition-colors",
          "hover:border-signature hover:bg-brand-l2",
          "focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50"
        )}
      >
        <Upload size={20} className="text-ink-muted" />
        <span className="text-sm text-ink-secondary">
          Click to upload{multiple ? " files" : " a file"}
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.files)}
        className="sr-only"
      />
      {helper && <p className="type-caption">{helper}</p>}
    </div>
  );
}
