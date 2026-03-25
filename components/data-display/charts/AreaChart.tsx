import { LineChart, LineChartSeries } from "./LineChart";

interface AreaChartProps {
  series: LineChartSeries[];
  labels: string[];
  height?: number;
  yLabel?: string;
  xLabel?: string;
  showGrid?: boolean;
  showDots?: boolean;
  showLegend?: boolean;
  className?: string;
}

/** AreaChart = LineChart with filled=true */
export function AreaChart(props: AreaChartProps) {
  return <LineChart {...props} filled showDots={props.showDots ?? false} />;
}
