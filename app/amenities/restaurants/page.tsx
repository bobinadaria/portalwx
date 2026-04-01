"use client";
import { ModuleHeader } from "@/components/navigation/ModuleHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Utensils } from "lucide-react";

export default function RestaurantsPage() {
  return (
    <div className="max-w-full px-4 md:px-10 lg:px-16 py-4 md:py-8">
      <div className="max-w-wide mx-auto space-y-6">
        <ModuleHeader title="Restaurants" primaryAction="Add Restaurant" />
        <EmptyState icon={<Utensils size={32} />} title="No restaurants yet" description="Add your first restaurant to get started" />
      </div>
    </div>
  );
}
