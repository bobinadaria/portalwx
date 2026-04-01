"use client";
import { ModuleHeader } from "@/components/navigation/ModuleHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { HelpCircle } from "lucide-react";
export default function HelpPage() {
  return (
    <div className="max-w-full px-4 md:px-10 lg:px-16 py-4 md:py-8">
      <div className="max-w-wide mx-auto space-y-6">
        <ModuleHeader title="Help" showSearch={false} />
        <EmptyState icon={<HelpCircle size={32} />} title="Help & Support" description="Documentation and support resources coming soon" />
      </div>
    </div>
  );
}
