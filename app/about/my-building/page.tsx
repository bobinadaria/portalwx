"use client";
import { ModuleHeader } from "@/components/navigation/ModuleHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Home } from "lucide-react";
export default function MyBuildingPage() {
  return (
    <div className="max-w-full px-4 md:px-10 lg:px-16 py-4 md:py-8">
      <div className="max-w-wide mx-auto space-y-6">
        <ModuleHeader title="My Building" primaryAction="Edit" />
        <EmptyState icon={<Home size={32} />} title="Building info" description="Building details and settings will appear here" />
      </div>
    </div>
  );
}
