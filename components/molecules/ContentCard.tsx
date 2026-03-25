import { cn } from "@/lib/utils";
import { Image } from "@/components/ui/Image";

interface ContentCardProps {
  title: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  category?: string;
  meta?: string;
  actions?: React.ReactNode;
  onClick?: () => void;
  horizontal?: boolean;
  className?: string;
}

export function ContentCard({
  title,
  description,
  imageSrc,
  imageAlt = "",
  category,
  meta,
  actions,
  onClick,
  horizontal = false,
  className,
}: ContentCardProps) {
  const Tag = onClick ? "button" : "div";

  return (
    <Tag
      onClick={onClick}
      className={cn(
        "flex overflow-hidden rounded-xl border border-border-default bg-surface-raised shadow-[var(--shadow-card)] text-left w-full",
        horizontal ? "flex-row" : "flex-col",
        onClick && "cursor-pointer hover:shadow-[var(--shadow-overlay)] transition-shadow",
        className
      )}
    >
      {imageSrc && (
        <div className={cn(horizontal ? "w-32 shrink-0" : "w-full")}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            ratio={horizontal ? "portrait" : "video"}
            fit="cover"
            className="w-full h-full"
          />
        </div>
      )}
      <div className="flex flex-col gap-2 p-4 flex-1 min-w-0">
        {category && <span className="type-subheading text-signature">{category}</span>}
        <h3 className="type-heading text-ink-primary">{title}</h3>
        {description && <p className="type-body text-ink-secondary line-clamp-2">{description}</p>}
        {(meta || actions) && (
          <div className="flex items-center justify-between mt-auto pt-2">
            {meta && <span className="type-caption text-ink-muted">{meta}</span>}
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </div>
        )}
      </div>
    </Tag>
  );
}
