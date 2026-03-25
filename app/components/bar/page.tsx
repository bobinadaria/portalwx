import { Showcase, Preview } from "../_showcase";
import { Bar } from "@/components/ui/Bar";
import { Group } from "@/components/ui/Group";

export default function BarPage() {
  return (
    <Showcase title="Bar" description="Thin progress/loading bar. Use as a top-of-page loader or compact progress indicator.">

      <Preview label="Variants">
        <div className="flex flex-col gap-4">
          <Bar value={65} variant="brand" />
          <Bar value={80} variant="success" />
          <Bar value={45} variant="warning" />
          <Bar value={30} variant="error" />
          <Bar value={55} variant="neutral" />
        </div>
      </Preview>

      <Preview label="Sizes">
        <div className="flex flex-col gap-4">
          <Bar value={70} size="xs" aria-label="Extra small" />
          <Bar value={70} size="sm" aria-label="Small" />
          <Bar value={70} size="md" aria-label="Medium" />
        </div>
      </Preview>

      <Preview label="Indeterminate (loading)">
        <div className="flex flex-col gap-4">
          <Bar indeterminate variant="brand" />
          <Bar indeterminate variant="success" />
        </div>
      </Preview>

      <Preview label="Various values">
        <div className="flex flex-col gap-3">
          {[0, 25, 50, 75, 100].map((v) => (
            <div key={v} className="flex items-center gap-3">
              <span className="type-caption text-ink-muted w-8 text-right">{v}%</span>
              <Bar value={v} className="flex-1" />
            </div>
          ))}
        </div>
      </Preview>

    </Showcase>
  );
}
