"use client";
import { ModuleHeader } from "@/components/navigation/ModuleHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Building2 } from "lucide-react";

export default function TenantsPage() {
  return (
    <div className="max-w-full px-4 md:px-10 lg:px-16 py-4 md:py-8">
      <div className="max-w-wide mx-auto space-y-6">
        <ModuleHeader
          title="Tenants"
          primaryAction="Add Tenant"
        />
        <EmptyState
          icon={<Building2 size={32} />}
          title="No tenants yet"
          description="Add your first tenant to get started"
        />
      </div>
    </div>
  );
}
