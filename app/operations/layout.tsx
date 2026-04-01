import { PortalShell } from "@/components/navigation/PortalShell";
export default function OperationsLayout({ children }: { children: React.ReactNode }) {
  return <PortalShell>{children}</PortalShell>;
}
