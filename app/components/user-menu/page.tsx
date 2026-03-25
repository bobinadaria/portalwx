"use client";

import { Showcase, Preview } from "../_showcase";
import { UserMenu } from "@/components/molecules/UserMenu";
import { Group } from "@/components/ui/Group";

export default function UserMenuPage() {
  return (
    <Showcase title="UserMenu" description="User avatar + name + role with dropdown menu. Used at the bottom of the sidebar.">

      <Preview label="Full (expanded sidebar)">
        <div className="w-56 bg-surface-raised border border-border-default rounded-xl p-2">
          <UserMenu
            name="Sarah Miller"
            email="sarah@sharry.io"
            role="Security Manager"
            onProfile={() => {}}
            onSettings={() => {}}
            onLogout={() => {}}
          />
        </div>
      </Preview>

      <Preview label="Collapsed (icon-only sidebar)">
        <div className="w-14 bg-surface-raised border border-border-default rounded-xl p-2">
          <UserMenu
            name="Tom Baker"
            collapsed
            onLogout={() => {}}
          />
        </div>
      </Preview>

    </Showcase>
  );
}
