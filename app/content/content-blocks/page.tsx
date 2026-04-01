"use client";
import { ModuleHeader } from "@/components/navigation/ModuleHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Newspaper } from "lucide-react";

export default function ContentBlocksPage() {
  return (
    <div className="max-w-full px-4 md:px-10 lg:px-16 py-4 md:py-8">
      <div className="max-w-wide mx-auto space-y-6">
        <ModuleHeader title="Content Blocks" primaryAction="Add Item" />
        <EmptyState icon={<Newspaper size={32} />} title="No items yet" description="Content will appear here once added" />
      </div>
    </div>
  );
}
