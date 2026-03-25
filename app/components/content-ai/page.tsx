"use client";

import { Showcase, Preview } from "../_showcase";
import { ContentAI } from "@/components/molecules/ContentAI";

export default function ContentAIPage() {
  return (
    <Showcase title="ContentAI" description="AI-generated content block with state management, feedback actions, and visual indicator.">

      <Preview label="States">
        <div className="flex flex-col gap-4 max-w-lg">
          <ContentAI state="idle" label="AI suggestion" />
          <ContentAI state="generating" label="Generating summary…" />
          <ContentAI
            state="done"
            label="Meeting summary"
            content="The weekly check-in covered access policy updates for Building A, a scheduled firmware upgrade for badge readers on floors 3–5, and the upcoming visitor surge for the product launch event on March 25th. Action items assigned to security team for floor mapping updates."
            onRegenerate={() => {}}
            onAccept={() => {}}
            onReject={() => {}}
            onCopy={() => {}}
          />
          <ContentAI state="error" onRegenerate={() => {}} />
        </div>
      </Preview>

    </Showcase>
  );
}
