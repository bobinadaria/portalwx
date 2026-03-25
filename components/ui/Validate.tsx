import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type ValidateState = "idle" | "valid" | "invalid" | "warning";

interface ValidateProps {
  state?: ValidateState;
  message?: string;
  children: React.ReactNode;
  label?: string;
  required?: boolean;
  hint?: string;
  className?: string;
}

const stateConfig: Record<ValidateState, { border: string; icon: React.ReactNode; text: string }> = {
  idle: {
    border: "border-border-default focus-within:border-signature",
    icon: null,
    text: "text-ink-muted",
  },
  valid: {
    border: "border-status-success",
    icon: <CheckCircle2 className="h-4 w-4 text-status-success" aria-hidden="true" />,
    text: "text-status-success",
  },
  invalid: {
    border: "border-status-error",
    icon: <XCircle className="h-4 w-4 text-status-error" aria-hidden="true" />,
    text: "text-status-error",
  },
  warning: {
    border: "border-status-warning",
    icon: <AlertCircle className="h-4 w-4 text-status-warning" aria-hidden="true" />,
    text: "text-status-warning",
  },
};

export function Validate({
  state = "idle",
  message,
  children,
  label,
  required,
  hint,
  className,
}: ValidateProps) {
  const config = stateConfig[state];
  const id = `validate-${Math.random().toString(36).slice(2, 9)}`;
  const msgId = message ? `${id}-msg` : undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={id} className="type-label text-ink-secondary flex items-center gap-1">
          {label}
          {required && <span className="text-status-error" aria-hidden="true">*</span>}
        </label>
      )}
      <div
        className={cn(
          "relative rounded border transition-colors",
          config.border,
          "[&>*]:border-0 [&>*]:outline-none [&>input]:rounded [&>textarea]:rounded [&>select]:rounded"
        )}
        aria-describedby={msgId}
      >
        {children}
        {state !== "idle" && config.icon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {config.icon}
          </span>
        )}
      </div>
      {hint && !message && (
        <p className="type-caption text-ink-muted">{hint}</p>
      )}
      {message && (
        <p id={msgId} className={cn("type-caption flex items-center gap-1", config.text)}>
          {message}
        </p>
      )}
    </div>
  );
}
