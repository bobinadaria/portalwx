import { DonutChart, DonutChartSlice } from "./DonutChart";

interface PieChartProps {
  slices: DonutChartSlice[];
  size?: number;
  showLegend?: boolean;
  className?: string;
}

/** PieChart = DonutChart with full thickness */
export function PieChart({ slices, size = 160, showLegend = true, className }: PieChartProps) {
  return (
    <DonutChart
      slices={slices}
      size={size}
      thickness={size / 2 - 2}
      showLegend={showLegend}
      className={className}
    />
  );
}
