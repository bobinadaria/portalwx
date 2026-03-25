import { cn } from "@/lib/utils";

type ValidateGroupState = "idle" | "valid" | "invalid";

interface ValidateGroupProps {
  state?: ValidateGroupState;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const stateStyles: Record<ValidateGroupState, string> = {
  idle:    "border-border-default",
  valid:   "border-status-success/40 bg-status-success-bg/20",
  invalid: "border-status-error/40 bg-status-error-bg/20",
};

export function ValidateGroup({
  state = "idle",
  title,
  description,
  children,
  className,
}: ValidateGroupProps) {
  return (
    <fieldset
      className={cn(
        "border rounded-xl p-4 flex flex-col gap-4 transition-colors",
        stateStyles[state],
        className
      )}
    >
      {(title || description) && (
        <div className="flex flex-col gap-0.5">
          {title && <legend className="type-label text-ink-primary float-none">{title}</legend>}
          {description && <p className="type-caption text-ink-muted">{description}</p>}
        </div>
      )}
      {children}
    </fieldset>
  );
}
