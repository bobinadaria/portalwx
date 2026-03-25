import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  alt?: string;
  /** Full name — auto-generates initials when `initials` is not provided */
  name?: string;
  initials?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: "h-7 w-7 text-[10px]",
  md: "h-9 w-9 text-xs",
  lg: "h-12 w-12 text-sm",
};

function nameToInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return (parts[0][0] ?? "?").toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar({ src, alt, name, initials, size = "md", className }: AvatarProps) {
  const resolvedInitials = initials ?? (name ? nameToInitials(name) : "?");
  const resolvedAlt = alt ?? name ?? "";

  if (src) {
    return (
      <img
        src={src}
        alt={resolvedAlt}
        className={cn("rounded-full object-cover", sizeStyles[size], className)}
      />
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-brand-l1 font-medium text-ink-inverse",
        sizeStyles[size],
        className
      )}
      aria-label={resolvedAlt}
    >
      {resolvedInitials}
    </span>
  );
}
