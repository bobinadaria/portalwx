"use client";

import { useRef, useEffect, CSSProperties } from "react";

interface EChartProps {
  option: Record<string, unknown>;
  style?: CSSProperties;
  className?: string;
}

export function EChart({ option, style, className }: EChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<any>(null);

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;

    import("echarts").then((echarts) => {
      if (!containerRef.current) return;

      // Init or reuse instance
      if (!chartRef.current) {
        chartRef.current = echarts.init(containerRef.current);
      }

      chartRef.current.setOption(option, true);

      resizeObserver = new ResizeObserver(() => {
        chartRef.current?.resize();
      });
      resizeObserver.observe(containerRef.current);
    });

    return () => {
      resizeObserver?.disconnect();
      chartRef.current?.dispose();
      chartRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update option when it changes (after initial mount)
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.setOption(option, true);
    }
    // We intentionally stringify to do a deep comparison proxy
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(option)]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ height: 200, width: "100%", ...style }}
    />
  );
}
