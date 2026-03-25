import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helper?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helper, error, icon, className, id, ...props }, ref) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="type-label block">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined}
            className={cn(
              "h-9 w-full rounded border bg-surface-raised px-3 text-sm text-ink-primary placeholder:text-ink-muted transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-1",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error ? "border-status-error" : "border-border-default hover:border-border-strong",
              icon && "pl-9",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-status-error">
            {error}
          </p>
        )}
        {!error && helper && (
          <p id={`${inputId}-helper`} className="type-caption">
            {helper}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
