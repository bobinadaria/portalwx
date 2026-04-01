"use client";
import { ModuleHeader } from "@/components/navigation/ModuleHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { MapPin } from "lucide-react";
export default function LocalServicesPage() {
  return (
    <div className="max-w-full px-4 md:px-10 lg:px-16 py-4 md:py-8">
      <div className="max-w-wide mx-auto space-y-6">
        <ModuleHeader title="Local Services" primaryAction="Add Service" />
        <EmptyState icon={<MapPin size={32} />} title="No local services" description="Nearby services will appear here" />
      </div>
    </div>
  );
}
