import { cn } from "@/lib/utils";

type AddonPosition = "left" | "right";
type AddonVariant = "default" | "filled";

interface AddonProps {
  position?: AddonPosition;
  variant?: AddonVariant;
  children: React.ReactNode;
  className?: string;
}

interface InputAddonGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function Addon({ position = "left", variant = "default", children, className }: AddonProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 text-sm text-ink-secondary border border-border-default shrink-0",
        variant === "filled" && "bg-surface-subtle",
        variant === "default" && "bg-surface-raised",
        position === "left" && "rounded-l border-r-0",
        position === "right" && "rounded-r border-l-0",
        className
      )}
    >
      {children}
    </span>
  );
}

export function InputAddonGroup({ children, className }: InputAddonGroupProps) {
  return (
    <div className={cn("flex items-stretch w-full", className)}>
      {children}
    </div>
  );
}
