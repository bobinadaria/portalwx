import { Showcase, Preview } from "../_showcase";
import { BarChart } from "@/components/data-display/charts/BarChart";

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const single = [{ label: "Visitors", data: [420, 380, 510, 470, 590, 620] }];
const multi = [
  { label: "Check-ins",   data: [420, 380, 510, 470, 590, 620] },
  { label: "Check-outs",  data: [390, 360, 480, 440, 560, 590] },
];

export default function BarChartPage() {
  return (
    <Showcase title="BarChart" description="Vertical bar chart. Supports single/multi series, grouped and stacked modes.">

      <Preview label="Single series">
        <BarChart series={single} labels={labels} />
      </Preview>

      <Preview label="Multi series (grouped)">
        <BarChart series={multi} labels={labels} />
      </Preview>

      <Preview label="Stacked">
        <BarChart series={multi} labels={labels} stacked showValues />
      </Preview>

    </Showcase>
  );
}
