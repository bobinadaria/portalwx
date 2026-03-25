import { cn } from "@/lib/utils";

interface StackProps {
  children: React.ReactNode;
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
  direction?: "vertical" | "horizontal";
  align?: "start" | "center" | "end" | "stretch";
  className?: string;
}

const gapMap = {
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

const alignMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

export function Stack({
  children,
  gap = "md",
  direction = "vertical",
  align = "stretch",
  className,
}: StackProps) {
  return (
    <div
      className={cn(
        "flex",
        direction === "vertical" ? "flex-col" : "flex-row",
        gapMap[gap],
        alignMap[align],
        className
      )}
    >
      {children}
    </div>
  );
}
