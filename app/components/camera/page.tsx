"use client";

import { Showcase, Preview } from "../_showcase";
import { Camera } from "@/components/ui/Camera";

export default function CameraPage() {
  return (
    <Showcase title="Camera" description="In-browser camera capture via getUserMedia. Click 'Start camera' to activate (requires browser permission).">

      <Preview label="Camera capture">
        <div className="max-w-md">
          <Camera
            label="Visitor photo"
            onCapture={(dataUrl) => console.log("Captured:", dataUrl.slice(0, 40))}
          />
        </div>
      </Preview>

      <Preview label="Compact (no label)">
        <div className="max-w-sm">
          <Camera />
        </div>
      </Preview>

    </Showcase>
  );
}
