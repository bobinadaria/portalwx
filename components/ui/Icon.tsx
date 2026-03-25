import { cn } from "@/lib/utils";
import { getIcon, type SharryIconName } from "@/lib/icons";
import { HelpCircle } from "lucide-react";

type IconSize = "xs" | "sm" | "md" | "lg" | "xl";
type IconColor = "primary" | "secondary" | "muted" | "brand" | "success" | "warning" | "error" | "info" | "inverse";

interface IconBaseProps {
  size?: IconSize;
  color?: IconColor;
  className?: string;
  "aria-label"?: string;
}

/** Pass a Lucide/custom node directly */
interface IconNodeProps extends IconBaseProps {
  icon: React.ReactNode;
  name?: never;
}

/** Pass a Figma icon name from the registry */
interface IconNameProps extends IconBaseProps {
  name: SharryIconName;
  icon?: never;
}

type IconProps = IconNodeProps | IconNameProps;

const sizeStyles: Record<IconSize, string> = {
  xs: "[&>svg]:h-3 [&>svg]:w-3",
  sm: "[&>svg]:h-3.5 [&>svg]:w-3.5",
  md: "[&>svg]:h-4 [&>svg]:w-4",
  lg: "[&>svg]:h-5 [&>svg]:w-5",
  xl: "[&>svg]:h-6 [&>svg]:w-6",
};

const colorStyles: Record<IconColor, string> = {
  primary:  "text-ink-primary",
  secondary: "text-ink-secondary",
  muted:    "text-ink-muted",
  brand:    "text-brand-d1",
  success:  "text-status-success",
  warning:  "text-status-warning",
  error:    "text-status-error",
  info:     "text-status-info",
  inverse:  "text-ink-inverse",
};

// Pixel size for named icons (passed as size prop to Lucide)
const pxSize: Record<IconSize, number> = {
  xs: 12, sm: 14, md: 16, lg: 20, xl: 24,
};

export function Icon({
  icon,
  name,
  size = "md",
  color = "secondary",
  className,
  "aria-label": ariaLabel,
}: IconProps) {
  let content: React.ReactNode;

  if (name) {
    const LucideIcon = getIcon(name);
    // Falls back to HelpCircle if icon needs a custom SVG
    const Comp = LucideIcon ?? HelpCircle;
    content = <Comp size={pxSize[size]} />;
  } else {
    content = icon;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center shrink-0",
        sizeStyles[size],
        colorStyles[color],
        className,
      )}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
      role={ariaLabel ? "img" : undefined}
    >
      {content}
    </span>
  );
}
