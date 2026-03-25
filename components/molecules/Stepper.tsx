import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepperStep {
  label: string;
  description?: string;
}

type StepStatus = "completed" | "active" | "pending";
type StepperOrientation = "horizontal" | "vertical";

interface StepperProps {
  steps: StepperStep[];
  current: number;
  orientation?: StepperOrientation;
  className?: string;
}

function getStatus(index: number, current: number): StepStatus {
  if (index < current) return "completed";
  if (index === current) return "active";
  return "pending";
}

export function Stepper({ steps, current, orientation = "horizontal", className }: StepperProps) {
  if (orientation === "vertical") {
    return (
      <ol className={cn("flex flex-col", className)}>
        {steps.map((step, i) => {
          const status = getStatus(i, current);
          const isLast = i === steps.length - 1;
          return (
            <li key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <StepBubble status={status} index={i} />
                {!isLast && (
                  <div className={cn("flex-1 w-px my-1", status === "completed" ? "bg-signature" : "bg-border-default")} />
                )}
              </div>
              <div className={cn("pb-6", isLast && "pb-0")}>
                <p className={cn("type-label", status === "active" ? "text-ink-primary" : status === "completed" ? "text-signature" : "text-ink-muted")}>
                  {step.label}
                </p>
                {step.description && <p className="type-caption text-ink-muted">{step.description}</p>}
              </div>
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <ol className={cn("flex items-start gap-0", className)}>
      {steps.map((step, i) => {
        const status = getStatus(i, current);
        const isLast = i === steps.length - 1;
        return (
          <li key={i} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <StepBubble status={status} index={i} />
              <p className={cn("type-caption text-center whitespace-nowrap",
                status === "active" ? "text-ink-primary font-medium" : status === "completed" ? "text-signature" : "text-ink-muted"
              )}>
                {step.label}
              </p>
            </div>
            {!isLast && (
              <div className={cn("flex-1 h-px mx-2 -mt-4", status === "completed" ? "bg-signature" : "bg-border-default")} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function StepBubble({ status, index }: { status: StepStatus; index: number }) {
  return (
    <span
      className={cn(
        "flex items-center justify-center h-7 w-7 rounded-full border-2 text-xs font-semibold transition-colors",
        status === "completed" && "bg-signature border-signature text-ink-inverse",
        status === "active" && "bg-surface-raised border-signature text-signature",
        status === "pending" && "bg-surface-raised border-border-default text-ink-muted"
      )}
      aria-current={status === "active" ? "step" : undefined}
    >
      {status === "completed" ? <Check className="h-3.5 w-3.5" /> : index + 1}
    </span>
  );
}
