"use client";

import { useState } from "react";
import { Showcase, Preview } from "../_showcase";
import { WeekContainer, WeekDay } from "@/components/ui/WeekContainer";
import { DayStatus } from "@/components/ui/DayStatus";

function buildWeek(startDate: Date): WeekDay[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    return { date: d, label: d.toLocaleDateString("en-GB", { weekday: "short" }) };
  });
}

const VARIANTS = [
  "available", "partial", "available", "busy", "available", "closed", "holiday",
] as const;

function WeekDemo() {
  const [offset, setOffset] = useState(0);
  const base = new Date(2026, 2, 16); // Mon 16 Mar 2026
  base.setDate(base.getDate() + offset * 7);
  const days = buildWeek(base);
  const today = new Date(2026, 2, 18);

  return (
    <WeekContainer
      days={days}
      title={`Week of ${base.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`}
      onPrev={() => setOffset((o) => o - 1)}
      onNext={() => setOffset((o) => o + 1)}
      renderDay={(day, i) => (
        <DayStatus
          day={day.date.getDate()}
          variant={VARIANTS[i]}
          today={day.date.toDateString() === today.toDateString()}
          onClick={() => {}}
        />
      )}
    />
  );
}

export default function WeekContainerPage() {
  return (
    <Showcase title="WeekContainer" description="7-column week grid with navigation. Renders day content via renderDay prop.">

      <Preview label="With DayStatus cells">
        <WeekDemo />
      </Preview>

      <Preview label="No navigation">
        <WeekContainer
          days={buildWeek(new Date(2026, 2, 16))}
          showNavigation={false}
          title="Schedule overview"
          renderDay={(day, i) => (
            <DayStatus
              day={day.date.getDate()}
              variant={VARIANTS[i]}
            />
          )}
        />
      </Preview>

    </Showcase>
  );
}
