"use client";

import { useState } from "react";
import { Showcase, Preview } from "../_showcase";
import { Banner } from "@/components/feedback/Banner";
import { Button } from "@/components/ui/Button";

export default function BannerPage() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <Showcase title="Banner" description="Page-level announcement bar for persistent status messages, notices, and alerts.">

      <Preview label="Variants">
        <div className="flex flex-col gap-3">
          <Banner variant="info"    title="Information">Your license renews in 7 days. Review your plan details.</Banner>
          <Banner variant="success" title="Success">All systems operational. Last checked 2 minutes ago.</Banner>
          <Banner variant="warning" title="Warning">Maintenance window scheduled for Saturday 02:00–04:00 UTC.</Banner>
          <Banner variant="error"   title="Error">Sync failed. Please check your connection and try again.</Banner>
          <Banner variant="neutral">New version available. Refresh to update.</Banner>
        </div>
      </Preview>

      <Preview label="With action">
        <Banner
          variant="info"
          title="Data export ready"
          action={<Button size="sm" variant="secondary">Download</Button>}
        >
          Your requested export is ready. The file will be available for 24 hours.
        </Banner>
      </Preview>

      <Preview label="Dismissible">
        {dismissed ? (
          <Button size="sm" variant="secondary" onClick={() => setDismissed(false)}>Show banner</Button>
        ) : (
          <Banner variant="warning" title="Action required" onDismiss={() => setDismissed(true)}>
            Complete your profile to unlock all features.
          </Banner>
        )}
      </Preview>

    </Showcase>
  );
}
