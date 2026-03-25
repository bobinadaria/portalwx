import { Showcase, Preview } from "../_showcase";
import { GuestPrint } from "@/components/molecules/GuestPrint";

export default function GuestPrintPage() {
  return (
    <Showcase title="GuestPrint" description="Printable visitor badge with QR code. Used for front desk check-in flows.">

      <Preview label="Full visitor badge">
        <div className="flex gap-6 flex-wrap">
          <GuestPrint
            guestName="Alexandra Müller"
            guestCompany="Acme Corp"
            guestEmail="a.muller@acme.com"
            guestPhone="+49 30 12345678"
            hostName="David Chen"
            location="HQ — Floor 4, Room 412"
            visitTime="Wed 18 Mar 2026 · 10:00 – 17:00"
            badgeNumber="V-2024"
            qrValue="guest:v-2024:alexandra-muller"
            organizationName="Portal WX"
          />
        </div>
      </Preview>

      <Preview label="Minimal badge (no QR, no phone)">
        <div className="flex gap-6 flex-wrap">
          <GuestPrint
            guestName="James Carter"
            guestCompany="Globex Inc."
            hostName="Sarah Kim"
            location="West Campus, Building B"
            visitTime="Thu 19 Mar 2026 · 09:00"
            badgeNumber="V-2025"
            organizationName="Portal WX"
          />
        </div>
      </Preview>

    </Showcase>
  );
}
