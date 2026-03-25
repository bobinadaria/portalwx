"use client";

import { useState } from "react";
import { Showcase, Preview } from "../_showcase";
import { CodeEditor } from "@/components/ui/CodeEditor";

const TS_SAMPLE = `interface AccessPolicy {
  zoneId: string;
  roles: ("admin" | "operator" | "viewer")[];
  allowedHours: {
    start: number; // 0-23
    end: number;
  };
  requiresMfa: boolean;
}

function validatePolicy(policy: AccessPolicy): boolean {
  if (!policy.zoneId) return false;
  if (policy.roles.length === 0) return false;
  return policy.allowedHours.start < policy.allowedHours.end;
}`;

const JSON_SAMPLE = `{
  "zoneId": "zone-b-12",
  "roles": ["admin", "operator"],
  "allowedHours": {
    "start": 8,
    "end": 20
  },
  "requiresMfa": true
}`;

const BASH_SAMPLE = `#!/bin/bash
# Deploy Portal WX
echo "Starting deployment..."
npm ci --production
npm run build
pm2 restart portalwx
echo "Done."`;

function EditableDemo() {
  const [code, setCode] = useState(TS_SAMPLE);
  return (
    <CodeEditor
      value={code}
      onChange={setCode}
      language="typescript"
      label="access-policy.ts"
      rows={12}
    />
  );
}

export default function CodeEditorPage() {
  return (
    <Showcase title="CodeEditor" description="Monospace code editor with line numbers, copy button, and read-only mode. No syntax highlighting dependency.">

      <Preview label="Editable (TypeScript)">
        <EditableDemo />
      </Preview>

      <Preview label="Read-only (JSON)">
        <CodeEditor
          value={JSON_SAMPLE}
          language="json"
          label="policy.json"
          readOnly
          rows={8}
        />
      </Preview>

      <Preview label="Read-only, no line numbers (Bash)">
        <CodeEditor
          value={BASH_SAMPLE}
          language="bash"
          label="deploy.sh"
          readOnly
          showLineNumbers={false}
          rows={6}
        />
      </Preview>

    </Showcase>
  );
}
