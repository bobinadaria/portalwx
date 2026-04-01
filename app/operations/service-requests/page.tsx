"use client";
import { ModuleHeader } from "@/components/navigation/ModuleHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { ClipboardList } from "lucide-react";

export default function ServiceRequestsPage() {
  return (
    <div className="max-w-full px-4 md:px-10 lg:px-16 py-4 md:py-8">
      <div className="max-w-wide mx-auto space-y-6">
        <ModuleHeader title="Service Requests" primaryAction="New Request" analyticsHref="/operations/service-requests/analytics" />
        <EmptyState icon={<ClipboardList size={32} />} title="No open requests" description="Service requests will appear here" />
      </div>
    </div>
  );
}
