import { cn } from "@/lib/utils";

type AppStoreBadgeStore = "apple" | "google";
type AppStoreBadgeSize = "sm" | "md" | "lg";

interface AppStoreBadgeProps {
  store: AppStoreBadgeStore;
  href?: string;
  size?: AppStoreBadgeSize;
  className?: string;
}

const sizeStyles: Record<AppStoreBadgeSize, string> = {
  sm: "h-8",
  md: "h-10",
  lg: "h-12",
};

function AppleBadge() {
  return (
    <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
      <rect width="120" height="40" rx="6" fill="currentColor" className="text-ink-primary" />
      <text x="38" y="15" fontSize="8" fill="white" fontFamily="system-ui" fontWeight="400">Download on the</text>
      <text x="38" y="27" fontSize="13" fill="white" fontFamily="system-ui" fontWeight="600">App Store</text>
      {/* Apple logo */}
      <path d="M18 13.5c1.1-1.3 1.8-3.1 1.6-4.9-1.6.1-3.5 1.1-4.6 2.4-1 1.1-1.9 2.9-1.6 4.7 1.8.1 3.5-.9 4.6-2.2z" fill="white"/>
      <path d="M19.6 16.1c-2.5-.1-4.6 1.4-5.8 1.4-1.2 0-3-1.3-5-1.3-2.6 0-5 1.5-6.3 3.8-2.7 4.6-.7 11.5 1.9 15.3 1.3 1.9 2.9 3.9 4.9 3.9 2 0 2.7-1.3 5.1-1.3 2.4 0 3 1.3 5.1 1.3 2.1 0 3.5-1.9 4.8-3.8.7-1.1 1-1.7 1.6-3-4.2-1.6-4.9-7.7-.3-10z" fill="white"/>
    </svg>
  );
}

function GoogleBadge() {
  return (
    <svg viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
      <rect width="135" height="40" rx="6" fill="currentColor" className="text-ink-primary" />
      <text x="42" y="15" fontSize="8" fill="white" fontFamily="system-ui" fontWeight="400">GET IT ON</text>
      <text x="42" y="28" fontSize="13" fill="white" fontFamily="system-ui" fontWeight="600">Google Play</text>
      {/* Play icon */}
      <path d="M12 10l16 10L12 30V10z" fill="white" opacity="0.9"/>
    </svg>
  );
}

const labels: Record<AppStoreBadgeStore, string> = {
  apple:  "Download on the App Store",
  google: "Get it on Google Play",
};

export function AppStoreBadge({ store, href, size = "md", className }: AppStoreBadgeProps) {
  const content = store === "apple" ? <AppleBadge /> : <GoogleBadge />;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labels[store]}
        className={cn("inline-flex", sizeStyles[size], className)}
      >
        {content}
      </a>
    );
  }

  return (
    <span className={cn("inline-flex", sizeStyles[size], className)} aria-label={labels[store]}>
      {content}
    </span>
  );
}
