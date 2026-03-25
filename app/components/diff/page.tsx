import { Showcase, Preview } from "../_showcase";
import { Diff } from "@/components/ui/Diff";

const policyDiff = [
  { type: "header"    as const, content: "@@ -1,8 +1,9 @@ AccessPolicy" },
  { type: "unchanged" as const, content: '{',                          lineOld: 1,  lineNew: 1 },
  { type: "unchanged" as const, content: '  "zoneId": "zone-b-12",',   lineOld: 2,  lineNew: 2 },
  { type: "removed"   as const, content: '  "roles": ["admin"],',       lineOld: 3 },
  { type: "added"     as const, content: '  "roles": ["admin", "operator"],', lineNew: 3 },
  { type: "unchanged" as const, content: '  "allowedHours": {',        lineOld: 4,  lineNew: 4 },
  { type: "unchanged" as const, content: '    "start": 8,',            lineOld: 5,  lineNew: 5 },
  { type: "removed"   as const, content: '    "end": 18',              lineOld: 6 },
  { type: "added"     as const, content: '    "end": 20',              lineNew: 6 },
  { type: "unchanged" as const, content: '  },',                       lineOld: 7,  lineNew: 7 },
  { type: "removed"   as const, content: '  "requiresMfa": false',     lineOld: 8 },
  { type: "added"     as const, content: '  "requiresMfa": true',      lineNew: 8 },
  { type: "added"     as const, content: '  "auditLevel": "full"',     lineNew: 9 },
  { type: "unchanged" as const, content: '}',                          lineOld: 9,  lineNew: 10 },
];

const simpleDiff = [
  { type: "header"    as const, content: "@@ Firmware v2.1.4 → v2.2.0" },
  { type: "unchanged" as const, content: "Build: production",          lineOld: 1,  lineNew: 1 },
  { type: "removed"   as const, content: "Version: 2.1.4",             lineOld: 2 },
  { type: "added"     as const, content: "Version: 2.2.0",             lineNew: 2 },
  { type: "unchanged" as const, content: "Arch: arm64",                lineOld: 3,  lineNew: 3 },
  { type: "removed"   as const, content: "Checksum: a1b2c3d4",         lineOld: 4 },
  { type: "added"     as const, content: "Checksum: f5e6a7b8",         lineNew: 4 },
];

export default function DiffPage() {
  return (
    <Showcase title="Diff" description="Unified diff viewer with line numbers, add/remove highlights, and section headers.">

      <Preview label="Policy change">
        <Diff lines={policyDiff} title="policy.json" />
      </Preview>

      <Preview label="Firmware metadata">
        <Diff lines={simpleDiff} title="firmware.conf" />
      </Preview>

      <Preview label="No line numbers">
        <Diff lines={policyDiff} showLineNumbers={false} />
      </Preview>

    </Showcase>
  );
}
