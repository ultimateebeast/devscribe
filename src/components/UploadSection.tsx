"use client";

import { useState } from "react";


// ✅ Accept the onUpload prop from the parent
type UploadSectionProps = {
  onUpload: (input: {
    type: "zip" | "url";
    data: File | string;
  }) => Promise<void>;
};

export default function UploadSection({ onUpload }: UploadSectionProps) {
  const [fileName, setFileName] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    // ✅ Send file to parent
    await onUpload({ type: "zip", data: file });
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <input type="file" accept=".zip" onChange={handleFileUpload} />
      {fileName && (
        <p className="mt-2 text-sm text-gray-600">
          📁 Uploaded File: {fileName}
        </p>
      )}
    </div>
  );
}
