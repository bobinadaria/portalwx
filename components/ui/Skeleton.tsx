import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circle" | "rect";
}

export function Skeleton({ className, variant = "text" }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-border-default",
        variant === "text" && "h-4 w-full rounded",
        variant === "circle" && "h-10 w-10 rounded-full",
        variant === "rect" && "h-24 w-full rounded-xl",
        className
      )}
    />
  );
}
