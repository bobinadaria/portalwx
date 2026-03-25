import { cn } from "@/lib/utils";

type FeatureIconVariant = "brand" | "success" | "warning" | "error" | "info" | "neutral";
type FeatureIconSize = "sm" | "md" | "lg" | "xl";
type FeatureIconShape = "circle" | "square" | "rounded";

interface FeatureIconProps {
  icon: React.ReactNode;
  variant?: FeatureIconVariant;
  size?: FeatureIconSize;
  shape?: FeatureIconShape;
  className?: string;
}

const variantStyles: Record<FeatureIconVariant, string> = {
  brand:   "bg-brand-l1 text-signature",
  success: "bg-status-success-bg text-status-success",
  warning: "bg-status-warning-bg text-status-warning",
  error:   "bg-status-error-bg text-status-error",
  info:    "bg-status-info-bg text-status-info",
  neutral: "bg-surface-subtle text-ink-secondary",
};

const sizeStyles: Record<FeatureIconSize, string> = {
  sm: "h-7 w-7 [&>svg]:h-3.5 [&>svg]:w-3.5",
  md: "h-9 w-9 [&>svg]:h-4 [&>svg]:w-4",
  lg: "h-11 w-11 [&>svg]:h-5 [&>svg]:w-5",
  xl: "h-14 w-14 [&>svg]:h-6 [&>svg]:w-6",
};

const shapeStyles: Record<FeatureIconShape, string> = {
  circle:  "rounded-full",
  square:  "rounded-none",
  rounded: "rounded-xl",
};

export function FeatureIcon({
  icon,
  variant = "brand",
  size = "md",
  shape = "rounded",
  className,
}: FeatureIconProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center shrink-0",
        variantStyles[variant],
        sizeStyles[size],
        shapeStyles[shape],
        className
      )}
      aria-hidden="true"
    >
      {icon}
    </span>
  );
}
