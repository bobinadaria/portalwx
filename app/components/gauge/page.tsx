import { Showcase, Preview } from "../_showcase";
import { GaugeChart } from "@/components/data-display/charts/GaugeChart";
import { Group } from "@/components/ui/Group";

export default function GaugePage() {
  return (
    <Showcase title="GaugeChart" description="Radial gauge for single-value progress or capacity metrics.">

      <Preview label="Variants">
        <Group gap="lg" wrap justify="center" align="start">
          <GaugeChart value={73} label="Occupancy"   color="brand" />
          <GaugeChart value={91} label="Capacity"    color="success" />
          <GaugeChart value={62} label="Utilization" color="warning" />
          <GaugeChart value={28} label="Availability" color="error" />
        </Group>
      </Preview>

      <Preview label="Sizes">
        <Group gap="lg" wrap justify="center" align="start">
          <GaugeChart value={65} size={120} label="Small" />
          <GaugeChart value={65} size={160} label="Medium" />
          <GaugeChart value={65} size={200} label="Large" />
        </Group>
      </Preview>

      <Preview label="Custom range">
        <Group gap="lg" wrap justify="center" align="start">
          <GaugeChart value={340} min={0} max={500} unit=" users" label="Active users" />
          <GaugeChart value={2.4} min={0} max={5} unit="★" label="Rating" color="warning" />
        </Group>
      </Preview>

    </Showcase>
  );
}
