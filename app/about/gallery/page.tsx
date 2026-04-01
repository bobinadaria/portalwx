"use client";
import { ModuleHeader } from "@/components/navigation/ModuleHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Image } from "lucide-react";
export default function GalleryPage() {
  return (
    <div className="max-w-full px-4 md:px-10 lg:px-16 py-4 md:py-8">
      <div className="max-w-wide mx-auto space-y-6">
        <ModuleHeader title="Gallery" primaryAction="Upload Image" />
        <EmptyState icon={<Image size={32} />} title="No images yet" description="Gallery images will appear here" />
      </div>
    </div>
  );
}
