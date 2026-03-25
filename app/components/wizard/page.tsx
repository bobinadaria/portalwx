"use client";

import { Showcase, Preview } from "../_showcase";
import { Wizard } from "@/components/molecules/Wizard";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Text } from "@/components/ui/Text";

const hostOptions = [
  { label: "Tom Baker",    value: "tom" },
  { label: "Sarah Miller", value: "sarah" },
  { label: "Raj Patel",    value: "raj" },
];

const areaOptions = [
  { label: "Lobby only", value: "lobby" },
  { label: "Floor 3",    value: "floor3" },
  { label: "All areas",  value: "all" },
];

export default function WizardPage() {
  return (
    <Showcase title="Wizard" description="Multi-step form wizard with Stepper progress, validation hooks, and navigation.">

      <Preview label="Visitor registration wizard">
        <Wizard
          onComplete={() => alert("Registration complete!")}
          onCancel={() => {}}
          steps={[
            {
              label: "Identity",
              description: "Personal info",
              content: (
                <div className="flex flex-col gap-4">
                  <Text role="subheading">Personal Information</Text>
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="First name" placeholder="Jane" />
                    <Input label="Last name" placeholder="Smith" />
                  </div>
                  <Input label="Company" placeholder="Acme Corp" />
                  <Input label="Email" type="email" placeholder="jane@acme.com" />
                </div>
              ),
            },
            {
              label: "Access",
              description: "Permissions",
              content: (
                <div className="flex flex-col gap-4">
                  <Text role="subheading">Access Details</Text>
                  <Select label="Host" options={hostOptions} placeholder="Select host…" />
                  <Input label="Visit date" type="date" />
                  <Input label="Visit time" type="time" />
                  <Select label="Area access" options={areaOptions} placeholder="Select area…" />
                </div>
              ),
            },
            {
              label: "Review",
              content: (
                <div className="flex flex-col gap-3">
                  <Text role="subheading">Confirm Details</Text>
                  <div className="rounded-xl border border-border-default p-4 flex flex-col gap-2">
                    <div className="flex justify-between"><Text role="label">Name</Text><Text role="body">Jane Smith</Text></div>
                    <div className="flex justify-between"><Text role="label">Company</Text><Text role="body">Acme Corp</Text></div>
                    <div className="flex justify-between"><Text role="label">Host</Text><Text role="body">Tom Baker</Text></div>
                    <div className="flex justify-between"><Text role="label">Visit</Text><Text role="body">Mar 25, 2026 at 14:30</Text></div>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </Preview>

    </Showcase>
  );
}
