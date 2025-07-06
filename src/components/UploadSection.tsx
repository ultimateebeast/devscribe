"use client";

import { useState } from "react";
import JSZip from "jszip";

export default function UploadSection() {
  const [readme, setReadme] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const zip = await JSZip.loadAsync(file);
    let context = "";

    for (const filename of Object.keys(zip.files)) {
      const zipEntry = zip.files[filename];
      if (zipEntry.dir) continue;
      const content = await zipEntry.async("string");

      // Add top files only
      if (/readme|index|package\.json|main/i.test(filename)) {
        context += `---\nFILE: ${filename}\n${content.slice(0, 1500)}\n\n`;
      }
    }

    // Send to API route
    await handleGenerate(context);
  };

  const handleGenerate = async (prompt: string) => {
    setLoading(true);

    const res = await fetch("/api/generate-readme", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const { result } = await res.json();
    setReadme(result);
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <input type="file" accept=".zip" onChange={handleFileUpload} />
      {loading ? (
        <p>Generating README...</p>
      ) : (
        readme && (
          <>
            <h2 className="mt-4 font-semibold">📄 Generated README:</h2>
            <pre className="bg-gray-100 p-4 mt-2 rounded whitespace-pre-wrap">
              {readme}
            </pre>
          </>
        )
      )}
    </div>
  );
}
