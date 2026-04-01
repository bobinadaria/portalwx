"use client";
import { ModuleHeader } from "@/components/navigation/ModuleHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Users } from "lucide-react";

export default function GuestbookPage() {
  return (
    <div className="max-w-full px-4 md:px-10 lg:px-16 py-4 md:py-8">
      <div className="max-w-wide mx-auto space-y-6">
        <ModuleHeader title="Guestbook" primaryAction="Add Visit" analyticsHref="/operations/guestbook/analytics" />
        <EmptyState icon={<Users size={32} />} title="No visits today" description="Visitor registrations will appear here" />
      </div>
    </div>
  );
}
