import { Showcase, Preview } from "../_showcase";
import { Image } from "@/components/ui/Image";
import { Grid } from "@/components/layout/Grid";

export default function ImagePage() {
  return (
    <Showcase title="Image" description="Image component with loading skeleton, error fallback, fit modes, and aspect ratios.">

      <Preview label="Aspect ratios">
        <Grid cols={4} gap="sm">
          <div>
            <p className="type-caption text-ink-muted mb-1">square</p>
            <Image src="https://picsum.photos/400/400" alt="Square" ratio="square" rounded />
          </div>
          <div>
            <p className="type-caption text-ink-muted mb-1">video</p>
            <Image src="https://picsum.photos/640/360" alt="Video" ratio="video" rounded />
          </div>
          <div>
            <p className="type-caption text-ink-muted mb-1">portrait</p>
            <Image src="https://picsum.photos/300/400" alt="Portrait" ratio="portrait" rounded />
          </div>
          <div>
            <p className="type-caption text-ink-muted mb-1">wide</p>
            <Image src="https://picsum.photos/840/360" alt="Wide" ratio="wide" rounded />
          </div>
        </Grid>
      </Preview>

      <Preview label="Error / fallback">
        <div className="max-w-xs">
          <Image src="https://broken-url.example/img.jpg" alt="Broken image" ratio="video" rounded />
        </div>
      </Preview>

      <Preview label="Loading skeleton">
        <div className="max-w-xs">
          <Image src="https://picsum.photos/600/400?random=99" alt="Loading" ratio="video" rounded />
        </div>
      </Preview>

    </Showcase>
  );
}
