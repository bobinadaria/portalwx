"use client";

import { Showcase, Preview } from "../_showcase";
import { MobilePreviewContent } from "@/components/molecules/MobilePreviewContent";
import { MobilePreviewProperty } from "@/components/molecules/MobilePreviewProperty";
import { MobileHeader } from "@/components/molecules/MobileHeader";
import { Building2, Clock, User, Mail, Phone } from "lucide-react";

export default function MobilePreviewPage() {
  return (
    <Showcase title="Mobile Preview" description="Phone frame preview for mobile app content. MobilePreviewProperty for property rows.">

      <Preview label="MobilePreviewContent">
        <div className="flex justify-center">
          <MobilePreviewContent title="Guest Pass — mobile view">
            <MobileHeader title="Guest Details" onBack={() => {}} />
            <div className="flex flex-col">
              <MobilePreviewProperty label="Name"    value="Jane Smith"       icon={<User />} />
              <MobilePreviewProperty label="Company" value="Acme Corp"        icon={<Building2 />} />
              <MobilePreviewProperty label="Host"    value="Tom Baker"        icon={<User />} />
              <MobilePreviewProperty label="Visit"   value="Mar 25, 14:30"   icon={<Clock />} />
              <MobilePreviewProperty label="Email"   value="jane@acme.com"   icon={<Mail />} />
              <MobilePreviewProperty label="Phone"   value="+1 555 000 1234" icon={<Phone />} bordered={false} />
            </div>
          </MobilePreviewContent>
        </div>
      </Preview>

    </Showcase>
  );
}
