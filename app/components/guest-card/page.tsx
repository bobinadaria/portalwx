import { Showcase, Preview } from "../_showcase";
import { GuestCard } from "@/components/molecules/GuestCard";
import { Button } from "@/components/ui/Button";
import { Grid } from "@/components/layout/Grid";
import { CheckCircle2, XCircle } from "lucide-react";

export default function GuestCardPage() {
  return (
    <Showcase title="GuestCard" description="Visitor/guest info display card with status, host, contact, and QR pass.">

      <Preview label="Statuses">
        <Grid cols={2} gap="md">
          <GuestCard
            name="Jane Smith"
            company="Acme Corp"
            host="Tom Baker"
            status="expected"
            time="Today, 14:30"
            email="jane@acme.com"
          />
          <GuestCard
            name="Alex Johnson"
            company="Contoso Ltd"
            host="Sarah Miller"
            status="checked-in"
            time="Arrived 13:45"
            phone="+1 555 000 1234"
            showQr
          />
          <GuestCard
            name="Maria Garcia"
            status="checked-out"
            time="Left 12:00"
          />
          <GuestCard
            name="David Lee"
            company="Fabrikam Inc"
            status="cancelled"
            time="Scheduled 11:00"
          />
        </Grid>
      </Preview>

      <Preview label="With actions">
        <div className="max-w-sm">
          <GuestCard
            name="Emma Wilson"
            company="Northwind"
            host="Chris Evans"
            status="expected"
            time="Tomorrow, 10:00"
            email="emma@northwind.com"
            showQr
            actions={
              <>
                <Button variant="secondary" size="sm" icon={<XCircle className="h-4 w-4" />}>Deny</Button>
                <Button size="sm" icon={<CheckCircle2 className="h-4 w-4" />}>Check in</Button>
              </>
            }
          />
        </div>
      </Preview>

    </Showcase>
  );
}
