"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Stepper, StepperStep } from "./Stepper";

interface WizardStep extends StepperStep {
  content: React.ReactNode;
  onNext?: () => boolean | Promise<boolean>;
}

interface WizardProps {
  steps: WizardStep[];
  onComplete?: () => void;
  onCancel?: () => void;
  className?: string;
}

export function Wizard({ steps, onComplete, onCancel, className }: WizardProps) {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);

  const isFirst = current === 0;
  const isLast = current === steps.length - 1;

  const handleNext = async () => {
    const step = steps[current];
    if (step.onNext) {
      setLoading(true);
      const ok = await step.onNext();
      setLoading(false);
      if (!ok) return;
    }
    if (isLast) {
      onComplete?.();
    } else {
      setCurrent((c) => c + 1);
    }
  };

  const handleBack = () => {
    if (!isFirst) setCurrent((c) => c - 1);
  };

  const stepDefs: StepperStep[] = steps.map(({ label, description }) => ({ label, description }));

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Stepper steps={stepDefs} current={current} orientation="horizontal" />

      <div className="bg-surface-raised rounded-xl border border-border-default p-6 min-h-[200px]">
        {steps[current].content}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {onCancel && (
            <Button variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
          )}
          {!isFirst && (
            <Button
              variant="secondary"
              size="sm"
              icon={<ChevronLeft className="h-4 w-4" />}
              onClick={handleBack}
              disabled={loading}
            >
              Back
            </Button>
          )}
        </div>
        <Button
          size="sm"
          iconRight={isLast ? <Check className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          onClick={handleNext}
          disabled={loading}
        >
          {isLast ? "Finish" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
