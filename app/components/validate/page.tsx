import { Showcase, Preview } from "../_showcase";
import { Validate } from "@/components/ui/Validate";
import { ValidateGroup } from "@/components/ui/ValidateGroup";
import { Input } from "@/components/ui/Input";

export default function ValidatePage() {
  return (
    <Showcase title="Validate" description="Form validation wrappers that show state, icon, and message around any input.">

      <Preview label="Validate states">
        <div className="flex flex-col gap-4 max-w-sm">
          <Validate state="idle" label="Email" hint="We'll never share your email.">
            <Input placeholder="you@example.com" />
          </Validate>
          <Validate state="valid" label="Username" message="Username is available.">
            <Input value="jane_smith" />
          </Validate>
          <Validate state="invalid" label="Password" message="Must be at least 8 characters.">
            <Input type="password" value="abc" />
          </Validate>
          <Validate state="warning" label="Phone" message="Country code may be required." required>
            <Input placeholder="+1 555 000 0000" />
          </Validate>
        </div>
      </Preview>

      <Preview label="ValidateGroup">
        <div className="max-w-sm">
          <ValidateGroup state="invalid" title="Personal Information" description="Please correct the errors below before continuing.">
            <Validate state="valid" label="First name">
              <Input value="Jane" />
            </Validate>
            <Validate state="invalid" label="Last name" message="Last name is required.">
              <Input placeholder="Smith" />
            </Validate>
            <Validate state="idle" label="Company">
              <Input placeholder="Acme Corp" />
            </Validate>
          </ValidateGroup>
        </div>
      </Preview>

    </Showcase>
  );
}
