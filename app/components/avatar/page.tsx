"use client";
import { Showcase, Preview } from "../_showcase";
import { Avatar } from "@/components/ui/Avatar";

export default function AvatarPage() {
  return (
    <Showcase title="Avatar" description="User avatar with image or initials fallback.">
      <Preview label="Sizes">
        <div className="flex items-center gap-4">
          <Avatar initials="SM" size="sm" />
          <Avatar initials="MD" size="md" />
          <Avatar initials="LG" size="lg" />
        </div>
      </Preview>

      <Preview label="Initials Variants">
        <div className="flex items-center gap-3">
          <Avatar initials="AB" />
          <Avatar initials="CD" />
          <Avatar initials="?" />
        </div>
      </Preview>
    </Showcase>
  );
}
