"use client";

import { useState } from "react";
import { Showcase, Preview } from "../_showcase";
import { InfiniteLoader } from "@/components/ui/InfiniteLoader";

const ITEM_BATCH = 8;

function InfiniteDemo() {
  const [items, setItems] = useState<string[]>(
    Array.from({ length: ITEM_BATCH }, (_, i) => `Access Event #${i + 1}`)
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const next = items.length;
      if (next >= ITEM_BATCH * 3) {
        setHasMore(false);
        setLoading(false);
        return;
      }
      setItems((prev) => [
        ...prev,
        ...Array.from({ length: ITEM_BATCH }, (_, i) => `Access Event #${next + i + 1}`),
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <InfiniteLoader onLoadMore={loadMore} hasMore={hasMore} loading={loading}>
      <div className="flex flex-col divide-y divide-border-subtle">
        {items.map((item) => (
          <div key={item} className="py-2.5 px-1 type-body text-ink-primary">
            {item}
          </div>
        ))}
      </div>
    </InfiniteLoader>
  );
}

function ExhaustedDemo() {
  const items = Array.from({ length: 5 }, (_, i) => `Result ${i + 1}`);
  return (
    <InfiniteLoader onLoadMore={() => {}} hasMore={false} loading={false}>
      <div className="flex flex-col divide-y divide-border-subtle">
        {items.map((item) => (
          <div key={item} className="py-2.5 px-1 type-body text-ink-primary">{item}</div>
        ))}
      </div>
    </InfiniteLoader>
  );
}

function LoadingDemo() {
  return (
    <InfiniteLoader onLoadMore={() => {}} hasMore={true} loading={true}>
      <div className="flex flex-col divide-y divide-border-subtle">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="py-2.5 px-1 type-body text-ink-primary">Item {i + 1}</div>
        ))}
      </div>
    </InfiniteLoader>
  );
}

export default function InfiniteLoaderPage() {
  return (
    <Showcase title="InfiniteLoader" description="Intersection Observer–based infinite scroll trigger. Wraps list content and fires onLoadMore when the sentinel enters view.">

      <Preview label="Live demo — scroll to load more">
        <div className="max-h-60 overflow-y-auto">
          <InfiniteDemo />
        </div>
      </Preview>

      <Preview label="Loading state">
        <LoadingDemo />
      </Preview>

      <Preview label="Exhausted (no more items)">
        <ExhaustedDemo />
      </Preview>

    </Showcase>
  );
}
