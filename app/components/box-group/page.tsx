import { Showcase, Preview } from "../_showcase";
import { Box } from "@/components/ui/Box";
import { Group } from "@/components/ui/Group";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";

export default function BoxGroupPage() {
  return (
    <Showcase title="Box & Group" description="Box is a generic surface container. Group is a flex layout wrapper for spacing and alignment.">

      <Preview label="Box — surfaces">
        <Group gap="md">
          <Box surface="base"    padding="md" radius="xl" border><Text role="caption">surface-base</Text></Box>
          <Box surface="raised"  padding="md" radius="xl" border><Text role="caption">surface-raised</Text></Box>
          <Box surface="subtle"  padding="md" radius="xl" border><Text role="caption">surface-subtle</Text></Box>
          <Box surface="overlay" padding="md" radius="xl" border shadow><Text role="caption">surface-overlay + shadow</Text></Box>
        </Group>
      </Preview>

      <Preview label="Box — padding">
        <Group gap="md">
          <Box padding="none" radius="md" border><Text role="caption" className="p-2">none</Text></Box>
          <Box padding="sm"   radius="md" border><Text role="caption">sm</Text></Box>
          <Box padding="md"   radius="md" border><Text role="caption">md</Text></Box>
          <Box padding="lg"   radius="md" border><Text role="caption">lg</Text></Box>
        </Group>
      </Preview>

      <Preview label="Group — direction and gap">
        <div className="flex flex-col gap-4">
          <Group direction="row" gap="sm">
            <Button variant="secondary" size="sm">One</Button>
            <Button variant="secondary" size="sm">Two</Button>
            <Button variant="secondary" size="sm">Three</Button>
          </Group>
          <Group direction="col" gap="sm">
            <Button variant="secondary" size="sm">One</Button>
            <Button variant="secondary" size="sm">Two</Button>
            <Button variant="secondary" size="sm">Three</Button>
          </Group>
        </div>
      </Preview>

      <Preview label="Group — justify">
        <div className="flex flex-col gap-3">
          <Group justify="start">
            <Button variant="secondary" size="sm">Start</Button>
            <Button variant="secondary" size="sm">aligned</Button>
          </Group>
          <Group justify="center">
            <Button variant="secondary" size="sm">Center</Button>
            <Button variant="secondary" size="sm">aligned</Button>
          </Group>
          <Group justify="between">
            <Button variant="secondary" size="sm">Space</Button>
            <Button variant="secondary" size="sm">between</Button>
          </Group>
          <Group justify="end">
            <Button variant="secondary" size="sm">End</Button>
            <Button variant="secondary" size="sm">aligned</Button>
          </Group>
        </div>
      </Preview>

    </Showcase>
  );
}
