"use client";

import { Showcase, Preview } from "../_showcase";
import { BadgeCard } from "@/components/molecules/BadgeCard";
import { Grid } from "@/components/layout/Grid";
import { Button } from "@/components/ui/Button";
import { Building2, Shield, Users, Wifi } from "lucide-react";

export default function BadgeCardPage() {
  return (
    <Showcase title="BadgeCard" description="Card with overlaid badge. Used for system status, feature listings, and entity cards.">

      <Preview label="Variants">
        <Grid cols={2} gap="md">
          <BadgeCard title="Building A"    badge="Active"  badgeVariant="success" icon={<Building2 />} description="London HQ — 5 floors" onClick={() => {}} />
          <BadgeCard title="Security Team" badge="Busy"    badgeVariant="warning" icon={<Shield />}    description="3 open incidents" onClick={() => {}} />
          <BadgeCard title="Visitor Group" badge="Pending" badgeVariant="info"    icon={<Users />}     description="Awaiting check-in" />
          <BadgeCard title="WiFi Network"  badge="Offline" badgeVariant="error"   icon={<Wifi />}      description="Connectivity issue" />
        </Grid>
      </Preview>

      <Preview label="With footer actions">
        <div className="max-w-sm">
          <BadgeCard
            title="Access Report"
            badge="New"
            badgeVariant="brand"
            description="Weekly summary — March 2026"
            footer={
              <div className="flex gap-2">
                <Button size="sm" variant="secondary">Preview</Button>
                <Button size="sm">Download</Button>
              </div>
            }
          />
        </div>
      </Preview>

    </Showcase>
  );
}
