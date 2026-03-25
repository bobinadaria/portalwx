"use client";

import { Showcase, Preview } from "../_showcase";
import { FacilityReportCard } from "@/components/molecules/FacilityReportCard";
import { Grid } from "@/components/layout/Grid";

export default function FacilityReportPage() {
  return (
    <Showcase title="FacilityReportCard" description="Report card for facility incidents. Supports severity and status badges.">

      <Preview label="Severity variants">
        <Grid cols={2} gap="md">
          <FacilityReportCard
            id="1042"
            title="HVAC Unit Failure — Zone B"
            location="Building A, Floor 3"
            reporter="J. Martinez"
            time="2h ago"
            severity="critical"
            status="open"
            description="HVAC unit has stopped responding. Temperature rising in server room area."
          />
          <FacilityReportCard
            id="1041"
            title="Elevator Door Sensor Fault"
            location="Building C, Lift 2"
            reporter="T. Nguyen"
            time="4h ago"
            severity="high"
            status="in-progress"
            description="Elevator door sensor intermittently failing. Maintenance dispatched."
          />
          <FacilityReportCard
            id="1039"
            title="Parking Barrier Stuck"
            location="Lot B, Gate 1"
            reporter="A. Patel"
            time="Yesterday"
            severity="medium"
            status="resolved"
            description="Barrier arm stuck in raised position after power fluctuation."
          />
          <FacilityReportCard
            id="1037"
            title="Broken Window Handle"
            location="Building A, Room 214"
            reporter="S. Lee"
            time="2 days ago"
            severity="low"
            status="closed"
            description="Window handle broken, requires replacement. No immediate safety risk."
          />
        </Grid>
      </Preview>

      <Preview label="Minimal (no description, clickable)">
        <div className="flex flex-col gap-3 max-w-md">
          <FacilityReportCard
            id="1050"
            title="Access Door Fault — East Wing"
            location="East Wing, Level 1"
            time="30 min ago"
            severity="high"
            status="open"
            onClick={() => {}}
          />
          <FacilityReportCard
            id="1049"
            title="Broken Light Fixture"
            location="Car Park, Section D"
            time="1h ago"
            severity="low"
            status="in-progress"
            onClick={() => {}}
          />
        </div>
      </Preview>

    </Showcase>
  );
}
