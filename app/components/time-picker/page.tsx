"use client";

import { useState } from "react";
import { Showcase, Preview } from "../_showcase";
import { TimePicker } from "@/components/molecules/TimePicker";
import { DateTimePicker } from "@/components/molecules/DateTimePicker";

export default function TimePickerPage() {
  const [time, setTime] = useState("09:00");
  const [dt, setDt] = useState({ date: "2026-03-18", time: "14:30" });

  return (
    <Showcase title="TimePicker & DateTimePicker" description="Time input and combined date+time picker.">

      <Preview label="TimePicker">
        <div className="flex flex-col gap-4 max-w-xs">
          <TimePicker label="Start time" value={time} onChange={setTime} />
          <TimePicker label="End time" placeholder="Select time" hint="Must be after start time" />
          <TimePicker label="Disabled" value="10:00" disabled />
          <TimePicker label="With error" value="25:00" error="Invalid time format." />
        </div>
      </Preview>

      <Preview label="DateTimePicker">
        <div className="max-w-sm">
          <DateTimePicker
            label="Meeting time"
            value={dt}
            onChange={setDt}
            hint="Timezone: UTC"
          />
        </div>
      </Preview>

    </Showcase>
  );
}
