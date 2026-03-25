"use client";
import { Showcase, Preview } from "../_showcase";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { SearchField } from "@/components/ui/SearchField";
import { DateRange } from "@/components/ui/DateRange";
import { FileUpload } from "@/components/ui/FileUpload";
import { Search } from "lucide-react";

export default function InputsPage() {
  return (
    <Showcase title="Inputs" description="Text inputs, selects, search, file upload, and date range.">
      <Preview label="Input — States">
        <div className="grid grid-cols-2 gap-4 max-w-lg">
          <Input label="Default" placeholder="Enter text..." />
          <Input label="With helper" placeholder="Enter email" helper="We'll never share your email." />
          <Input label="Error" placeholder="Enter value" error="This field is required." />
          <Input label="Disabled" placeholder="Cannot edit" disabled />
          <Input label="With icon" placeholder="Search..." icon={<Search size={14} />} />
        </div>
      </Preview>

      <Preview label="Textarea">
        <div className="max-w-md space-y-4">
          <Textarea label="Description" placeholder="Write a description..." />
          <Textarea label="Error state" placeholder="Write something..." error="Too short." />
        </div>
      </Preview>

      <Preview label="Select">
        <div className="max-w-xs space-y-4">
          <Select
            label="Site"
            placeholder="Select a site..."
            options={[
              { label: "Building A", value: "a" },
              { label: "Building B", value: "b" },
              { label: "Building C", value: "c" },
            ]}
          />
          <Select
            label="With error"
            options={[{ label: "Option", value: "opt" }]}
            error="Selection required."
          />
        </div>
      </Preview>

      <Preview label="SearchField">
        <div className="max-w-xs">
          <SearchField placeholder="Search sites..." />
        </div>
      </Preview>

      <Preview label="DateRange">
        <div className="max-w-md">
          <DateRange />
        </div>
      </Preview>

      <Preview label="FileUpload">
        <div className="max-w-sm">
          <FileUpload label="Upload document" helper="PDF, PNG, or JPG up to 10 MB." />
        </div>
      </Preview>
    </Showcase>
  );
}
