"use client";
import { useState } from "react";
import UploadSection from "@/components/UploadSection";
import { parseZipFile, ParsedFile } from "@/utils/parseZip";
// import { generateReadme } from "@/utils/generateReadme";
import { downloadTextFile } from "@/utils/downloadFile";

export default function HomePage() {
  const [files, setFiles] = useState<ParsedFile[]>([]);
  const [readme, setReadme] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (input: {
    type: "zip" | "url";
    data: File | string;
  }) => {
    if (input.type === "zip" && input.data instanceof File) {
      const parsed = await parseZipFile(input.data);
      setFiles(parsed);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);

    const prompt = `...`; // Construct your prompt from parsed files

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
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-10">
      <h1 className="text-4xl font-bold mb-4 text-center">🧠 DevScribe</h1>
      <p className="text-gray-600 text-lg mb-6 text-center">
        AI-powered documentation from your codebase
      </p>

      <UploadSection onUpload={handleUpload} />

      {files.length > 0 && (
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-6 bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
          {loading ? "Generating README..." : "⚡ Generate README"}
        </button>
      )}

      {readme && (
        <div className="mt-10 w-full max-w-4xl bg-white rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">📝 Generated README.md</h2>
          <pre className="whitespace-pre-wrap text-sm text-gray-800 mb-4">
            {readme}
          </pre>

          <button
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => downloadTextFile("README.md", readme)}>
            📥 Download README.md
          </button>
        </div>
      )}
    </main>
  );
}
