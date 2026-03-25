"use client";

import { useState } from "react";
import { Showcase, Preview } from "../_showcase";
import { Upload, UploadFile } from "@/components/molecules/Upload";

export default function UploadPage() {
  const [files, setFiles] = useState<UploadFile[]>([
    { id: "1", name: "report-jan.pdf",  size: 245_000, type: "application/pdf",  status: "done",      progress: 100 },
    { id: "2", name: "visitors.xlsx",   size: 84_000,  type: "application/xlsx", status: "uploading", progress: 62 },
    { id: "3", name: "floor-plan.png",  size: 1_200_000, type: "image/png",     status: "error",     error: "File too large (max 1 MB)" },
  ]);

  const addFiles = (newFiles: File[]) => {
    const items: UploadFile[] = newFiles.map((f) => ({
      id: Math.random().toString(36).slice(2),
      name: f.name,
      size: f.size,
      type: f.type,
      status: "uploading" as const,
      progress: 0,
    }));
    setFiles((prev) => [...prev, ...items]);
  };

  const remove = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id));

  return (
    <Showcase title="Upload" description="Drag-and-drop file upload zone with progress, error state, and file list.">

      <Preview label="Upload zone with file list">
        <Upload
          label="Documents"
          hint="PDF, XLSX, PNG up to 5 MB"
          accept=".pdf,.xlsx,.png"
          files={files}
          onFiles={addFiles}
          onRemove={remove}
        />
      </Preview>

      <Preview label="Empty zone">
        <Upload
          label="Profile photo"
          hint="JPG or PNG, max 2 MB"
          accept="image/*"
          multiple={false}
        />
      </Preview>

      <Preview label="Disabled">
        <Upload label="Attachments" disabled hint="Upload is disabled" />
      </Preview>

    </Showcase>
  );
}
