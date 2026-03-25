"use client";

import { useState } from "react";
import { Showcase, Preview } from "../_showcase";
import { Wysiwyg } from "@/components/ui/Wysiwyg";

const SAMPLE_HTML = `<p>This is a <b>rich text</b> editor with <i>formatting</i> support.</p><ul><li>Bullet lists</li><li>Bold, italic, underline</li><li>Text alignment</li></ul>`;

function EditableDemo() {
  const [value, setValue] = useState(SAMPLE_HTML);
  return (
    <Wysiwyg
      value={value}
      onChange={setValue}
      label="Description"
      placeholder="Write a description…"
    />
  );
}

function EmptyDemo() {
  const [value, setValue] = useState("");
  return (
    <Wysiwyg
      value={value}
      onChange={setValue}
      placeholder="Start writing your report…"
      label="Incident report"
      minHeight={120}
    />
  );
}

export default function WysiwygPage() {
  return (
    <Showcase title="Wysiwyg" description="Rich text editor using contentEditable and execCommand. Supports formatting, lists, and alignment.">

      <Preview label="Editable with content">
        <EditableDemo />
      </Preview>

      <Preview label="Empty with placeholder">
        <EmptyDemo />
      </Preview>

      <Preview label="Read-only">
        <Wysiwyg
          value={SAMPLE_HTML}
          label="Notes (read-only)"
          readOnly
        />
      </Preview>

    </Showcase>
  );
}
