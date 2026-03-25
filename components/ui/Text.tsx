import { cn } from "@/lib/utils";

type TextRole = "body" | "label" | "caption" | "subheading";
type TextAs = "p" | "span" | "div" | "li";

interface TextProps {
  role?: TextRole;
  as?: TextAs;
  children: React.ReactNode;
  className?: string;
  truncate?: boolean;
}

const roleStyles: Record<TextRole, string> = {
  body:       "type-body",
  label:      "type-label",
  caption:    "type-caption",
  subheading: "type-subheading",
};

export function Text({ role = "body", as: Tag = "p", children, className, truncate }: TextProps) {
  return (
    <Tag className={cn(roleStyles[role], truncate && "truncate", className)}>
      {children}
    </Tag>
  );
}
