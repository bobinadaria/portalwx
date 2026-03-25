import { Showcase, Preview } from "../_showcase";
import { ScatterPlot } from "@/components/data-display/charts";

const singleGroupPoints = [
  { x: 10, y: 30, label: "Site A" },
  { x: 20, y: 65, label: "Site B" },
  { x: 35, y: 45, label: "Site C" },
  { x: 50, y: 80, label: "Site D" },
  { x: 60, y: 55, label: "Site E" },
  { x: 75, y: 90, label: "Site F" },
  { x: 85, y: 40, label: "Site G" },
  { x: 95, y: 70, label: "Site H" },
];

const multiGroupPoints = [
  { x: 5,  y: 20, label: "Alpha 1",  group: "Alpha" },
  { x: 15, y: 50, label: "Alpha 2",  group: "Alpha" },
  { x: 30, y: 35, label: "Alpha 3",  group: "Alpha" },
  { x: 55, y: 75, label: "Alpha 4",  group: "Alpha" },
  { x: 70, y: 60, label: "Alpha 5",  group: "Alpha" },
  { x: 10, y: 80, label: "Beta 1",   group: "Beta" },
  { x: 25, y: 90, label: "Beta 2",   group: "Beta" },
  { x: 45, y: 55, label: "Beta 3",   group: "Beta" },
  { x: 65, y: 85, label: "Beta 4",   group: "Beta" },
  { x: 90, y: 45, label: "Beta 5",   group: "Beta" },
  { x: 20, y: 10, label: "Gamma 1",  group: "Gamma" },
  { x: 40, y: 30, label: "Gamma 2",  group: "Gamma" },
  { x: 60, y: 20, label: "Gamma 3",  group: "Gamma" },
  { x: 80, y: 15, label: "Gamma 4",  group: "Gamma" },
];

export default function ScatterPage() {
  return (
    <Showcase title="ScatterPlot" description="SVG scatter plot with optional grouping, legend, and hover tooltips.">

      <Preview label="Single group with axis labels">
        <ScatterPlot
          points={singleGroupPoints}
          xLabel="Capacity (%)"
          yLabel="Occupancy (%)"
          height={240}
        />
      </Preview>

      <Preview label="Multi-group with legend">
        <ScatterPlot
          points={multiGroupPoints}
          xLabel="Footfall Index"
          yLabel="Access Events"
          height={260}
          showLegend
        />
      </Preview>

      <Preview label="No grid">
        <ScatterPlot
          points={singleGroupPoints}
          height={200}
          showGrid={false}
          showLegend={false}
        />
      </Preview>

    </Showcase>
  );
}
