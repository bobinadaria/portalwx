"use client";
import { ModuleHeader } from "@/components/navigation/ModuleHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { ShieldCheck } from "lucide-react";

export default function AccessPage() {
  return (
    <div className="max-w-full px-4 md:px-10 lg:px-16 py-4 md:py-8">
      <div className="max-w-wide mx-auto space-y-6">
        <ModuleHeader title="Access" analyticsHref="/operations/access/analytics" />
        <EmptyState icon={<ShieldCheck size={32} />} title="No access events" description="Access events and credentials will appear here" />
      </div>
    </div>
  );
}
