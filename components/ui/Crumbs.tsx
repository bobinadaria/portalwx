import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface CrumbsProps {
  items: CrumbItem[];
  className?: string;
}

export function Crumbs({ items, className }: CrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center", className)}>
      <ol className="flex items-center gap-1 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1">
              {isLast ? (
                <span
                  className="type-caption text-ink-primary font-medium"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : item.href ? (
                <a
                  href={item.href}
                  className="type-caption text-ink-muted hover:text-ink-secondary transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <button
                  onClick={item.onClick}
                  className="type-caption text-ink-muted hover:text-ink-secondary transition-colors"
                >
                  {item.label}
                </button>
              )}
              {!isLast && (
                <ChevronRight className="h-3 w-3 text-ink-muted shrink-0" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
