"use client";

import { useState } from "react";
import { Showcase, Preview } from "../_showcase";
import { Animation } from "@/components/ui/Animation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Group } from "@/components/ui/Group";

type Preset = "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale";
const presets: Preset[] = ["fade", "slide-up", "slide-down", "slide-left", "slide-right", "scale"];

export default function AnimationPage() {
  const [key, setKey] = useState(0);
  const [preset, setPreset] = useState<Preset>("slide-up");

  return (
    <Showcase title="Animation" description="CSS-based transition wrapper for entrance animations. Not for decorative motion.">

      <Preview label="Presets">
        <div className="flex flex-col gap-4">
          <Group gap="sm" wrap>
            {presets.map((p) => (
              <Button
                key={p}
                size="sm"
                variant={preset === p ? "primary" : "secondary"}
                onClick={() => { setPreset(p); setKey((k) => k + 1); }}
              >
                {p}
              </Button>
            ))}
          </Group>
          <Button variant="ghost" size="sm" onClick={() => setKey((k) => k + 1)}>Replay</Button>
          <Animation key={key} preset={preset} duration={300}>
            <Card>
              <p className="type-body">This card animates with the <strong>{preset}</strong> preset.</p>
            </Card>
          </Animation>
        </div>
      </Preview>

      <Preview label="Staggered reveal">
        <Animation key={key + 1000} preset="slide-up" duration={200} delay={0}>
          <div className="flex flex-col gap-2">
            {[0, 60, 120, 180].map((delay, i) => (
              <Animation key={i} preset="slide-up" duration={200} delay={delay}>
                <div className="h-10 rounded-lg bg-surface-subtle flex items-center px-4">
                  <span className="type-label text-ink-secondary">Row {i + 1}</span>
                </div>
              </Animation>
            ))}
          </div>
        </Animation>
      </Preview>

    </Showcase>
  );
}
