import { Showcase, Preview } from "../_showcase";
import { SparklineChart } from "@/components/data-display/charts/SparklineChart";
import { Group } from "@/components/ui/Group";

const data = [12, 18, 14, 22, 19, 28, 24, 31, 27, 35];
const down  = [35, 30, 28, 25, 20, 18, 22, 16, 12, 9];

export default function SparklinePage() {
  return (
    <Showcase title="SparklineChart" description="Tiny inline trend chart. Used inside KPI cards, tables, and subheaders.">

      <Preview label="Colors">
        <Group gap="lg" align="center">
          <SparklineChart data={data} color="brand" />
          <SparklineChart data={data} color="success" />
          <SparklineChart data={down}  color="error" />
          <SparklineChart data={data} color="warning" />
          <SparklineChart data={data} color="muted" />
        </Group>
      </Preview>

      <Preview label="Filled">
        <Group gap="lg" align="center">
          <SparklineChart data={data} color="brand" filled />
          <SparklineChart data={data} color="success" filled />
          <SparklineChart data={down} color="error" filled />
        </Group>
      </Preview>

      <Preview label="Sizes">
        <Group gap="lg" align="center">
          <SparklineChart data={data} width={60} height={24} />
          <SparklineChart data={data} width={100} height={40} />
          <SparklineChart data={data} width={160} height={56} />
        </Group>
      </Preview>

      <Preview label="In context (KPI-style)">
        <div className="flex gap-6">
          {[
            { label: "Visitors",  value: "1,284", trend: data, color: "brand" as const },
            { label: "Check-ins", value: "847",   trend: down,  color: "error" as const },
            { label: "Capacity",  value: "73%",   trend: data, color: "success" as const },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-1 p-4 rounded-xl border border-border-default bg-surface-raised">
              <p className="type-caption text-ink-muted">{item.label}</p>
              <p className="type-kpi-sm text-ink-primary">{item.value}</p>
              <SparklineChart data={item.trend} color={item.color} filled width={80} height={28} />
            </div>
          ))}
        </div>
      </Preview>

    </Showcase>
  );
}
