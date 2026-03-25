import { Showcase, Preview } from "../_showcase";
import { HeatMap } from "@/components/data-display/charts/HeatMap";

const rows = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const cols = ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];

const cells = rows.flatMap((row) =>
  cols.map((col) => ({
    row,
    col,
    value: Math.floor(Math.random() * 50 + 5),
  }))
);

export default function HeatMapPage() {
  return (
    <Showcase title="HeatMap" description="Grid-based intensity map. Used for occupancy, activity patterns, and density visualization.">

      <Preview label="Occupancy by hour / day">
        <HeatMap cells={cells} rows={rows} cols={cols} showValues />
      </Preview>

      <Preview label="Without values">
        <HeatMap cells={cells} rows={rows} cols={cols} showValues={false} />
      </Preview>

      <Preview label="Custom color range">
        <HeatMap
          cells={cells}
          rows={rows}
          cols={cols}
          colorLow="#dcfce7"
          colorHigh="#16a34a"
          showValues
        />
      </Preview>

    </Showcase>
  );
}
