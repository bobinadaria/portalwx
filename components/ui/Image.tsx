"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

type ImageFit = "cover" | "contain" | "fill" | "none";
type ImageRatio = "square" | "video" | "wide" | "portrait" | "auto";

interface ImageProps {
  src: string;
  alt: string;
  fit?: ImageFit;
  ratio?: ImageRatio;
  fallback?: React.ReactNode;
  rounded?: boolean;
  className?: string;
}

const ratioStyles: Record<ImageRatio, string> = {
  square:   "aspect-square",
  video:    "aspect-video",
  wide:     "aspect-[21/9]",
  portrait: "aspect-[3/4]",
  auto:     "",
};

const fitStyles: Record<ImageFit, string> = {
  cover:   "object-cover",
  contain: "object-contain",
  fill:    "object-fill",
  none:    "object-none",
};

export function Image({
  src,
  alt,
  fit = "cover",
  ratio = "auto",
  fallback,
  rounded = false,
  className,
}: ImageProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-surface-subtle text-ink-muted",
          ratioStyles[ratio],
          rounded && "rounded-xl",
          className
        )}
      >
        {fallback ?? <ImageOff className="h-5 w-5" aria-hidden="true" />}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", ratioStyles[ratio], rounded && "rounded-xl", className)}>
      {!loaded && (
        <div className="absolute inset-0 bg-surface-subtle animate-pulse" aria-hidden="true" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={cn(
          "w-full h-full transition-opacity duration-200",
          fitStyles[fit],
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}
