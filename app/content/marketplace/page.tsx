"use client";
import { ModuleHeader } from "@/components/navigation/ModuleHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { ShoppingBag } from "lucide-react";

export default function MarketplacePage() {
  return (
    <div className="max-w-full px-4 md:px-10 lg:px-16 py-4 md:py-8">
      <div className="max-w-wide mx-auto space-y-6">
        <ModuleHeader title="Marketplace" primaryAction="Add Offer" analyticsHref="/content/marketplace/analytics" />
        <EmptyState icon={<ShoppingBag size={32} />} title="No offers yet" description="Employee benefits and offers will appear here" />
      </div>
    </div>
  );
}
