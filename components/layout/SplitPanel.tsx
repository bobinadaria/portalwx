import { cn } from "@/lib/utils";

interface SplitPanelProps {
  left: React.ReactNode;
  right: React.ReactNode;
  ratio?: "1:1" | "1:2" | "2:1" | "1:3" | "3:1";
  gap?: "sm" | "md" | "lg";
  className?: string;
}

const ratioMap = {
  "1:1": "grid-cols-1 lg:grid-cols-2",
  "1:2": "grid-cols-1 lg:grid-cols-[1fr_2fr]",
  "2:1": "grid-cols-1 lg:grid-cols-[2fr_1fr]",
  "1:3": "grid-cols-1 lg:grid-cols-[1fr_3fr]",
  "3:1": "grid-cols-1 lg:grid-cols-[3fr_1fr]",
};

const gapMap = {
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
};

export function SplitPanel({
  left,
  right,
  ratio = "1:1",
  gap = "lg",
  className,
}: SplitPanelProps) {
  return (
    <div className={cn("grid", ratioMap[ratio], gapMap[gap], className)}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}
