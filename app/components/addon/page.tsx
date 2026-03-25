import { Showcase, Preview } from "../_showcase";
import { Addon, InputAddonGroup } from "@/components/ui/Addon";
import { Input } from "@/components/ui/Input";
import { Globe, Search, AtSign, Lock } from "lucide-react";

export default function AddonPage() {
  return (
    <Showcase title="Addon" description="Input prefix/suffix decorator. Wraps inputs with icons, text, or buttons.">

      <Preview label="Text addons">
        <div className="flex flex-col gap-4 max-w-sm">
          <InputAddonGroup>
            <Addon position="left">https://</Addon>
            <Input placeholder="yourdomain.com" className="rounded-l-none" />
          </InputAddonGroup>
          <InputAddonGroup>
            <Input placeholder="username" className="rounded-r-none" />
            <Addon position="right">@sharry.io</Addon>
          </InputAddonGroup>
        </div>
      </Preview>

      <Preview label="Icon addons">
        <div className="flex flex-col gap-4 max-w-sm">
          <InputAddonGroup>
            <Addon position="left"><Globe className="h-4 w-4" /></Addon>
            <Input placeholder="Website URL" className="rounded-l-none" />
          </InputAddonGroup>
          <InputAddonGroup>
            <Addon position="left"><AtSign className="h-4 w-4" /></Addon>
            <Input placeholder="Email address" className="rounded-l-none" />
          </InputAddonGroup>
          <InputAddonGroup>
            <Input placeholder="Password" type="password" className="rounded-r-none" />
            <Addon position="right"><Lock className="h-4 w-4" /></Addon>
          </InputAddonGroup>
        </div>
      </Preview>

      <Preview label="Filled variant">
        <div className="flex flex-col gap-4 max-w-sm">
          <InputAddonGroup>
            <Addon position="left" variant="filled"><Search className="h-4 w-4" /></Addon>
            <Input placeholder="Search…" className="rounded-l-none" />
          </InputAddonGroup>
        </div>
      </Preview>

      <Preview label="Both sides">
        <div className="max-w-sm">
          <InputAddonGroup>
            <Addon position="left">$</Addon>
            <Input placeholder="0.00" type="number" className="rounded-none text-right" />
            <Addon position="right">USD</Addon>
          </InputAddonGroup>
        </div>
      </Preview>

    </Showcase>
  );
}
