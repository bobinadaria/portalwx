import { PortalShell } from "@/components/navigation/PortalShell";
export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return <PortalShell>{children}</PortalShell>;
}
