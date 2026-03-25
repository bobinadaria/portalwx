"use client";
import { Showcase, Preview } from "../_showcase";
import { Grid } from "@/components/layout/Grid";
import { Stack } from "@/components/layout/Stack";

function Block({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-border-default bg-surface-subtle px-4 py-3">
      <p className="type-caption">{label}</p>
    </div>
  );
}

export default function GridStackPage() {
  return (
    <Showcase title="Grid & Stack" description="Layout primitives for composing views.">
      <Preview label="Grid — 4 columns">
        <Grid cols={4} gap="md">
          <Block label="1" />
          <Block label="2" />
          <Block label="3" />
          <Block label="4" />
        </Grid>
      </Preview>

      <Preview label="Grid — 3 columns">
        <Grid cols={3} gap="md">
          <Block label="1" />
          <Block label="2" />
          <Block label="3" />
        </Grid>
      </Preview>

      <Preview label="Stack — Vertical">
        <Stack gap="sm">
          <Block label="Item 1" />
          <Block label="Item 2" />
          <Block label="Item 3" />
        </Stack>
      </Preview>

      <Preview label="Stack — Horizontal">
        <Stack direction="horizontal" gap="md" align="center">
          <Block label="Left" />
          <Block label="Center" />
          <Block label="Right" />
        </Stack>
      </Preview>
    </Showcase>
  );
}
