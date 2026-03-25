import { Showcase, Preview } from "../_showcase";
import { Icon } from "@/components/ui/Icon";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Group } from "@/components/ui/Group";
import { Bell, Settings, User, Search, Home, Star, Shield, Zap, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function IconPage() {
  return (
    <Showcase title="Icon" description="Lucide icon wrapper with size and color tokens. FeatureIcon adds a shaped background container.">

      <Preview label="Icon — sizes">
        <Group gap="lg" align="center">
          <Icon icon={<Bell />} size="xs" />
          <Icon icon={<Bell />} size="sm" />
          <Icon icon={<Bell />} size="md" />
          <Icon icon={<Bell />} size="lg" />
          <Icon icon={<Bell />} size="xl" />
        </Group>
      </Preview>

      <Preview label="Icon — colors">
        <Group gap="lg" align="center">
          <Icon icon={<Star />} color="primary" />
          <Icon icon={<Star />} color="secondary" />
          <Icon icon={<Star />} color="muted" />
          <Icon icon={<Star />} color="brand" />
          <Icon icon={<Star />} color="success" />
          <Icon icon={<Star />} color="warning" />
          <Icon icon={<Star />} color="error" />
          <Icon icon={<Star />} color="info" />
        </Group>
      </Preview>

      <Preview label="FeatureIcon — variants">
        <Group gap="lg" wrap>
          <FeatureIcon icon={<Shield />}       variant="brand" />
          <FeatureIcon icon={<CheckCircle2 />} variant="success" />
          <FeatureIcon icon={<AlertTriangle />} variant="warning" />
          <FeatureIcon icon={<Zap />}          variant="error" />
          <FeatureIcon icon={<Star />}         variant="info" />
          <FeatureIcon icon={<Settings />}     variant="neutral" />
        </Group>
      </Preview>

      <Preview label="FeatureIcon — sizes">
        <Group gap="lg" align="center">
          <FeatureIcon icon={<Bell />} size="sm" />
          <FeatureIcon icon={<Bell />} size="md" />
          <FeatureIcon icon={<Bell />} size="lg" />
          <FeatureIcon icon={<Bell />} size="xl" />
        </Group>
      </Preview>

      <Preview label="FeatureIcon — shapes">
        <Group gap="lg" align="center">
          <FeatureIcon icon={<Home />} shape="rounded" />
          <FeatureIcon icon={<Home />} shape="circle" />
          <FeatureIcon icon={<Home />} shape="square" />
        </Group>
      </Preview>

    </Showcase>
  );
}
