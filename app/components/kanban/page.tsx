"use client";

import { Showcase, Preview } from "../_showcase";
import { KanbanCol } from "@/components/ui/KanbanCol";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Text } from "@/components/ui/Text";

function KanbanCard({ title, label, variant }: { title: string; label: string; variant: "info" | "warning" | "success" | "error" }) {
  return (
    <Card padding="sm" className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Badge variant={variant}>{label}</Badge>
      </div>
      <Text role="label">{title}</Text>
    </Card>
  );
}

export default function KanbanPage() {
  return (
    <Showcase title="KanbanCol" description="Kanban board column. Compose multiple columns in a horizontal scroll container.">

      <Preview label="Kanban board">
        <div className="flex gap-4 overflow-x-auto pb-2">
          <KanbanCol title="Backlog" count={3} onAdd={() => {}}>
            <KanbanCard title="Setup access control policy" label="Policy" variant="info" />
            <KanbanCard title="Review visitor logs"         label="Review" variant="warning" />
            <KanbanCard title="Update floor maps"           label="Facility" variant="info" />
          </KanbanCol>

          <KanbanCol title="In Progress" count={2} onAdd={() => {}}>
            <KanbanCard title="Integrate new badge system"  label="Integration" variant="warning" />
            <KanbanCard title="Train reception staff"       label="Training" variant="info" />
          </KanbanCol>

          <KanbanCol title="Review" count={1}>
            <KanbanCard title="QR code visitor flow"        label="UX" variant="success" />
          </KanbanCol>

          <KanbanCol title="Done" count={4}>
            <KanbanCard title="Deploy v2.1 badge firmware"  label="Done" variant="success" />
            <KanbanCard title="Visitor data audit"          label="Done" variant="success" />
          </KanbanCol>

          <KanbanCol title="Blocked" count={0} emptyMessage="No blocked tasks">
          </KanbanCol>
        </div>
      </Preview>

    </Showcase>
  );
}
