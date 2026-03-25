import { Showcase, Preview } from "../_showcase";
import { Status } from "@/components/ui/Status";
import { Group } from "@/components/ui/Group";

export default function StatusPage() {
  return (
    <Showcase title="Status" description="Status dot indicator for online/offline/busy/away states and semantic feedback.">

      <Preview label="Variants">
        <Group gap="lg" wrap>
          <Status variant="online"  label="Online" />
          <Status variant="offline" label="Offline" />
          <Status variant="busy"    label="Busy" />
          <Status variant="away"    label="Away" />
          <Status variant="success" label="Success" />
          <Status variant="warning" label="Warning" />
          <Status variant="error"   label="Error" />
          <Status variant="info"    label="Info" />
          <Status variant="neutral" label="Neutral" />
        </Group>
      </Preview>

      <Preview label="Sizes">
        <Group gap="lg" align="center">
          <Status variant="online" size="sm" label="Small" />
          <Status variant="online" size="md" label="Medium" />
          <Status variant="online" size="lg" label="Large" />
        </Group>
      </Preview>

      <Preview label="Dot only">
        <Group gap="md">
          <Status variant="online" />
          <Status variant="busy" />
          <Status variant="warning" />
          <Status variant="offline" />
        </Group>
      </Preview>

    </Showcase>
  );
}
