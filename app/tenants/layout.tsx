import { PortalShell } from "@/components/navigation/PortalShell";

export default function TenantsLayout({ children }: { children: React.ReactNode }) {
  return <PortalShell>{children}</PortalShell>;
}
