"use client";
import { Showcase, Preview } from "../_showcase";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function CardBadgePage() {
  return (
    <Showcase title="Card & Badge" description="Surface containers and status labels.">
      <Preview label="Card — Padding Variants">
        <div className="grid grid-cols-3 gap-4">
          <Card padding="sm">
            <p className="type-caption">Small padding</p>
            <p className="type-heading mt-1">128</p>
          </Card>
          <Card padding="md">
            <p className="type-caption">Medium padding</p>
            <p className="type-heading mt-1">256</p>
          </Card>
          <Card padding="lg">
            <p className="type-caption">Large padding</p>
            <p className="type-heading mt-1">512</p>
          </Card>
        </div>
      </Preview>

      <Preview label="Card — Interactive">
        <div className="grid grid-cols-2 gap-4">
          <Card interactive>
            <p className="type-heading">Clickable card</p>
            <p className="type-body mt-1">Hover to see shadow elevation.</p>
          </Card>
          <Card>
            <p className="type-heading">Static card</p>
            <p className="type-body mt-1">No hover interaction.</p>
          </Card>
        </div>
      </Preview>

      <Preview label="Badge — Variants">
        <div className="flex flex-wrap gap-2">
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="brand">Brand</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </Preview>

      <Preview label="Badge — With Dot">
        <div className="flex flex-wrap gap-2">
          <Badge variant="success" dot>Online</Badge>
          <Badge variant="error" dot>Offline</Badge>
          <Badge variant="warning" dot>Degraded</Badge>
          <Badge variant="info" dot>Syncing</Badge>
        </div>
      </Preview>
    </Showcase>
  );
}
