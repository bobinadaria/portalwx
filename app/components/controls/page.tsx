"use client";

import { useState } from "react";
import { Showcase, Preview } from "../_showcase";
import { Checkbox } from "@/components/ui/Checkbox";
import { Radio } from "@/components/ui/Radio";
import { Toggle } from "@/components/ui/Toggle";

export default function ControlsPage() {
  const [checks, setChecks] = useState({ a: true, b: false, c: false });
  const [radio, setRadio] = useState("daily");
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(false);

  return (
    <Showcase title="Controls" description="Checkbox, radio, and toggle components.">
      <Preview label="Checkbox">
        <div className="space-y-2">
          <Checkbox label="Email notifications" checked={checks.a} onChange={(v) => setChecks({ ...checks, a: v })} />
          <Checkbox label="SMS alerts" checked={checks.b} onChange={(v) => setChecks({ ...checks, b: v })} />
          <Checkbox label="Disabled option" checked={checks.c} disabled />
        </div>
      </Preview>

      <Preview label="Radio">
        <div className="space-y-2">
          <Radio name="freq" value="daily" label="Daily" checked={radio === "daily"} onChange={() => setRadio("daily")} />
          <Radio name="freq" value="weekly" label="Weekly" checked={radio === "weekly"} onChange={() => setRadio("weekly")} />
          <Radio name="freq" value="monthly" label="Monthly" checked={radio === "monthly"} onChange={() => setRadio("monthly")} />
          <Radio name="freq" value="off" label="Disabled" checked={false} disabled />
        </div>
      </Preview>

      <Preview label="Toggle">
        <div className="space-y-3">
          <Toggle label="Dark mode" checked={toggle1} onChange={setToggle1} />
          <Toggle label="Auto-refresh" checked={toggle2} onChange={setToggle2} />
          <Toggle label="Disabled toggle" checked disabled />
        </div>
      </Preview>
    </Showcase>
  );
}
