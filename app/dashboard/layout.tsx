import { PortalShell } from "@/components/navigation/PortalShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PortalShell>{children}</PortalShell>;
}
