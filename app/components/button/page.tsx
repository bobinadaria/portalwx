"use client";
import { Showcase, Preview } from "../_showcase";
import { Button } from "@/components/ui/Button";
import { Plus, Download, Trash2, Settings, MoreHorizontal } from "lucide-react";

export default function ButtonPage() {
  return (
    <Showcase title="Button" description="Six Figma-accurate variants across two surfaces and two sizes. Matches hierarchy: Primary / Secondary / Tertiary / Danger / Link / Icon.">

      {/* Light surface */}
      <Preview label="Primary — Light surface">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" icon={<Plus size={16} />}>Default</Button>
          <Button variant="primary" icon={<Plus size={16} />} className="hover:bg-brand-d2">Hover</Button>
          <Button variant="primary" disabled icon={<Plus size={16} />}>Disabled</Button>
          <Button variant="primary" loading>Loading</Button>
        </div>
      </Preview>

      <Preview label="Secondary — Light surface">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" icon={<Plus size={16} />}>Default</Button>
          <Button variant="secondary" disabled icon={<Plus size={16} />}>Disabled</Button>
          <Button variant="secondary" loading>Loading</Button>
        </div>
      </Preview>

      <Preview label="Tertiary — Light surface">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="tertiary" icon={<Settings size={14} />}>Default</Button>
          <Button variant="tertiary" disabled icon={<Settings size={14} />}>Disabled</Button>
          <Button variant="tertiary" loading>Loading</Button>
        </div>
      </Preview>

      <Preview label="Danger — Light surface">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="danger" icon={<Trash2 size={16} />}>Delete</Button>
          <Button variant="danger" disabled icon={<Trash2 size={16} />}>Disabled</Button>
          <Button variant="danger" loading>Loading</Button>
        </div>
      </Preview>

      <Preview label="Link — Light surface">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="link" icon={<Download size={14} />}>Download</Button>
          <Button variant="link" disabled>Disabled</Button>
        </div>
      </Preview>

      <Preview label="Icon — Light surface">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="icon" aria-label="More options"><MoreHorizontal size={18} /></Button>
          <Button variant="icon" disabled aria-label="More options"><MoreHorizontal size={18} /></Button>
          <Button variant="icon" loading aria-label="Loading" />
        </div>
      </Preview>

      {/* Dark surface */}
      <Preview label="Primary + Secondary — Dark surface" className="bg-surface-base">
        <div className="flex flex-wrap items-center gap-3 rounded-lg bg-brand-d2 p-4">
          <Button variant="primary" surface="dark" icon={<Settings size={14} />}>Default</Button>
          <Button variant="primary" surface="dark" disabled icon={<Settings size={14} />}>Disabled</Button>
          <Button variant="secondary" surface="dark" icon={<Settings size={14} />}>Secondary</Button>
          <Button variant="secondary" surface="dark" disabled>Disabled</Button>
          <Button variant="icon" surface="dark" aria-label="More"><MoreHorizontal size={18} /></Button>
        </div>
      </Preview>

      {/* Sizes */}
      <Preview label="Sizes">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" size="lg" icon={<Plus size={16} />}>Large (48px)</Button>
          <Button variant="tertiary" size="md" icon={<Settings size={14} />}>Medium (36px)</Button>
          <Button variant="link">Link (auto)</Button>
        </div>
      </Preview>

    </Showcase>
  );
}
