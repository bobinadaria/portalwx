import { MapPin, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface MapProps {
  address?: string;
  lat?: number;
  lng?: number;
  zoom?: number;
  height?: number;
  label?: string;
  showLink?: boolean;
  /** Pass a full embed URL (e.g. Google Maps embed) or leave empty for placeholder */
  embedUrl?: string;
  className?: string;
}

export function Map({
  address,
  lat,
  lng,
  zoom = 15,
  height = 240,
  label,
  showLink = true,
  embedUrl,
  className,
}: MapProps) {
  const mapsUrl = address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    : lat !== undefined && lng !== undefined
    ? `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}`
    : undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && <span className="type-label text-ink-secondary">{label}</span>}
      <div
        className="relative rounded-xl overflow-hidden border border-border-default bg-surface-subtle"
        style={{ height }}
      >
        {embedUrl ? (
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={label ?? "Map"}
          />
        ) : (
          /* Placeholder when no embed URL is provided */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <MapPin className="h-6 w-6 text-signature" />
            {address && (
              <p className="type-caption text-ink-secondary text-center px-6 max-w-xs">{address}</p>
            )}
            {lat !== undefined && lng !== undefined && !address && (
              <p className="type-caption text-ink-muted">{lat.toFixed(5)}, {lng.toFixed(5)}</p>
            )}
            <p className="type-caption text-ink-muted">Map preview not available</p>
          </div>
        )}
      </div>
      {showLink && mapsUrl && (
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 type-caption text-signature hover:text-brand-d2 transition-colors w-fit"
        >
          Open in Google Maps
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}
