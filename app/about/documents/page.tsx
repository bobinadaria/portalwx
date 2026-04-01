"use client";
import { ModuleHeader } from "@/components/navigation/ModuleHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { FileText } from "lucide-react";
export default function DocumentsPage() {
  return (
    <div className="max-w-full px-4 md:px-10 lg:px-16 py-4 md:py-8">
      <div className="max-w-wide mx-auto space-y-6">
        <ModuleHeader title="Documents" primaryAction="Upload Document" />
        <EmptyState icon={<FileText size={32} />} title="No documents yet" description="Building documents will appear here" />
      </div>
    </div>
  );
}
