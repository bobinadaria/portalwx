"use client";
import { ModuleHeader } from "@/components/navigation/ModuleHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { CalendarCheck } from "lucide-react";

export default function BookingsPage() {
  return (
    <div className="max-w-full px-4 md:px-10 lg:px-16 py-4 md:py-8">
      <div className="max-w-wide mx-auto space-y-6">
        <ModuleHeader title="Bookings 2.0" primaryAction="Add Asset" analyticsHref="/amenities/bookings/analytics" />
        <EmptyState icon={<CalendarCheck size={32} />} title="No bookings yet" description="Assets and reservations will appear here" />
      </div>
    </div>
  );
}
