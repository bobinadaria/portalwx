import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  padding?: "sm" | "md" | "lg";
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
}

const paddingMap = {
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export function Card({ children, padding = "md", interactive = false, className, onClick }: CardProps) {
  const Component = interactive || onClick ? "button" : "div";
  return (
    <Component
      onClick={onClick}
      className={cn(
        "rounded-xl border border-border-default bg-surface-raised shadow-[var(--shadow-card)] text-left",
        paddingMap[padding],
        interactive && "cursor-pointer transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-2",
        className
      )}
    >
      {children}
    </Component>
  );
}
