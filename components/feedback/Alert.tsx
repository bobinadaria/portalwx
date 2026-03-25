import { cn } from "@/lib/utils";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";

type AlertVariant = "success" | "warning" | "error" | "info";

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const icons: Record<AlertVariant, React.ReactNode> = {
  success: <CheckCircle size={16} />,
  warning: <AlertTriangle size={16} />,
  error: <XCircle size={16} />,
  info: <Info size={16} />,
};

const variantStyles: Record<AlertVariant, string> = {
  success: "bg-status-success-bg border-status-success/30 text-status-success",
  warning: "bg-status-warning-bg border-status-warning/30 text-status-warning",
  error: "bg-status-error-bg border-status-error/30 text-status-error",
  info: "bg-status-info-bg border-status-info/30 text-status-info",
};

export function Alert({ variant = "info", title, children, className }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex gap-3 rounded-xl border p-4",
        variantStyles[variant],
        className
      )}
    >
      <span className="mt-0.5 shrink-0">{icons[variant]}</span>
      <div className="flex-1">
        {title && <p className="mb-0.5 text-sm font-medium">{title}</p>}
        <div className="text-sm opacity-90">{children}</div>
      </div>
    </div>
  );
}
