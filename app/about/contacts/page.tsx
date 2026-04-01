"use client";
import { ModuleHeader } from "@/components/navigation/ModuleHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Phone } from "lucide-react";
export default function ContactsPage() {
  return (
    <div className="max-w-full px-4 md:px-10 lg:px-16 py-4 md:py-8">
      <div className="max-w-wide mx-auto space-y-6">
        <ModuleHeader title="Contacts" primaryAction="Add Contact" />
        <EmptyState icon={<Phone size={32} />} title="No contacts yet" description="Building contacts will appear here" />
      </div>
    </div>
  );
}
