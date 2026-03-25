"use client";

import { useEffect, useRef } from "react";
import { Spinner } from "./Spinner";
import { cn } from "@/lib/utils";

interface InfiniteLoaderProps {
  onLoadMore: () => void;
  hasMore: boolean;
  loading?: boolean;
  threshold?: number;
  className?: string;
  children?: React.ReactNode;
}

export function InfiniteLoader({
  onLoadMore,
  hasMore,
  loading = false,
  threshold = 0,
  className,
  children,
}: InfiniteLoaderProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin: `${threshold}px` }
    );

    const sentinel = sentinelRef.current;
    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [hasMore, loading, onLoadMore, threshold]);

  return (
    <div className={cn("w-full", className)}>
      {children}
      <div ref={sentinelRef} className="flex items-center justify-center py-4" aria-live="polite">
        {loading && <Spinner size="sm" />}
        {!hasMore && !loading && (
          <p className="type-caption text-ink-muted">No more items</p>
        )}
      </div>
    </div>
  );
}
