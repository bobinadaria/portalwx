import { Showcase, Preview } from "../_showcase";
import { Map } from "@/components/ui/Map";

export default function MapPage() {
  return (
    <Showcase title="Map" description="Location display with address and optional Google Maps embed. Shows a placeholder when no embed URL is provided.">

      <Preview label="Placeholder with address">
        <Map
          address="One Infinite Loop, Cupertino, CA 95014"
          label="Headquarters"
          height={240}
          showLink
        />
      </Preview>

      <Preview label="Lat/lng placeholder">
        <Map
          lat={37.3318}
          lng={-122.0312}
          zoom={14}
          label="Exact coordinates"
          height={200}
          showLink
        />
      </Preview>

      <Preview label="Compact, no link">
        <Map
          address="Alexanderplatz, Berlin, Germany"
          label="Event location"
          height={160}
          showLink={false}
        />
      </Preview>

    </Showcase>
  );
}
