import { Showcase, Preview } from "../_showcase";
import { DonutChart } from "@/components/data-display/charts/DonutChart";
import { PieChart } from "@/components/data-display/charts/PieChart";
import { Group } from "@/components/ui/Group";

const slices = [
  { label: "Card",    value: 42 },
  { label: "PIN",     value: 28 },
  { label: "App",     value: 18 },
  { label: "Visitor", value: 12 },
];

export default function DonutChartPage() {
  return (
    <Showcase title="Donut & Pie Chart" description="Ring and solid pie charts for proportional data.">

      <Preview label="Donut chart">
        <Group justify="center">
          <DonutChart slices={slices} centerValue={100} centerLabel="Total" />
        </Group>
      </Preview>

      <Preview label="Donut — sizes">
        <Group gap="lg" justify="center" align="start">
          <DonutChart slices={slices} size={120} showLegend={false} />
          <DonutChart slices={slices} size={160} showLegend={false} />
          <DonutChart slices={slices} size={200} showLegend={false} />
        </Group>
      </Preview>

      <Preview label="Pie chart">
        <Group justify="center">
          <PieChart slices={slices} />
        </Group>
      </Preview>

    </Showcase>
  );
}
