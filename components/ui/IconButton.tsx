import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type IconButtonVariant = "default" | "ghost" | "destructive";
type IconButtonSize = "sm" | "md" | "lg";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  label: string;
  children: React.ReactNode;
}

const variantStyles: Record<IconButtonVariant, string> = {
  default:
    "bg-surface-raised text-ink-secondary border border-border-default hover:bg-surface-subtle hover:text-ink-primary",
  ghost:
    "bg-transparent text-ink-secondary hover:bg-surface-subtle hover:text-ink-primary",
  destructive:
    "bg-transparent text-status-error hover:bg-status-error-bg",
};

const sizeStyles: Record<IconButtonSize, string> = {
  sm: "h-7 w-7",
  md: "h-8 w-8",
  lg: "h-9 w-9",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = "default", size = "md", label, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        aria-label={label}
        className={cn(
          "inline-flex items-center justify-center rounded transition-colors",
          "disabled:pointer-events-none disabled:opacity-50",
          "focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-2",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
IconButton.displayName = "IconButton";
