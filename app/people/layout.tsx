import { PortalShell } from "@/components/navigation/PortalShell";

export default function PeopleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PortalShell>{children}</PortalShell>;
}
