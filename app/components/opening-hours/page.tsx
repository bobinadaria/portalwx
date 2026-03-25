"use client";

import { useState } from "react";
import { Showcase, Preview } from "../_showcase";
import { OpeningHours } from "@/components/molecules/OpeningHours";

const schedule = [
  { day: "Monday",    open: "09:00", close: "18:00" },
  { day: "Tuesday",   open: "09:00", close: "18:00" },
  { day: "Wednesday", open: "09:00", close: "18:00" },
  { day: "Thursday",  open: "09:00", close: "18:00" },
  { day: "Friday",    open: "09:00", close: "17:00" },
  { day: "Saturday",  open: "10:00", close: "14:00", closed: false },
  { day: "Sunday",    open: "10:00", close: "14:00", closed: true },
];

export default function OpeningHoursPage() {
  const [editSchedule, setEditSchedule] = useState(schedule);

  return (
    <Showcase title="OpeningHours" description="Business hours display and editor. Shows open/closed times per day with today highlight.">

      <Preview label="Read-only (today = Wednesday)">
        <div className="max-w-xs">
          <OpeningHours schedule={schedule} currentDay="Wednesday" />
        </div>
      </Preview>

      <Preview label="Editable">
        <div className="max-w-sm">
          <OpeningHours
            schedule={editSchedule}
            onChange={setEditSchedule}
            editable
          />
        </div>
      </Preview>

    </Showcase>
  );
}
