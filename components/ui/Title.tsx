import { cn } from "@/lib/utils";

type TitleRole = "display" | "heading" | "subheading";
type TitleAs = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "span";

interface TitleProps {
  role?: TitleRole;
  as?: TitleAs;
  children: React.ReactNode;
  className?: string;
  truncate?: boolean;
}

const roleStyles: Record<TitleRole, string> = {
  display:    "type-display",
  heading:    "type-heading",
  subheading: "type-subheading",
};

const defaultTag: Record<TitleRole, TitleAs> = {
  display:    "h1",
  heading:    "h2",
  subheading: "h3",
};

export function Title({ role = "heading", as, children, className, truncate }: TitleProps) {
  const Tag = as ?? defaultTag[role];
  return (
    <Tag className={cn(roleStyles[role], truncate && "truncate", className)}>
      {children}
    </Tag>
  );
}
