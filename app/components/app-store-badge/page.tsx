import { Showcase, Preview } from "../_showcase";
import { AppStoreBadge } from "@/components/ui/AppStoreBadge";

export default function AppStoreBadgePage() {
  return (
    <Showcase title="AppStoreBadge" description="App store download buttons for Apple App Store and Google Play.">

      <Preview label="Both stores">
        <div className="flex items-center gap-4 flex-wrap">
          <AppStoreBadge store="apple" />
          <AppStoreBadge store="google" />
        </div>
      </Preview>

      <Preview label="Sizes">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <AppStoreBadge store="apple"  size="sm" />
            <AppStoreBadge store="google" size="sm" />
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <AppStoreBadge store="apple"  size="md" />
            <AppStoreBadge store="google" size="md" />
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <AppStoreBadge store="apple"  size="lg" />
            <AppStoreBadge store="google" size="lg" />
          </div>
        </div>
      </Preview>

      <Preview label="With links">
        <div className="flex items-center gap-4 flex-wrap">
          <AppStoreBadge store="apple"  href="#" size="md" />
          <AppStoreBadge store="google" href="#" size="md" />
        </div>
      </Preview>

    </Showcase>
  );
}
