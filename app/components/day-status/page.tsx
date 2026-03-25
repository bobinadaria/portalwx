"use client";

import { Showcase, Preview } from "../_showcase";
import { DayStatus } from "@/components/ui/DayStatus";

export default function DayStatusPage() {
  return (
    <Showcase title="DayStatus" description="Compact day cell with status indicator. Used in calendar and schedule views.">

      <Preview label="Variants">
        <div className="flex items-center gap-2 flex-wrap">
          <DayStatus day={1} variant="available" label="Available" />
          <DayStatus day={2} variant="busy"      label="Busy" />
          <DayStatus day={3} variant="partial"   label="Partial" />
          <DayStatus day={4} variant="closed"    label="Closed" />
          <DayStatus day={5} variant="holiday"   label="Holiday" />
          <DayStatus day={6} variant="none"      label="No status" />
        </div>
      </Preview>

      <Preview label="Selected & today">
        <div className="flex items-center gap-2 flex-wrap">
          <DayStatus day={18} selected label="Selected" />
          <DayStatus day={19} today   label="Today" />
          <DayStatus day={20} disabled label="Disabled" />
          <DayStatus day={21} variant="available" selected label="Selected + dot" />
        </div>
      </Preview>

      <Preview label="Week row (interactive)">
        <div className="flex items-center gap-1">
          {[
            { day: 16, variant: "available" as const },
            { day: 17, variant: "partial"   as const },
            { day: 18, variant: "available" as const, today: true },
            { day: 19, variant: "busy"      as const },
            { day: 20, variant: "available" as const },
            { day: 21, variant: "closed"    as const },
            { day: 22, variant: "holiday"   as const },
          ].map(({ day, variant, today }) => (
            <DayStatus
              key={day}
              day={day}
              variant={variant}
              today={today}
              onClick={() => {}}
            />
          ))}
        </div>
      </Preview>

    </Showcase>
  );
}
