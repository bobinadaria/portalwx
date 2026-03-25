import { Showcase, Preview } from "../_showcase";
import { PageHeader } from "@/components/molecules/PageHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Plus, Download } from "lucide-react";

export default function PageHeaderPage() {
  return (
    <Showcase title="PageHeader" description="Page-level header with title, description, breadcrumbs, badge, and actions.">

      <Preview label="Full header">
        <PageHeader
          title="Visitor Management"
          description="Track and manage all visitors across your facilities."
          crumbs={[
            { label: "Dashboard", href: "/" },
            { label: "People", href: "/people" },
            { label: "Visitors" },
          ]}
          badge={<Badge variant="info">Beta</Badge>}
          actions={
            <>
              <Button variant="secondary" size="sm" icon={<Download className="h-4 w-4" />}>Export</Button>
              <Button size="sm" icon={<Plus className="h-4 w-4" />}>Add Visitor</Button>
            </>
          }
        />
      </Preview>

      <Preview label="Minimal">
        <PageHeader title="Settings" />
      </Preview>

      <Preview label="With breadcrumbs only">
        <PageHeader
          title="Building A"
          crumbs={[
            { label: "Facilities" },
            { label: "Building A" },
          ]}
        />
      </Preview>

    </Showcase>
  );
}
