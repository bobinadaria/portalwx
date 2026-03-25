import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface SearchFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  onSearch?: (value: string) => void;
}

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  ({ onSearch, className, ...props }, ref) => {
    return (
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
        <input
          ref={ref}
          type="search"
          onChange={(e) => onSearch?.(e.target.value)}
          className={cn(
            "h-9 w-full rounded border border-border-default bg-surface-raised pl-9 pr-3 text-sm text-ink-primary placeholder:text-ink-muted transition-colors",
            "hover:border-border-strong",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-1",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
SearchField.displayName = "SearchField";
