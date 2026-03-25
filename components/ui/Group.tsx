import { cn } from "@/lib/utils";

type GroupGap = "none" | "xs" | "sm" | "md" | "lg";
type GroupAlign = "start" | "center" | "end" | "stretch" | "baseline";
type GroupJustify = "start" | "center" | "end" | "between" | "around";
type GroupDirection = "row" | "col";
type GroupWrap = boolean;

interface GroupProps {
  direction?: GroupDirection;
  gap?: GroupGap;
  align?: GroupAlign;
  justify?: GroupJustify;
  wrap?: GroupWrap;
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

const gapStyles: Record<GroupGap, string> = {
  none: "gap-0",
  xs:   "gap-1",
  sm:   "gap-2",
  md:   "gap-3",
  lg:   "gap-4",
};

const alignStyles: Record<GroupAlign, string> = {
  start:    "items-start",
  center:   "items-center",
  end:      "items-end",
  stretch:  "items-stretch",
  baseline: "items-baseline",
};

const justifyStyles: Record<GroupJustify, string> = {
  start:   "justify-start",
  center:  "justify-center",
  end:     "justify-end",
  between: "justify-between",
  around:  "justify-around",
};

export function Group({
  direction = "row",
  gap = "sm",
  align = "center",
  justify = "start",
  wrap = false,
  children,
  className,
  as: Tag = "div",
}: GroupProps) {
  return (
    <Tag
      className={cn(
        "flex",
        direction === "col" && "flex-col",
        gapStyles[gap],
        alignStyles[align],
        justifyStyles[justify],
        wrap && "flex-wrap",
        className
      )}
    >
      {children}
    </Tag>
  );
}
