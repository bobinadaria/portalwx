import { Showcase, Preview } from "../_showcase";
import { Crumbs } from "@/components/ui/Crumbs";

export default function CrumbsPage() {
  return (
    <Showcase title="Crumbs" description="Breadcrumb navigation component for hierarchical location context.">

      <Preview label="Default">
        <Crumbs items={[
          { label: "Home", href: "/" },
          { label: "Facilities", href: "/facilities" },
          { label: "Building A" },
        ]} />
      </Preview>

      <Preview label="Long path">
        <Crumbs items={[
          { label: "Dashboard", href: "/" },
          { label: "People", href: "/people" },
          { label: "Visitors", href: "/people/visitors" },
          { label: "Jane Smith" },
        ]} />
      </Preview>

      <Preview label="Single level">
        <Crumbs items={[{ label: "Settings" }]} />
      </Preview>

    </Showcase>
  );
}
