import { Showcase, Preview } from "../_showcase";
import { Video } from "@/components/ui/Video";

export default function VideoPage() {
  return (
    <Showcase title="Video" description="Video player with custom controls overlay. Hover to reveal play/pause, mute, and fullscreen.">

      <Preview label="With custom controls (hover to reveal)">
        <div className="max-w-lg">
          <Video
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            poster="https://picsum.photos/640/360?random=10"
            title="Sample facility walkthrough"
            controls
          />
        </div>
      </Preview>

      <Preview label="No custom controls (native)">
        <div className="max-w-sm">
          <Video
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            title="Compact preview"
            controls={false}
          />
        </div>
      </Preview>

      <Preview label="Muted autoplay (loop)">
        <div className="max-w-sm">
          <Video
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            muted
            autoPlay
            loop
            controls
          />
        </div>
      </Preview>

    </Showcase>
  );
}
