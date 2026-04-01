"use client";
import { ModuleHeader } from "@/components/navigation/ModuleHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { ParkingCircle } from "lucide-react";

export default function ParkingPage() {
  return (
    <div className="max-w-full px-4 md:px-10 lg:px-16 py-4 md:py-8">
      <div className="max-w-wide mx-auto space-y-6">
        <ModuleHeader title="Parking" primaryAction="Add Spot" analyticsHref="/operations/parking/analytics" />
        <EmptyState icon={<ParkingCircle size={32} />} title="No parking spots configured" description="Parking spots and sessions will appear here" />
      </div>
    </div>
  );
}
