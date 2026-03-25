import { cn } from "@/lib/utils";

type BoxSurface = "base" | "raised" | "overlay" | "subtle";
type BoxPadding = "none" | "sm" | "md" | "lg";
type BoxRadius = "none" | "sm" | "md" | "xl" | "full";

interface BoxProps {
  surface?: BoxSurface;
  padding?: BoxPadding;
  radius?: BoxRadius;
  border?: boolean;
  shadow?: boolean;
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

const surfaceStyles: Record<BoxSurface, string> = {
  base:    "bg-surface-base",
  raised:  "bg-surface-raised",
  overlay: "bg-surface-overlay",
  subtle:  "bg-surface-subtle",
};

const paddingStyles: Record<BoxPadding, string> = {
  none: "",
  sm:   "p-3",
  md:   "p-4",
  lg:   "p-6",
};

const radiusStyles: Record<BoxRadius, string> = {
  none: "",
  sm:   "rounded",
  md:   "rounded-lg",
  xl:   "rounded-xl",
  full: "rounded-full",
};

export function Box({
  surface = "raised",
  padding = "md",
  radius = "xl",
  border = false,
  shadow = false,
  children,
  className,
  as: Tag = "div",
}: BoxProps) {
  return (
    <Tag
      className={cn(
        surfaceStyles[surface],
        paddingStyles[padding],
        radiusStyles[radius],
        border && "border border-border-default",
        shadow && "shadow-[var(--shadow-card)]",
        className
      )}
    >
      {children}
    </Tag>
  );
}
