"use client";

import { useState } from "react";
import { Showcase, Preview } from "../_showcase";
import { Tag } from "@/components/ui/Tag";
import { Group } from "@/components/ui/Group";
import { Star } from "lucide-react";

export default function TagPage() {
  const [tags, setTags] = useState(["React", "TypeScript", "Design System", "Enterprise"]);

  return (
    <Showcase title="Tag" description="Inline label tag with optional close button. Supports all status variants.">

      <Preview label="Variants">
        <Group gap="sm" wrap>
          <Tag variant="neutral">Neutral</Tag>
          <Tag variant="brand">Brand</Tag>
          <Tag variant="success">Success</Tag>
          <Tag variant="warning">Warning</Tag>
          <Tag variant="error">Error</Tag>
          <Tag variant="info">Info</Tag>
        </Group>
      </Preview>

      <Preview label="Sizes">
        <Group gap="sm" align="center">
          <Tag size="sm">Small</Tag>
          <Tag size="md">Medium</Tag>
        </Group>
      </Preview>

      <Preview label="With icon">
        <Group gap="sm">
          <Tag variant="brand" icon={<Star />}>Featured</Tag>
          <Tag variant="success" icon={<Star />}>Verified</Tag>
        </Group>
      </Preview>

      <Preview label="Removable tags">
        <Group gap="sm" wrap>
          {tags.map((t) => (
            <Tag key={t} variant="neutral" onRemove={() => setTags((prev) => prev.filter((x) => x !== t))}>
              {t}
            </Tag>
          ))}
        </Group>
      </Preview>

    </Showcase>
  );
}
