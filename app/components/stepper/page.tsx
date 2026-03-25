"use client";

import { useState } from "react";
import { Showcase, Preview } from "../_showcase";
import { Stepper } from "@/components/molecules/Stepper";
import { Button } from "@/components/ui/Button";

const steps = [
  { label: "Identity",   description: "Personal details" },
  { label: "Access",     description: "Permissions" },
  { label: "Review",     description: "Confirm setup" },
  { label: "Complete" },
];

export default function StepperPage() {
  const [current, setCurrent] = useState(1);

  return (
    <Showcase title="Stepper" description="Multi-step progress indicator. Horizontal and vertical orientations.">

      <Preview label="Horizontal">
        <div className="flex flex-col gap-6">
          <Stepper steps={steps} current={current} />
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => setCurrent((c) => Math.max(0, c - 1))}>Back</Button>
            <Button size="sm" onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))}>Next</Button>
          </div>
        </div>
      </Preview>

      <Preview label="Vertical">
        <Stepper steps={steps} current={2} orientation="vertical" />
      </Preview>

      <Preview label="States">
        <div className="flex flex-col gap-6">
          <div>
            <p className="type-caption text-ink-muted mb-3">Step 0 active (all pending)</p>
            <Stepper steps={steps} current={0} />
          </div>
          <div>
            <p className="type-caption text-ink-muted mb-3">Step 3 active (all complete)</p>
            <Stepper steps={steps} current={3} />
          </div>
        </div>
      </Preview>

    </Showcase>
  );
}
