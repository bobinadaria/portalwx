"use client";

import { useState } from "react";
import { Showcase, Preview } from "../_showcase";
import { Alert } from "@/components/feedback/Alert";
import { Toast } from "@/components/feedback/Toast";
import { Spinner } from "@/components/ui/Spinner";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Tooltip } from "@/components/ui/Tooltip";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";
import { Inbox } from "lucide-react";

export default function FeedbackPage() {
  const [toast, setToast] = useState<string | null>(null);

  return (
    <Showcase title="Feedback" description="Alerts, toasts, spinners, skeletons, empty states, tooltips, and dividers.">
      <Preview label="Alert">
        <div className="space-y-3">
          <Alert variant="info" title="Scheduled maintenance">Planned downtime on March 20, 2026.</Alert>
          <Alert variant="success" title="Sync complete">All sites are up to date.</Alert>
          <Alert variant="warning" title="Threshold exceeded">Building A utilization above 95%.</Alert>
          <Alert variant="error" title="Connection lost">Unable to reach the access controller.</Alert>
        </div>
      </Preview>

      <Preview label="Toast">
        <div className="space-y-3">
          <Button size="sm" variant="secondary" onClick={() => setToast("success")}>Show success</Button>
          <Button size="sm" variant="secondary" onClick={() => setToast("error")}>Show error</Button>
          {toast && (
            <Toast
              variant={toast as "success" | "error"}
              message={toast === "success" ? "Changes saved successfully." : "Failed to save changes."}
              visible
              onDismiss={() => setToast(null)}
            />
          )}
        </div>
      </Preview>

      <Preview label="Spinner">
        <div className="flex items-center gap-4">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
      </Preview>

      <Preview label="Skeleton">
        <div className="space-y-3 max-w-xs">
          <Skeleton variant="text" />
          <Skeleton variant="text" className="w-3/4" />
          <div className="flex items-center gap-3">
            <Skeleton variant="circle" />
            <div className="flex-1 space-y-2">
              <Skeleton variant="text" />
              <Skeleton variant="text" className="w-1/2" />
            </div>
          </div>
          <Skeleton variant="rect" />
        </div>
      </Preview>

      <Preview label="EmptyState">
        <EmptyState
          icon={<Inbox size={32} />}
          title="No data available"
          description="Start by adding a new site to see information here."
          action={<Button size="sm">Add site</Button>}
        />
      </Preview>

      <Preview label="Tooltip">
        <div className="flex gap-6">
          <Tooltip content="This is a tooltip (top)" side="top">
            <span className="type-label underline decoration-dashed cursor-default">Hover me (top)</span>
          </Tooltip>
          <Tooltip content="This is a tooltip (bottom)" side="bottom">
            <span className="type-label underline decoration-dashed cursor-default">Hover me (bottom)</span>
          </Tooltip>
        </div>
      </Preview>

      <Preview label="Divider">
        <div className="space-y-4">
          <Divider />
          <Divider label="or" />
        </div>
      </Preview>
    </Showcase>
  );
}
