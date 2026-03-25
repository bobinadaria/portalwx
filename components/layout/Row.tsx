import { cn } from "@/lib/utils";

type RowGap = "none" | "sm" | "md" | "lg" | "xl";
type RowCols = 1 | 2 | 3 | 4 | 6 | 12;
type RowAlign = "start" | "center" | "end" | "stretch";

interface RowProps {
  cols?: RowCols;
  gap?: RowGap;
  align?: RowAlign;
  children: React.ReactNode;
  className?: string;
}

const colsStyles: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  6: "grid-cols-6",
  12: "grid-cols-12",
};

const gapStyles: Record<RowGap, string> = {
  none: "gap-0",
  sm:   "gap-2",
  md:   "gap-4",
  lg:   "gap-6",
  xl:   "gap-8",
};

const alignStyles: Record<RowAlign, string> = {
  start:   "items-start",
  center:  "items-center",
  end:     "items-end",
  stretch: "items-stretch",
};

export function Row({ cols = 12, gap = "md", align = "stretch", children, className }: RowProps) {
  return (
    <div
      className={cn(
        "grid",
        colsStyles[cols],
        gapStyles[gap],
        alignStyles[align],
        className
      )}
    >
      {children}
    </div>
  );
}
