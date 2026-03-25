import { cn } from "@/lib/utils";

interface ListItem {
  id: string;
  content: React.ReactNode;
}

interface ListProps {
  items: ListItem[];
  divided?: boolean;
  className?: string;
}

export function List({ items, divided = true, className }: ListProps) {
  return (
    <ul className={cn("space-y-0", className)}>
      {items.map((item, i) => (
        <li
          key={item.id}
          className={cn(
            "px-4 py-3",
            divided && i > 0 && "border-t border-border-subtle"
          )}
        >
          {item.content}
        </li>
      ))}
    </ul>
  );
}
