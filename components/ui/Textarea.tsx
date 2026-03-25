import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helper?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, helper, error, className, id, ...props }, ref) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="type-label block">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          className={cn(
            "min-h-[80px] w-full rounded border bg-surface-raised px-3 py-2 text-sm text-ink-primary placeholder:text-ink-muted transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-1",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-status-error" : "border-border-default hover:border-border-strong",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-status-error">{error}</p>}
        {!error && helper && <p className="type-caption">{helper}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
