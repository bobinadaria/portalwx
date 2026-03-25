import { cn } from "@/lib/utils";

interface QrCodeProps {
  /** The encoded value (displayed as placeholder — integrate a real QR lib like `qrcode.react` for production) */
  value: string;
  size?: number;
  label?: string;
  caption?: string;
  className?: string;
}

/**
 * QrCode — visual placeholder for a QR code block.
 * For production, replace the inner SVG with a library like `qrcode.react`:
 *   import QRCode from "qrcode.react";
 *   <QRCode value={value} size={size} />
 */
export function QrCode({ value, size = 128, label, caption, className }: QrCodeProps) {
  return (
    <div className={cn("inline-flex flex-col items-center gap-2", className)}>
      {label && (
        <p className="type-label text-ink-secondary">{label}</p>
      )}
      <div
        className="bg-surface-raised border border-border-default rounded-xl p-3 flex items-center justify-center"
        style={{ width: size + 24, height: size + 24 }}
        aria-label={`QR code: ${value}`}
        role="img"
      >
        {/* Placeholder grid — replace with qrcode.react in production */}
        <svg
          width={size}
          height={size}
          viewBox="0 0 128 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Top-left finder */}
          <rect x="8" y="8" width="36" height="36" rx="4" fill="currentColor" className="text-ink-primary" />
          <rect x="14" y="14" width="24" height="24" rx="2" fill="currentColor" className="text-surface-raised" />
          <rect x="20" y="20" width="12" height="12" rx="1" fill="currentColor" className="text-ink-primary" />
          {/* Top-right finder */}
          <rect x="84" y="8" width="36" height="36" rx="4" fill="currentColor" className="text-ink-primary" />
          <rect x="90" y="14" width="24" height="24" rx="2" fill="currentColor" className="text-surface-raised" />
          <rect x="96" y="20" width="12" height="12" rx="1" fill="currentColor" className="text-ink-primary" />
          {/* Bottom-left finder */}
          <rect x="8" y="84" width="36" height="36" rx="4" fill="currentColor" className="text-ink-primary" />
          <rect x="14" y="90" width="24" height="24" rx="2" fill="currentColor" className="text-surface-raised" />
          <rect x="20" y="96" width="12" height="12" rx="1" fill="currentColor" className="text-ink-primary" />
          {/* Data dots */}
          {[52,60,68,76].map(x =>
            [52,60,68,76,84,92,100,108,116].map(y => (
              Math.random() > 0.5
                ? <rect key={`${x}-${y}`} x={x} y={y} width="6" height="6" rx="1" fill="currentColor" className="text-ink-primary" />
                : null
            ))
          )}
          {[8,16,24,32,40,52,60,68,76,84,92,100,108,116].map(x =>
            [52,60,68,76].map(y => (
              Math.random() > 0.4
                ? <rect key={`d-${x}-${y}`} x={x} y={y} width="6" height="6" rx="1" fill="currentColor" className="text-ink-primary" />
                : null
            ))
          )}
        </svg>
      </div>
      {caption && (
        <p className="type-caption text-ink-muted text-center max-w-[160px]">{caption}</p>
      )}
    </div>
  );
}
