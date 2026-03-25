import { Showcase, Preview } from "../_showcase";
import { Validity } from "@/components/organisms/Validity";
import { Grid } from "@/components/layout/Grid";

export default function ValidityPage() {
  return (
    <Showcase title="Validity" description="Multi-field validity summary card. Used for identity verification, credential checks, and compliance.">

      <Preview label="All valid">
        <div className="max-w-sm">
          <Validity
            title="Identity verification"
            items={[
              { label: "Government ID",   status: "valid",  message: "Verified — Passport" },
              { label: "Face match",      status: "valid",  message: "98% confidence" },
              { label: "Background check",status: "valid",  expiresAt: "2025-12-31" },
            ]}
          />
        </div>
      </Preview>

      <Preview label="With issues">
        <div className="max-w-sm">
          <Validity
            title="Access credentials"
            items={[
              { label: "Badge",           status: "valid",   message: "Active — Badge #4821" },
              { label: "PIN code",        status: "invalid", message: "PIN has expired." },
              { label: "Mobile app",      status: "warning", message: "App version outdated." },
              { label: "Biometrics",      status: "pending", message: "Enrollment required." },
            ]}
          />
        </div>
      </Preview>

      <Preview label="Expired">
        <div className="max-w-sm">
          <Validity
            items={[
              { label: "Visitor badge",   status: "expired", expiresAt: "2024-01-15" },
              { label: "Health clearance",status: "expired", expiresAt: "2023-12-31" },
            ]}
          />
        </div>
      </Preview>

    </Showcase>
  );
}
