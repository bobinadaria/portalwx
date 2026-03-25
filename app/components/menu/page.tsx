"use client";

import { useState } from "react";
import { Showcase, Preview } from "../_showcase";
import { Menu } from "@/components/molecules/Menu";
import { MenuButton } from "@/components/molecules/MenuButton";
import { DropdownButton } from "@/components/molecules/DropdownButton";
import { DropdownInput } from "@/components/molecules/DropdownInput";
import { Edit, Trash2, Copy, Share2, Archive, Download, Plus } from "lucide-react";
import { Group } from "@/components/ui/Group";
import { Button } from "@/components/ui/Button";

const items = [
  { label: "Edit",    icon: <Edit className="h-4 w-4" />,    onClick: () => {} },
  { label: "Duplicate", icon: <Copy className="h-4 w-4" />, onClick: () => {} },
  { label: "Share",   icon: <Share2 className="h-4 w-4" />,  onClick: () => {} },
  { label: "Archive", icon: <Archive className="h-4 w-4" />, onClick: () => {}, dividerBefore: true },
  { label: "Delete",  icon: <Trash2 className="h-4 w-4" />,  onClick: () => {}, danger: true, dividerBefore: true },
];

export default function MenuPage() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>("");

  return (
    <Showcase title="Menu" description="Context menu, MenuButton, DropdownButton, and DropdownInput.">

      <Preview label="MenuButton">
        <Group gap="md">
          <MenuButton label="Actions" items={items} />
          <MenuButton label="Primary" items={items} variant="primary" />
          <MenuButton label="Ghost" items={items} variant="ghost" />
        </Group>
      </Preview>

      <Preview label="DropdownButton (split)">
        <Group gap="md">
          <DropdownButton
            label="Create"
            icon={<Plus className="h-4 w-4" />}
            items={[
              { label: "New visitor", onClick: () => {} },
              { label: "New group",   onClick: () => {} },
              { label: "Import CSV",  onClick: () => {}, dividerBefore: true },
            ]}
          />
          <DropdownButton
            label="Export"
            icon={<Download className="h-4 w-4" />}
            variant="secondary"
            items={[
              { label: "Export as CSV",  onClick: () => {} },
              { label: "Export as XLSX", onClick: () => {} },
              { label: "Export as PDF",  onClick: () => {} },
            ]}
          />
        </Group>
      </Preview>

      <Preview label="DropdownInput">
        <div className="max-w-xs flex flex-col gap-4">
          <DropdownInput
            label="Status"
            placeholder="Select status…"
            value={selected}
            onChange={setSelected}
            options={[
              { label: "Active",   value: "active" },
              { label: "Inactive", value: "inactive" },
              { label: "Pending",  value: "pending" },
              { label: "Blocked",  value: "blocked", disabled: true },
            ]}
          />
          <DropdownInput
            label="Site (searchable)"
            placeholder="Search sites…"
            searchable
            options={[
              { label: "London HQ",      value: "lon" },
              { label: "Paris Office",   value: "par" },
              { label: "Berlin Hub",     value: "ber" },
              { label: "Amsterdam HQ",   value: "ams" },
              { label: "New York Office",value: "nyc" },
            ]}
          />
        </div>
      </Preview>

      <Preview label="Standalone Menu">
        <div className="relative inline-block">
          <Button variant="secondary" size="sm" onClick={() => setOpen((v) => !v)}>
            Toggle menu
          </Button>
          <Menu items={items} open={open} onClose={() => setOpen(false)} />
        </div>
      </Preview>

    </Showcase>
  );
}
