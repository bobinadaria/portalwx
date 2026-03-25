import { cn } from "@/lib/utils";

type ColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full" | "auto";
type ColStart = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto";

interface ColProps {
  span?: ColSpan;
  start?: ColStart;
  children: React.ReactNode;
  className?: string;
}

const spanStyles: Record<string, string> = {
  1: "col-span-1", 2: "col-span-2", 3: "col-span-3",
  4: "col-span-4", 5: "col-span-5", 6: "col-span-6",
  7: "col-span-7", 8: "col-span-8", 9: "col-span-9",
  10: "col-span-10", 11: "col-span-11", 12: "col-span-12",
  full: "col-span-full", auto: "col-auto",
};

const startStyles: Record<string, string> = {
  1: "col-start-1", 2: "col-start-2", 3: "col-start-3",
  4: "col-start-4", 5: "col-start-5", 6: "col-start-6",
  7: "col-start-7", 8: "col-start-8", 9: "col-start-9",
  10: "col-start-10", 11: "col-start-11", 12: "col-start-12",
  auto: "col-start-auto",
};

export function Col({ span = "auto", start, children, className }: ColProps) {
  return (
    <div
      className={cn(
        spanStyles[String(span)],
        start !== undefined && startStyles[String(start)],
        className
      )}
    >
      {children}
    </div>
  );
}
