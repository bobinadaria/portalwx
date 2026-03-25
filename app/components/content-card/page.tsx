import { Showcase, Preview } from "../_showcase";
import { ContentCard } from "@/components/molecules/ContentCard";
import { Grid } from "@/components/layout/Grid";
import { Button } from "@/components/ui/Button";

export default function ContentCardPage() {
  return (
    <Showcase title="ContentCard" description="Media + text card. Supports vertical and horizontal layout.">

      <Preview label="Vertical (default)">
        <Grid cols={3} gap="md">
          <ContentCard
            title="Access Control Guide"
            description="Learn how to configure access policies for your facilities and manage zone permissions."
            imageSrc="https://picsum.photos/400/225?random=1"
            category="Guide"
            meta="5 min read"
          />
          <ContentCard
            title="Visitor Management Best Practices"
            description="A comprehensive overview of visitor workflows for enterprise environments."
            imageSrc="https://picsum.photos/400/225?random=2"
            category="Best Practice"
            meta="8 min read"
          />
          <ContentCard
            title="Badge Configuration"
            description="Step-by-step instructions for setting up badge readers and firmware updates."
            imageSrc="https://picsum.photos/400/225?random=3"
            category="Technical"
            meta="12 min read"
          />
        </Grid>
      </Preview>

      <Preview label="Horizontal">
        <div className="flex flex-col gap-3 max-w-lg">
          <ContentCard
            title="Security Audit Report — Q1 2026"
            description="Comprehensive review of access events, anomalies, and policy compliance across all sites."
            imageSrc="https://picsum.photos/200/150?random=4"
            meta="Mar 15, 2026"
            horizontal
            actions={<Button size="sm" variant="secondary">View</Button>}
          />
          <ContentCard
            title="Facility Maintenance Schedule"
            description="Planned downtime and maintenance windows for Q2 2026."
            imageSrc="https://picsum.photos/200/150?random=5"
            meta="Apr 1, 2026"
            horizontal
            actions={<Button size="sm" variant="secondary">View</Button>}
          />
        </div>
      </Preview>

    </Showcase>
  );
}
