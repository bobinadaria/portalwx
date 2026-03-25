import { Showcase, Preview } from "../_showcase";
import { Text } from "@/components/ui/Text";
import { Title } from "@/components/ui/Title";

export default function TextTitlePage() {
  return (
    <Showcase title="Text & Title" description="Typed text and title wrappers that enforce the DS type scale.">

      <Preview label="Title — roles">
        <div className="flex flex-col gap-4">
          <Title role="display">Display — Page Title</Title>
          <Title role="heading">Heading — Widget Title</Title>
          <Title role="subheading">Subheading — Section Label</Title>
        </div>
      </Preview>

      <Preview label="Text — roles">
        <div className="flex flex-col gap-3">
          <Text role="body">Body — Main paragraph copy. Used for descriptions, helper text, and general content.</Text>
          <Text role="label">Label — Form labels, compact identifiers, attribute names.</Text>
          <Text role="caption">Caption — Metadata, timestamps, supporting detail at reduced size.</Text>
          <Text role="subheading">Subheading — Uppercase section dividers within content areas.</Text>
        </div>
      </Preview>

      <Preview label="Truncation">
        <div className="max-w-xs flex flex-col gap-2">
          <Text role="label" truncate>Very long label that gets truncated when it overflows its container</Text>
          <Title role="heading" truncate>Very long heading that gets truncated when it overflows</Title>
        </div>
      </Preview>

    </Showcase>
  );
}
